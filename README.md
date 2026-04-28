# DNS Management System

A complete DNS management application with a modern backend API and responsive React frontend.

## 🚀 Project Overview

This is a full-stack DNS management system that allows users to:
- Register and authenticate with JWT
- Create, read, update, and delete DNS records
- Filter and search DNS records by domain and type
- Manage multiple DNS record types (A, AAAA, CNAME, MX, TXT, NS, SOA)

## 📁 Project Structure

```
dns-management-system/
├── back-end/          # Node.js Express API
│   ├── config/        # Database configuration
│   ├── controllers/   # Business logic
│   ├── middleware/    # Auth, logging, error handling
│   ├── models/        # MongoDB schemas
│   ├── routes/        # API endpoints
│   ├── server.js      # Main server file
│   ├── package.json   # Backend dependencies
│   └── README.md      # Backend documentation
│
└── front-end/         # React SPA
    ├── public/        # Static assets
    ├── src/
    │   ├── components/  # Reusable React components
    │   ├── pages/      # Page components
    │   ├── services/   # API client
    │   ├── context/    # Auth state management
    │   ├── styles/     # CSS stylesheets
    │   ├── App.jsx     # Main app component
    │   └── index.jsx   # Entry point
    ├── package.json    # Frontend dependencies
    └── README.md       # Frontend documentation
```

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password**: bcryptjs (10 rounds)
- **Middleware**: CORS, body-parser

### Frontend
- **Framework**: React 18
- **Routing**: React Router v6
- **HTTP Client**: Axios with interceptors
- **State Management**: React Context API
- **Styling**: Pure CSS (no frameworks)
- **Build Tool**: Create React App

## ⚙️ Installation & Setup

### Prerequisites
- Node.js v14+ and npm
- MongoDB (local or Atlas)
- Git

### Backend Setup

```bash
cd back-end

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
# MONGO_URI=mongodb://localhost:27017/dns-management
# PORT=5000
# JWT_SECRET=your_secret_key

# Start development server
npm run dev
```

Backend runs on `http://localhost:5000`

### Frontend Setup

```bash
cd front-end

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env (should already have correct values)
# REACT_APP_API_URL=http://localhost:5000/api

# Start development server
npm start
```

Frontend runs on `http://localhost:3000`

## 📚 API Documentation

See [Backend README](./back-end/README.md#-api-documentation) for complete API documentation.

### Quick API Overview

**Authentication:**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

**DNS Records:**
- `POST /api/dns` - Create DNS record (protected)
- `GET /api/dns` - Get DNS records (protected)
- `GET /api/dns/:id` - Get DNS record by ID (protected)
- `PUT /api/dns/:id` - Update DNS record (protected)
- `DELETE /api/dns/:id` - Delete DNS record (protected)

## 🎯 Key Features

### Authentication
✅ User registration with validation
✅ Secure login with JWT tokens
✅ Session persistence
✅ Auto-logout on token expiration
✅ Protected routes

### DNS Management
✅ Create records (7 types supported)
✅ Edit existing records
✅ Delete records with confirmation
✅ Filter by domain and type
✅ Display record details
✅ TTL and priority management

### User Experience
✅ Responsive design (mobile, tablet, desktop)
✅ Real-time validation
✅ Success/error notifications
✅ Loading states
✅ Intuitive UI with icons
✅ Smooth animations

### Security
✅ Password hashing (bcryptjs)
✅ JWT token authentication
✅ Protected API routes
✅ CORS enabled
✅ Input validation
✅ Error handling

## 📱 Responsive Design

- **Desktop** (1200px+): Full layout with all features
- **Tablet** (768-1199px): Optimized grid layout
- **Mobile** (<768px): Single column, touch-friendly buttons

## 🧪 Testing

### Test Backend
Use the provided `requests.http` file in the backend folder with REST Client extension, or use Postman.

### Test Frontend
1. Register a new account at `http://localhost:3000/register`
2. Login at `http://localhost:3000/login`
3. Create, edit, and delete DNS records on the dashboard

## 📊 Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### DNS Model
```javascript
{
  domain: String (required, lowercase),
  type: String (A, AAAA, CNAME, MX, TXT, NS, SOA),
  value: String (required),
  ttl: Number (default: 3600),
  priority: Number (default: 10),
  userId: ObjectId (reference to User),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔐 Security Considerations

1. **Passwords**: Hashed with bcryptjs (10 salt rounds)
2. **Tokens**: JWT with 7-day expiration
3. **CORS**: Configured for frontend origin
4. **Validation**: All inputs validated server-side
5. **Errors**: Generic error messages (no sensitive info leaked)
6. **MongoDB**: Connection string in .env only

## 🚀 Deployment

### Deploy Backend (Heroku)
```bash
cd back-end
git init
heroku create app-name
git push heroku main
```

### Deploy Frontend (Vercel)
```bash
cd front-end
npm install -g vercel
vercel
```

### Deploy with Docker
See individual README files for Docker configuration.

## 🐛 Troubleshooting

### Backend Issues
- Check MongoDB connection: `MONGO_URI` in `.env`
- Verify ports not in use (5000, 3000)
- Check JWT_SECRET is set

### Frontend Issues
- Ensure backend is running
- Check `REACT_APP_API_URL` in `.env`
- Clear browser cache/cookies
- Check browser console for errors

### Connection Issues
- CORS error: Check backend CORS configuration
- 401 Unauthorized: Token expired, login again
- 404 Not Found: Verify API endpoint URL

## 📖 Documentation

- [Backend Documentation](./back-end/README.md)
- [Frontend Documentation](./front-end/README.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 💡 Future Enhancements

- [ ] Email verification
- [ ] Two-factor authentication
- [ ] DNS history/audit logs
- [ ] Bulk import/export
- [ ] DNS propagation checker
- [ ] Record templates
- [ ] Admin dashboard
- [ ] Team/organization support
- [ ] API key generation
- [ ] Webhook notifications
- [ ] Domain health checks
- [ ] Advanced analytics

## 📞 Support

For issues and questions, please check the individual README files or create an issue on GitHub.

## 🎉 Get Started

```bash
# Terminal 1: Start Backend
cd back-end
npm run dev

# Terminal 2: Start Frontend
cd front-end
npm start
```

Visit `http://localhost:3000` in your browser!

---

**Made with ❤️ - DNS Management System**
