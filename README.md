# Scalable REST API with Authentication and Role-Based Access

A full-stack application featuring a secure Node.js backend with PostgreSQL and a React frontend. This project implements JWT-based authentication, Role-Based Access Control (RBAC), and follows RESTful principles with versioned endpoints.

## Core Features

- User Authentication: Secure registration and login using bcryptjs for password hashing and JWT for stateless sessions.
- Role-Based Access Control: Specialized permissions for USER and ADMIN roles.
- CRUD Operations: Full Task management entity protected by authentication.
- Security: Implementation of Helmet for secure headers, Express Rate Limit to prevent brute-force, and Zod for input validation.
- Scalability: Versioned API (v1) and a modular project structure designed for horizontal growth.

## Tech Stack

- Backend: Node.js, Express.js
- Database: PostgreSQL with Prisma ORM (v7)
- Frontend: React (Vite), Tailwind CSS, Axios
- Security: JSON Web Token (JWT), Bcryptjs, Zod, Helmet

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (running locally or via Docker)
- pgAdmin (optional for database management)

## Getting Started

### 1. Database Setup
- Open pgAdmin or psql and create a new database named scalable_api_db.

### 2. Backend Configuration
Navigate to the backend directory and install dependencies:
cd backend
npm install

Create a .env file in the backend folder and add:
PORT=5000
DATABASE_URL="postgresql://YOUR_POSTGRES_USER:YOUR_POSTGRES_PASSWORD@localhost:5432/scalable_api_db?schema=public"
JWT_SECRET="YOUR_GENERIC_SECRET_KEY"

Sync the database schema using Prisma:
npx prisma migrate dev --name init

### 3. Frontend Configuration
Navigate to the frontend directory and install dependencies:
cd frontend
npm install

### 4. Running the Application
Start the backend server:
cd backend
npm run dev

Start the frontend development server:
cd frontend
npm run dev

## API Documentation

The API is versioned at /api/v1/. Documentation can be accessed (after setup) at:
- Swagger UI: http://localhost:5000/api-docs

## Project Structure

backend/
├── prisma/             # Schema and Migrations
├── src/
│   ├── controllers/    # Business Logic
│   ├── middleware/     # Auth and Validation
│   ├── routes/         # Versioned API Endpoints
│   ├── validations/    # Zod Schemas
│   ├── db.js           # Database Connection
│   └── server.js       # Entry Point
frontend/
├── src/
│   ├── pages/          # Login, Register, Dashboard
│   ├── api.js          # Axios Client
│   └── App.jsx         # Routing Logic

## Scalability Note

This project is built for scalability through:
1. Stateless Auth: JWTs allow the backend to scale horizontally across multiple servers.
2. Connection Pooling: Prisma handles database connections efficiently via pooling.
3. Modular Design: Features are separated into distinct Controllers and Routes for easy migration to microservices.