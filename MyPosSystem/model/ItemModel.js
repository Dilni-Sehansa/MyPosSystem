import {customer_db, item_db} from '../db/db.js';

const addItemData = (iid, iname, icategory, isize, iqty, ireceivedPrice, iprice, iimage) => {
    item_db.push({ id: iid, name: iname, category: icategory, size: isize, qty: iqty, receivedPrice: ireceivedPrice, price: iprice, image: iimage });
}

const updateItemData = (iid, iname, icategory, isize, iqty, ireceivedPrice, iprice, iimage) => {
    let obj = item_db.find(item => item.id === iid);
    if (obj) {
        Object.assign(obj, { name: iname, category: icategory, size: isize, qty: iqty, receivedPrice: ireceivedPrice, price: iprice });
        if (iimage) obj.image = iimage;
    }
}

const deleteItemData = (iid) => {
    let index = item_db.findIndex(item => item.id === iid);
    if (index !== -1) item_db.splice(index, 1);
}

const getItemData = () => item_db;
const getItemDataByIndex = (index) => item_db[index];
const getItemDataById = (id) => item_db.find(item => item.id === id);

const generateItemId = () => {
    if (item_db.length === 0) return "I001";
    let lastId = item_db[item_db.length - 1].id;
    let number = parseInt(lastId.substring(1)) + 1;
    return "I" + number.toString().padStart(3, '0');
}

$(document).ready(function () {
    $('#item_id_input').val(generateItemId());
});


export { addItemData, updateItemData, deleteItemData, getItemData, getItemDataByIndex, getItemDataById, generateItemId};