const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    cartItems: Array, 
    amount: { type: String, required: true },
    status: { type: String, default: 'pending' },
    createdAt: { type: Date, default: Date.now }
});

const orderModel = mongoose.model('Order', orderSchema);
module.exports = orderModel;
