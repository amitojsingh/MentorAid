const mongoose = require('mongoose');
const tResponse = mongoose.model('tResponse');

const gettResponse =function (req,res) {


    tResponse.find().exec(function (err,tResponsedata) {
        if(err){
            res
                .status(404)
                .json(err);
            return;
        }
        res
            .status(200)
            .json(tResponsedata)

    });

};

const createtResponse =function (req,res) {
    tResponse.create({
        uid: req.body.uid,
        tid: req.body.tid,
        problem:req.body.problem,
        subject:req.body.subject,
        count:req.body.count

    }, (err,tResponsedata) => {
        if(err){
            res
                .status(400)
                .json(err);
        }
        else{
            res
                .status(201)
                .json(tResponsedata);
        }
    });


};

const getSingletResponse =function (req,res) {
    tResponse
        .findById(req.params.tResponseid)
        .exec((err, tResponse) => {
            if (!tResponse) {
                return res
                    .status(404)
                    .json({
                        "message": "tResponse not found"
                    });
            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            }
            res
                .status(200)
                .json(tResponse);
        });

};

/*const updatetResponse =function (req,res) {
    if(!req.params.tResponseid){
        res
            .status(404)
            .json({
                "message": "Not Found, tResponseid is required"
            });
        return;
    }

    tResponse.findById(req.params.tResponseid)
        .exec((err, tResponsedata) => {
            if(!tResponsedata){
                res
                    .json(404)
                    .status({
                        "message": "tResponseid not found"
                    });
                return;
            }
            else if(err){
                res
                    .status(404)
                    .json(err);
                return;
            }
            tResponsedata.name = req.body.name;
            tResponsedata.type = req.body.type;
            tResponsedata.image=req.body.image;
            tResponsedata.summary=req.body.summary;
            tResponsedata.price=req.body.price;
            tResponsedata.save((err, tResponsedata) => {

                if(err){
                    res
                        .status(404)
                        .json(err);
                }
                else{
                    res
                        .status(200)
                        .json(tResponsedata);
                }
            });

        });

};


const deletetResponse = function (req,res) {
    const tResponseid = req.params.tResponseid;

    if(tResponseid){
        tResponse
            .findByIdAndRemove(tResponseid)
            .exec((err,tResponsedata) => {
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
            .json({"message" : "No tResponseid"});
    }

};
*/


module.exports={
    gettResponse,
    createtResponse,
    getSingletResponse
}