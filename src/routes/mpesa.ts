import express from 'express';
import isAuthorized from "../middlewares/isAuthorized";
import {IndexController} from "@src/controllers";

const router = express.Router();

router.route('/generate-token').get(isAuthorized, IndexController.generateToken);
router.route('/generate-session-key').get(isAuthorized, IndexController.generateSessionKey);
router.route('/transaction/c2b').post(isAuthorized, IndexController.customerToBusinessTransaction);

export default router;