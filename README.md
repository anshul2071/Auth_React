# Auth_React
# Auth Project

A full-stack authentication system built with React, Vite, and Express.

## Overview

This project demonstrates a complete authentication system with user registration, login functionality, and protected routes. It uses React for the frontend, Express for the backend server, and JSON Server for data storage.

## Features

- User registration with validation
- User login with JWT authentication
- Protected routes
- Responsive design with modern UI
- Password visibility toggle
- Form validation

## Tech Stack

### Frontend
- React 19
- React Router 7
- Vite 6
- CSS3 with animations

### Backend
- Express.js
- JSON Server
- JWT (JSON Web Tokens)
- CORS

## Project Structure

```
auth-project/
├── backend/
│   ├── server.js
│   └── db.json
├── public/
├── src/
│   ├── components/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Navbar.jsx
│   ├── CSS/
│   │   ├── login.css
│   │   ├── register.css
│   │   └── navbar.css
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── eslint.config.js
└── vite.config.js
```

## Setup and Installation

1. Clone the repository:

   git clone https://github.com/anshul2071/Auth_React.git

2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Start the backend server:
   ```
   npm run backend
   ```

## API Endpoints

### Authentication

- **POST /register** - Register a new user
  - Required fields: name, email, password, confirmPassword, gender, age
  - Returns: User object

- **POST /login** - User login
  - Required fields: email, password
  - Returns: User object, JWT token, and redirect URL

## User Flow

1. New users register via the registration form
2. Registered users can log in using their email and password
3. Upon successful login, users are redirected to the dashboard
4. Users can navigate through the application using the navbar
5. Users can log out which will clear their session and redirect to the login page

## Security Features

- Password validation (minimum 8 characters, includes uppercase, lowercase, digit, and special character)
- Email validation
- JWT token-based authentication
- Protected routes for authenticated users only
- CORS configuration for secure API requests

## Development Notes

- React Strict Mode is enabled
- ESLint is configured for code quality
- The project uses JWT for stateless authentication
- User data is stored in a JSON file (db.json)

