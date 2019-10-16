var express = require('express');
var router = express.Router();
var LdapAuth= require('ldapauth-fork');
var basicAuth = require('basic-auth');
let constants = require('../CONSTANT');
let student;
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
      res.send({success: true, message: 'authentication successfull'});
    }
  });
});
module.exports = router;