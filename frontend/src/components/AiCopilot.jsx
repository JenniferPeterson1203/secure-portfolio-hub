import React, { useState } from 'react';

function AiCopilot({ setBackendStatus }) {
  const [chatInput, setChatInput] = useState('');
  const [requestMetrics, setRequestMetrics] = useState({ current: 0, max: 5 });
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    { 
      sender: 'ai', 
      text: "⚡ Copilot Daemon v2.5 🚧[UNDER CONSTRUCTION / TESTING MODE]🚧\nSystems active. AI model layers are currently being optimized for live recruitment queries. Ask me anything about Jennifer's background!" 
    }
  ]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || isChatLoading) return;

    const userMessage = chatInput.trim();
    setChatInput('');
    setChatHistory(prev => [...prev, { sender: 'user', text: userMessage }]);
    setIsChatLoading(true);

    try {
      const response = await fetch('https://secure-portfolio-backend.onrender.com/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });

      if (response.status === 429) {
        setRequestMetrics({ current: 5, max: 5 });
        setBackendStatus({ status: "offline", message: "Rate Limit Triggered" });
        setChatHistory(prev => [...prev, { 
          sender: 'ai', 
          text: "⚠️ SECURITY PROTOCOL: Local request threshold reached (5/5). Terminal console execution suspended for 60 seconds." 
        }]);
        return;
      }

      const data = await response.json();

      if (response.status === 503 || data.status === "upstream_error") {
        setRequestMetrics({ 
          current: data.current_use !== undefined ? data.current_use : 0, 
          max: data.max_limit || 5 
        });
        setBackendStatus({ status: "online", message: "AI Core Exhausted" });
        setChatHistory(prev => [...prev, { sender: 'ai', text: data.reply }]);
        return;
      }

      if (!response.ok) throw new Error("API server returned an error.");

      setRequestMetrics({ 
        current: data.current_use !== undefined ? data.current_use : 0, 
        max: data.max_limit || 5 
      });
      setBackendStatus({ status: "online", message: "Production API Active" });  
      setChatHistory(prev => [...prev, { sender: 'ai', text: data.reply }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setChatHistory(prev => [...prev, { sender: 'ai', text: "SYSTEM ERROR: Failed to process text sequence from backend core. Connection timed out." }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleClearChat = () => {
    setChatHistory([{ sender: 'ai', text: "Terminal console history cleared. Core AI layers active." }]);
  };

  return (
    <section className="ai-chat-widget">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <h3 style={{ color: 'var(--cyber-blue)', margin: 0 }}><span className="prompt">●</span> Core AI Copilot Interface</h3>

        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <span style={{ 
            fontSize: '0.8rem', 
            fontFamily: 'monospace',
            color: requestMetrics.current >= 5 ? '#ff5f56' : requestMetrics.current >= 4 ? '#ffbd2e' : 'var(--terminal-green)',
            border: '1px solid currentColor',
            padding: '2px 6px',
            borderRadius: '3px',
            backgroundColor: 'rgba(0,0,0,0.3)'
          }}>
            [Console Load: {requestMetrics.current}/{requestMetrics.max}]
          </span>

          <button 
            type="button" 
            onClick={handleClearChat}
            style={{ 
              backgroundColor: 'transparent', 
              border: 'none', 
              color: 'var(--text-muted)', 
              cursor: 'pointer', 
              fontSize: '0.8rem',
              textDecoration: 'underline',
              padding: 0,
              fontFamily: 'inherit'
            }}
          >
            [clear_logs]
          </button>
        </div>
      </div>
      
      <div style={{ 
        backgroundColor: 'rgba(0,0,0,0.2)', 
        border: '1px solid var(--border-color)', 
        borderRadius: '4px', 
        padding: '15px', 
        height: '180px', 
        overflowY: 'auto',
        fontSize: '0.9rem',
        marginBottom: '10px'
      }}>
        {chatHistory.map((msg, index) => (
          <div key={index} style={{ marginBottom: '10px', lineHeight: '1.4' }}>
            <span style={{ color: msg.sender === 'user' ? 'var(--cyber-blue)' : 'var(--terminal-green)', fontWeight: 'bold' }}>
              {msg.sender === 'user' ? '↳ Guest@client:~$ ' : '⚡ Copilot_Daemon: '}
            </span>
            <span style={{ 
              color: msg.sender === 'user' ? 'var(--text-main)' : 'var(--text-muted)',
              whiteSpace: 'pre-wrap' 
            }}>
              {msg.text}
            </span>
          </div>
        ))}
        {isChatLoading && <div style={{ color: 'var(--cyber-blue)', fontStyle: 'italic' }}>⚡ Querying model layers...</div>}
      </div>

      <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '10px' }}>
        <input 
          type="text" 
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder="Query qualifications (e.g., Tell me about Jennifer's Python automation experience)..."
          style={{ 
            flex: 1, 
            backgroundColor: 'var(--bg-color)', 
            border: '1px solid var(--border-color)', 
            borderRadius: '4px', 
            padding: '10px', 
            color: 'var(--text-main)',
            fontFamily: 'inherit'
          }}
        />
        <button 
          type="submit" 
          disabled={isChatLoading}
          style={{ 
            backgroundColor: isChatLoading ? 'transparent' : 'rgba(88, 166, 255, 0.1)', 
            border: '1px solid var(--cyber-blue)', 
            color: 'var(--cyber-blue)',
            padding: '0 20px',
            borderRadius: '4px',
            cursor: isChatLoading ? 'not-allowed' : 'pointer',
            fontFamily: 'inherit'
          }}
        >
          Execute
        </button>
      </form>
    </section>
  );
}

export default AiCopilot;