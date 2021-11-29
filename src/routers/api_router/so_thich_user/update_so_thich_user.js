const express = require('express');
const router=express.Router();
const soThichController=require('../../../controllers/so_thich_controller');
router.post('/',(req,res)=>soThichController.updateSoThichController(req,res));
module.exports=router