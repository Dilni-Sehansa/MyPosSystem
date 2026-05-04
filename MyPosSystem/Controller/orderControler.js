import { getItemData, updateItemData } from '../model/ItemModel.js';
import { getCustomerData } from '../model/CustomerModel.js';
import { addOrderData, generateOrderId } from '../model/OrderModel.js';
import { refreshDashboard } from './DashboardController.js';

let cart = [];

$(document).ready(function () {
    loadItems();
    loadCustomers();
    $("#order-id-input").val(generateOrderId());

    $(".nav-btn[data-target='order-section']").click(function() {
        loadItems();
        loadCustomers();
        $("#order-id-input").val(generateOrderId());
    });

    $("#item-id-select").on("change", function () {
        let selectedId = $(this).val();
        let itemData = getItemData();
        let selectedItem = itemData.find(i => i.id === selectedId);

        if (selectedItem) {
            $("#unit-price-input").val(selectedItem.price);
            $("#size-select").empty().append(`<option value="${selectedItem.size}">${selectedItem.size}</option>`);
            $("#qty-input").val(1).attr("max", selectedItem.qty);
        } else {
            $("#unit-price-input").val("");
            $("#size-select").empty();
        }
    });

    $("#addToCartForm").on("submit", function (e) {
        e.preventDefault();

        let id = $("#item-id-select").val();
        let qty = parseInt($("#qty-input").val());
        let price = parseFloat($("#unit-price-input").val());

        let itemData = getItemData();
        let item = itemData.find(i => i.id === id);
        if (!item) return;

        let itemName = item.name;

        if (!id || qty <= 0) {
            if (typeof Swal !== 'undefined') Swal.fire("Error", "Select Item and Qty!", "error");
            else alert("Select Item and Qty!");
            return;
        }

        if (qty > item.qty) {
            if (typeof Swal !== 'undefined') Swal.fire("Error", "Not enough quantity in stock!", "error");
            else alert("Not enough quantity in stock!");
            return;
        }

        let existingItem = cart.find(c => c.id === id);
        if (existingItem) {
            if (existingItem.qty + qty > item.qty) {
                if (typeof Swal !== 'undefined') Swal.fire("Error", "Not enough quantity in stock!", "error");
                else alert("Not enough quantity in stock!");
                return;
            }
            existingItem.qty += qty;
            existingItem.total = existingItem.qty * existingItem.price;
        } else {
            let cartItem = { id, itemName, price, qty, total: price * qty };
            cart.push(cartItem);
        }

        updateCartTable();
        calculateTotal();
        $(this)[0].reset();
        $("#size-select").empty();
    });

    function loadItems() {
        $("#item-id-select").empty().append('<option value="">Select Item</option>');
        let itemData = getItemData();
        itemData.forEach(i => {
            $("#item-id-select").append(`<option value="${i.id}">${i.id} - ${i.name}</option>`);
        });
    }

    function loadCustomers() {
        $("#cust-id-select").empty().append('<option value="">Select Customer</option>');
        let customerData = getCustomerData();
        customerData.forEach(c => {
            $("#cust-id-select").append(`<option value="${c.id}">${c.id} - ${c.name}</option>`);
        });
    }

    function updateCartTable() {
        $("#cartTableBody").empty();
        cart.forEach((c, index) => {
            $("#cartTableBody").append(`
                <tr>
                    <td>${index + 1}</td>
                    <td>${c.itemName}</td>
                    <td>${c.price}</td>
                    <td>${c.qty}</td>
                    <td>${c.total}</td>
                    <td><button class="btn btn-danger btn-sm delete-cart" data-index="${index}">Remove</button></td>
                </tr>
            `);
        });
    }

    function calculateTotal() {
        let subTotal = cart.reduce((acc, obj) => acc + obj.total, 0);
        let discount = parseFloat($("#discount-input").val()) || 0;
        let finalTotal = subTotal - (subTotal * discount / 100);

        $("#sub-total-text").text(`Rs. ${subTotal.toFixed(2)}`);
        $("#final-total-text").text(`Rs. ${finalTotal.toFixed(2)}`);
        return { subTotal, discount, finalTotal };
    }

    $("#discount-input").on("input", calculateTotal);

    $("#cartTableBody").on("click", ".delete-cart", function() {
        cart.splice($(this).data("index"), 1);
        updateCartTable();
        calculateTotal();
    });

    $("#clear-cart-btn").click(() => {
        cart = [];
        updateCartTable();
        calculateTotal();
    });

    $("#purchase-btn").click(() => {
        let orderId = $("#order-id-input").val();
        let customerId = $("#cust-id-select").val();

        if (!customerId) {
            if (typeof Swal !== 'undefined') Swal.fire("Error", "Please select a customer!", "error");
            else alert("Please select a customer!");
            return;
        }
        if (cart.length === 0) {
            if (typeof Swal !== 'undefined') Swal.fire("Error", "Cart is empty!", "error");
            else alert("Cart is empty!");
            return;
        }

        let { subTotal, discount, finalTotal } = calculateTotal();
        let date = new Date().toISOString().split('T')[0];

        addOrderData(orderId, customerId, date, subTotal, discount, finalTotal, [...cart]);
        refreshDashboard();

        cart.forEach(cItem => {
            let item = getItemData().find(i => i.id === cItem.id);
            if (item) {
                let newQty = item.qty - cItem.qty;
                updateItemData(item.id, item.name, item.category, item.size, newQty, item.receivedPrice, item.price, item.image);
            }
        });

        if (typeof Swal !== 'undefined') Swal.fire("Success", "Order Placed Successfully!", "success");
        else alert("Order Placed Successfully!");

        cart = [];
        updateCartTable();
        calculateTotal();
        $("#order-id-input").val(generateOrderId());
        $("#cust-id-select").val("");
        $("#discount-input").val(0);
    });
});