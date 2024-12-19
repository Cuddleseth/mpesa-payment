import express from 'express';
import isAuthorized from "../middlewares/isAuthorized";
import {IndexController} from "@src/controllers";

const router = express.Router();

router.route('/generate-token').get(isAuthorized, IndexController.generateToken);
router.route('/generate-session-key').get(isAuthorized, IndexController.generateSessionKey);
router.route('/transaction/b2b').post(isAuthorized, IndexController.businessToBusinessTransaction);
router.route('/transaction/b2c').post(isAuthorized, IndexController.businessToCustomerTransaction);
router.route('/transaction/c2b').post(isAuthorized, IndexController.customerToBusinessTransaction);

export default router;