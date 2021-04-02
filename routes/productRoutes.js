
const express = require("express");
const product = require("../model/product");
const router = express.Router();
const customerauthentication = require("../middleware/customerauthentication")
const photoupload = require("../middleware/photoupload")


router.post("/product/insert", function (req, res) {
    // authenticate_cus.verifyUser, authenticate_cus.verifyAdmin, 
    // console.log(req.file);

    const Product_Name = req.body.Product_Name;
    const Product_Id = req.body.Product_Id;
    const Product_Number = req.body.Product_Number;
    
    const data = new product({ Product_Name: Product_Name, Product_Id: Product_Id, Product_Number: Product_Number});
    data.save()
        .then(function (result) {
          
        })

        .catch(function (e) {
            res.status(500).json({ message: e , success:false})

        })

})

router.get("/product/fetch", function (req, res) {
    product.find().then(function (productdata) {
        res.status(200).json({data:productdata,success:true});
        console.log(productdata);

    })

})

router.get("/product/user/:id", function (req, res) {
    const id = req.params.id;
    product.findById({_id:id}).then(function (productdata) {
        
        res.status(200).json({
           success:true,
           data:productdata
            
        })
    })
        .catch(function (e) {
            res.status(500).json({
                error: e
            })
        });

})







//for delete

router.delete("/product/delete/:id", function (req, res) {
    // authenticate_cus.verifyAdmin, authenticate_cus.verifyUser, 
    const id = req.params.id;
    product.deleteOne({ _id: id })


        .then(function (result) {
            res.status(201).json({ message: "deleted" })
        })

        .catch(function (e) {
            res.status(500).json({ message: e })


        });

})




//     res.status(200).json({message : err})

//     .catch(function(){

// res.status(200).json({message : err})
//     })





router.put("/product/update/:id", function (req, res) {
    const id = req.params.id;
    const Product_Name = req.body.Product_Name
    const Product_Number = req.body.Product_Number
    const Product_Id = req.body.Product_Id
    product.updateOne({ _id: id }, { Product_Name: Product_Name, Product_Id: Product_Id, Product_Number: Product_Number }).then(function () {
        res.send("updated")
    })


})



module.exports = router;