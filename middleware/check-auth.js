const jwt = require('jsonwebtoken');

function checkAuth(req, res,next){
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decodeToken = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decodeToken;
        next();
    } catch(err){        
        return res.status(401).json({
            "message" : 'Invalid or Expired token !!',
            "error": err
        })
    }
}

module.exports = {
    checkAuth: checkAuth
}