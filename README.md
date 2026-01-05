# TedAI - Autonomous Research Agent

A modern, full-stack AI-powered research assistant with real-time web search capabilities. Built with React, Node.js, Groq AI (Llama 3.1), and Tavily Search API.

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20+-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-CDN-38B2AC?logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue.svg)

## Overview

TedAI is an intelligent conversational AI assistant that combines the power of Groq's Llama 3.1 language model with Tavily's real-time web search capabilities. The application features a modern dark lavender-themed interface with glassmorphism effects, custom branding, and smooth animations.

## Features

### Core Functionality
- **AI-Powered Chat** - Natural language conversations using Groq (Llama 3.1 70B)
- **Real-Time Web Search** - Integrated Tavily search for up-to-date information
- **Conversation Memory** - Session-based chat history with context retention
- **Fast Response Times** - Optimized with Groq's high-performance inference

### User Interface
- **Responsive Design** - Mobile-first approach, works on all devices
- **Smooth Animations** - Pop-in effects, floating elements, and transitions
- **Loading States** - Animated "thinking" indicator during processing

### Technical Highlights
- **Modern Stack** - React 19, Vite, Express, Tailwind CSS
- **Component Architecture** - Reusable React components with proper state management
- **RESTful API** - Clean backend API with proper error handling
- **Cross-Origin Support** - CORS configured for local development

## Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| React 19.2 | UI framework with hooks |
| Vite 7.2 | Build tool and dev server |
| Tailwind CSS | Utility-first styling (CDN) |
| Lucide React | Modern icon library |
| Nunito Font | Typography |

### Backend
| Technology | Purpose |
|-----------|---------|
| Node.js 20+ | Runtime environment |
| Express 4.x | Web framework |
| Groq SDK | Llama 3.1 AI integration |
| Tavily Core | Real-time web search |
| CORS | Cross-origin resource sharing |

## Prerequisites

Before starting, ensure you have:

1. **Node.js v18+** - [Download](https://nodejs.org/)
2. **npm** (included with Node.js)
3. **Groq API Key** - [Get free key](https://console.groq.com/)
4. **Tavily API Key** - [Get free key](https://tavily.com/)

## Installation

### 1. Navigate to Project Directory

```bash
cd genai-fullstack-assistant
```

### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

Edit the `.env` file with your API keys:

```env
GROQ_API_KEY=your_groq_api_key_here
TAVILY_API_KEY=your_tavily_api_key_here
PORT=5001
```

### 3. Frontend Setup

```bash
# Navigate to client directory (from project root)
cd client

# Install dependencies
npm install
```

## Running the Application

You need two terminal windows to run both servers:

### Terminal 1: Start Backend

```bash
cd server
npm start
```

Server will run at: **http://localhost:5001**

### Terminal 2: Start Frontend

```bash
cd client
npm run dev
```

Frontend will run at: **http://localhost:5173**

### Access the Application

Open your browser and navigate to **http://localhost:5173**

## Project Structure

```
genai-fullstack-assistant/
├── server/                     # Backend application
│   ├── index.js               # Express server with API routes
│   ├── package.json           # Backend dependencies
│   ├── .env                   # Environment variables (gitignored)
│   └── .env.example          # Environment template
│
├── client/                    # Frontend application
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatInterface.jsx      # Main chat UI component
│   │   │   └── TeddyLogo.jsx         # Custom logo component
│   │   ├── App.jsx                    # Root component with header
│   │   ├── App.css                    # Dark lavender theme styles
│   │   ├── main.jsx                   # React entry point
│   │   └── index.css                  # Base styles
│   ├── index.html                     # HTML entry with Tailwind CDN
│   ├── package.json                   # Frontend dependencies
│   └── vite.config.js                # Vite configuration
│
├── README.md                  # This file
└── .gitignore                # Git ignore rules
```

## API Documentation

### POST /api/chat

Send a message to the AI assistant.

**Request Body:**
```json
{
  "query": "What are the latest developments in AI?",
  "sessionId": "optional-session-id"
}
```

**Response:**
```json
{
  "response": "Based on recent information...",
  "sessionId": "generated-or-provided-session-id"
}
```

### POST /api/chat/clear

Clear conversation history for a session.

**Request Body:**
```json
{
  "sessionId": "session-id-to-clear"
}
```

**Response:**
```json
{
  "message": "History cleared successfully"
}
```

### GET /api/health

Health check endpoint to verify server status.

**Response:**
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

## Development

### Backend Development Mode

For auto-restart on file changes:

```bash
cd server
npm run dev  # Uses Node.js --watch flag
```

### Frontend Development Mode

Vite provides hot module replacement (HMR):

```bash
cd client
npm run dev
```

### Building for Production

```bash
cd client
npm run build
```

Build output will be in `client/dist/`

## Troubleshooting

### Backend Issues

**Server won't start:**
- Verify API keys are correctly set in `.env`
- Check if port 5001 is already in use
- Run `npm install` again to ensure dependencies are installed
- Check terminal for error messages

**API errors:**
- Confirm Groq API key is valid and active
- Confirm Tavily API key is valid and active
- Check API rate limits on your provider dashboards
- Review server console logs for detailed error messages

### Frontend Issues

**Connection errors:**
- Ensure backend server is running on port 5001
- Check browser console for CORS errors
- Verify `API_URL` in `ChatInterface.jsx` points to `http://localhost:5001/api/chat`

**UI not loading:**
- Clear browser cache and reload
- Check browser console for JavaScript errors
- Verify all dependencies installed with `npm install`

## Design Features

### Color Palette
- **Primary:** Lavender (#b19cd9)
- **Secondary:** Purple (#8b5cf6, #a78bfa)
- **Background:** Deep dark (#0f0820, #1a0f2e)
- **Text:** Light lavender (#ddd6fe, #f5e6ff)

### Custom Components
- **TeddyLogo** - Gradient circle with ears in three sizes
- **Glassmorphism Cards** - Frosted glass effect with backdrop blur
- **Gradient Text** - Lavender-to-purple gradients for headings
- **Custom Scrollbar** - Hidden for cleaner appearance

### Animations
- Pop-in effect for messages
- Floating logo and avatars
- Pulse effects on interactive elements
- Smooth transitions throughout

## Portfolio Value

This project demonstrates:

- Full-stack JavaScript development
- Modern React patterns (hooks, component composition)
- RESTful API design and implementation
- External API integration (AI and search services)
- Professional UI/UX design with custom branding
- State management and session handling
- Responsive, mobile-first design
- Error handling and user feedback
- Environment configuration and security best practices

## Contributing

This is a portfolio project, but suggestions and feedback are welcome. Feel free to fork and customize for your own use.

## License

MIT License - Free to use for personal and educational purposes.

## Acknowledgments

- **Groq** - High-performance AI inference with Llama 3.1
- **Tavily** - Real-time web search capabilities
- **Tailwind CSS** - Utility-first styling framework
- **Vite** - Next-generation build tooling
- **Lucide** - Beautiful open-source icons

---

**Built for demonstration of full-stack AI development capabilities**
