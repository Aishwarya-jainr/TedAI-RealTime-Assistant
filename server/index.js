import { config } from "dotenv";
import Groq from "groq-sdk";
import { tavily } from "@tavily/core";
import express from "express";
import cors from "cors";

config();

const app = express();
const PORT = process.env.PORT || 5001;

// CORS configuration for production and development
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    process.env.FRONTEND_URL // Production frontend URL
].filter(Boolean);

// Middleware
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.use(express.json());

// Initialize AI clients
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

const tvly = tavily({
    apiKey: process.env.TAVILY_API_KEY
});

// Define search web tool in OpenAI-compatible format for Groq
const searchWebTool = {
    type: "function",
    function: {
        name: "search_web",
        description: "Useful for when you need to answer questions about current events or the world. Use this to get real-time information from the web.",
        parameters: {
            type: "object",
            properties: {
                query: {
                    type: "string",
                    description: "The search query to find relevant information."
                }
            },
            required: ["query"]
        }
    }
};

// Tool implementations
const tools = {
    "search_web": async ({ query }) => {
        const response = await tvly.search(query);
        return response.results;
    }
};

// Store conversation histories per session (in production, use a database)
const sessions = new Map();

// POST /api/chat - Main chat endpoint
app.post("/api/chat", async (req, res) => {
    try {
        const { query, sessionId = "default" } = req.body;

        if (!query || typeof query !== "string") {
            return res.status(400).json({ error: "Query is required and must be a string" });
        }

        // Get or create session history
        if (!sessions.has(sessionId)) {
            sessions.set(sessionId, []);
        }
        const history = sessions.get(sessionId);

        // Add user message to history
        history.push({ role: "user", content: query });

        // Keep only last 10 messages to avoid token limits (5 user + 5 assistant)
        if (history.length > 10) {
            history.splice(0, history.length - 10);
        }

        let finalResponse = null;
        let attempts = 0;
        const maxAttempts = 5; // Prevent infinite loops

        while (!finalResponse && attempts < maxAttempts) {
            attempts++;

            const response = await groq.chat.completions.create({
                model: "llama-3.1-8b-instant",
                messages: [
                    {
                        role: "system",
                        content: "You are a helpful AI assistant. You can use tools to get more information when needed. When users ask about current events, news, or information that requires up-to-date data, use the search_web tool. Provide clear, accurate, and helpful responses to user queries."
                    },
                    ...history
                ],
                tools: [searchWebTool],
                tool_choice: "auto",
                temperature: 0.7,
                max_tokens: 512 // Reduced from 1024 to stay within limits
            });

            const aiMessage = response.choices[0].message;

            // Check if AI wants to use a tool
            if (aiMessage.tool_calls && aiMessage.tool_calls.length > 0) {
                // Add assistant's tool call to history
                history.push({
                    role: "assistant",
                    content: aiMessage.content || "",
                    tool_calls: aiMessage.tool_calls
                });

                // Execute each tool call
                for (const toolCall of aiMessage.tool_calls) {
                    const functionName = toolCall.function.name;
                    const functionArgs = JSON.parse(toolCall.function.arguments);

                    // Execute the tool
                    const toolResult = await tools[functionName](functionArgs);

                    // Format search results
                    const content = toolResult.map(r => `${r.title}\n${r.content}\nURL: ${r.url}`).join("\n\n");

                    // Add tool result to history
                    history.push({
                        role: "tool",
                        tool_call_id: toolCall.id,
                        content: content
                    });
                }
            } else {
                // Got final text response
                finalResponse = aiMessage.content;
                history.push({ role: "assistant", content: finalResponse });
            }
        }

        if (!finalResponse) {
            return res.status(500).json({ error: "Failed to get response from AI after multiple attempts" });
        }

        // Return the response
        res.json({
            response: finalResponse,
            sessionId
        });

    } catch (error) {
        console.error("Error processing chat request:", error);
        res.status(500).json({
            error: "An error occurred while processing your request",
            details: error.message
        });
    }
});

// POST /api/chat/clear - Clear session history
app.post("/api/chat/clear", (req, res) => {
    const { sessionId = "default" } = req.body;
    sessions.delete(sessionId);
    res.json({ message: "Session cleared successfully" });
});

// Health check endpoint
app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Server is running" });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📡 Chat endpoint: http://localhost:${PORT}/api/chat`);
    console.log(`🤖 Using Groq (Llama 3) for AI responses`);
});
