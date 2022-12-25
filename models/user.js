const mongoose = require('mongoose'), Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true,
    },
    password:{
        type: String,
        require: true,
    },
    cart:{
        items:[ 
            {
           roomId:{
               type: Schema.Types.ObjectId,
               ref: 'Room',
               required: true
           },
           price:{
               type: Number,
               required: true,
           } 
        } 
    ]
    },
    amount: Number,
});
userSchema.methods.addToCart = function(room) {
    
    
    const updatedCartItems = [...this.cart.items];
  
   
      updatedCartItems.push({
        roomId: room._id,
        price: room.price
      });
   
    const updatedCart = {
      items: updatedCartItems
    };
    this.cart = updatedCart;
    return this.save();
  };

  userSchema.methods.removeFromCart = function(roomId) {
    const updatedCartItems = this.cart.items.filter(item => {
      return item.roomId.toString() !== roomId.toString();
    });
    this.cart.items = updatedCartItems;
    return this.save();
  };

  userSchema.methods.clearCart = function() {
    this.cart = { items: [] };
    return this.save();
  };

module.exports = mongoose.model("User", userSchema);