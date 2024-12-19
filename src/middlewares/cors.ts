import cors from "cors";

const authorizedDomains = process.env['AUTHORIZED_DOMAINS'].split(',');

export default cors({
    origin: authorizedDomains,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
})