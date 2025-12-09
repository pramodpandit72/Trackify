# ⚡ Quick Start Guide - Trackify

**Get running in 5 minutes!**

---

## 📋 Checklist

- [ ] Node.js installed (https://nodejs.org)
- [ ] MongoDB running locally or MongoDB Atlas account
- [ ] Port 5000 available
- [ ] Port 5173 available

---

## 🚀 Step 1: Create .env File

**Create file:** `backend/.env`

**Content:**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017
DB_NAME=trackify
CORS_ORIGIN=http://localhost:5173
```

**For MongoDB Atlas (instead of local):**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://username:password@cluster-name.mongodb.net/?retryWrites=true&w=majority
DB_NAME=trackify
CORS_ORIGIN=http://localhost:5173
```

---

## 🔧 Step 2: Install Dependencies

**Open Terminal in project root directory**

```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

---

## ▶️ Step 3: Start Backend

**In backend directory:**
```bash
npm run dev
```

**Expected output:**
```
✓ Backend listening on port 5000
```

**Test it:**
```bash
curl http://localhost:5000/
```

Should return:
```json
{"message":"Trackify backend is running"}
```

---

## ▶️ Step 4: Start Frontend

**Open NEW terminal in project root**

```bash
cd frontend
npm run dev
```

**Expected output:**
```
VITE v7.2.0  ready in 234 ms
➜  Local:   http://localhost:5173/
```

---

## 🌐 Step 5: Open in Browser

1. Go to: `http://localhost:5173`
2. Open DevTools (F12)
3. Check Console tab
4. Should see: **"Backend Connected"** ✅

---

## 🎯 Test the Integration

### Test Exercise Library
1. Click on "Exercise Library" in navigation
2. Should see 74 exercises loading
3. Try:
   - **Search:** Type exercise name
   - **Filter:** Select category or difficulty
   - **Pagination:** Go to next page

### Test Trainers
1. Click on "Trainers" 
2. Should see trainer list
3. Try filters and search

### Test Offline Mode
1. Stop backend (Ctrl+C in backend terminal)
2. Refresh frontend page
3. Exercises still load from fallback data! 🎉

---

## 🐛 Troubleshooting

### "Connection Refused"
```bash
# Make sure backend is running
cd backend && npm run dev
```

### "Port 5000 already in use"
Either:
- Stop process using port 5000
- Or change PORT in .env to 5001

### "MongoDB connection failed"
```bash
# If using local MongoDB, start it:
mongod

# Or verify MONGODB_URI in .env is correct
```

### No exercises showing
- Check browser console (F12)
- Frontend falls back to 74 local exercises
- Check Network tab for API errors

---

## 📁 Project Structure

```
d:\Trackcify\
├── backend/          ← Express + MongoDB server
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── utils/
│   │   └── index.js
│   ├── .env          ← CREATE THIS FILE
│   └── package.json
├── frontend/         ← React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── data/
│   │   └── App.jsx
│   ├── .env.local    ← Optional
│   └── package.json
└── README.md
```

---

## 📚 Useful Commands

### Backend
```bash
cd backend

# Start development server
npm run dev

# Start production server
npm start

# Install dependencies
npm install

# Run tests
npm test
```

### Frontend
```bash
cd frontend

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Install dependencies
npm install
```

---

## 🔗 API Endpoints

### Exercises
- `GET /api/exercises` - List all exercises
- `GET /api/exercises?search=push` - Search exercises
- `GET /api/exercises?category=Chest` - Filter by category
- `GET /api/exercises/:id` - Get single exercise
- `POST /api/exercises` - Create exercise
- `PUT /api/exercises/:id` - Update exercise
- `DELETE /api/exercises/:id` - Delete exercise

### Trainers
- `GET /api/trainers` - List trainers
- `GET /api/trainers/:id` - Get trainer details
- `POST /api/trainers` - Create trainer
- `PUT /api/trainers/:id` - Update trainer
- `DELETE /api/trainers/:id` - Delete trainer

### Reviews
- `GET /api/reviews` - List reviews
- `GET /api/reviews/trainer/:trainerId` - Get trainer reviews
- `POST /api/reviews` - Post review
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

### Jobs
- `GET /api/jobs` - List jobs
- `GET /api/jobs/:id` - Get job details
- `POST /api/jobs` - Create job
- `POST /api/jobs/:jobId/apply` - Apply for job
- `GET /api/jobs/:jobId/applications` - Get job applications
- `DELETE /api/jobs/:id` - Delete job

---

## 📊 Features Ready

✅ 74 exercises in library  
✅ Full CRUD for exercises  
✅ Search and filtering  
✅ Pagination support  
✅ Trainer management  
✅ Review system with auto-rating  
✅ Job listings  
✅ Job applications  
✅ Input validation  
✅ Error handling  
✅ Offline fallback  

---

## 🚨 Important Notes

1. **First request may be slow** - Database connection warm-up
2. **Exercises fallback** - Frontend will use local data if API fails
3. **Auto-rating** - Trainer rating updates automatically when reviews change
4. **Cascade delete** - Deleting trainer/job also deletes related data
5. **Validation** - All inputs are validated on backend

---

## 📖 Documentation

For more details, see:
- `INTEGRATION_CHECK.md` - Detailed integration verification
- `INTEGRATION_VERIFICATION_REPORT.md` - Full verification report
- `backend/API_DOCUMENTATION.md` - Complete API documentation
- `backend/ENHANCEMENT_SUMMARY.md` - What was enhanced

---

## ✅ You're Ready!

The system is fully configured and ready to use.

**Total setup time: ~5 minutes**

Just need MongoDB running and you're all set! 🎉

---

## 💬 Have Questions?

1. Check browser console (F12) for errors
2. Check backend terminal for logs
3. Verify .env file exists and is correct
4. Make sure MongoDB is running
5. Verify ports 5000 and 5173 are not blocked

**Everything else is configured correctly!** ✅

