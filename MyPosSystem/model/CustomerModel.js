import { customer_db } from '../db/db.js';

const addCustomerData = (cid, cname, cphone, cemail, caddress) => {
    let new_customer = {
        id: cid,
        name: cname,
        phone: cphone,
        email: cemail,
        address: caddress
    };
    customer_db.push(new_customer);
}

const updateCustomerData = (cid, cname, cphone, cemail, caddress) => {
    let obj = customer_db.find(item => item.id === cid);
    if (obj) {
        obj.name = cname;
        obj.phone = cphone;
        obj.email = cemail;
        obj.address = caddress;
    }
}

const deleteCustomerData = (cid) => {
    let index = customer_db.findIndex(item => item.id === cid);
    if (index !== -1) {
        customer_db.splice(index, 1);
    }
}

const getCustomerData = () => {
    return customer_db;
}

const getCustomerDataByIndex = (index) => {
    return customer_db[index];
}

const getCustomerDataById = (id) => {
    return customer_db.find(item => item.id === id);
}

export { addCustomerData, updateCustomerData, deleteCustomerData, getCustomerData, getCustomerDataByIndex, getCustomerDataById };