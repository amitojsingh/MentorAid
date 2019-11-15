var LdapAuth = require('ldapauth-fork');
const fs = require('fs');
const jwt = require('jsonwebtoken');
let constants = require('../../CONSTANT');
var privateKEY = fs.readFileSync(process.cwd() + '/.key/private.key', 'utf8');
var publicKEY = fs.readFileSync(process.cwd() + '/.key/public.key', 'utf8');

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


const login= (req,res)=>{
    if(!req.body.username|| !req.body.password){
        return res.status(400).json({message:'All fields are required'})
    }
    else{
    ldap.authenticate(req.body.username, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            res.send({
                success: false,
                message: 'authentication failed'
            });
        } else if (!user.uid) {
            console.log("user not found Error");
            res.send({
                success: false,
                message: 'user not found authentication failed'
            });
        } else if (user.uid) {
            console.log("success : user " + user.uid + " found ");
            var payload = {
                id: user.uid
            };
            var s = user.uid;
            var signOptions = {
                issuer: i,
                subject: s,
                audience: a,
                expiresIn: "12h",
                algorithm: "RS256"
            };
            var token = jwt.sign(payload, privateKEY, signOptions);
            var id = user.uid;

            res.status(200).json({ token,id});
        }
    });
    
}
}
const getSingleUser=(req,res)=>{

}
module.exports ={ login,getSingleUser};