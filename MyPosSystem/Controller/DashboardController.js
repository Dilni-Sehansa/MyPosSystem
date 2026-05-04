import { getCustomerData } from '../model/CustomerModel.js';
import { getItemData } from '../model/ItemModel.js';
import { getOrderData } from '../model/OrderModel.js';

$(document).ready(function() {
    function updateDashboard() {
        let customers = getCustomerData().length;
        let items = getItemData().length;
        let orders = getOrderData().length;

        $('#dash-customers-count').text(customers);
        $('#dash-items-count').text(items);
        $('#dash-orders-count').text(orders);
    }

    $('.nav-btn[data-target="dashboard-section"]').on('click', function() {
        updateDashboard();
    });

    let orders = getOrderData();

    let income = orders.reduce((sum, o) => sum + (o.total || 0), 0);

    $('#dash-income').text("Rs. " + income.toFixed(2));

    updateDashboard();
    window.updateDashboardStats = updateDashboard;
});
