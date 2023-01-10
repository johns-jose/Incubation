const mongoose = require("mongoose") ;

const applicationForm = mongoose.Schema({
    fname:{type:String,
    required:[true,'First name is requires']},

    email:{type:String,
    required:[true,'Email  is requires']},

    streetAddress:{type:String,
    required:[true,'StreetAddress  is requires']},

    city:{type:String,
    required:[true,'City  is requires']},

    state:{type:String,
    required:[true,'State  is requires']},

    pin:{type:String,
    required:[true,'Pincode  is requires']},
    
    country:{type:String,
    required:[true,'Country is requires']},

    // Incubation: {
    //     type: String,
    //     required: true},

    status: {
            type: String,
            default:'pending', 
            required: true,}

        
})

const appmodel = mongoose.model('applocationInfo',applicationForm)
module.exports = appmodel