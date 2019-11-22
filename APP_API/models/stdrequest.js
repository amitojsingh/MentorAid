const mongoose = require('mongoose');

const stdRequestSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true
    },
    tid: {
        type: String,
        required: true
    },
    problem:{
        type: String,
        required:true
    },
    subject:{
        type: String,
        required:true
    },
    count:{
        type: String,
        required:true
    }
});
const tResponseSchema=new mongoose.Schema({

    studentRequest: [stdRequestSchema],
    status:{
        type: String,
        required: true
    },
    room:{
        type: String,
        required: true
    }
});

mongoose.model('stdRequest', stdRequestSchema);
mongoose.model('tResponse',tResponseSchema)

