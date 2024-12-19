import { AppError } from "@src/utils";
import { NextFunction, Request, Response } from "express";

export default function isAuthorized(req: Request, _: Response, next: NextFunction) {
    if (!req.headers['x-api-key'] || req.headers['x-api-key'] !== process.env.API_KEY) {
        next(new AppError(`You do not have authorization to access this resource`, 403));
    }
    next();
}