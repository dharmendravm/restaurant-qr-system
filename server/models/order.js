import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    productName : {
        type : String
    },
});

const Order = mongoose.model('Order', orderSchema);
export default Order;