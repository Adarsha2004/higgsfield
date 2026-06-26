import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { prisma } from "./db";

declare global{
    namespace Express{
        interface Request{
            user?:any
        }
    }
}

const JWT_SECRET=process.env.JWT_SECRET as string;
export default async function middleware(req: Request,res: Response,next:NextFunction){
    const token = req.headers.authorization;
    if(token){
        try{
            const tokenverify=jwt.verify(token,JWT_SECRET) as JwtPayload;
            const userId=tokenverify.userId;
            const userdetails = await prisma.user.findUnique({
                where:{id:userId}
            });
            req.user=userdetails;
            next();
        }catch(e){
            res.status(401).json({
                message:"Error while verifing token"
            })
        }
    }else{
        res.status(401).json({
            message:"Unauthorized"
        })
    }
}