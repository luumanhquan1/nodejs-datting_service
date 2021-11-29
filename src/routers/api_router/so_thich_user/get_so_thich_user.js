const express = require('express');
const router=express.Router();
const ep=require('../ep_router');
router.post("/",(req,res)=>ep.exports.SoThichController.getSoThichUser(req,res));
module.exports=router;