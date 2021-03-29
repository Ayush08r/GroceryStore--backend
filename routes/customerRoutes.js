const express = require('express'); //third party
const router = express.Router();
const customer = require('../model/customer')
const { check, validationResult } = require('express-validator')
const bcryptjs = require('bcryptjs')
const customerauthentication = require('../middleware/customerauthentication');
const { JsonWebTokenError } = require('jsonwebtoken');
const jwt = require('jsonwebtoken');

router.post('/register', [
    check('firstname', "firstname is required!").not().isEmpty(),
    check('lastname', "lastname is required!").not().isEmpty(),
    check('username', "username is required!").not().isEmpty(),
    check('email', "email is required!").not().isEmpty(),
    check('password', "password is required!").not().isEmpty(),
    check('address', "address is required!").not().isEmpty()
], function (req, res) {
    const errors = validationResult(req);
    //check if the email exists
    if (errors.isEmpty()) {
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const address = req.body.address;
        const userType = req.body.userType;

        bcryptjs.hash(password, 10, function (err, hash) {
            //save password in hash and inside form
            const data = new customer({ firstname: firstname, lastname: lastname, username: username, email: email, password: hash, address: address });
            data.save()
                .then(function (result) {
                    //success
                    if (result) {
                        res.status(201).json({
                            success: true,
                            message: "Successfully Registered!!"
                        })
                    }
                })

                .catch(function (err) {
                    // console.log(err);
                    res.status(500).json({
                        message: "something went wrong",
                        success: false
                    })

                })
            // res.send("Registered Successful!!!")
        })


    } else {
        //in what case?
        res.status(400).json({ errors: errors.array(), success: false })
    }

})

//login route for profile

router.post('/login', function (req, res) {

    customer.findOne({ username: req.body.username })
        .then(function (customerData) {

            if (customerData == null) {
                return res.status(401).json({ message: "Authentication Failed!!" })
            }

            bcryptjs.compare(req.body.password, customerData.password, function (err, cresult) {

                //if (err)
                //if (cresult===false)
                //{

                //  return res.status(401).json({message : "Password Fail!!"})
                //}
                if (cresult === true && !err) {
                    const token = jwt.sign({ uid: customerData._id }, 'secretkey');
                    res.status(200).json({token: token,success:true,data:customerData });
                } else {
                    res.status(400).send({success:false});
                }

                // console.log("hello world")

                //res.send("correct email and password")

                //token

                //console.log(token)

            })

        })
        .catch

})




module.exports = router;
