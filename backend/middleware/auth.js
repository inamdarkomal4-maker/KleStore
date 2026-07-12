const jwt = require('jsonwebtoken');

const protectAuth = async(req, res,next)=>{
    try{
         const authHeader = req.headers.authorization;

         if(!authHeader){
            return res.status(401).json({
                message:"no token.please login first"
            })
         }
         const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Token is missing"
            });
}

        const decoded = jwt.verify(token, process.env.SECRET_KEY);


         //attach decoded data to req so controller can use it
         req.user = decoded;
         next();
    }catch(error){
        return res.status(500).json({
            message:"Server error",
            error:error.message
        })
    }
}

module.exports = {protectAuth};