import { addItemData, updateItemData, deleteItemData, getItemData, getItemDataByIndex, getItemDataById } from '../model/ItemModel.js';

let selected_image = "";

const loadItemTbl = () => {
    $('#itemTbl').empty();
    let item_db = getItemData();
    item_db.forEach((item, index) => {
        let new_row = `<tr> 
            <td>${index + 1}</td> 
            <td><img src="${item.image || ''}" width="40" height="40" style="border-radius:5px; object-fit:cover;"></td>
            <td>${item.id}</td> 
            <td>${item.name}</td> 
            <td>${item.category}</td> 
            <td>${item.size}</td> 
            <td>${item.qty}</td> 
            <td>${item.receivedPrice}</td> 
            <td>${item.price}</td> 
            <td>
                <button class="btn btn-warning btn-sm edit-btn" data-index="${index}">Edit</button>
                <button class="btn btn-danger btn-sm delete-btn" data-id="${item.id}">Delete</button>
            </td>
        </tr>`;
        $('#itemTbl').append(new_row);
    });
}

const cleanItemForm = () => {
    $('#item_id_input').val("").attr('readonly', false);
    $('#item_name_input').val("");
    $('#item_qty_input').val("");
    $('#item_receivedPrice_input').val("");
    $('#item_price_input').val("");
    $('#item_file_input').val("");
    $('#image-preview-container').html('<i class="fa-solid fa-image" style="color: #D1C4E9; font-size: 20px;"></i>');
    selected_image = "";
}

$('#item_file_input').on('change', function (e) {
    let file = e.target.files[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = function (event) {
            selected_image = event.target.result;
            $('#image-preview-container').html(`<img src="${selected_image}" style="width:100%; height:100%; object-fit:cover;">`);
        };
        reader.readAsDataURL(file);
    }
});

$('#itemTbl').on('click', '.edit-btn', function () {
    let index = $(this).data('index');
    let item = getItemDataByIndex(index);
    if (item) {
        $('#item_id_input').val(item.id).attr('readonly', true);
        $('#item_name_input').val(item.name);
        $('#item_category_input').val(item.category);
        $('#item_size_input').val(item.size);
        $('#item_qty_input').val(item.qty);
        $('#item_receivedPrice_input').val(item.receivedPrice);
        $('#item_price_input').val(item.price);
        if (item.image) {
            selected_image = item.image;
            $('#image-preview-container').html(`<img src="${selected_image}" style="width:100%; height:100%; object-fit:cover;">`);
        }
    }
});

$('#item-save-btn').on('click', function (e) {
    e.preventDefault();
    let id = $('#item_id_input').val();
    let name = $('#item_name_input').val();
    if (!id) { Swal.fire("Error", "Invalid Id!", "error"); return; }
    if (getItemDataById(id)) { Swal.fire("Error", "ID already exists!", "error"); return; }

    addItemData(id, name, $('#item_category_input').val(), $('#item_size_input').val(), $('#item_qty_input').val(), $('#item_receivedPrice_input').val(), $('#item_price_input').val(), selected_image);
    Swal.fire("Success", "Item saved!", "success");
    loadItemTbl();
    cleanItemForm();
});

$('#item-update-btn').on('click', function (e) {
    e.preventDefault();
    let id = $('#item_id_input').val();
    if (getItemDataById(id)) {
        updateItemData(id, $('#item_name_input').val(), $('#item_category_input').val(), $('#item_size_input').val(), $('#item_qty_input').val(), $('#item_receivedPrice_input').val(), $('#item_price_input').val(), selected_image);
        Swal.fire("Success", "Item updated!", "success");
        loadItemTbl();
        cleanItemForm();
    }
});

$('#itemTbl').on('click', '.delete-btn', function () {
    let id = $(this).data('id');
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            deleteItemData(id);
            loadItemTbl();
            cleanItemForm();
        }
    });
});

$('#item-clear-btn').on('click', cleanItemForm);