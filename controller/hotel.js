const Room = require('../models/room');
const Order = require('../models/order');

const User = require('../models/user');
const { json } = require('body-parser');

exports.getIndex = (req, res, next)=>{
Room.find({}, (err, rooms)=>{
    res.render('hotel/home',{rooms:rooms})
})
}

exports.getShowRoom = (req, res, next)=>{
    const roomId = req.params.id;
    Room.findById({_id:roomId}, (err, room)=>{
        // console.log(room);
        res.render('hotel/showRoom',{room:room});
    })
}

exports.getCart = (req, res, next) => {
    req.user
      .populate('cart.items.roomId')
      .execPopulate()
      .then(user => {
          
        const rooms = user.cart.items;
        // console.log(rooms);
        res.render('hotel/cart', {
          rooms: rooms,
         
        });
      })
      .catch(err => console.log(err));
  };

  exports.postCart = (req, res, next) => {
    const roomId = req.body.roomId;
    Room.findById(roomId)
      .then(room => {
        return req.user.addToCart(room);
      })
      .then(result => {
        console.log(result);
        req.flash('msg', 'room added successfully to your cart!!!')
        res.redirect('/cart');
      });
  };

  exports.postCartDeleteProduct = (req, res, next) => {
    const roomId = req.body.roomId;
    req.user
      .removeFromCart(roomId)
      .then(result => {
        req.flash('msg', 'room removed from your cart!!!')
        res.redirect('/cart');
      })
      .catch(err => console.log(err));
  };
 exports.getOrders = (req, res, next) => {
    Order.find({ 'user.userId': req.user._id })
      .then(orders => {
        res.render('hotel/order', {
          orders: orders,
        });
      })
      .catch(err => console.log(err));
  };

exports.postOrder = (req, res, next) => {

  console.log(req.body.to.toString());
  let book = {
    from : req.body.from,
    to: req.body.to
  }
  req.user
    .populate('cart.items.roomId')
    .execPopulate()
    .then(user => {
      let roos = user.cart.items;
      console.log(roos);
      roos.forEach(function(room){
        room.roomId.booking.push(book);
        room.roomId.save((err)=>{
          if(err){
            console.log(err);
          }
        })
      })
      const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
      console.log(oneDay);
       const firstDate = new Date(req.body.to);
       const secondDate = new Date(req.body.from) ;
       console.log(firstDate);
       console.log(secondDate);

      const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
          console.log(diffDays);
       let sum = 0;
      const rooms = user.cart.items.map(i => {
        sum = parseInt(sum) + parseInt(i.price);
        return { price: i.price, room: { ...i.roomId._doc } };
      });
      console.log(sum);
      const order = new Order({
        user: {
          email: req.user.email,
          userId: req.user
        },
        rooms:rooms,
        ammount : parseInt(diffDays) * parseInt(sum),
        days: diffDays,
      });
      console.log(parseInt(diffDays) * parseInt(sum));
      return order.save();
    })
    .then(result => {
      return req.user.clearCart();
    })
    .then(() => {
      req.flash('msg',"congratulations your room has been booked successfully!!!")
      res.redirect('/order');
    })
    .catch(err => console.log(err));
};