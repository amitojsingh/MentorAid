var express = require('express');
var router = express.Router();
var LdapAuth= require('ldapauth-fork');
var basicAuth = require('basic-auth');
let constants = require('../CONSTANT');
const fs = require('fs');
const jwt = require('jsonwebtoken');
var privateKEY = fs.readFileSync(process.cwd()+'/.key/private.key', 'utf8');
var publicKEY = fs.readFileSync(process.cwd()+'/.key/public.key', 'utf8');

var i = 'MentorAid';
var a = 'http://localhost:3000';
var ldap = new LdapAuth({
  url: constants.URL,
  bindDN: constants.BINDDN,
  bindCredentials: constants.CREDENTIALS,
  searchBase: 'ou=student,dc=hazur,dc=org',
  searchFilter: '(uid={{username}})',
  reconnect: true
  
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/submit',(req,res,next)=>{
  ldap.authenticate(req.body.username, req.body.password, function (err, user) {
    if (err) {
      console.log(err);
      res.send({ success: false, message: 'authentication failed' });
    } else if (!user.uid) {
      console.log("user not found Error");
      res.send({ success: false, message: 'authentication failed' });
    } else if (user.uid) {
      console.log("success : user " + user.uid+ " found ");
      var payload ={id: user.uid};
      var s=user.uid;
      var signOptions={
        issuer: i,
        subject: s,
        audience: a,
        expiresIn: "12h",
        algorithm: "RS256"
      };``
      var token = jwt.sign(payload,privateKEY,signOptions);
      res.render('success',{title: user.uid,
      token: token});
      //res.send({success: true, message: 'authentication successfull',name: user.gn,token: token});
    }
  });
});
module.exports = router;
