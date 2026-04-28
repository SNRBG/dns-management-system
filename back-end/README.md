# DNS Management System - Backend

A complete RESTful API for managing DNS records with user authentication.

## 🚀 Features

- User authentication (Register/Login with JWT)
- DNS record management (Create, Read, Update, Delete)
- User-specific DNS records
- Input validation and error handling
- Global error handling middleware
- Request logging
- MongoDB integration
- CORS support

## 📋 Prerequisites

- Node.js v14+
- MongoDB (local or Atlas)
- npm or yarn

## 🔧 Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Configure environment variables:**
   Copy `.env.example` to `.env` and update values:
```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/dns-management
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
```

3. **Start the server:**

   **Development (with auto-reload):**
   ```bash
   npm run dev
   ```

   **Production:**
   ```bash
   npm start
   ```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### 1. Register User
- **POST** `/auth/register`
- **Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```
- **Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "eyJhbGc..."
}
```

#### 2. Login
- **POST** `/auth/login`
- **Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response:**
```json
{
  "message": "Login successful",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "eyJhbGc..."
}
```

#### 3. Get User Profile
- **GET** `/auth/profile`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
```json
{
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### DNS Record Endpoints

**All DNS endpoints require authentication**
- **Headers:** `Authorization: Bearer <token>`

#### 1. Create DNS Record
- **POST** `/dns`
- **Body:**
```json
{
  "domain": "example.com",
  "type": "A",
  "value": "192.168.1.1",
  "ttl": 3600,
  "priority": 10
}
```
- **Response:**
```json
{
  "message": "DNS record created successfully",
  "record": {
    "_id": "...",
    "domain": "example.com",
    "type": "A",
    "value": "192.168.1.1",
    "ttl": 3600,
    "priority": 10,
    "userId": "...",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### 2. Get All DNS Records
- **GET** `/dns`
- **Query Parameters (optional):**
  - `domain`: Filter by domain
  - `type`: Filter by record type (A, AAAA, CNAME, MX, TXT, NS, SOA)
- **Response:**
```json
{
  "count": 1,
  "records": [...]
}
```

#### 3. Get DNS Record by ID
- **GET** `/dns/:id`
- **Response:**
```json
{
  "record": {...}
}
```

#### 4. Update DNS Record
- **PUT** `/dns/:id`
- **Body:**
```json
{
  "value": "192.168.1.2",
  "ttl": 7200,
  "priority": 20
}
```
- **Response:**
```json
{
  "message": "DNS record updated successfully",
  "record": {...}
}
```

#### 5. Delete DNS Record
- **DELETE** `/dns/:id`
- **Response:**
```json
{
  "message": "DNS record deleted successfully"
}
```

## 🔐 Security

- Passwords are hashed using bcryptjs (10 rounds salt)
- JWT tokens are used for authentication
- Environment variables for sensitive data
- Input validation on all endpoints
- CORS protection enabled

## 📁 Project Structure

```
back-end/
├── config/
│   └── db.js           # Database connection
├── controllers/
│   ├── authController.js   # Auth logic
│   └── dnsController.js    # DNS logic
├── middleware/
│   ├── auth.js         # Authentication middleware
│   ├── errorHandler.js # Global error handler
│   └── logger.js       # Request logger
├── models/
│   ├── User.js        # User schema
│   └── DNS.js         # DNS schema
├── routes/
│   ├── Auth Routes.js # Auth routes
│   └── DNS Routes.js  # DNS routes
├── .env              # Environment variables
├── .env.example      # Environment template
├── package.json      # Dependencies
└── server.js         # Main server file
```

## 🧪 Testing

Use Postman or curl to test endpoints:

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","password":"123456","confirmPassword":"123456"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"123456"}'

# Create DNS Record (replace TOKEN)
curl -X POST http://localhost:5000/api/dns \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"domain":"example.com","type":"A","value":"192.168.1.1"}'
```

## 🐛 Error Handling

The API returns meaningful error responses:

```json
{
  "error": "Error message"
}
```

Common status codes:
- `400` - Bad Request (validation error)
- `401` - Unauthorized (invalid/missing token)
- `404` - Not Found
- `500` - Server Error

## 📝 Supported DNS Record Types

- `A` - IPv4 address
- `AAAA` - IPv6 address
- `CNAME` - Canonical name
- `MX` - Mail exchange
- `TXT` - Text record
- `NS` - Name server
- `SOA` - Start of authority

## 🤝 Contributing

Feel free to submit pull requests with improvements.

## 📄 License

This project is open source and available under the MIT License.

## 🔗 Useful Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [JWT Documentation](https://jwt.io/)
- [Mongoose Documentation](https://mongoosejs.com/)
