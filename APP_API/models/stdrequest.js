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
    },
    requestStatus:{
        type: Boolean
    },
    date:{
        type: Date
    }
});


mongoose.model('stdRequest', stdRequestSchema);

