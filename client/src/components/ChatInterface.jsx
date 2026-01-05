import { useState, useRef, useEffect } from 'react'
import TeddyLogo from './TeddyLogo'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api/chat'

function ChatInterface() {
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const messagesEndRef = useRef(null)
    const inputRef = useRef(null)

    // Auto-scroll to bottom when new messages arrive
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    // Focus input on mount
    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    const sendMessage = async (e) => {
        e.preventDefault()

        if (!input.trim() || isLoading) return

        const userMessage = input.trim()
        setInput('')

        // Add user message to chat
        setMessages(prev => [...prev, { role: 'user', text: userMessage }])
        setIsLoading(true)

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: userMessage }),
            })

            if (!response.ok) {
                throw new Error(`Server error: ${response.statusText}`)
            }

            const data = await response.json()

            // Add AI response to chat
            setMessages(prev => [...prev, { role: 'assistant', text: data.response }])

        } catch (error) {
            console.error('Error:', error)
            setMessages(prev => [...prev, {
                role: 'assistant',
                text: `❌ Error: ${error.message}. Please make sure the server is running on http://localhost:5001`,
                isError: true
            }])
        } finally {
            setIsLoading(false)
            inputRef.current?.focus()
        }
    }

    const clearChat = () => {
        setMessages([])
        setInput('')
        inputRef.current?.focus()
    }

    return (
        <div className="chat-card" style={{ minHeight: '600px', display: 'flex', flexDirection: 'column' }}>
            {/* Chat Messages Area */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {messages.length === 0 ? (
                    <div className="welcome-container">
                        <div className="welcome-teddy">
                            <TeddyLogo size="large" />
                        </div>
                        <h2 className="welcome-title">Hi! I'm TedAI</h2>
                        <p className="welcome-description">
                            I'm here to help you with anything you need. I can search the web, answer questions, and have friendly conversations. What would you like to talk about?
                        </p>
                        <div className="suggestion-pills">
                            <button
                                onClick={() => setInput("What's the latest news in AI?")}
                                className="suggestion-pill"
                            >
                                🤖 What's the latest news in AI?
                            </button>
                            <button
                                onClick={() => setInput("Tell me something interesting")}
                                className="suggestion-pill"
                            >
                                💭 Tell me something interesting
                            </button>
                            <button
                                onClick={() => setInput("What's trending in tech today?")}
                                className="suggestion-pill"
                            >
                                👩🏻‍💻 What's trending in tech today?
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                style={{
                                    display: 'flex',
                                    justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                                    gap: '0.75rem',
                                    alignItems: 'flex-end'
                                }}
                                className="animate-pop-in"
                            >
                                {/* Bot Avatar (left side) */}
                                {message.role === 'assistant' && (
                                    <div className="avatar avatar-teddy">
                                        🧸
                                    </div>
                                )}

                                {/* Message Bubble */}
                                <div
                                    className={`message-bubble ${message.role === 'user'
                                        ? 'message-user'
                                        : message.isError
                                            ? 'message-error'
                                            : 'message-bot'
                                        }`}
                                >
                                    <p style={{ margin: 0, lineHeight: '1.6', fontSize: '0.95rem' }}>
                                        {message.text}
                                    </p>
                                </div>

                                {/* User Avatar (right side) */}
                                {message.role === 'user' && (
                                    <div className="avatar avatar-user">
                                        👤
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Loading Indicator */}
                        {isLoading && (
                            <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '0.75rem', alignItems: 'flex-end' }}>
                                <div className="avatar avatar-teddy">
                                    🧸
                                </div>
                                <div className="thinking-loader">
                                    <div className="thinking-dots">
                                        <span className="dot"></span>
                                        <span className="dot"></span>
                                        <span className="dot"></span>
                                    </div>
                                    <span>TedAI is thinking...</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </>
                )}
            </div>

            {/* Input Area */}
            <div className="input-container">
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    {/* Clear Chat Button */}
                    {messages.length > 0 && (
                        <button
                            onClick={clearChat}
                            className="btn btn-ghost"
                            style={{
                                padding: '0.75rem',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            title="Clear chat"
                        >
                            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    )}

                    {/* Input Form */}
                    <form onSubmit={sendMessage} style={{ flex: 1 }}>
                        <div className="input-pill">
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Chat with TedAI..."
                                disabled={isLoading}
                                className="input-field"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isLoading}
                                className="send-button"
                                title="Send message"
                            >
                                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ChatInterface
