const express = require('express');
const router=express.Router();
const  controller=require('../../../controllers/user_infor_controller');
router.get('/',(req,res)=>controller.getListUser(req,res));
module.exports=router;