# Quick Reference Guide - Trackify Backend

## 🚀 Running the Backend

```bash
# Install dependencies (if not already done)
npm install

# Start development server
npm run dev

# Or start production server
npm start

# Seed database with initial data (if available)
npm run seed
```

Server runs on `http://localhost:5000`

---

## 📡 Core API Endpoints

### Exercises (6 new endpoints)
```
GET    /api/exercises                     # List with pagination & filters
POST   /api/exercises                     # Create new exercise
GET    /api/exercises/:id                 # Get single exercise
PUT    /api/exercises/:id                 # Update exercise
DELETE /api/exercises/:id                 # Delete exercise
GET    /api/exercises/categories/list     # Get all categories
GET    /api/exercises/muscles/list        # Get all muscle groups
```

### Trainers (1 new endpoint)
```
GET    /api/trainers                      # List with advanced filters
POST   /api/trainers                      # Create trainer
GET    /api/trainers/:id                  # Get trainer + reviews
PUT    /api/trainers/:id                  # Update trainer
DELETE /api/trainers/:id                  # Delete trainer
GET    /api/trainers/search/specialties   # Get unique specialties
```

### Reviews (3 new endpoints + improved)
```
GET    /api/reviews                       # List with filters
POST   /api/reviews                       # Create review (auto-updates trainer)
GET    /api/reviews/:id                   # Get single review
PUT    /api/reviews/:id                   # Update review (auto-updates trainer)
DELETE /api/reviews/:id                   # Delete review (auto-updates trainer)
GET    /api/reviews/trainer/:trainerId    # Get all reviews for trainer
```

### Jobs (5 new endpoints + improved)
```
GET    /api/jobs                          # List jobs with pagination
POST   /api/jobs                          # Create job
GET    /api/jobs/:id                      # Get single job
PUT    /api/jobs/:id                      # Update job
DELETE /api/jobs/:id                      # Delete job (+ applications)
POST   /api/jobs/:jobId/apply             # Apply for job
GET    /api/jobs/:jobId/applications      # Get applications for job
GET    /api/jobs/applications/all         # Get all applications
GET    /api/jobs/applications/:appId      # Get single application
DELETE /api/jobs/applications/:appId      # Delete application
```

---

## 🔍 Filtering Examples

### Search & Filter Exercises
```
/api/exercises?category=Chest&difficulty=Beginner
/api/exercises?search=press&page=1&limit=10
/api/exercises?muscleGroup=Biceps
```

### Filter Trainers
```
/api/trainers?search=yoga&minRating=4.5
/api/trainers?specialty=Weight%20Loss&minPrice=30&maxPrice=80
```

### Filter Jobs
```
/api/jobs?search=fitness&isActive=true
```

### Filter Reviews
```
/api/reviews?trainer=xxx&rating=5
```

---

## ✅ Validation Rules

### Exercise
- **name**: Required, 3+ characters
- **category**: Required, one of [Chest, Legs, Back, Shoulders, Arms, Core]
- **muscleGroups**: Required, at least one
- **difficulty**: Optional, one of [Beginner, Intermediate, Advanced]
- **description**: Optional, 10+ characters if provided

