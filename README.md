# M-Pesa Payment API

M-Pesa Payment API is a Node.js-based application designed to facilitate integration with Vodacom M-Pesa payment services (mobile money). It includes key features such as token generation, session key management, B2B (Business-to-Business), B2C (Business-to-Customer), C2C (Customer-to-Customer) and C2B (Customer-to-Business) transactions.

---

## Table of Contents
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Environment Variables](#environment-variables)
- [Features](#features)
- [Project Structure](#project-structure)
- [API Routes](#api-routes)
- [Scripts](#scripts)
- [Middleware](#middleware)
- [License](#license)

---

## Getting Started

### Prerequisites
- Node.js >= 20.x
- Pnpm, Yarn or npm

### Installation

1. Clone the repository:
```bash
$ git clone https://github.com/didiamuri/mpesa-payment.git
$ cd mpesa-payment
```

2. Install dependencies:
```bash
$ pnpm install
```

3. Set up environment variables:
    - Copy `.env.example` to `.env` and configure the necessary values.

4. Start the application in development mode:
```bash
$ pnpm dev
```

5. Build the application for production:
```bash
$ pnpm build
```

6. Start the application in production mode:
```bash
$ pnpm start
```

---

## Environment Variables

The application uses environment variables for configuration. Below are the key variables:

| Variable                      | Description                                             |
|-------------------------------|---------------------------------------------------------|
| `PORT`                        | Port on which the application runs                      |
| `NODE_ENV`                    | Application environment (development, production, etc.) |
| `AUTHORIZED_DOMAINS`          | Comma-separated list of domains allowed for CORS        |
| `API_KEY`                     | API KEY for access to this APIs                         |
| `MPESA_UAT_API_PATH`          | M-Pesa API path for UAT environment                     |
| `MPESA_UAT_API_ADDRESS`       | M-Pesa API address for UAT environment                  |
| `MPESA_SANDBOX_BASE_URL`      | Base URL for M-Pesa sandbox environment                 |
| `MPESA_UAT_API_KEY`           | API key for M-Pesa UAT                                  |
| `MPESA_UAT_API_PUBLIC_KEY`    | Public key for M-Pesa UAT                               |

---

## Features

- **Token Generation**: Securely generates access tokens for M-Pesa API.
- **Session Key Management**: Handles session keys for authenticated communication.
- **B2B Transactions**: Processes business-to-business transactions.
- **B2C Transactions**: Processes business-to-customer transactions.
- **C2B Transactions**: Processes customer-to-business transactions.
- **Rate Limiting**: Protects APIs from abuse using Redis-based rate limiting.
- **Security**: Implements industry-standard security practices (CORS, Helmet).

---

## Project Structure
```
apps
├── mpesa-payment
│   ├── src
│   │   ├── controllers
│   │   ├── middlewares
│   │   ├── routes
│   │   ├── scripts
│   │   ├── utils
│   │   └── app.ts
```

### Key Files
- `src/routes/index.ts`: Base API routes.
- `src/routes/mpesa.ts`: Routes specific to M-Pesa operations.
- `src/controllers/index.ts`: Application controller
- `src/middlewares`: Custom middleware for security, authorization, and rate-limiting.
- `src/scripts`: Python scripts for cryptographic and API interactions.

---

## API Routes

### Base Route
**GET /**
- Returns API status, uptime, and server details.

### M-Pesa Routes
**GET /api/v1/mpesa/generate-token**
- Generates an access token (requires authorization).

**GET /api/v1/mpesa/generate-session-key**
- Creates a session key (requires authorization).

**POST /api/v1/mpesa/transaction/b2b**
- Processes a B2B transaction (requires authorization and body params).
```bash
{
  "amount": "10", 
  "country": "DRC", 
  "currency": "USD", 
  "primaryPartyCode": "000000", 
  "receiverPartyCode": "000001", 
  "thirdPartyConversationID": "asv02e5958774f7ba228d83d0d689761", 
  "transactionReference": "T12344C",
  "purchasedItemsDesc": "Shoes"
  "sessionId":"a45402f3050d43a3bfe800135510f9f1"
}
```

**POST /api/v1/mpesa/transaction/b2c**
- Processes a B2C transaction (requires authorization and body params).
```bash
{
  "amount": "10", 
  "country": "DRC", 
  "currency": "USD", 
  "customerMSISDN": "000000000001", 
  "serviceProviderCode": "000000", 
  "thirdPartyConversationID": "asv02e5958774f7ba228d83d0d689761", 
  "transactionReference": "T12344C",
  "paymentItemsDesc": "Salary payment",
  "sessionId":"a45402f3050d43a3bfe800135510f9f1"
}
```

**POST /api/v1/mpesa/transaction/c2b**
- Processes a C2B transaction (requires authorization and body params).
```bash
{
  "amount": "10", 
  "country": "DRC", 
  "currency": "USD", 
  "customerMSISDN": "000000000001", 
  "serviceProviderCode": "000000", 
  "thirdPartyConversationID": "asv02e5958774f7ba228d83d0d689761", 
  "transactionReference": "T1234C",
  "purchasedItemsDesc": "Shoes",
  "sessionId":"a45402f3050d43a3bfe800135510f9f1"
}
```

---

## Scripts

- `dev`: Starts the application in development mode with `nodemon`.
- `build`: Compiles TypeScript into JavaScript for production.
- `start`: Starts the compiled application.
- `test`: Runs tests using `jest`.

---

## Middleware

### Key Middleware
- **`isAuthorized`**: Ensures the api-key are valid.
- **`rateLimiter`**: Applies rate limits to protect APIs.
- **`helmet`**: Secures HTTP headers.
- **`cors`**: Configures cross-origin resource sharing.

---

## License

This project is licensed under the [UNLICENSED](LICENSE).

---

For questions or issues, please visit [Issues](https://didiamuri.dev). or send email to [didiamuri@gmail.com](mailto=didiamuri@gmail.com).

