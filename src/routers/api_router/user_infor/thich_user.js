const express = require('express');
const router = express.Router();
const UserInfoController = require('../../../controllers/user_infor_controller');
router.post('/', (req, res) => UserInfoController.thichUser(req,res));
module.exports = router;