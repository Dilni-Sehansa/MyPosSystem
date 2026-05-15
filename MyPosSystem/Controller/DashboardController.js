import { getCustomerData } from '../model/CustomerModel.js';
import { getItemData } from '../model/ItemModel.js';
import { getOrderData } from '../model/OrderModel.js';

const updateDashboard = () => {

    //date
    let today = new Date(); //Fri May 15 2026 11:17:49 GMT+0530 (India Standard Time)
    let formattedDate = today.toLocaleDateString('en-GB', {
        year: 'numeric', //2025
        month: 'short', //Jan
        day: 'numeric' //1
    });
    $('.fa-calendar-days').parent().html(`
        <i class="fa-regular fa-calendar-days me-2"></i> ${formattedDate}
    `);
    let todayString = today.toISOString().split('T')[0];


    // ---------- Customers ----------
    let customerCount = getCustomerData().length;
    $('#dash-customers-count').text(customerCount);

    // ---------- Items ----------
    let itemCount = getItemData().length;
    $('#dash-items-count').text(itemCount);

    // ---------- Orders ----------
    let allOrders = getOrderData();
    let todayOrders = allOrders.filter(order => order.date === todayString);
    let orderCountToday = todayOrders.length;
    $('#dash-orders-count').text(orderCountToday);

    // ---------- Revenue ----------
    let todayRevenue = todayOrders.reduce((sum, order) => sum + order.total, 0);
    $('#dash-revenue').text(`Rs. ${todayRevenue.toLocaleString()}`);

    // ---------- Recent Orders ----------
    let recentOrders = [...allOrders].reverse().slice(0, 5);
    let recentOrdersList = $('#dash-recent-orders-list');
    recentOrdersList.empty();

    if (recentOrders.length === 0) {
        recentOrdersList.append(`
            <div class="list-group-item text-center text-muted border-0 py-3">
                No orders yet.
            </div>
        `);
    } else {
        recentOrders.forEach(order => {
            let customer = getCustomerData().find(c => c.id === order.customerId);
            let customerName = customer ? customer.name : 'Unknown';

            recentOrdersList.append(`
                <div class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 py-3 border-bottom">
                    <div>
                        <h6 class="mb-0 fw-bold">${order.orderId}</h6>
                        <small class="text-muted">${customerName}</small>
                    </div>
                    <span class="fw-bold" style="color: #7A00CC;">Rs. ${order.total.toLocaleString()}</span>
                </div>
            `);
        });
    }
};

$(document).ready(function () {
    updateDashboard();

    $(".nav-btn[data-target='dashboard-section']").click(function() {
        updateDashboard();
    });
});

export const refreshDashboard = () => {
    updateDashboard();
};