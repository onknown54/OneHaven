# OneHaven Backend Engineering Challenge

A real-time caregiver management API built with Node.js, Express, and Supabase that allows caregivers to register, manage protected members, and synchronize real-time updates.<br /> <br />

A comprehensive Postman collection is available in the root directory for testing all API endpoints. You can [download](onehaven.postman_collection) and import file into Postman to quickly test all endpoints with pre-configured requests.

## Project Structure

```
src/
├── config/          # Configuration files
├── controllers/     # Route controllers
├── middlewares/     # Custom middleware
├── routes/          # API routes
├── services/        # Business logic and event emitter
├── lib/             # Utilities and validators
└── app.js           # Express app setup
```

## Features

- Caregiver Management: Secure signup, login, and profile management
- Protected Member CRUD: Full Create, Read, Update, Delete operations
- Real-time Event System: Event emitter for member changes with console logging
- JWT Authentication: Secure token-based authentication
- Data Validation: Comprehensive input validation using Joi
- Rate Limiting: Production-grade request limiting
- Security: Helmet, CORS, and security best practices
- Concurrency Handling: Proper async/await patterns for concurrent operations

## Tech Stack

- Runtime: Node.js
- Framework: Express.js
- Database: Supabase (PostgreSQL)
- Authentication: JWT + bcryptjs
- Validation: Joi
- Security: Helmet, CORS, express-rate-limit
- Logging: Morgan + custom event emitter

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Installation

1. Clone the repository

```bash
  git clone https://github.com/onknown54/OneHaven.git
  cd OneHaven
```

1. Install dependencies

```bash
  npm install
```

# Running the Application

## Development mode:

```bash
  npm run dev
```

## Production mode:

```bash
  npm start
```

## Run seed script (for testing):

```bash
  npm run seed
```
