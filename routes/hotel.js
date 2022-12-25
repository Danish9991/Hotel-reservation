const express = require('express');

const router = express.Router();

const hotelController = require('../controller/hotel');

const auth = require('../middleware/auth');

//index route
router.get("/",hotelController.getIndex);

//getCart
router.get('/cart',auth.authenticate,hotelController.getCart);

//postCart
router.post('/cart',auth.authenticate,hotelController.postCart);

//getOrder
router.get('/order',auth.authenticate,hotelController.getOrders);

//showRoom
router.get('/showRoom/:id',auth.authenticate,hotelController.getShowRoom);

//deleteFromCart
router.post('/cart-delete-item',auth.authenticate, hotelController.postCartDeleteProduct);

router.post('/order',auth.authenticate, hotelController.postOrder);

module.exports = router;