var express = require('express');
var router = express.Router();


const indexCtrl= require('../controllers/index');

router.route('/users/login')
    .post(indexCtrl.login);

router.route("/users/:userid")
    .get(indexCtrl.getCurrentUser);
module.exports=router;
