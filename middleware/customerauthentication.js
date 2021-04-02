const jwt = require('jsonwebtoken')
const user = require('../model/customer');

module.exports.verifyUser = function (req, res, next) {

    try {
        const token = req.headers.authorization.split(" ")[1];
        const data = jwt.verify(token, 'secret key');
        console.log(data);
        user.findOne({ _id: data.uid })
            .then(function (result) {
                //success


                req.user = result;
                res.status(200).json({ message: "auth success!!" })
                next();
            })
            .catch(function (result) {
                //invalid
                res.status(403).json({ error: "Auth failed" });
            })

    }
    catch (e) {
        res.status(403).json({ error: e })
    }
}


module.exports.verifyAdmin = function (req, res, next) {
    if (!req.user) {
        return res.status(401).json({ message: "unauthorized1111" });
    }

    else if (req.user.userType !== "Admin") {

        return res.status(401).json({ message: "unauthorized" });


    }
    next();
}
