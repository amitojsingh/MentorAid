var LdapAuth = require('ldapauth-fork');
const fs = require('fs');
const jwt = require('jsonwebtoken');
let constants = require('../../CONSTANT');
var Ldapjs= require('ldapjs');
var client= Ldapjs.createClient({
    url: constants.URL
})
var privateKEY = fs.readFileSync(process.cwd() + '/.key/private.key', 'utf8');
var publicKEY =  fs.readFileSync(process.cwd() + '/.key/public.key', 'utf8');

var i = 'MentorAid';
var a = 'http://localhost:3000';
const config={
    url: constants.URL,
    base: constants.BINDDN,
    dn:'cn=root',
    password:constants.CREDENTIALS,
};

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
            return res.status(400).json(err)       
        } else if (!user.uid) {
            console.log("user not found Error");
            res.status(400).json('user not found');
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
function verifyToken(req,res,next)
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
const getCurrentUser= (req, response) => {
    let uid = req.params.userid;
    console.log(req.params.userid);
    var opts= {
        filters : `(uid=${uid})`,
     attributes: ['sn', 'givenName', 'cn', 'displayName', 'uidNumber', 'gidNumber']
}
    client.search(`uid=${uid},ou=student,dc=hazur,dc=org`, opts, function(err, res) {

        res.on('searchEntry', function(entry) {
             let userObject =JSON.stringify(entry.object);
             response.status(200).json(entry.object);
        });
        res.on('searchReference', function(referral) {
            console.log('referral: ' + referral.uris.join());
        });
        res.on('error', function(err) {
            response.status(404).json(err.message)
        });
        res.on('end', function(result) {
            console.log('status: ' + result.status);
        });
    });
}


module.exports ={ login,getCurrentUser}