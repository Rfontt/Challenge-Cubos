import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export default function tokenAuthorization(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(403);
    }

    const [bearer, token] = authorization.split(" ");

    try {
        verify(token, `${process.env.KEY}`);

        return next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }
}