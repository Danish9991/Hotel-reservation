const express= require('express');

const multer = require('multer');

const path = require('path');

const router = express.Router();

const adminController = require('../controller/admin');

const auth = require('../middleware/admin');
var Storage= multer.diskStorage({
    destination:"./public/uploads/",
    filename:(req,file,cb)=>{
      cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
    }
  });
  var upload = multer({
    storage:Storage
  }).single('file');

router.get('/addRoom',auth.adminauth,adminController.getAddRoom);

router.post('/addRoom',auth.adminauth,upload,adminController.postAddRoom);

router.get('/adminRooms',auth.adminauth,adminController.getAdminRooms);

router.get('/room/:roomId/edit', auth.adminauth, adminController.getEditRoom);

router.get('/room/delete/:roomId', auth.adminauth, adminController.getDeleteRoom);

module.exports = router;