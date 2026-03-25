import React, { useState, useRef, useEffect } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi there! I am the Annai AI Assistant. How can I help you today?\n\n⚠️ Disclaimer: I am an AI, not a doctor. My responses are AI-generated and should not replace professional medical advice.", isUser: false }
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    const val = inputVal.trim();
    if (!val) return;

    const userMessage = { text: val, isUser: true };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputVal('');
    setLoading(true);

    try {
      const apiMessages = [
        { role: 'system', content: 'You are the Annai Hospital AI Assistant. Be polite and helpful. Do not provide medical diagnoses. Always remind users you are an AI if discussing symptoms. Try to keep your responses concise.' },
        ...newMessages.map(m => ({ role: m.isUser ? 'user' : 'assistant', content: m.text }))
      ];

      const apiUrl = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${apiUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages: apiMessages })
      });

      if (!response.ok) throw new Error('Chatbot API Request Failed');
      
      const data = await response.json();
      const reply = data.content;
      setMessages(prev => [...prev, { text: reply, isUser: false }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { text: "⚠️ Sorry, I am having trouble connecting to my AI servers. Please try again later.", isUser: false }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="chatbot-widget" id="chatbotWidget">
      <button className="chatbot-btn" id="chatbotBtn" onClick={() => setIsOpen(!isOpen)}>
        <i className='bx bx-message-rounded-dots'></i>
      </button>
      
      {isOpen && (
        <div className="chatbot-window glass-card" id="chatbotWindow">
          <div className="chatbot-header" style={{
            background: 'var(--primary)', color: 'white', padding: '1rem', 
            borderTopLeftRadius: 'var(--radius-lg)', borderTopRightRadius: 'var(--radius-lg)', 
            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }}>
            <span style={{ fontWeight: 600 }}><i className='bx bx-bot'></i> Annai AI Helper</span>
            <button id="closeChatBtn" onClick={() => setIsOpen(false)} style={{
              background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1.25rem'
            }}>
              <i className='bx bx-x'></i>
            </button>
          </div>
          
          <div className="chatbot-messages" id="chatbotMsgs" style={{
            height: '300px', padding: '1rem', overflowY: 'auto', display: 'flex', 
            flexDirection: 'column', gap: '0.5rem', background: 'var(--bg-color-alt)'
          }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                padding: '0.75rem',
                borderRadius: 'var(--radius-md)',
                maxWidth: '85%',
                fontSize: '0.9rem',
                background: msg.isUser ? 'var(--primary)' : 'white',
                color: msg.isUser ? 'white' : 'var(--text-primary)',
                alignSelf: msg.isUser ? 'flex-end' : 'flex-start',
                boxShadow: msg.isUser ? 'none' : 'var(--shadow-sm)',
                whiteSpace: 'pre-wrap'
              }}>
                {msg.text}
              </div>
            ))}
            {loading && (
              <div style={{
                padding: '0.75rem', borderRadius: 'var(--radius-md)', maxWidth: '85%', fontSize: '0.9rem',
                background: 'white', color: 'var(--text-primary)', alignSelf: 'flex-start', boxShadow: 'var(--shadow-sm)'
              }}>
                <span className="animate-pulse">Typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="chatbot-input" style={{
            padding: '1rem', borderTop: '1px solid var(--border-color)', background: 'white', 
            borderBottomLeftRadius: 'var(--radius-lg)', borderBottomRightRadius: 'var(--radius-lg)', 
            display: 'flex', gap: '0.5rem'
          }}>
            <input 
              type="text" 
              id="chatInput" 
              placeholder="Type a message..."
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              onKeyDown={handleKeyPress}
              style={{
                flexGrow: 1, border: '1px solid var(--border-color)', borderRadius: '4px', 
                padding: '0.5rem', outline: 'none', fontFamily: 'inherit'
              }}
            />
            <button id="sendChatBtn" className="btn btn-primary" onClick={handleSend} style={{ padding: '0.5rem 1rem' }}>
              <i className='bx bx-send'></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
