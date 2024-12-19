import express from 'express';
import {IndexController} from "@src/controllers";

const router = express.Router();

router.route('/generate-token').get(IndexController.generateToken);
router.route('/generate-session-key').get(IndexController.generateSessionKey);

router.route('/transaction/c2b').post(IndexController.customerToBusinessTransaction);

export default router;