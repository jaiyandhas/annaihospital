import { supabase } from '../../lib/supabase.js';

export const renderLogin = (container) => {
   container.innerHTML = `
    <section class="section" style="min-height: calc(100vh - 80px); display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #f8fafc, #e2e8f0);">
      <div class="container" style="max-width: 500px;">
        <div class="glass-card" style="padding: 3rem;">
           <div style="text-align: center; margin-bottom: 2rem;">
              <div style="width: 80px; height: 80px; background: linear-gradient(135deg, var(--primary), var(--accent)); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 3rem; color: white; margin: 0 auto 1.5rem; box-shadow: var(--shadow-md);">
                 <i class='bx bx-plus-medical'></i>
              </div>
              <h2 style="color: var(--primary-dark); font-size: 2rem;">Welcome Back</h2>
              <p style="color: var(--text-secondary);">Sign in to access your portal</p>
           </div>

           <form id="loginForm">
              <div class="form-group">
                 <label class="form-label">Email Address</label>
                 <div style="position: relative;">
                    <i class='bx bx-envelope' style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--text-secondary); font-size: 1.2rem;"></i>
                    <input type="email" id="loginEmail" class="form-control" placeholder="patient@example.com" style="padding-left: 3rem;" required>
                 </div>
              </div>
              <div class="form-group" style="margin-bottom: 2rem;">
                 <div style="display: flex; justify-content: space-between; align-items: baseline;">
                    <label class="form-label">Password</label>
                    <a href="#" style="font-size: 0.85rem; color: var(--primary);">Forgot Password?</a>
                 </div>
                 <div style="position: relative;">
                    <i class='bx bx-lock-alt' style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--text-secondary); font-size: 1.2rem;"></i>
                    <input type="password" id="loginPassword" class="form-control" placeholder="••••••••" style="padding-left: 3rem;" required>
                 </div>
              </div>

              <div id="loginError" style="display: none; padding: 1rem; background: rgba(239, 68, 68, 0.1); color: var(--danger-color); border-radius: var(--radius-md); margin-bottom: 1.5rem; text-align: center; font-size: 0.9rem;"></div>

              <button type="submit" id="loginBtn" class="btn btn-primary w-100 btn-lg" style="margin-bottom: 1.5rem;">Sign In</button>
           </form>

           <div style="text-align: center; color: var(--text-secondary); font-size: 0.95rem;">
              Don't have an account? <a href="/signup" data-link style="color: var(--primary); font-weight: 600;">Create an account</a>
           </div>
        </div>
      </div>
    </section>
  `;

   const form = document.getElementById('loginForm');
   const errBox = document.getElementById('loginError');
   const btn = document.getElementById('loginBtn');

   if (form) {
      form.addEventListener('submit', async (e) => {
         e.preventDefault();
         errBox.style.display = 'none';

         const email = document.getElementById('loginEmail').value;
         const password = document.getElementById('loginPassword').value;

         const ogBtn = btn.innerHTML;
         btn.innerHTML = `<i class='bx bx-loader-alt bx-spin'></i> Signing in...`;
         btn.disabled = true;

         try {
            const { data, error } = await supabase.auth.signInWithPassword({
               email,
               password
            });

            if (error) throw error;

            // Check Role
            const userId = data.user.id;

            // Is Doctor?
            const { data: docData } = await supabase.from('doctors').select('role').eq('auth_user_id', userId).maybeSingle();

            if (docData && docData.role === 'doctor') {
               window.navigateTo('/doctor-dashboard');
               return;
            }

            // Default: Patient Portal
            window.navigateTo('/patient-portal');

         } catch (err) {
            console.error("Login Error:", err);
            errBox.innerText = err.message || "Failed to sign in. Please check your credentials.";
            errBox.style.display = 'block';
         } finally {
            btn.innerHTML = ogBtn;
            btn.disabled = false;
         }
      });
   }
};
