var express = require('express');
var router = express.Router();

var app= express();

const indexCtrl= require('../controllers/index');

router.route('/users/login')
    .post(indexCtrl.login);

router.route("/users/:userid")
    .get(indexCtrl.getSingleUser);

module.exports=router;