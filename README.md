# TugMath Arena

TugMath Arena is a polished MERN-style two-player arithmetic game designed for horizontal tablets, landscape phones, and classroom teaching panels. Players answer arithmetic questions at the same time; the first correct answer wins the round, earns a point, and pulls the animated rope toward their side.

## Features

- Landscape-first multiplayer game layout
- Difficulty selector for Easy, Medium, and Hard arithmetic
- Simultaneous player inputs with round-level lock states
- Framer Motion rope physics, score animations, countdowns, and transitions
- Timer-driven rounds with timeout handling
- Final winner screen with confetti and match statistics
- Fastest responder, accuracy, streak, and round history tracking
- Local fallback persistence plus Express/MongoDB match storage

## Tech Stack

- React + Vite
- TailwindCSS
- Framer Motion
- React Router
- Axios
- React Icons
- react-confetti
- Node.js + Express.js
- MongoDB Atlas + Mongoose

## Architecture

```text
src/
 ├── components/
 │    ├── layout/
 │    ├── game/
 │    ├── animations/
 │    ├── ui/
 ├── hooks/
 │    ├── useGameEngine.js
 │    ├── useTimer.js
 ├── pages/
 │    ├── Home.jsx
 │    ├── Game.jsx
 │    ├── Result.jsx
 ├── services/
 │    ├── api.js
 ├── utils/
 │    ├── questionGenerator.js
 │    ├── scoring.js
 │    ├── gameHelpers.js
 ├── context/
 │    ├── GameContext.jsx
 ├── App.jsx
 ├── main.jsx

server/
 ├── routes/
 ├── controllers/
 ├── models/
 ├── middleware/
 ├── config/
 ├── server.js
```

## Setup

Install dependencies:

```bash
npm install
```

Create an environment file:

```bash
cp .env.example .env
```

Set your MongoDB Atlas connection string:

```text
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/tugmath
VITE_API_URL=http://localhost:5000/api
PORT=5000
```

Run the frontend:

```bash
npm run dev
```

Run the backend in another terminal:

```bash
npm run server
```

Build for production:

```bash
npm run build
```

## API Routes

| Method | Route | Description |
| --- | --- | --- |
| `GET` | `/api/health` | Health check |
| `POST` | `/api/match` | Save a completed match |
| `GET` | `/api/matches` | Fetch recent matches |

## Screenshots

Add screenshots of the home screen, active game board, rope animation, and final results screen after running the app locally.

## Future Improvements

- Online multiplayer rooms with sockets
- Persistent leaderboard view
- Teacher dashboard for class-level progress
- Sound effects and haptic feedback
- Question packs aligned to curriculum levels
- Authenticated player profiles
