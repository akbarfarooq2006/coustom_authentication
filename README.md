# Authentication API Service

A robust and scalable authentication backend service built with Node.js, Express.js, and MongoDB. This service provides comprehensive user authentication, session management, and JWT-based token handling.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Database Models](#database-models)
- [Running the Project](#running-the-project)
- [Development](#development)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

---

## 🎯 Overview

The Authentication API Service is a production-ready backend solution designed to handle user authentication, registration, session management, and token refresh operations. It implements industry-standard security practices including password hashing with bcrypt, JWT-based authentication, and secure session management.

This service is ideal for:
- Web applications requiring user authentication
- Single Sign-On (SSO) implementations
- Multi-user platforms with session management
- Microservices authentication layer

---

## ✨ Features

### Core Authentication
- **User Registration**: Create new user accounts with secure password hashing
- **User Authentication**: Login with email and password credentials
- **JWT Token Management**: Secure token generation and validation
- **Token Refresh**: Automatic token refresh mechanism for extended sessions
- **Session Management**: Track and manage active user sessions
- **Multi-Device Support**: Manage multiple sessions per user
- **Logout Operations**: Single and multi-device logout functionality

### Security Features
- Password hashing using bcrypt with salt rounds
- JWT (JSON Web Tokens) for stateless authentication
- HTTP-only cookies for secure token storage
- Session tracking and validation
- CORS support for cross-origin requests
- Request logging with Morgan

### Developer Experience
- Environment-based configuration
- Comprehensive error handling
- Request/response logging
- Automatic port fallback (busy port detection)
- ES6+ module support
- Development mode with hot-reload (nodemon)

---

## 🛠️ Tech Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| **Runtime** | Node.js | 18.x+ |
| **Framework** | Express.js | 5.2.1 |
| **Database** | MongoDB | 9.4.1 (Mongoose) |
| **Authentication** | JWT | 9.0.3 |
| **Password Hashing** | Bcrypt | 6.0.0 |
| **Cookie Parsing** | Cookie-Parser | 1.4.7 |
| **Logging** | Morgan | 1.10.1 |
| **Environment** | dotenv | 17.4.2 |
| **Dev Tools** | Nodemon | 3.1.14 |

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v9.0.0 or higher) - Comes with Node.js
- **MongoDB** (v5.0 or higher) - [Download](https://www.mongodb.com/try/download/community) or use MongoDB Atlas
- **Git** - [Download](https://git-scm.com/)

### System Requirements
- **RAM**: Minimum 512MB
- **Disk Space**: Minimum 500MB
- **OS**: Windows, macOS, or Linux

---

## 🚀 Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/akbarfarooq2006/coustom_authentication.git
cd coustom_authentication
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages as defined in `package.json`:
- express (web framework)
- mongoose (MongoDB ODM)
- jsonwebtoken (JWT handling)
- bcrypt & bcryptjs (password hashing)
- cookie-parser (cookie middleware)
- morgan (HTTP logging)
- dotenv (environment variables)
- nodemon (development tool)

### Step 3: Verify Installation

```bash
npm list
```

---

## ⚙️ Configuration

### Step 1: Create Environment File

Create a `.env` file in the root directory of the project:

```bash
cp .env.example .env
```

If `.env.example` doesn't exist, create `.env` manually:

```bash
touch .env
```

### Step 2: Configure Environment Variables

Edit the `.env` file and add the following variables:

```env
# Server Configuration
PORT=3000

# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/auth_db

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production

# Environment
NODE_ENV=development
```

### Environment Variables Explanation

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port number | `3000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/auth_db` |
| `JWT_SECRET` | Secret key for signing JWT tokens | `your-secret-key-here` |
| `NODE_ENV` | Environment mode | `development` or `production` |

### MongoDB Connection Options

**Local MongoDB:**
```env
MONGO_URI=mongodb://localhost:27017/auth_db
```

**MongoDB Atlas (Cloud):**
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/auth_db
```

**Remote MongoDB Server:**
```env
MONGO_URI=mongodb://host:port/auth_db
```

### JWT Secret Best Practices

- **Development**: Use any string (e.g., `dev-secret-key`)
- **Production**: Use a strong, random string (minimum 32 characters)
  
Generate a secure secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 📁 Project Structure

```
auth/
├── src/
│   ├── app.js                          # Express application setup
│   ├── config/
│   │   ├── configs.js                  # Environment configuration
│   │   └── database.config.js           # MongoDB connection
│   ├── controllers/
│   │   └── auth.controller.js           # Authentication logic
│   ├── models/
│   │   ├── user.model.js                # User schema and model
│   │   └── session.model.js             # Session schema and model
│   └── routes/
│       └── auth.routes.js               # Authentication endpoints
├── Doc_Images/                         # Documentation images
├── server.js                           # Application entry point
├── package.json                        # Project dependencies
├── package-lock.json                   # Dependency lock file
├── .env                                # Environment variables (create manually)
├── .gitignore                          # Git ignore patterns
└── README.md                           # This file
```

### Directory Descriptions

| Directory | Purpose |
|-----------|---------|
| `src/` | Source code directory |
| `src/config/` | Configuration files (database, environment) |
| `src/controllers/` | Business logic and request handlers |
| `src/models/` | Mongoose schemas and models |
| `src/routes/` | API route definitions |
| `Doc_Images/` | Documentation and reference images |

---

## 🔌 API Documentation

### Base URL

```
http://localhost:3000/api/auth
```

### Authentication Endpoints

#### 1. Register User

Create a new user account.

**Endpoint:**
```http
POST /api/auth/register
```

**Request Headers:**
```json
{
  "Content-Type": "application/json"
}
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe"
}
```

**Success Response (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2024-01-15T10:30:00Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response (400):**
```json
{
  "error": "Email already exists",
  "message": "This email is already registered"
}
```

---

#### 2. Get Current User

Retrieve the authenticated user's information.

**Endpoint:**
```http
GET /api/auth/get-me
```

**Request Headers:**
```json
{
  "Authorization": "Bearer your_jwt_token_here"
}
```

**Success Response (200):**
```json
{
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

**Error Response (401):**
```json
{
  "error": "Unauthorized",
  "message": "No valid token provided"
}
```

---

#### 3. Refresh Token

Get a new access token using a refresh token.

**Endpoint:**
```http
GET /api/auth/refresh-token
```

**Request Headers:**
```json
{
  "Cookie": "refreshToken=your_refresh_token_here"
}
```

**Success Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Token refreshed successfully"
}
```

**Error Response (401):**
```json
{
  "error": "Unauthorized",
  "message": "Refresh token expired or invalid"
}
```

---

#### 4. Logout (Current Device)

Logout the user from the current device/session.

**Endpoint:**
```http
POST /api/auth/logout
```

**Request Headers:**
```json
{
  "Authorization": "Bearer your_jwt_token_here"
}
```

**Success Response (200):**
```json
{
  "message": "Logged out successfully"
}
```

---

#### 5. Logout All Devices

Logout the user from all devices/sessions.

**Endpoint:**
```http
POST /api/auth/logout-all
```

**Request Headers:**
```json
{
  "Authorization": "Bearer your_jwt_token_here"
}
```

**Success Response (200):**
```json
{
  "message": "Logged out from all devices successfully"
}
```

---

#### 6. Delete All Sessions

Admin endpoint to delete all sessions for a user.

**Endpoint:**
```http
DELETE /api/auth/delete-sessions
```

**Request Headers:**
```json
{
  "Authorization": "Bearer your_jwt_token_here"
}
```

**Success Response (200):**
```json
{
  "message": "All sessions deleted successfully"
}
```

---

#### 7. Delete User Account

Delete the current user account and all associated data.

**Endpoint:**
```http
DELETE /api/auth/delete
```

**Request Headers:**
```json
{
  "Authorization": "Bearer your_jwt_token_here"
}
```

**Success Response (200):**
```json
{
  "message": "User account deleted successfully"
}
```

---

### HTTP Status Codes

| Code | Meaning | Usage |
|------|---------|-------|
| `200` | OK | Successful GET, POST, or DELETE |
| `201` | Created | Successful resource creation |
| `400` | Bad Request | Invalid input or validation error |
| `401` | Unauthorized | Missing or invalid authentication |
| `403` | Forbidden | User lacks required permissions |
| `404` | Not Found | Resource not found |
| `409` | Conflict | Resource already exists |
| `500` | Server Error | Internal server error |

---

## 💾 Database Models

### User Model

**Collection:** `users`

```json
{
  "_id": "ObjectId",
  "email": "string (unique)",
  "password": "string (hashed)",
  "name": "string",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

**Field Descriptions:**
- `_id`: Unique MongoDB ObjectId
- `email`: User's email address (unique constraint)
- `password`: Bcrypt-hashed password (never stored in plain text)
- `name`: User's full name
- `createdAt`: Account creation timestamp
- `updatedAt`: Last update timestamp

**Indexes:**
- `email` (unique)

---

### Session Model

**Collection:** `sessions`

```json
{
  "_id": "ObjectId",
  "userId": "ObjectId (ref: User)",
  "refreshToken": "string",
  "expiresAt": "Date",
  "createdAt": "Date",
  "userAgent": "string",
  "ipAddress": "string"
}
```

**Field Descriptions:**
- `_id`: Unique MongoDB ObjectId
- `userId`: Reference to User document
- `refreshToken`: JWT refresh token
- `expiresAt`: Session expiration timestamp
- `createdAt`: Session creation timestamp
- `userAgent`: Browser/client information
- `ipAddress`: Client IP address for security tracking

**Indexes:**
- `userId` (for session lookup)
- `refreshToken` (unique)
- `expiresAt` (TTL index for automatic cleanup)

---

## ▶️ Running the Project

### Development Mode

Start the server with automatic reload on file changes:

```bash
npm run dev
```

**Output:**
```
Server is running on port 3000
Database Connected Successfully
```

### Production Mode

Start the server without auto-reload:

```bash
npm start
```

Or using Node.js directly:

```bash
node server.js
```

### Testing Endpoints

Use any of the following tools:

**Using cURL:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123",
    "name": "Test User"
  }'
```

**Using Postman:**
1. Create a new request
2. Set method to `POST`
3. URL: `http://localhost:3000/api/auth/register`
4. Body (JSON):
```json
{
  "email": "test@example.com",
  "password": "TestPassword123",
  "name": "Test User"
}
```

**Using VS Code REST Client:**
Create a `requests.http` file:
```http
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "TestPassword123",
  "name": "Test User"
}
```

---

## 👨‍💻 Development

### Running Tests

Currently, no automated tests are configured. To add testing:

```bash
npm install --save-dev jest supertest
```

Then configure test scripts in `package.json`.

### Code Style

- **Language**: JavaScript (ES6+ modules)
- **Naming Convention**: camelCase for variables and functions
- **File Naming**: camelCase for files
- **Indentation**: 2 spaces

### Hot Reload

The project uses Nodemon for automatic server restart during development:

```bash
npm run dev
```

Any changes to files in the `src/` directory will automatically restart the server.

### Adding New Endpoints

1. Create controller method in `src/controllers/auth.controller.js`
2. Add route in `src/routes/auth.routes.js`
3. Test using Postman or cURL

Example:
```javascript
// In auth.routes.js
authRouter.post('/custom-endpoint', controllerMethod);
```

---

## 🔒 Security

### Best Practices Implemented

1. **Password Security**
   - Bcrypt hashing with salt rounds
   - Never store plain-text passwords
   - Strong password validation

2. **JWT Security**
   - Secure token signing with JWT_SECRET
   - Token expiration times
   - Separate refresh tokens

3. **Cookie Security**
   - HTTP-only cookies for tokens
   - Secure flag for HTTPS
   - SameSite attribute for CSRF protection

4. **Session Management**
   - Session tracking and validation
   - Multi-device logout capability
   - Automatic session expiration

### Security Checklist for Production

- [ ] Change `JWT_SECRET` to a strong random string
- [ ] Set `NODE_ENV=production`
- [ ] Use HTTPS only (set Secure cookie flag)
- [ ] Configure CORS for allowed origins
- [ ] Implement rate limiting
- [ ] Add input validation and sanitization
- [ ] Enable MongoDB authentication
- [ ] Use environment variables for all secrets
- [ ] Implement logging and monitoring
- [ ] Regular security audits

### Environment Variables Security

**Never commit `.env` file to git:**

Ensure `.gitignore` contains:
```
.env
.env.local
node_modules/
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

### Fork and Clone
```bash
git clone https://github.com/yourusername/coustom_authentication.git
cd coustom_authentication
```

### Create Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### Commit Changes
```bash
git commit -m "Add your feature description"
```

### Push to Branch
```bash
git push origin feature/your-feature-name
```

### Submit Pull Request

1. Go to the repository on GitHub
2. Click "Compare & pull request"
3. Provide detailed description
4. Wait for review and feedback

### Coding Standards

- Follow existing code style
- Add comments for complex logic
- Test your changes
- Update documentation as needed
- Use meaningful commit messages

---

## 📄 License

This project is licensed under the **ISC License** - see the `package.json` file for details.

---

## 💬 Support

### Getting Help

- **Issues**: [Report on GitHub](https://github.com/akbarfarooq2006/coustom_authentication/issues)
- **Discussions**: Use GitHub Discussions for questions
- **Documentation**: Refer to the [API Documentation](#api-documentation) section above

### Common Issues

**Issue: Port already in use**
```
Solution: The server automatically tries PORT + 1 if the configured port is busy
```

**Issue: MongoDB connection failed**
```
Solution: Verify MONGO_URI in .env and ensure MongoDB is running
```

**Issue: JWT token expired**
```
Solution: Use the refresh-token endpoint to get a new token
```

### Troubleshooting

1. Check `.env` configuration
2. Verify MongoDB is running
3. Check application logs in console
4. Ensure all dependencies are installed: `npm install`

---

## 📞 Contact

- **Repository**: [github.com/akbarfarooq2006/coustom_authentication](https://github.com/akbarfarooq2006/coustom_authentication)
- **Issues**: [Report Issues](https://github.com/akbarfarooq2006/coustom_authentication/issues)

---

## 🙏 Acknowledgments

- Express.js community
- MongoDB documentation
- Node.js ecosystem contributors

---

**Last Updated**: January 2024  
**Version**: 1.0.0

---

**Happy Coding! 🚀**
