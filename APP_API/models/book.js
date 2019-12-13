const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    image:{
        type:String,
        required:true
    },
    summary:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    }
});

mongoose.model('book', bookSchema);

