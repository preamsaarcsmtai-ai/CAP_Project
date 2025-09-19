import jwt from "jsonwebtoken";

export const authGuard = (roles = []) => {
  return (request, h) => {
    try {
      const token = request.headers["authorization"]?.split(" ")[1];
      if (!token) {
        return h.response({ message: "Access Denied" }).code(401).takeover();
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);


      request.user = decoded;

      if (roles.length && !roles.includes(decoded.roles)) {
        return h
          .response({ message: "Forbidden: You don't have access." })
          .code(403)
          .takeover();
      }

      return h.continue; 
    } catch (error) {
      console.log("Invalid token or Expired:", error.message);
      return h
        .response({ message: "Invalid or expired token" })
        .code(401)
        .takeover();
    }
  };
};
