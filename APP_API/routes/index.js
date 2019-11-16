var express = require('express');
var router = express.Router();
var publicKEY = fs.readFileSync(process.cwd() + '/.key/public.key', 'utf8');
const fs = require('fs');
const jwt = require('jsonwebtoken');

var app= express();

const indexCtrl= require('../controllers/index');

router.route('/users/login')
    .post(indexCtrl.login);

router.route("/users/:userid")
    .get(indexCtrl.getCurrentUser,verifyToken);
module.exports=router;

const verifyToken=(req,res,next)
{
    if (!req.headers.authorization) {
        return res.status(401).send('unauthorized request')
    } else {
        let token = req.headers.authorization.split(' '[1])
        if (token === "null") {
            return res.status(401).send('unauthorized request')
        }
        let payload = jwt.verify(token, publicKEY)
        if (!payload) {
            return res.status(401).send('unauthorized request')
        }
        req.id = payload.subject
        next()
    }
}