import React, { useState, useRef, useEffect } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [messages, setMessages] = useState([
    { text: "Hi there! I am the Annai AI Assistant. How can I help you today?", isUser: false }
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = () => {
    const val = inputVal.trim();
    if (!val) return;

    setMessages(prev => [...prev, { text: val, isUser: true }]);
    setInputVal('');

    // Mock AI Reply
    setTimeout(() => {
      const replies = [
        "I can help you book an appointment! Please visit the Appointment page.",
        "Our emergency number is 911 or 1-800-EMERGENCY.",
        "You can view our doctors in the Find Doctor section.",
        "Please describe your symptoms on our Symptom Checker page.",
        "I'm afraid I don't have access to your personal medical records here. Please log into the Patient Portal."
      ];
      const reply = replies[Math.floor(Math.random() * replies.length)];
      setMessages(prev => [...prev, { text: reply, isUser: false }]);
    }, 1000);
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
                boxShadow: msg.isUser ? 'none' : 'var(--shadow-sm)'
              }}>
                {msg.text}
              </div>
            ))}
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
