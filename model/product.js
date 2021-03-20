const mongoose = require("mongoose")//third
const product = mongoose.model("product",{
    Product_Name :{
        type :String
    },
     Product_Id: {
        type : String
    },
    Product_Number: {
        type : String
    },
    Product_Image :{
    type : String
    }
    

})
module.exports = product;