import { initRouter, navigateTo } from '../router.js';
import { supabase } from '../lib/supabase.js';

export const renderTelemedicine = (container) => {
   // Check Auth
   const initTelemedicine = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error || !session) {
         container.innerHTML = `
        <div class="page-header" style="background: linear-gradient(135deg, var(--primary-dark), var(--primary)); color: white; padding: 4rem 0; text-align: center;">
          <div class="container">
            <h1 style="font-size: 2.5rem; margin-bottom: 0.5rem;">Online Consultation</h1>
            <p style="color: #cbd5e1;">Connect with specialists from the comfort of your home.</p>
          </div>
        </div>
        <section class="section" style="min-height: 50vh; display: flex; justify-content: center; align-items: center; background: var(--bg-color-alt);">
           <div class="glass-card" style="padding: 3rem; text-align: center; max-width: 500px;">
              <i class='bx bx-video-off' style="font-size: 4rem; color: var(--text-secondary); margin-bottom: 1rem;"></i>
              <h2 style="color: var(--primary-dark); margin-bottom: 1rem;">Authentication Required</h2>
              <p style="color: var(--text-secondary); margin-bottom: 2rem;">You must be logged into your Patient Portal account to join a secure consultation room.</p>
              <div style="display: flex; gap: 1rem; justify-content: center;">
                 <button class="btn btn-primary" onclick="window.navigateTo('/login')">Log In</button>
                 <button class="btn btn-outline" onclick="window.navigateTo('/signup')">Create Account</button>
              </div>
           </div>
        </section>
      `;
         return;
      }

      // Authenticated - Show the Room
      container.innerHTML = `
    <div style="height: calc(100vh - 80px); background: #1e293b; color: white; display: flex; flex-direction: column;">
      
      <!-- Top Bar -->
      <div style="padding: 1rem 2rem; background: #0f172a; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1);">
        <div style="display: flex; align-items: center; gap: 1rem;">
           <div style="width: 12px; height: 12px; background: var(--danger-color); border-radius: 50%; box-shadow: 0 0 10px var(--danger-color); animation: pulse 2s infinite;"></div>
           <span style="font-weight: 600; font-size: 1.1rem;">Live Consultation Room #492</span>
        </div>
        <div>
           <span style="background: rgba(255,255,255,0.1); padding: 0.5rem 1rem; border-radius: 2rem; font-size: 0.85rem;">Waiting for Doctor...</span>
        </div>
      </div>

      <!-- Main Video Area -->
      <div style="flex-grow: 1; display: flex; overflow: hidden;">
        
        <!-- Video Feed -->
        <div style="flex-grow: 1; position: relative; padding: 2rem; display: flex; flex-direction: column; justify-content: center; align-items: center;">
           
           <div style="width: 100%; max-width: 900px; aspect-ratio: 16/9; background: #000; border-radius: var(--radius-lg); position: relative; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);">
              
              <!-- Doctor Mock Stream placeholder -->
              <div style="position: absolute; inset: 0; background: linear-gradient(45deg, #1e293b, #0f172a); display: flex; align-items: center; justify-content: center; flex-direction: column; opacity: 0.8;">
                 <i class='bx bx-user-circle' style="font-size: 5rem; color: rgba(255,255,255,0.2); margin-bottom: 1rem;"></i>
                 <p style="color: rgba(255,255,255,0.5);">Doctor has not joined yet</p>
              </div>
              
              <div style="position: absolute; bottom: 1.5rem; left: 1.5rem; background: rgba(0,0,0,0.6); backdrop-filter: blur(5px); padding: 0.5rem 1rem; border-radius: var(--radius-md);">
                 <span style="font-weight: 500;">Attending Physician</span>
              </div>

              <!-- Self Video PiP -->
              <div style="position: absolute; bottom: 1.5rem; right: 1.5rem; width: 200px; aspect-ratio: 16/9; background: #334155; border-radius: var(--radius-md); border: 2px solid rgba(255,255,255,0.2); overflow: hidden; display: flex; align-items: center; justify-content: center;">
                 <i class='bx bx-user' style="font-size: 3rem; color: #64748b;"></i>
              </div>
           </div>

           <!-- Controls -->
           <div style="margin-top: 2rem; display: flex; gap: 1rem; background: rgba(0,0,0,0.5); padding: 1rem 2rem; border-radius: 3rem; backdrop-filter: blur(10px);">
              <button class="tele-btn" style="background: rgba(255,255,255,0.1);"><i class='bx bx-microphone'></i></button>
              <button class="tele-btn" style="background: rgba(255,255,255,0.1);"><i class='bx bx-video'></i></button>
              <button class="tele-btn" style="background: rgba(255,255,255,0.1);"><i class='bx bx-desktop'></i></button>
              <button class="tele-btn" style="background: var(--danger-color); color: white;" onclick="window.navigateTo('/patient-portal')"><i class='bx bx-phone-off'></i></button>
           </div>
        </div>

        <!-- Chat / Files Sidebar -->
        <div style="width: 350px; background: #0f172a; border-left: 1px solid rgba(255,255,255,0.1); display: flex; flex-direction: column;" class="desktop-only">
           
           <div style="padding: 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.1);">
              <h3 style="font-size: 1.1rem; margin-bottom: 0.5rem;"><i class='bx bx-message-square-detail'></i> Consultation Chat</h3>
           </div>
           
           <div style="flex-grow: 1; padding: 1.5rem; overflow-y: auto; display: flex; flex-direction: column; gap: 1rem;">
              <div style="text-align: center; color: rgba(255,255,255,0.3); font-size: 0.85rem; margin-top: 2rem;">
                 Messages sent here are secure and encrypted.
              </div>
           </div>

           <div style="padding: 1.5rem; border-top: 1px solid rgba(255,255,255,0.1); background: #1e293b;">
              <div style="display: flex; gap: 0.5rem;">
                 <button style="background: rgba(255,255,255,0.1); border: none; color: white; width: 40px; height: 40px; border-radius: 8px; cursor: pointer; display: flex; justify-content: center; align-items: center;"><i class='bx bx-paperclip' style="font-size: 1.2rem;"></i></button>
                 <input type="text" placeholder="Type message..." style="flex-grow: 1; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: white; padding: 0.5rem 1rem; outline: none;">
                 <button style="background: var(--primary); border: none; color: white; width: 40px; height: 40px; border-radius: 8px; cursor: pointer; display: flex; justify-content: center; align-items: center;"><i class='bx bx-send' style="font-size: 1.2rem;"></i></button>
              </div>
           </div>

        </div>

      </div>
    </div>
    
    <style>
      .tele-btn { width: 50px; height: 50px; border-radius: 50%; border: none; color: white; font-size: 1.5rem; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; }
      .tele-btn:hover { transform: scale(1.1); }
      .chat-msg { max-width: 85%; padding: 1rem; border-radius: 12px; font-size: 0.9rem; position: relative; }
      .doc-msg { background: rgba(255,255,255,0.1); align-self: flex-start; border-bottom-left-radius: 2px; }
      .pat-msg { background: var(--primary); align-self: flex-end; border-bottom-right-radius: 2px; }
      .chat-msg p { margin: 0; }
      .chat-msg .time { font-size: 0.7rem; color: rgba(255,255,255,0.5); position: absolute; bottom: 0.25rem; right: 0.5rem; }
    </style>
    `;
   };

   initTelemedicine();
};
