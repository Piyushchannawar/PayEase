import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({ message: "Authorization token missing or invalid" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.userId) {
            req.userId = decoded.userId;
            next();
        } else {
            return res.status(403).json({ message: "Invalid token payload" });
        }
    } catch (err) {
        return res.status(403).json({ message: "Token verification failed" });
    }
};

export default authMiddleware;
