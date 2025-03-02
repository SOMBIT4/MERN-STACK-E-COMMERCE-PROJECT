const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    productDetails: {
        type: Array,
        default: []
    },
    email: {
        type: String,
        default: ""
    },
    userId: {
        type: String,
        default: ""
    },
    totalAmount: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ["pending", "shipped", "delivered"],
        default: "pending"
    },
    receivedStatus: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const orderModel = mongoose.model('order-items', orderSchema);

module.exports = orderModel;
