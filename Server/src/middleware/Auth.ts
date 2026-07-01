import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface Authrequest extends Request{
    user?:{
        id:string
    }
}

export const verifytoken=(req:Authrequest,res:Response,next:NextFunction)=>{
    const authHeader= req.headers.authorization;

const token = authHeader?.startsWith("Bearer ")
  ? authHeader.split(" ")[1]
  : null;

if (!token) {
  return res.status(401).json({
    success: false,
    message: "Token missing",
  });
}

    

    try {
      const decode = jwt.verify(
        token,
        process.env.JWT_ACCESS_TOKEN_SECERET as string,
      ) as { id: string };

      req.user = { id: decode.id };
      next();
    } catch (err) {
      return res.status(403).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
}