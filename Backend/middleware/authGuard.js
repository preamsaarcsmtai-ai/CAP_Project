import jwt from 'jsonwebtoken';

export const authGuard =(roles = [])=>{
    return ( request, h)=>{
        try {
            
            const token = request.headers["authorization"]?.split(" ")[1];
            if (!token) {
               return h.response({ message:"Access Denied"}).code(401).takeover();
            }

            //Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;

            //Roles based authentication
            if (roles.length && !roles.includes(req.user.role)) {
                return h.response({ message: "Forbidden: You don't have access." }).code(403).takeover();
            }

            h.continue();

        } catch (error) {
            console.log("Invalid token or Expired:", error.message);
      return h
        .response({ message: "Invalid or expired token" })
        .code(401)
        .takeover();
        }
    };
}