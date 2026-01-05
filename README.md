# TedAI - Autonomous Research Agent

A full-stack AI assistant with real-time web search capabilities. Built with React, Node.js, Groq AI (Llama 3.1), and Tavily Search.

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20+-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue.svg)

## Features

- AI-powered chat using Groq (Llama 3.1 70B)
- Real-time web search with Tavily API
- Session-based conversation memory
- Modern responsive UI with dark theme
- Fast response times

## Tech Stack

**Frontend:** React 19, Vite, Tailwind CSS, Lucide Icons  
**Backend:** Node.js, Express, Groq SDK, Tavily API

## Prerequisites

- Node.js v18+
- [Groq API Key](https://console.groq.com/)
- [Tavily API Key](https://tavily.com/)

## Setup

### 1. Backend Setup

```bash
cd server
npm install
cp .env.example .env
```

Edit `.env` with your API keys:

```env
GROQ_API_KEY=your_groq_api_key
TAVILY_API_KEY=your_tavily_api_key
PORT=5001
```

### 2. Frontend Setup

```bash
cd client
npm install
```

## Running the Application

**Terminal 1 - Backend:**
```bash
cd server
npm start
```
Backend runs at: `http://localhost:5001`

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```
Frontend runs at: `http://localhost:5173`

Open `http://localhost:5173` in your browser.

## API Endpoints

### POST /api/chat
Send a message to the AI.

**Request:**
```json
{
  "query": "Your question here",
  "sessionId": "optional-session-id"
}
```

**Response:**
```json
{
  "response": "AI response",
  "sessionId": "session-id"
}
```

### POST /api/chat/clear
Clear chat history for a session.

### GET /api/health
Check server status.

## Project Structure

```
genai-fullstack-assistant/
├── server/                 # Node.js backend
│   ├── index.js           # API routes
│   ├── .env              # Environment variables
│   └── package.json
│
└── client/                # React frontend
    ├── src/
    │   ├── components/
    │   ├── App.jsx
    │   └── App.css
    ├── index.html
    └── package.json
```

## Troubleshooting

**Server won't start:**
- Verify API keys in `.env`
- Check if port 5001 is available
- Run `npm install` again

**Connection errors:**
- Ensure backend is running on port 5001
- Check browser console for errors
- Verify API keys are valid

## License

MIT License

---

**Built with Groq AI and Tavily Search**
