import { addCustomerData, updateCustomerData, deleteCustomerData, getCustomerData, getCustomerDataByIndex, getCustomerDataById } from '../model/CustomerModel.js';
import { check_phone } from '../utils/regex_utils.js';

const loadCustomerTbl = () => {
    $('#customerTbl').empty();
    let customer_db = getCustomerData();
    customer_db.forEach((item, index) => {
        let new_row = `<tr data-index="${index}"> 
            <td>${index + 1}</td> 
            <td>${item.id}</td> 
            <td>${item.name}</td> 
            <td>${item.phone}</td> 
            <td>${item.email}</td> 
            <td>${item.address}</td> 
            <td>
                <button class="btn btn-warning btn-sm edit-btn" data-index="${index}">Edit</button>
                <button class="btn btn-danger btn-sm delete-btn" data-id="${item.id}">Delete</button>
            </td>
        </tr>`;
        $('#customerTbl').append(new_row);
    });
}

const cleanCustomerForm = () => {
    $('#customer_id_input').val("").attr('readonly', false);
    $('#customer_name_input').val("");
    $('#customer_phone_input').val("");
    $('#customer_email_input').val("");
    $('#customer_address_input').val("");
}

$('#customerTbl').on('click', '.edit-btn', function (e) {
    e.stopPropagation();
    let index = $(this).data('index');
    let customer_obj = getCustomerDataByIndex(index);

    if (customer_obj) {
        $('#customer_id_input').val(customer_obj.id).attr('readonly', true);
        $('#customer_name_input').val(customer_obj.name);
        $('#customer_phone_input').val(customer_obj.phone);
        $('#customer_email_input').val(customer_obj.email);
        $('#customer_address_input').val(customer_obj.address);
    }
});

$('#customer-save-btn').on('click', function (e) {
    e.preventDefault();
    let id = $('#customer_id_input').val();
    let name = $('#customer_name_input').val();
    let phone = $('#customer_phone_input').val();
    let email = $('#customer_email_input').val();
    let address = $('#customer_address_input').val();

    if (id === "") { Swal.fire("Error", "Invalid Id!", "error"); }
    else if (getCustomerDataById(id)) { Swal.fire("Error", "ID already exists!", "error"); }
    else if (name === "") { Swal.fire("Error", "Name cannot be empty!", "error"); }
    else if (!check_phone(phone)) { Swal.fire("Error", "Invalid Phone Number!", "error"); }
    else if (email === "" || !email.includes("@")) { Swal.fire("Error", "Invalid Email!", "error"); }
    else {
        addCustomerData(id, name, phone, email, address);
        Swal.fire("Success", "Customer saved!", "success");
        loadCustomerTbl();
        cleanCustomerForm();
    }
});

$('#customer-update-btn').on('click', function (e) {
    e.preventDefault();
    let id = $('#customer_id_input').val();
    let name = $('#customer_name_input').val();
    let phone = $('#customer_phone_input').val();
    let email = $('#customer_email_input').val();
    let address = $('#customer_address_input').val();

    if (getCustomerDataById(id)) {
        updateCustomerData(id, name, phone, email, address);
        Swal.fire("Success", "Customer updated!", "success");
        loadCustomerTbl();
        cleanCustomerForm();
    } else {
        Swal.fire("Error", "Please select a customer via Edit button first!", "error");
    }
});

$('#customerTbl').on('click', '.delete-btn', function (e) {
    e.stopPropagation();
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
            deleteCustomerData(id);
            Swal.fire("Deleted!", "Customer removed successfully.", "success");
            loadCustomerTbl();
            cleanCustomerForm();
        }
    });
});

$('#customer-clear-btn').on('click', cleanCustomerForm);