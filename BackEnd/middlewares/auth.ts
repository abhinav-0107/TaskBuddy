import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const SECRET : string = "S3CR3T";


export function authenticateJwt(req : Request, res : Response , next : NextFunction) {
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token : string = authHeader.split(' ')[1];
        jwt.verify(token , SECRET , (err, user) => {
            if(err){
                return res.sendStatus(403);
            }
            if(user === undefined){
                return res.sendStatus(403);
            }
            if(typeof user === "string"){
                return res.sendStatus(403);
            }

            req.headers["userId"] = user._id;

            next();
        })
    }
    else{
        res.status(404).json({ message : "Invalid user, Authentication failed!"});
    }
}