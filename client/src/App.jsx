import './App.css'
import ChatInterface from './components/ChatInterface'
import TeddyLogo from './components/TeddyLogo'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'

function App() {
  const [key, setKey] = useState(0);

  const handleClear = () => {
    setKey(prev => prev + 1); // Force ChatInterface to remount
  };

  return (
    <div className="min-h-screen">
      {/* Header with Teddy Logo */}
      <header className="app-header flex items-center justify-between px-6 py-4 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <TeddyLogo />
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#b19cd9] to-[#c4b5fd] bg-clip-text text-transparent leading-tight font-nunito">
              TedAI
            </h1>
            <span className="text-sm font-medium text-[#c4b5fd] opacity-90">
              Autonomous Research Agent
            </span>
          </div>
        </div>

        {/* Clear History Button */}
        <button
          onClick={handleClear}
          className="p-2.5 text-[#c4b5fd] hover:text-[#ddd6fe] hover:bg-[#b19cd9]/10 rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
          title="Clear Chat History"
        >
          <Trash2 size={22} />
        </button>
      </header>

      {/* Main Chat Area */}
      <main className="chat-container">
        <ChatInterface key={key} />
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>
          Built with <span className="footer-heart">♥</span> Groq (Llama 3.1) & Tavily Real-Time Web Search
        </p>
      </footer>
    </div>
  )
}

export default App
