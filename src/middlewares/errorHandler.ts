import { NextFunction, Request, Response } from "express";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    switch (process.env.NODE_ENV) {
        case 'development':
            if (err.name === 'UnauthorizedError') {
                return res.status(401).json({
                    statusCode: 401,
                    message:  `Your session has expired or you do not have authorization to access this resource`,
                    stack: err.stack,
                });
            }
            return res.status(statusCode).json({
                statusCode: statusCode,
                message: err.message,
                stack: err.stack,
            });
        case 'production':
            if (err.name === 'UnauthorizedError') {
                return res.status(401).json({
                    statusCode: 401,
                    message:  `Your session has expired or you do not have authorization to access this resource`,
                });
            }
            return res.status(statusCode).json({
                statusCode: statusCode,
                message: err.message
            });
        default:
            return res.status(statusCode).json({
                statusCode: statusCode,
                message: err.message
            });
    }
}

export default errorHandler;