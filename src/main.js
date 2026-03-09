import './style.css';
import { initRouter, navigateTo } from './router.js';
import { renderNavbar } from './components/navbar.js';
import { renderFooter } from './components/footer.js';

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  // Render static external layouts
  renderNavbar();
  renderFooter();

  // Initialize client-side router
  initRouter();
  initChatbot();

  // Make navigateTo available globally for inline onclick handlers (if needed)
  window.navigateTo = navigateTo;

  // Listen for navigation clicks globally
  document.body.addEventListener('click', e => {
    if (e.target.matches('[data-link]') || e.target.closest('[data-link]')) {
      e.preventDefault();
      const link = e.target.matches('[data-link]') ? e.target : e.target.closest('[data-link]');
      const url = link.getAttribute('href');
      navigateTo(url);

      // Close mobile menu if open
      const navLinks = document.querySelector('.nav-links');
      if (navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
      }
    }
  });
});

function initChatbot() {
  const btn = document.getElementById('chatbotBtn');
  const windowEl = document.getElementById('chatbotWindow');
  const closeBtn = document.getElementById('closeChatBtn');
  const sendBtn = document.getElementById('sendChatBtn');
  const input = document.getElementById('chatInput');
  const msgs = document.getElementById('chatbotMsgs');

  if (!btn || !windowEl) return;

  btn.addEventListener('click', () => {
    windowEl.style.display = windowEl.style.display === 'none' ? 'block' : 'none';
    if (windowEl.style.display === 'block') { input.focus(); }
  });

  closeBtn.addEventListener('click', () => {
    windowEl.style.display = 'none';
  });

  const addMsg = (text, isUser) => {
    const d = document.createElement('div');
    d.style.padding = '0.75rem';
    d.style.borderRadius = 'var(--radius-md)';
    d.style.maxWidth = '85%';
    d.style.fontSize = '0.9rem';
    d.style.marginBottom = '0.5rem';

    if (isUser) {
      d.style.background = 'var(--primary)';
      d.style.color = 'white';
      d.style.alignSelf = 'flex-end';
    } else {
      d.style.background = 'white';
      d.style.boxShadow = 'var(--shadow-sm)';
      d.style.alignSelf = 'flex-start';
    }

    d.innerText = text;
    msgs.appendChild(d);
    msgs.scrollTop = msgs.scrollHeight;
  };

  const handleSend = () => {
    const val = input.value.trim();
    if (!val) return;

    addMsg(val, true);
    input.value = '';

    // Mock AI reply
    setTimeout(() => {
      const replies = [
        "I can help you book an appointment! Please visit the Appointment page.",
        "Our emergency number is 911 or 1-800-EMERGENCY.",
        "You can view our doctors in the Find Doctor section.",
        "Please describe your symptoms on our Symptom Checker page.",
        "I'm afraid I don't have access to your personal medical records here. Please log into the Patient Portal."
      ];
      const reply = replies[Math.floor(Math.random() * replies.length)];
      addMsg(reply, false);
    }, 1000);
  };

  sendBtn.addEventListener('click', handleSend);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
  });
}
