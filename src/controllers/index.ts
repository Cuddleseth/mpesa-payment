import {spawn} from "child_process";
import {AppError} from "@src/utils";
import {Request, Response, NextFunction} from "express";

export class IndexController {
    static async generateToken(_: Request, res: Response, next: NextFunction) {
        try {
            const api_key = process.env.MPESA_UAT_API_KEY;
            const public_key = process.env.MPESA_UAT_API_PUBLIC_KEY;

            const getToken = spawn('python3', ['src/scripts/encryption.py', api_key, public_key]);

            getToken.stdout.on('data', async (data) => {
                res.status(200).json({
                    statusText: "success",
                    statusCode: 200,
                    token: data.toString()
                })
            });

            getToken.stderr.on('data', (data) => {
                console.log(`stderr: ${data}`)
            });

            getToken.on('close', (code) => {
                console.log(`Process exited with code ${code}`)
            });
        } catch (e) {
            next(new AppError(e.message ?? `Internal server error`, 500));
        }
    }

    static async generateSessionKey(_: Request, res: Response, next: NextFunction) {
        try {
            const api_key = process.env.MPESA_UAT_API_KEY;
            const public_key = process.env.MPESA_UAT_API_PUBLIC_KEY;
            const api_path = `${process.env.MPESA_UAT_API_PATH}/getSession/`;
            const api_address = process.env.MPESA_UAT_API_ADDRESS;

            const generateSession = spawn('python3', ['src/scripts/generate_session_key.py', api_key, public_key, api_path, api_address]);

            generateSession.stdout.on('data', async (data) => {
                const response = data.toString();
                const jsonMatch = response.match(/\{[\s\S]*\}/);

                if (jsonMatch) {
                    try {
                        const jsonResponse = JSON.parse(jsonMatch[0]);
                        res.status(200).json({
                            statusText: "success",
                            statusCode: 200,
                            ...jsonResponse
                        });
                    } catch (e) {
                        next(new AppError(`Error parsing JSON data`, 500));
                    }
                } else {
                    next(new AppError(`No valid JSON found in Python script output`, 500));
                }
            });

            generateSession.stderr.on('data', (data) => {
                console.log(`stderr: ${data}`)
            });

            generateSession.on('close', (code) => {
                console.log(`Process exited with code ${code}`)
            });
        } catch (e) {
            next(new AppError(e.message ?? `Internal server error`, 500));
        }
    }

    static async customerToBusinessTransaction(req: Request, res: Response, next: NextFunction) {

        if (!req.body.sessionId) {
            return next(new AppError(`Your session has expired or you do not have authorization to access this resource`, 401));
        }

        if (!req.body.amount || !req.body.currency || !req.body.customerMSISDN || !req.body.serviceProviderCode ||
            !req.body.thirdPartyConversationID || !req.body.transactionReference || !req.body.purchasedItemsDesc) {
            return next(new AppError(`Missing mandatory information`, 406));
        }

        try {
            const public_key = process.env.MPESA_UAT_API_PUBLIC_KEY;
            const api_path = `${process.env.MPESA_UAT_API_PATH}/c2bPayment/singleStage/`;
            const api_address = process.env.MPESA_UAT_API_ADDRESS;

            const {
                amount, currency, sessionId, customerMSISDN, serviceProviderCode,
                thirdPartyConversationID, transactionReference, purchasedItemsDesc
            } = req.body;

            const runTransaction = spawn('python3', ['src/scripts/c2b_single_stage.py',
                sessionId, public_key, api_path, api_address, amount, currency, customerMSISDN,
                serviceProviderCode, thirdPartyConversationID, transactionReference, purchasedItemsDesc
            ]);

            runTransaction.stdout.on('data', async (data) => {
                const response = data.toString();

                const responseCodeMatch = response.match(/<Response \[(\d+)\]>/);
                const responseCode = responseCodeMatch ? parseInt(responseCodeMatch[1], 10) : null;

                const jsonMatch = response.match(/\{[\s\S]*\}/);

                if (responseCode > 201) {
                    const jsonResponse = JSON.parse(jsonMatch[0]);
                    return next(new AppError(jsonResponse?.output_error ?? jsonResponse?.output_ResponseDesc, responseCode));
                }

                if (jsonMatch) {
                    try {
                        const jsonResponse = JSON.parse(jsonMatch[0]);
                        res.status(responseCode || 200).json({
                            statusText: "success",
                            statusCode: responseCode || 200,
                            ...jsonResponse
                        });
                    } catch (e) {
                        next(new AppError(`Error parsing JSON data`, 500));
                    }
                } else {
                    next(new AppError(`No valid JSON found in Python script output`, 500));
                }
            });

            runTransaction.stderr.on('data', (data) => {
                console.log(`stderr: ${data}`)
            });

            runTransaction.on('close', (code) => {
                console.log(`Process exited with code ${code}`)
            });
        } catch (e) {
            next(new AppError(e.message ?? `Internal server error`, 500));
        }
    }
}