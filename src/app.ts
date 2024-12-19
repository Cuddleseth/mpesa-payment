import http from "http";
import express from "express";
import helmet from "helmet";
import routes from "@src/routes";
import {normalizePort} from "@src/utils";
import {badUrl, cors, errorHandler, rateLimiter} from '@src/middlewares';


const app = express();
const server = http.createServer(app);
const port = normalizePort(process.env.PORT || '3000');

app.set('trust proxy', true);
app.set('port', port);

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors);

app.use(rateLimiter);
app.use('/api/v1', routes);
app.all("*", badUrl);
app.use(errorHandler);

server.listen(port, () => console.log(`Server listening on port ${port}`));

export {
    app
};