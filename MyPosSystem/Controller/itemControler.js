import {
    addItemData,
    updateItemData,
    deleteItemData,
    getItemData,
    getItemDataByIndex,
    getItemDataById,
    generateItemId
} from '../model/ItemModel.js';

let selected_image = "";

const loadItemTbl = () => {
    $('#itemTbl').empty();

    let item_db = getItemData();

    item_db.forEach((item, index) => {
        let new_row = `
        <tr>
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
};

const cleanItemForm = () => {
    $('#item_id_input').val(generateItemId()).attr('readonly', true);
    $('#item_name_input').val("");
    $('#item_category_input').val("Shirt");
    $('#item_size_input').val("S");
    $('#item_qty_input').val("");
    $('#item_receivedPrice_input').val("");
    $('#item_price_input').val("");
    $('#item_file_input').val("");

    $('#image-preview-container').html(`
        <i class="fa-solid fa-image" style="color: #D1C4E9; font-size: 20px;"></i>
    `);

    selected_image = "";
};

$('#item_file_input').on('change', function (e) {
    let file = e.target.files[0];

    if (file) {
        let reader = new FileReader();

        reader.onload = function (event) {
            selected_image = event.target.result;

            $('#image-preview-container').html(`
                <img src="${selected_image}" style="width:100%; height:100%; object-fit:cover;">
            `);
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

        selected_image = item.image;

        $('#image-preview-container').html(`
            <img src="${selected_image}" style="width:100%; height:100%; object-fit:cover;">
        `);
    }
});

$('#item-save-btn').on('click', function (e) {
    e.preventDefault();

    let id = $('#item_id_input').val();
    let name = $('#item_name_input').val();
    let category = $('#item_category_input').val();
    let size = $('#item_size_input').val();
    let qty = $('#item_qty_input').val();
    let receivedPrice = $('#item_receivedPrice_input').val();
    let price = $('#item_price_input').val();

    if (!name || !category || !size || !qty || !receivedPrice || !price) {
        Swal.fire("Error", "Please fill all fields!", "error");
        return;
    }

    if (!selected_image) {
        Swal.fire("Error", "Please select image!", "error");
        return;
    }

    if (getItemDataById(id)) {
        Swal.fire("Error", "Item ID already exists!", "error");
        return;
    }

    addItemData(id, name, category, size, qty, receivedPrice, price, selected_image);

    Swal.fire("Success", "Item saved!", "success");

    loadItemTbl();
    cleanItemForm();
});

$('#item-update-btn').on('click', function (e) {
    e.preventDefault();

    let id = $('#item_id_input').val();
    let name = $('#item_name_input').val();
    let category = $('#item_category_input').val();
    let size = $('#item_size_input').val();
    let qty = $('#item_qty_input').val();
    let receivedPrice = $('#item_receivedPrice_input').val();
    let price = $('#item_price_input').val();

    if (!id || !name || !category || !size || !qty || !receivedPrice || !price) {
        Swal.fire("Error", "Please fill all fields!", "error");
        return;
    }

    let existingItem = getItemDataById(id);

    if (!existingItem) {
        Swal.fire("Error", "Item not found!", "error");
        return;
    }

    let imageToUse = selected_image || existingItem.image;

    updateItemData(id, name, category, size, qty, receivedPrice, price, imageToUse);

    Swal.fire("Success", "Item updated!", "success");

    loadItemTbl();
    cleanItemForm();
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

$(document).ready(function () {
    cleanItemForm();
    loadItemTbl();
});