const express = require('express');
const router=express.Router();
const ep=require('../ep_router');
router.get("/",(req,res)=>ep.exports.SoThichController.getAllSoThich(req,res));
module.exports=router;