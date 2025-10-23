# 🔷 ZERODHA Clone - Full-Stack Investment Platform

> A production-ready stock portfolio management system with simulated trading, built with MERN stack and modern UI/UX principles.

## 🎯 Quick Overview

Full-stack investment tracking platform enabling users to simulate stock trading, track portfolios, and analyze performance in real-time. Features complete buy/sell workflow with automatic portfolio and protected authentication.

## ⚡ Core Features

- **Live Trading Simulation** - Complete buy/sell functionality with order execution
- **Real-time Portfolio Tracking** - Automatic orders and holdings updates
- **Secure Authentication** - JWT + Passport.js with bcrypt encryption (Login required for all features)
- **Interactive Analytics** - Chart.js visualizations for portfolio distribution
- **Fully Responsive** - Mobile-first design, works seamlessly on all devices
- **Material UI Design** - Professional, production-grade interface

## 🛠️ Tech Stack

**Backend:** Node.js • Express.js • MongoDB • Mongoose • JWT • Passport.js  
**Frontend:** React 19 • React Router • Axios • React Toastify  
**Dashboard:** React 18 • Material-UI • Chart.js • Emotion  
**Security:** bcrypt • CORS • Cookie-parser • Protected Routes

## 📦 Project Structure

```
ZERODHA/
├── backend/        # Express API + MongoDB models + Auth
├── frontend/       # Landing page + Authentication
└── dashboard/      # Trading dashboard + Portfolio analytics
```

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/KrishanSingh2026/Zerodha.git
cd Zerodha

# Backend setup
cd backend
npm install
# Create .env file with your MongoDB URI and secrets
npm start

# Frontend setup (new terminal)
cd ../frontend
npm install
npm start

# Dashboard setup (new terminal)
cd ../dashboard
npm install
npm start
```

### Environment Variables

Create a `.env` file in the `backend` directory:

```env
PORT=3001
MONGODB_URI=your_mongodb_connection_string
TOKEN_KEY=myprojectcode
```

## 🚀 Key Highlights

✅ **Complete Trading Flow** - Browse → Buy → Track Orders → Monitor Holdings → Sell  
✅ **Auto Portfolio Sync** - Orders automatically reflect in holdings  
✅ **Production Security** - JWT tokens, HTTP-only cookies, password hashing  
✅ **Protected Routes** - All content requires authentication (no access without login/signup)  
✅ **Responsive Design** - Tested on mobile to desktop  
✅ **RESTful API** - Clean architecture with proper error handling

## 🎓 Technical Skills Demonstrated

- Full-stack MERN development
- RESTful API design & implementation
- JWT authentication & authorization
- MongoDB schema design & relationships
- State management & data flow
- Responsive UI/UX with Material-UI
- Chart.js data visualization
- Git version control

## 👤 Author

**Krishan Singh**  
[GitHub](https://github.com/KrishanSingh2026)

**📌 Note:** Educational project - No real trading or financial transactions.
