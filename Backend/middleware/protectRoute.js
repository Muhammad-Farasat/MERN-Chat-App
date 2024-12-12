import jwt from 'jsonwebtoken';
import User from '../model/user.model.js';

const protectRoute = async (req, res, next) => {
  try {
      const authHeader = req.header('Authorization');

      if (!authHeader) {
          return res.status(401).json({ error: "Token not provided" });
      }

      const token = authHeader.split(" ")[1];

      if (!token) {
          return res.status(401).json({ error: "Token missing from header" });
      }

      const data = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
      
      req.user = data;

      next();
  } catch (error) {
      console.error("Invalid Token Error:", error.message);
      res.status(403).json({ error: "Invalid or expired token" });
  }
};


export default protectRoute;
