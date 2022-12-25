const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    category:{
        type: String,
        require: true
    },
    image:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    price:{
        type:Number,
        required: true,
    },
    status:{
        type: Boolean,
        default: false,
    },
    booking:[
        {
          from: Date,
          to: Date,  
        },
    ]
});

module.exports = mongoose.model("Room", roomSchema);