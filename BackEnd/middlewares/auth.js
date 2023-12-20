const jwt = require("jsonwebtoken");
const SECRET = "S3CR3T";

function authenticateJwt(req,res,next) {
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(' ')[1];
        jwt.verify(token , SECRET , (err, user) => {
            if(err) throw err;
            req.userId = user._id;
            next();
        })
    }
    else{
        res.status(404).json({ message : "Invalid user, Authentication failed!"});
    }
}

module.exports = {
    authenticateJwt,
    SECRET
}