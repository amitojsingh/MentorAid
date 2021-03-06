var express = require('express');
var router = express.Router();
var ctrlbook = require('../controllers/book');

const indexCtrl= require('../controllers/index');
const stdrequestCtrl = require('../controllers/stdrequestCtrl');

router.route('/users/login')
    .post(indexCtrl.login);

router.route("/users/:userid")
    .get(indexCtrl.getCurrentUser);

router.route("/stdrequest")
    .get(stdrequestCtrl.getstdrequest)
    .post(stdrequestCtrl.createstdrequest);
router.route("/stdrequest/:stdrequestid")
    .get(stdrequestCtrl.getSinglestdrequest)
    .put(stdrequestCtrl.updatestdrequest);

router.route('/groups')
    .get(indexCtrl.getGroups);
router.route('/teachers')
    .get(indexCtrl.getTeachers);


router.get('/books', ctrlbook.getbooks);
router.post('/books', ctrlbook.createbook);
router.get('/books/:bookid', ctrlbook.getSinglebook);
router.put('/books/:bookid', ctrlbook.updatebook);
router.delete('/books/:bookid', ctrlbook.deletebook);
module.exports=router;
