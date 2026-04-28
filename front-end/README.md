# DNS Management System - Frontend

A modern React-based frontend for managing DNS records with user authentication.

## 🎨 Features

- **User Authentication**
  - Register new account
  - Login with email and password
  - Session persistence with JWT tokens

- **DNS Record Management**
  - Create DNS records (A, AAAA, CNAME, MX, TXT, NS, SOA)
  - View all user's DNS records
  - Edit existing records
  - Delete records with confirmation
  - Filter records by domain and type

- **User Experience**
  - Responsive design (mobile, tablet, desktop)
  - Real-time form validation
  - Success/error notifications
  - Loading states
  - Protected routes
  - Clean and intuitive UI

## 📋 Prerequisites

- Node.js v14+ and npm
- Backend API running on `http://localhost:5000`

## 🚀 Installation & Setup

### 1. Install Dependencies
```bash
cd front-end
npm install
```

### 2. Configure Environment
Create `.env` file (or copy from `.env.example`):
```bash
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

### 3. Start Development Server
```bash
npm start
```

The app will open at `http://localhost:3000`

## 📁 Project Structure

```
front-end/
├── public/
│   └── index.html           # HTML template
├── src/
│   ├── components/          # Reusable components
│   │   ├── RecordForm.jsx   # DNS record form
│   │   ├── RecordList.jsx   # Records grid display
│   │   └── ProtectedRoute.jsx # Auth protection
│   ├── pages/               # Page components
│   │   ├── Login.jsx        # Login page
│   │   ├── Register.jsx     # Registration page
│   │   └── Dashboard.jsx    # Main dashboard
│   ├── services/
│   │   └── api.js           # API client with axios
│   ├── context/
│   │   └── AuthContext.jsx  # Auth state management
│   ├── styles/              # CSS files
│   │   ├── index.css        # Global styles
│   │   ├── auth.css         # Auth pages styles
│   │   ├── dashboard.css    # Dashboard styles
│   │   └── components.css   # Component styles
│   ├── App.jsx              # Main app component
│   ├── index.jsx            # Entry point
│   └── .env                 # Environment variables
├── .env.example             # Environment template
├── package.json             # Dependencies
└── README.md                # This file
```

## 🔧 Usage

### Register
1. Navigate to `/register`
2. Fill in name, email, password
3. Click "Register"
4. Redirected to dashboard on success

### Login
1. Navigate to `/login`
2. Enter email and password
3. Click "Login"
4. Redirected to dashboard on success

### Manage DNS Records
1. On Dashboard, use the **+ Add DNS Record** button
2. Fill in:
   - Domain name (e.g., example.com)
   - Record type (A, AAAA, CNAME, MX, TXT, NS, SOA)
   - Value (IP, URL, etc.)
   - TTL (Time To Live in seconds)
   - Priority (for MX records)
3. Click "Create Record"

### Edit Records
1. Click the ✏️ edit button on any record card
2. Modify the value, TTL, or priority
3. Click "Update Record"

### Delete Records
1. Click the 🗑️ delete button on any record card
2. Confirm the deletion

### Filter Records
- Use the **Domain** input to search by domain name
- Use the **Type** dropdown to filter by record type

## 🎨 Styling

The app uses modern CSS with:
- Gradient backgrounds
- Card-based layout
- Smooth animations and transitions
- Responsive grid system
- Color-coded DNS record types
- Mobile-first design

### Color Scheme
- **Primary**: #3498db (Blue)
- **Secondary**: #2c3e50 (Dark Blue)
- **Danger**: #e74c3c (Red)
- **Success**: #27ae60 (Green)
- **Warning**: #f39c12 (Orange)

## 🔐 Security

- JWT tokens stored in localStorage
- Auto-logout on token expiration (401 response)
- Protected routes require valid token
- Axios interceptors for automatic token injection
- Password validation before submission

## 🛠️ Build for Production

```bash
npm run build
```

Creates an optimized production build in the `build/` folder.

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

## 🌐 API Integration

The frontend communicates with the backend at:
```
Base URL: http://localhost:5000/api
```

### API Endpoints Used

**Authentication:**
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/profile` - Get current user profile

**DNS Records:**
- `POST /dns` - Create record
- `GET /dns` - Get all records (with query params)
- `GET /dns/:id` - Get single record
- `PUT /dns/:id` - Update record
- `DELETE /dns/:id` - Delete record

## 🚀 Deployment

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Drag & drop the 'build' folder to Netlify
```

### Deploy with Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🐛 Troubleshooting

### "Can't connect to backend"
- Ensure backend is running on port 5000
- Check `REACT_APP_API_URL` in `.env`
- Allow CORS in backend

### "Session expires after refresh"
- Token is stored in localStorage
- Should persist across page refreshes
- Check browser's localStorage settings

### "Records not loading"
- Verify JWT token is valid
- Check Network tab in DevTools
- Ensure backend API is responding

## 📚 Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## 🤝 Contributing

Feel free to submit pull requests or issues!

## 📄 License

Open source - MIT License

## 🔗 Related

- [Backend Repository](../back-end/README.md)
- [API Documentation](../back-end/README.md#api-documentation)

## 💡 Tips

- Use browser DevTools to inspect network requests
- Check browser console for debugging info
- Ensure backend .env is properly configured
- Test with different DNS record types
- Try filtering and searching functionality

---

**Happy DNS Managing! 🌐**
