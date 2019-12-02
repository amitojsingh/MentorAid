const mongoose = require('mongoose');
const stdrequest = mongoose.model('stdRequest');

const getstdrequest =function (req,res) {


    stdrequest.find().exec(function (err,stdrequestdata) {
        if(err){
            res
                .status(404)
                .json(err);
            return;
        }
        res
            .status(200)
            .json(stdrequestdata)

    });

};

const createstdrequest =function (req,res) {
    stdrequest.create({
        uid: req.body.uid,
        tid: req.body.tid,
        problem:req.body.problem,
        subject:req.body.subject,
        count:req.body.count,

    }, (err,stdrequestdata) => {
        if(err){
            res
                .status(400)
                .json(err);
        }
        else{
            res
                .status(201)
                .json(stdrequestdata);
        }
    });


};

const getSinglestdrequest =function (req,res) {
    stdrequest
        .findById(req.params.stdrequestid)
        .exec((err, stdrequest) => {
            if (!stdrequest) {
                return res
                    .status(404)
                    .json({
                        "message": "stdrequest not found"
                    });
            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            }
            res
                .status(200)
                .json(stdrequest);
        });

};

const updatestdrequest =function (req,res) {
    if(!req.params.stdrequestid){
        res
            .status(404)
            .json({
                "message": "Not Found, stdrequestid is required"
            });
        return;
    }

    stdrequest.findById(req.params.stdrequestid)
        .exec((err, stdrequestdata) => {
            if(!stdrequestdata){
                res
                    .json(404)
                    .status({
                        "message": "stdrequestid not found"
                    });
                return;
            }
            else if(err){
                res
                    .status(404)
                    .json(err);
                return;
            }
            stdrequestdata.uid = req.body.uid;
            stdrequestdata.tid = req.body.tid;
            stdrequestdata.count=req.body.count;
            stdrequestdata.problem=req.body.problem;
            stdrequestdata.subject=req.body.subject;
            stdrequestdata.requestStatus=req.body.requestStatus;
            stdrequestdata.date=req.body.date;

            stdrequestdata.save((err, stdrequestdata) => {

                if(err){
                    res
                        .status(404)
                        .json(err);
                }
                else{
                    res
                        .status(200)
                        .json(stdrequestdata);
                }
            });

        });

};

/*
const deletestdrequest = function (req,res) {
    const stdrequestid = req.params.stdrequestid;

    if(stdrequestid){
        stdrequest
            .findByIdAndRemove(stdrequestid)
            .exec((err,stdrequestdata) => {
                if(err){
                    res
                        .status(404)
                        .json(err);
                }

                res
                    .status(204)
                    .json(null);
            });
    }

    else
    {
        res
            .status(404)
            .json({"message" : "No stdrequestid"});
    }

};
*/


module.exports={
    getstdrequest,
    createstdrequest,
    getSinglestdrequest,
    updatestdrequest
}