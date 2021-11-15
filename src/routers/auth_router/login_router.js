const express = require('express');
const router=express.Router();
const export_controller=require('../export_router_controller');

router.post("/",(req,res)=>export_controller.LoginControler.login(req,res));

module.exports= router;