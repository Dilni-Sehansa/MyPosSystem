import { getOrderData } from '../model/OrderModel.js';

$(document).ready(function() {
    function loadOrders() {
        let orders = getOrderData();
        let tbody = $("#orderHistoryTbl");
        tbody.empty();

        orders.forEach((order) => {
            tbody.append(`
                <tr style="border-bottom: 1px solid #D1C4E9; border-top: none; border-right: none; border-left: none">
                    <td>${order.orderId}</td>
                    <td>${order.customerId}</td>
                    <td>${order.date}</td>
                    <td>${order.subTotal}</td>
                    <td>${order.discount}%</td>
                    <td>${order.total}</td>
                </tr>
            `);
        });
    }

    loadOrders();

    $(".nav-btn[data-target='order-details-section']").click(function() {
        loadOrders();
    });

    $("#search-order-btn").click(function() {
        let searchId = $("#search-order-id").val().trim().toUpperCase();
        let orders = getOrderData();
        let tbody = $("#orderHistoryTbl");
        tbody.empty();

        let filteredOrders = searchId ? orders.filter(o => o.orderId.toUpperCase().includes(searchId)) : orders;

        if (filteredOrders.length === 0) {
            tbody.append(`<tr><td colspan="6" class="text-center text-muted">No orders found.</td></tr>`);
        } else {
            filteredOrders.forEach((order) => {
                tbody.append(`
                    <tr style="border-bottom: 1px solid #D1C4E9; border-top: none; border-right: none; border-left: none">
                        <td>${order.orderId}</td>
                        <td>${order.customerId}</td>
                        <td>${order.date}</td>
                        <td>${order.subTotal}</td>
                        <td>${order.discount}%</td>
                        <td>${order.total}</td>
                    </tr>
                `);
            });
        }
    });
});
