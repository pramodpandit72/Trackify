
# Trackify Backend API Documentation

## Base URL
```
http://localhost:5000/api
```

---

## Exercise Endpoints

### List All Exercises
**GET** `/exercises`

**Query Parameters:**
- `page` (int): Page number (default: 1)
- `limit` (int): Items per page, max 100 (default: 12)
- `search` (string): Search by name, description, or target area
- `category` (string): Filter by category (Chest, Legs, Back, Shoulders, Arms, Core)
- `difficulty` (string): Filter by difficulty (Beginner, Intermediate, Advanced)
- `muscleGroup` (string): Filter by muscle group

**Example:**
```
GET /exercises?page=1&limit=12&category=Chest&difficulty=Beginner
```

**Response:**
```json
{
  "items": [...],
  "page": 1,
  "limit": 12,
  "total": 74,
  "totalPages": 7
}
```

---

### Get Exercise By ID
**GET** `/exercises/:id`

**Response:**
```json
{
  "_id": "...",
  "name": "Flat Barbell Bench Press",
  "category": "Chest",
  "muscleGroups": ["Chest", "Triceps", "Shoulders"],
  "difficulty": "Intermediate",
  "equipment": "Barbell",
  "description": "...",
  "instructions": "...",
  "targetArea": "Chest - Flat",
  "variants": ["Dumbbell", "Machine"],
  "image": null,
  "videoUrl": null
}
```

---

### Create Exercise
**POST** `/exercises`

**Request Body:**
```json
{
  "name": "Exercise Name",
  "category": "Chest",
  "muscleGroups": ["Chest", "Triceps"],
  "difficulty": "Intermediate",
  "equipment": "Barbell",
  "description": "Detailed description...",
  "instructions": "Step-by-step instructions...",
  "targetArea": "Chest - Flat",
  "variants": ["Dumbbell", "Machine"],
  "image": null,
  "videoUrl": null
}
```

**Validation:**
- `name` (required): min 3 characters
- `category` (required): one of [Chest, Legs, Back, Shoulders, Arms, Core]
- `muscleGroups` (required): array with at least one item
- `difficulty` (optional): one of [Beginner, Intermediate, Advanced]
- `description` (optional): min 10 characters

---

### Update Exercise
**PUT** `/exercises/:id`

**Request Body:** Same as POST (all fields optional except validation rules apply)

---

### Delete Exercise
**DELETE** `/exercises/:id`

---

### Get Exercise Categories
**GET** `/exercises/categories/list`

**Response:**
```json
{
  "categories": ["Arms", "Back", "Chest", "Core", "Legs", "Shoulders"]
}
```

---

### Get Muscle Groups
**GET** `/exercises/muscles/list`

**Response:**
```json
{
  "muscleGroups": ["Abs", "Back", "Biceps", "...]
}
```

---

## Trainer Endpoints

### List All Trainers
**GET** `/trainers`

**Query Parameters:**
- `page` (int): Page number (default: 1)
- `limit` (int): Items per page (default: 12)
- `search` (string): Search by name, title, bio, specialties
- `specialty` (string): Filter by specialty
- `minRating` (float): Minimum rating (0-5)
- `minPrice` (float): Minimum price per session
- `maxPrice` (float): Maximum price per session

**Example:**
```
GET /trainers?search=yoga&minRating=4&maxPrice=50
```

---

### Get Trainer By ID
**GET** `/trainers/:id`

**Response includes trainer details and their reviews**

---

### Create Trainer
**POST** `/trainers`

**Request Body:**
```json
{
  "name": "Trainer Name",
  "title": "Certified Personal Trainer",
  "bio": "About the trainer...",
  "specialties": ["Yoga", "Weight Loss"],
  "experienceYears": 5,
  "profilePicture": "url",
  "pricePerSession": 50,
  "location": "City, State",
  "tags": ["beginner-friendly", "online"]
}
```

---

### Update Trainer
**PUT** `/trainers/:id`

**Note:** `rating` and `reviewsCount` are auto-calculated and cannot be updated directly

---

### Delete Trainer
**DELETE** `/trainers/:id`

**Note:** Deletes trainer and all associated reviews

---

### Get Specialties
**GET** `/trainers/search/specialties`

