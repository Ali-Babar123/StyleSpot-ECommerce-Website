const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');

// Route 01: Get all the carts using GET "/api/carts/fetchallcarts"
router.get('/fetchallcarts', fetchuser, async (req, res) => {
    try {
        const carts = await Cart.find({ user: req.user.id });
        res.json(carts);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


// Route 02: Add a new cart using POST "/api/carts/addcart"
router.post('/addcart', fetchuser, [
    // Add validation as needed for different fields
    body('products.*.productId', 'Product ID is required').notEmpty(),
    body('products.*.title', 'Product title is required').notEmpty(),
    body('products.*.quantity', 'Quantity is required').isInt({ gt: 0 }),
    body('products.*.price', 'Price is required').isFloat({ gt: 0 }),
    body('shippingAddress.firstName', 'First name is required').isLength({ min: 1 }),
    body('shippingAddress.lastName', 'Last name is required').isLength({ min: 1 }),
    body('shippingAddress.address', 'Address is required').isLength({ min: 1 }),
    body('shippingAddress.city', 'City is required').isLength({ min: 1 }),
    body('shippingAddress.postalCode', 'Postal code is required').isLength({ min: 1 }),
    body('shippingAddress.phone', 'Phone number is required').isLength({ min: 1 }),
    body('shippingAddress.country', 'Country is required').notEmpty(),
], async (req, res) => {
    try {
        // If there are validation errors, return bad request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { userId, products, shippingAddress, subtotal, shippingFee, total} = req.body;

        // Create a new cart object
        const cart = new Cart({
            user: req.user.id, // assuming req.user.id contains the logged-in user's ID
            userId,
            products,
            shippingAddress,
            subtotal,
            shippingFee,
            total
        });

        const savedCart = await cart.save(); // Save the cart to the database
        res.json(savedCart); // Return the saved cart as a response
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route 03: Updating an exiting cart using Put "/api/carts/updatecart" Login required
router.put('/updatecart/:id', fetchuser, async (req, res) => {
    try {
    const {products, shippingAddress, subtotal, shippingFee, total} = req.body;
   // Create a newCart or product object
   const newCart = {};
   if(products){newCart.products = products};
   if(shippingAddress){newCart.shippingAddress = shippingAddress};
   if(subtotal){newCart.subtotal = subtotal};
   if(shippingFee){newCart.shippingFee = shippingFee};
   if(total){newCart.total = total}
    
   // Find the cart to be update and update it
   let cart = await Cart.findById(req.params.id);
   if(!cart){
    return res.status(404).send('Cart Not Found')}


    // Check is this cart related to that user
    if (cart.user.toString() !== req.user.id){
        return res.status(401).send('Not Allowed');
    }

    // Update the cart with new cart/data
    cart = await Cart.findByIdAndUpdate(req.params.id, {$set: newCart}, {new:true})
    res.json(cart)
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
}
})


// Route 04: Deleting a cart using Delete "/api/carts/deletecart" Login required
router.delete('/deletecart/:id', fetchuser, async (req, res) => {
    try {


   // Find the cart to be delete and delete it
   let cart = await Cart.findById(req.params.id);
   if(!cart){
    return res.status(404).send('Cart Not Found')}


    // Allow deletion only if user owns this cart
    if (cart.user.toString() !== req.user.id){
        return res.status(401).send('Not Allowed');
    }

    // Update the cart with new cart/data
    cart = await Cart.findByIdAndDelete(req.params.id)
    res.json("Success: Your Cart has been deleted!")
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
}
})

module.exports = router;
