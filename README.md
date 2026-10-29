# 🚀 PromptToInvoice

AI-Powered Invoice Generator for US/Europe Market with Clerk Authentication and Google Gemini AI.

## 📋 Features

- ✅ AI-powered invoice generation (Google Gemini)
- ✅ User authentication (Clerk)
- ✅ Invoice management (Create, Read, Update, Delete)
- ✅ Business profile management
- ✅ Multi-currency support (USD, EUR)
- ✅ Dashboard with analytics
- ✅ Responsive design

## 🛠️ Tech Stack

**Frontend:**
- React + Vite
- Tailwind CSS
- Clerk (Authentication)
- React Router

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- Clerk (Auth validation)
- Google Gemini AI

## 🚀 Quick Start

### **Option 1: Run Everything at Once (Recommended)**

```bash
# Install all dependencies (first time only)
npm run install:all

# Run both frontend and backend
npm run dev
```

That's it! 🎉

- Frontend: http://localhost:5173
- Backend: http://localhost:4000

### **Option 2: Run Separately**

```bash
# Terminal 1 - Backend
cd backend
npm install  # first time only
npm start

# Terminal 2 - Frontend
cd frontend
npm install  # first time only
npm run dev
```

## ⚙️ Environment Setup

### **1. Backend Environment Variables**

Create `backend/.env`:

```env
# Clerk Authentication
CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_secret_here

# Google Gemini AI
GEMINI_API_KEY=your_gemini_key_here

# MongoDB Database
MONGODB_URI=your_mongodb_connection_string

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

### **2. Frontend Environment Variables**

Create `frontend/.env`:

```env
# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
```

## 🔑 Getting API Keys

### **Clerk (Authentication):**
1. Go to https://clerk.com
2. Sign up and create application
3. Copy Publishable Key and Secret Key
4. Add to `.env` files

### **Google Gemini (AI):**
1. Go to https://aistudio.google.com
2. Sign in with Google account
3. Click "Get API key"
4. Copy key and add to `backend/.env`

### **MongoDB (Database):**
1. Go to https://mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Add to `backend/.env`

## 📦 Available Scripts

```bash
# Run both frontend and backend
npm run dev
npm start  # alias for npm run dev

# Run backend only
npm run dev:backend

# Run frontend only
npm run dev:frontend

# Install all dependencies
npm run install:all
```

## 📁 Project Structure

```
PromptToInvoice-SaaS/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Route controllers
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── .env             # Backend environment variables
│   └── server.js        # Express server
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── assets/      # Images, styles
│   │   └── main.jsx     # Entry point
│   ├── .env             # Frontend environment variables
│   └── index.html       # HTML template
├── package.json         # Root package.json (run scripts)
└── README.md           # This file
```

## 🌐 API Endpoints

### **Invoices:**
- `GET /api/invoices` - Get all invoices
- `GET /api/invoices/:id` - Get single invoice
- `POST /api/invoices` - Create invoice
- `PUT /api/invoices/:id` - Update invoice
- `DELETE /api/invoices/:id` - Delete invoice

### **Business Profile:**
- `GET /api/businessProfile/me` - Get user's profile
- `POST /api/businessProfile` - Create profile
- `PUT /api/businessProfile/:id` - Update profile

### **AI Generation:**
- `POST /api/ai/generate` - Generate invoice from text

## 🔒 Security Notes

**Important:** Never commit `.env` files to git!

Make sure `.env` is in `.gitignore`:

```
# .gitignore
.env
.env.local
.env.*.local
```

## 🐛 Troubleshooting

### **Port already in use:**
```bash
# Windows
netstat -ano | findstr :4000
taskkill /PID <PID> /F

# Change port in backend/server.js if needed
```

### **MongoDB connection error:**
```bash
# Check your MONGODB_URI in backend/.env
# Make sure IP is whitelisted in MongoDB Atlas
```

### **Clerk authentication error:**
```bash
# Verify keys in both .env files
# Restart both servers after changing .env
```

## 📚 Documentation

- [Clerk Docs](https://clerk.com/docs)
- [Google Gemini Docs](https://ai.google.dev/docs)
- [MongoDB Docs](https://docs.mongodb.com)
- [React Docs](https://react.dev)
- [Express Docs](https://expressjs.com)

## 🎯 Next Steps

1. ✅ Set up environment variables
2. ✅ Run `npm run install:all`
3. ✅ Run `npm run dev`
4. ✅ Open http://localhost:5173
5. ✅ Sign up and start creating invoices!

## 📝 License

MIT

## 🤝 Contributing

Contributions welcome! Please open an issue or submit a pull request.

---

**Made with ❤️ for US/Europe Market**
