const mongoose = require('mongoose'); //third party

const customer = mongoose.model('customer', { //users will be collection name
    
    firstname: {
        type: String,
        required:true
    },
    lastname: {
        type: String,
        required:true
    },
    username:{
        type : String,
        required : true
    },
    
    email: {
        type: String,
        required:true,
        unique:true
    },
    password: {
        type: String,
        required:true
    },
    
    
    address: {
        type: String,
        require: true
    },

    userType :{
        type : String,
        enum : ["Admin", "Customer",],
        default : 'Customer'
    }

   })

   

//const data = new User({name:"Ram", age:"18"});
//data.save();

module.exports = customer;