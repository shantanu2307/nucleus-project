const express = require('express');
const Room = require('../models/Room');
const User = require('../models/Users');
const Order = require('../models/Order');
const Restaurant = require('../models/Restaurant');
const router = new express.Router();
const firebase = require('../middlewares/firebase');

router.get('/roomservice', async (req, res) => {
  try {
    const user = await User.findOne({
      uid: req.query.uid
    });
    const restaurant = await Restaurant.findOne({
      name: req.query.restaurant_name
    });
    const room = await Room.findOne({
      number: req.query.roomnumber
    });
    const orders = await Order.find({
      user_id: user._id,
      restaurant_id: restaurant._id,
      room_no: room._id,
      order_type: 'Room Service'
    });
    res.send(orders);
  } catch (error) {
    res.send(error);
  }
});

router.get('/selfservice', async (req, res) => {
  try {
    const user = await User.findOne({
      uid: req.query.uid
    });
    const restaurant = await Restaurant.findOne({
      name: req.query.restaurant_name
    });
    const orders = await Order.find({
      user_id: user._id,
      restaurant_id: restaurant._id,
      order_type: 'Restaurant Table Self Help'
    });
    res.send(orders);
  } catch (error) {
    res.send(error);
  }
});