**Response:**
```json
{
  "specialties": ["Cardio", "Pilates", "Weight Loss", "Yoga"]
}
```

---

## Review Endpoints

### List All Reviews
**GET** `/reviews`

**Query Parameters:**
- `page` (int): Page number (default: 1)
- `limit` (int): Items per page (default: 12)
- `trainer` (string): Filter by trainer ID
- `rating` (int): Filter by exact rating (1-5)

---

### Get Review By ID
**GET** `/reviews/:id`

---

### Create Review
**POST** `/reviews`

**Request Body:**
```json
{
  "trainer": "trainer_id",
  "userName": "Reviewer Name",
  "rating": 5,
  "comment": "Great trainer! Highly recommended."
}
```

**Validation:**
- `trainer` (required): Valid trainer ID
- `userName` (required): min 2 characters
- `rating` (required): 1-5
- `comment` (optional): min 5 characters

**Note:** Creates review and auto-updates trainer's rating and review count

---

### Update Review
**PUT** `/reviews/:id`

**Note:** Cannot change trainer ID. Updates trainer rating automatically

---

### Delete Review
**DELETE** `/reviews/:id`

**Note:** Auto-updates trainer rating and review count

---

### Get Trainer's Reviews
**GET** `/reviews/trainer/:trainerId`

**Query Parameters:**
- `page` (int): Page number
- `limit` (int): Items per page

---

## Job Endpoints

### List All Jobs
**GET** `/jobs`

**Query Parameters:**
- `page` (int): Page number (default: 1)
- `limit` (int): Items per page (default: 12)
- `search` (string): Search by title, description, location
- `isActive` (boolean): Filter by status (default: true)

---

### Get Job By ID
**GET** `/jobs/:id`

---

### Create Job
**POST** `/jobs`

**Request Body:**
```json
{
  "title": "Job Title",
  "description": "Detailed job description...",
  "location": "City, State",
  "salary": "$50,000 - $70,000",
  "isActive": true
}
```

**Validation:**
- `title` (required): min 3 characters
- `description` (optional): min 10 characters

---

### Update Job
**PUT** `/jobs/:id`

---

### Delete Job
**DELETE** `/jobs/:id`

**Note:** Deletes job and all associated applications

---

### Apply for Job
**POST** `/jobs/:jobId/apply`

**Request Body:**
```json
{
  "name": "Full Name",
  "email": "email@example.com",
  "phone": "+1234567890",
  "resumeLink": "https://...",
  "message": "Optional cover letter..."
}
```

**Validation:**
- `name` (required): min 2 characters
- `email` (required): valid email format
- `phone` (optional): valid phone format

---

### Get All Job Applications (Admin)
**GET** `/jobs/applications/all`

**Query Parameters:**
- `page` (int): Page number
- `limit` (int): Items per page

---

### Get Job Applications
**GET** `/jobs/:jobId/applications`

**Query Parameters:**
- `page` (int): Page number
- `limit` (int): Items per page

---

### Get Application By ID
**GET** `/jobs/applications/:appId`

---

### Delete Application
**DELETE** `/jobs/applications/:appId`

---

## Error Responses

### Validation Error
```json
{
  "message": "Validation failed",
  "errors": [
    "Exercise name is required and must be at least 3 characters",
    "Valid category is required"
  ]
}
```

### Not Found Error
```json
{
  "message": "Exercise not found"
}
```

### Server Error
```json
{
  "message": "Internal Server Error",
  "stack": "..." (only in development)
}
```

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request (validation error) |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## Features

### ✅ Implemented
- Full CRUD for all resources
- Pagination on all list endpoints
- Search and filtering
- Input validation with detailed error messages
- Auto-calculated fields (trainer rating/reviews)
- Cascade delete (e.g., deleting trainer deletes reviews)
- Proper HTTP methods and status codes
- Indexed database queries for performance

### 🔒 Security Considerations
- Email validation on job applications
- Immutable `createdAt` fields
- Protected fields cannot be modified (e.g., trainer rating)
- Input sanitization and length validation

### 📈 Performance
- Database indexes on frequently searched fields
- Pagination limits (max 100 items per page)
- Population only when needed
- Efficient filtering with MongoDB regex

