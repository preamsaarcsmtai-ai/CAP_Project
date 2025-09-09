import jwt from 'jsonwebtoken';

exports.authGuard =(roles = [])=>{
    return ( req,res, next)=>{
        try {
            
            const token = req.headers["authorization"]?.split(" ")[1];
            if (!token) {
               return res.status(401).json({ message: "Access Denied. "});
            }

            //Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;

            //Roles based authentication
            if (roles.length && !roles.includes(req.user.role)) {
                res.status(403).json({ message: "Forbidden: You don't have an access."});
            }

            next();

        } catch (error) {
            res.status(401).json({ message: "Expired or Invalid Token"});
        }
    };
}