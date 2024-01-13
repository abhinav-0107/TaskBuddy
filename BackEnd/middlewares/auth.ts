import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import {z} from "zod";

export const SECRET : string = "S3CR3T";

const authHeaderInput = z.object({
    authHeader : z.string().min(7)
});

export function authenticateJwt(req : Request, res : Response , next : NextFunction) {
    const parsedInput = authHeaderInput.safeParse(req.headers.authorization);
    if(!parsedInput.success){
        res.json({
            message : "Token is suppose to be a string!",
            error : parsedInput.error
        });
        return;
    }

    const authHeader = parsedInput.data.authHeader;
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