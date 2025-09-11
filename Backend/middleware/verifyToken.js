// import jwt from "jsonwebtoken";

// export const verifyToken = async (request, h) => {
//   try {
//     const token = request.headers.authorization?.split(" ")[1];
//     if (!token) {
//       return h.response({ message: "No token provided" }).code(401).takeover();
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     request.auth = { credentials: decoded };

//     return h.continue;
//   } catch (err) {
//     console.error("JWT verification error:", err.message);
//     return h.response({ message: "Unauthorized" }).code(401).takeover();
//   }
// };
