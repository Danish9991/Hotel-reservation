const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  rooms: [
    {
      room: { type: Object, required: true },
      price: { type: Number, required: true }
    }
  ],
  user: {
    email: {
      type: String,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  },
 ammount : Number,
 days: Number
});

module.exports = mongoose.model('Order', orderSchema)