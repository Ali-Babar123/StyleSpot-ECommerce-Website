const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Cart schema
const CartSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // Reference the 'User' model
        required: true
    },
    products: [
        {
            // productId: {
            //     type: mongoose.Schema.Types.ObjectId,
            //     ref: 'product', // Assuming you have a Product model
            //     required: true
            // },
            title: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            price: {
                type: Number,
                required: true
            }
        }
    ],
    shippingAddress: {
        country: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        }
    },
    subtotal: {
        type: Number,
        required: true
    },
    shippingFee: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Create and export the Cart model
const Cart = mongoose.model('cart', CartSchema);
module.exports = Cart;
