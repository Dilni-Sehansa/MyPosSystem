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

    updateDashboard();
    window.updateDashboardStats = updateDashboard;
});
