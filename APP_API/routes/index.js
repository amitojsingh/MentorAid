var express = require('express');
var router = express.Router();


const indexCtrl= require('../controllers/index');
const stdrequestCtrl = require('../controllers/stdrequestCtrl');
const tresponseCtrl = require('../controllers/tresponseCtrl')

router.route('/users/login')
    .post(indexCtrl.login);

router.route("/users/:userid")
    .get(indexCtrl.getCurrentUser);

router.route("/stdrequest")
    .get(stdrequestCtrl.getstdrequest)
    .post(stdrequestCtrl.createstdrequest);

module.exports=router;