### Trainer
- **name**: Required, 2+ characters
- **rating**: 0-5 (auto-calculated, don't set manually)
- **pricePerSession**: Positive number
- **experienceYears**: Positive number

### Review
- **trainer**: Required, valid trainer ID
- **userName**: Required, 2+ characters
- **rating**: Required, 1-5
- **comment**: Optional, 5+ characters if provided

### Job
- **title**: Required, 3+ characters
- **description**: Optional, 10+ characters if provided

### Job Application
- **name**: Required, 2+ characters
- **email**: Required, valid email format
- **phone**: Optional, valid phone format

---

## 📊 Response Format

### Success Response (List)
```json
{
  "items": [...],
  "page": 1,
  "limit": 12,
  "total": 100,
  "totalPages": 9
}
```

### Success Response (Single Item)
```json
{
  "message": "Exercise created successfully",
  "data": { ... }
}
```

### Error Response
```json
{
  "message": "Validation failed",
  "errors": ["Field error 1", "Field error 2"]
}
```

---

## 🔐 Protected Fields

These fields **cannot be manually updated**:
- `trainer.rating` - Auto-calculated from reviews
- `trainer.reviewsCount` - Auto-calculated from reviews
- `createdAt` - Immutable on all models
- `review.trainer` - Cannot change which trainer a review is for
- `jobApplication.jobId` - Cannot change which job it's for

---

## 📚 Full Documentation

For detailed API documentation, see: **`API_DOCUMENTATION.md`**

For implementation details, see: **`ENHANCEMENT_SUMMARY.md`**

---

## 🛠️ Common Tasks

### Add a New Exercise
```bash
curl -X POST http://localhost:5000/api/exercises \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Exercise Name",
    "category": "Chest",
    "muscleGroups": ["Chest"],
    "difficulty": "Beginner",
    "description": "At least 10 characters..."
  }'
```

### Update Exercise
```bash
curl -X PUT http://localhost:5000/api/exercises/xxx \
  -H "Content-Type: application/json" \
  -d '{"difficulty": "Intermediate"}'
```

### Create Trainer
```bash
curl -X POST http://localhost:5000/api/trainers \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Trainer",
    "specialties": ["Yoga", "Pilates"],
    "pricePerSession": 50
  }'
```

### Post Review (auto-updates trainer rating)
```bash
curl -X POST http://localhost:5000/api/reviews \
  -H "Content-Type: application/json" \
  -d '{
    "trainer": "trainer_id",
    "userName": "User",
    "rating": 5,
    "comment": "Great trainer!"
  }'
```

### Post Job
```bash
curl -X POST http://localhost:5000/api/jobs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Fitness Coach",
    "description": "Looking for experienced coach...",
    "location": "New York",
    "salary": "$50k-$70k"
  }'
```

### Apply for Job
```bash
curl -X POST http://localhost:5000/api/jobs/jobid/apply \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Applicant",
    "email": "jane@example.com",
    "phone": "+1234567890",
    "resumeLink": "https://...",
    "message": "I'm interested!"
  }'
```

---

## 🚨 Common Error Messages

| Error | Meaning | Solution |
|-------|---------|----------|
| "Validation failed" | Input didn't meet requirements | Check error details, review field rules |
| "Not found" | Resource doesn't exist | Verify ID is correct |
| "Trainer not found" | Review references non-existent trainer | Use valid trainer ID |
| "Job not found" | Job ID is invalid | Create job first, then apply |
| "Missing required fields" | Required field empty | Fill in all required fields |

---

## ⚡ Performance Tips

1. **Pagination**: Always use `limit` parameter, don't fetch all items
   ```
   /api/exercises?page=1&limit=12  ✅ Good
   /api/exercises                   ❌ Could be slow with large dataset
   ```

2. **Filtering**: Use filters to reduce results
   ```
   /api/trainers?minRating=4        ✅ Filters early
   /api/trainers?page=100           ❌ Gets all pages first
   ```

3. **Search**: Specific searches are better
   ```
   /api/exercises?search=press&category=Chest    ✅ Specific
   /api/exercises?search=exercise                 ⚠️ Too broad
   ```

---

## 📈 Monitoring

Check MongoDB indexes are working:
```bash
# Connect to MongoDB
mongo trackify

# View indexes
db.exercises.getIndexes()
db.trainers.getIndexes()
db.reviews.getIndexes()
```

---

## 🔄 Database Schema Overview

### Exercise
- name, category, muscleGroups, difficulty
- equipment, description, instructions, targetArea
- variants, image, videoUrl
- createdAt, updatedAt

### Trainer
- name, title, bio, specialties
- rating (auto), reviewsCount (auto)
- experienceYears, profilePicture, pricePerSession
- location, tags
- createdAt, updatedAt

### Review
- trainer (ObjectId), userName, rating, comment
- createdAt, updatedAt

### Job
- title, description, location, salary
- isActive, postedAt, updatedAt

### JobApplication
- jobId (ObjectId), name, email, phone
- resumeLink, message
- appliedAt

---

## ❓ FAQ

**Q: How do trainer ratings work?**
A: Auto-calculated from all reviews. When you add/update/delete a review, trainer rating recalculates.

**Q: Can I edit a review after posting?**
A: Yes, PUT /api/reviews/:id. Trainer rating updates automatically.

**Q: What happens when I delete a trainer?**
A: Trainer and all their reviews are deleted.

**Q: Can I search across multiple fields?**
A: Yes, use the `search` parameter which searches name, description, bio, etc.

**Q: What's the pagination limit?**
A: Max 100 items per page for performance reasons.

**Q: Can I sort results?**
A: Currently sorts by newest first (createdAt: -1). Custom sorting can be added if needed.

---

**Status**: ✅ Production Ready

**Last Updated**: December 8, 2025

**Maintainer**: Trackify Team

