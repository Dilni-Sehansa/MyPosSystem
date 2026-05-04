import { order_db } from '../db/db.js';

const addOrderData = (orderId, customerId, date, subTotal, discount, total, cart) => {
    let new_order = {
        orderId: orderId,
        customerId: customerId,
        date: date,
        subTotal: subTotal,
        discount: discount,
        total: total,
        cart: cart
    };
    order_db.push(new_order);
}

const getOrderData = () => {
    return order_db;
}

const generateOrderId = () => {
    if (order_db.length === 0) {
        return "O001";
    }
    let lastOrder = order_db[order_db.length - 1];
    let lastId = lastOrder.orderId;
    let number = parseInt(lastId.substring(1)) + 1;
    return "O" + number.toString().padStart(3, '0');
}

export { addOrderData, getOrderData, generateOrderId };
