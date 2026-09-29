# FitBuddy – Application Architecture

## 1. Architecture Overview

FitBuddy follows a modular FastAPI-based architecture.

### Main Components

- Frontend: HTML + Jinja2 templates
- Backend: FastAPI
- AI Layer: Google Gemini Pro and Gemini Flash
- Database: SQLite with SQLAlchemy

## 2. System Architecture

User
↓
HTML + Jinja2 Frontend
↓
FastAPI Backend
↓
Gemini AI Layer
↓
SQLite Database

## 3. Frontend Responsibilities

The frontend provides user interaction through:

- index.html – User input form
- result.html – Workout plan, nutrition tips and feedback
- all_users.html – Admin panel

## 4. Backend Responsibilities

FastAPI backend is responsible for:

- Receiving user form data
- Validating user input
- Calling Gemini models
- Generating personalized workout plans
- Generating nutrition recommendations
- Processing user feedback
- Updating workout plans
- Storing user information and generated plans
- Rendering dynamic Jinja2 templates

## 5. AI Integration

### Gemini Pro

Used for:

- Structured 7-day workout plan generation
- Workout plan updates
- Processing user feedback
- Context-aware fitness responses

### Gemini Flash

Used for:

- Fast nutrition tips
- Quick AI responses
- Lightweight API calls

## 6. Database

SQLite is used for persistent storage.

SQLAlchemy is used as the ORM layer.

The database stores:

- User information
- Fitness goals
- Workout plans
- Nutrition recommendations
- User feedback

## 7. AI Integration Flow

User enters:

- Name
- Age
- Weight
- Fitness goal
- Workout intensity

↓

FastAPI receives the information

↓

Gemini Pro generates a structured 7-day workout plan

↓

Gemini Flash generates nutrition tips

↓

Results are displayed through Jinja2 templates

↓

User feedback is submitted

↓

FastAPI sends feedback to Gemini Pro

↓

Workout plan is updated

## 8. Technology Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, Jinja2 |
| Backend | FastAPI |
| AI | Google Gemini |
| Database | SQLite |
| ORM | SQLAlchemy |
| Language | Python |

## 9. Architecture Goals

- Modular design
- Simple API integration
- Fast AI responses
- Persistent user data
- Easy maintenance
- Scalable application structure
