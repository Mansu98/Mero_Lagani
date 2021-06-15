const mongoose = require("mongoose");
const apiSchema = mongoose.Schema({
    Title:{
        type:String,
        required:true,
        trim:true
    },
    Date:{
        type:String,
        required:true,
        trim:true
    },
    Detail:{
        type:String,
        required:true,
        trim:true
    }
})
const apinews = new mongoose.model("MeroLagani", apiSchema);
module.exports = apinews;