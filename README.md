# 👨🏽‍💻 Coding Challenges App

A web application that generates personalized coding challenges using AI, with user authentication and progress tracking.

## Features

- 🤖 **AI-Powered Challenges**: Generate coding challenges with varying difficulty levels using OpenAI
- 🔐 **User Authentication**: Secure login/signup powered by Clerk
- 📊 **Progress Tracking**: View your challenge history and track performance
- 🎯 **Difficulty Levels**: Choose from easy, medium, and hard challenges
- 💾 **Persistent Storage**: SQLite database with SQLAlchemy ORM
- ⚡ **Modern Stack**: FastAPI backend + React frontend with Vite

## Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - Database ORM
- **SQLite** - Lightweight database
- **OpenAI API** - AI challenge generation
- **Clerk** - Authentication service

### Frontend
- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Clerk React** - Authentication components

## Quick Start

### Backend Setup
```bash
cd backend
uv sync
source .venv/bin/activate
uv run server.py
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Environment Variables
Create `.env` files in both `backend/` and `frontend/` directories:

**Backend (.env):**
```
CLERK_SECRET_KEY=your_clerk_secret_key
OPENAI_API_KEY=your_openai_api_key
```

**Frontend (.env):**
```
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

## API Endpoints

- `POST /api/generate-challenge` - Generate new coding challenge
- `GET /api/my-history` - Get user's challenge history
- `GET /api/quota` - Check user's daily challenge quota
- `POST /webhooks/clerk` - Clerk webhook for user management

## Demo

https://github.com/user-attachments/assets/00b6b8b4-37e9-46df-a172-9ae6855fb9ec

## Project Structure

```
├── backend/                 # FastAPI server
│   ├── src/
│   │   ├── routes/         # API endpoints
│   │   ├── database/       # Database models and connection
│   │   ├── ai_generator.py # OpenAI integration
│   │   └── app.py         # Main application
│   └── pyproject.toml
├── frontend/               # React application
│   ├── src/
│   │   ├── auth/          # Authentication components
│   │   ├── challenge/     # Challenge generation UI
│   │   ├── history/       # Progress tracking
│   │   └── layout/        # App layout components
│   └── package.json
└── README.md
```

## License

MIT
