# GoPratle

GoPratle is a full-stack event requirement platform that helps users create and manage event briefs for planners, performers, and crew. The project includes:

- Express + MongoDB backend API
- Next.js frontend with App Router and Tailwind CSS
- Multi-step requirement form with validation
- Requirement list and detail views

## Project structure

```text
GoPratle/
├── backend/       # Express API and MongoDB models/routes
├── frontend/      # Next.js frontend application
├── README.md      # Project overview and setup instructions
└── .gitignore     # (if present in your local setup)
```

## Backend

The backend lives in `backend/` and exposes APIs for creating and retrieving event requirements.

### Prerequisites

- Node.js 18+ recommended
- MongoDB connection configured through environment variables

### Environment

Copy `backend/.env.example` to `backend/.env`, then replace the MongoDB placeholder
with your connection string. The local `.env` file is ignored by Git:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/gopratle
```

### Run backend

```bash
cd backend
npm install
npm run dev
```

The API runs at:

- http://localhost:5000/api/requirements

## Frontend

The frontend lives in `frontend/` and connects to the backend through a local API proxy.

### Environment

Copy `frontend/.env.example` to `frontend/.env.local` for local development.
`.env.local` is ignored by Git and should not be committed:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Run frontend

```bash
cd frontend
npm install
npm run dev
```

The app runs at:

- http://localhost:3000

## Main features

- Landing page with marketing content and CTA sections
- Multi-step requirement form
- Category-based details for:
  - planner
  - performer
  - crew
- Validation for required fields and date ordering
- Requirement list screen
- Requirement detail screen by ID

## API contract

### Create requirement

`POST /api/requirements`

Request body example:

```json
{
  "eventName": "Annual Music Festival",
  "eventType": "Music Festival",
  "startDate": "2026-10-20",
  "endDate": "2026-10-24",
  "location": "New Delhi",
  "venue": "City Convention Centre",
  "category": "performer",
  "details": {
    "performerType": "Singer",
    "genre": "Rock",
    "numberOfPerformers": 3,
    "expectedBudget": 25000,
    "additionalRequirements": "Need a lead vocalist and backup musicians."
  }
}
```

### Get all requirements

`GET /api/requirements`

### Get requirement by id

`GET /api/requirements/:id`

## Notes

- The frontend is designed to work against the existing local backend without modifying the backend code.
- The backend validation expects the request payload to match its contract, especially category and details fields.
- If MongoDB is not running, the API will not be able to persist records.

## Troubleshooting

- If the frontend cannot reach the backend, confirm MongoDB is running and the backend is listening on port 5000.
- If the app shows CORS issues, make sure the frontend proxy is active and `NEXT_PUBLIC_API_URL` points to `http://localhost:5000`.
- If the form fails, verify the selected category matches one of `planner`, `performer`, or `crew`.

## Useful commands

```bash
# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm run dev

# Production build check
cd frontend
npm run build
```
