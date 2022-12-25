const multer = require('multer');
const path = require('path');
const Room = require('../models/room');


exports.getAddRoom = (req, res, next)=>{
    res.render('admin/addRoom',{room:''});
}


  exports.postAddRoom =( req, res, next)=>{
      if(req.body.hid ===''){
        var imageFile=req.file.filename;
        var room = new Room({
            description: req.body.description,
            image: imageFile,
            category: req.body.category,
            price: req.body.price,
        });
        room.save(function(err, post){
            if(err){
                console.log(err);
            } else{
                console.log(post);
                req.flash('msg','room uploaded successfully')
                res.redirect("/");
            }   
        })
      } else{
        Room.findById({_id:req.body.hid},(err, room)=>{
            room.category = req.body.category;
            room.description = req.body.description;
            room.image = req.file.filename;
            room.price = req.body.price;
            room.save((err)=>{
                if(!err){
                    req.flash('msg','room updated successfully');
                    res.redirect('/');
                }
            })
        })

      }
    

  }
  exports.getAdminRooms = (req, res, next)=>{
      Room.find({}, (err, rooms)=>{
          res.render('admin/adminRooms',{rooms:rooms})
      })
  };

  exports.getEditRoom = (req, res, next)=>{
    const roomId = req.params.roomId;
      Room.find({_id:roomId}, (err, room)=>{
          console.log(room[0]);
          res.render('admin/addRoom', {room:room[0]})
      })
  }

  exports.getDeleteRoom = (req, res, next)=>{
      const roomId = req.params.roomId;
      Room.findByIdAndRemove({_id:roomId}, (err, room)=>{
          req.flash("msg","room deleted successfully");
          res.redirect("/");
      })
  }
