import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const verifyToken =async (req, res, next) => {
    try{
     let token = req.header("Authorization");

        if(!token) {
            return res.status(403).json({message: `No token provided ${token}`,});
        }
        if(token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    } catch(error) {
        res.status(500).json({error: error.message});
    }
}