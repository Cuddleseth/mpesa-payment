import moment from "moment";
import express, { Request, Response } from "express";

const apiRouter = express.Router();

apiRouter.get('/', (_: Request, res: Response) => {
    return res.status(200).json({
        name: process.env.npm_package_name,
        status: 'is running...',
        uptime: moment().add(Math.floor(process.uptime()), 'seconds').fromNow(),
        date: moment().format('LLL'),
        node: process.version
    })
});

export default apiRouter;