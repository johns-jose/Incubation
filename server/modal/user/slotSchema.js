
const mongoose= require('mongoose');
var slotschema =mongoose.Schema({
companyName:String,
occupied:{type:Boolean,default:false},
slotName:String
});
var slotone =mongoose.model("slot",slotschema)
module.exports=slotone  