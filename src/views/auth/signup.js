import { supabase } from '../../lib/supabase.js';

export const renderSignup = (container) => {
    container.innerHTML = `
    <section class="section" style="min-height: calc(100vh - 80px); display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #f8fafc, #e2e8f0);">
      <div class="container" style="max-width: 700px;">
        <div class="glass-card" style="padding: 3rem;">
           <div style="text-align: center; margin-bottom: 2rem;">
              <h2 style="color: var(--primary-dark); font-size: 2rem;">Create an Account</h2>
              <p style="color: var(--text-secondary);">Join Annai Hospital's patient portal for seamless healthcare access.</p>
           </div>

           <form id="signupForm">
              <div class="grid-2">
                 <div class="form-group">
                    <label class="form-label">Full Name *</label>
                    <input type="text" id="suName" class="form-control" placeholder="John Doe" required>
                 </div>
                 <div class="form-group">
                    <label class="form-label">Email Address *</label>
                    <input type="email" id="suEmail" class="form-control" placeholder="john@example.com" required>
                 </div>
                 <div class="form-group">
                    <label class="form-label">Phone Number *</label>
                    <input type="tel" id="suPhone" class="form-control" placeholder="+1 234 567 8900" required>
                 </div>
                 <div class="form-group">
                    <label class="form-label">Password *</label>
                    <input type="password" id="suPassword" class="form-control" placeholder="••••••••" required minlength="6">
                 </div>
                 <div class="form-group">
                    <label class="form-label">Age *</label>
                    <input type="number" id="suAge" class="form-control" placeholder="35" required min="0" max="120">
                 </div>
                 <div class="form-group">
                    <label class="form-label">Gender *</label>
                    <select id="suGender" class="form-control" required>
                      <option value="" disabled selected>Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                 </div>
              </div>

              <div id="signupError" style="display: none; padding: 1rem; background: rgba(239, 68, 68, 0.1); color: var(--danger-color); border-radius: var(--radius-md); margin: 1rem 0; text-align: center; font-size: 0.9rem;"></div>
              
              <div id="signupSuccess" style="display: none; padding: 1rem; background: rgba(34, 197, 94, 0.1); color: var(--success-color); border-radius: var(--radius-md); margin: 1rem 0; text-align: center; font-size: 0.9rem;">
                 Account created successfully! Redirecting...
              </div>

              <div style="margin-top: 1rem;">
                 <button type="submit" id="signupBtn" class="btn btn-primary w-100 btn-lg" style="margin-bottom: 1.5rem;">Create Account</button>
              </div>
           </form>

           <div style="text-align: center; color: var(--text-secondary); font-size: 0.95rem;">
              Already have an account? <a href="/login" data-link style="color: var(--primary); font-weight: 600;">Sign In</a>
           </div>
        </div>
      </div>
    </section>
  `;

    const form = document.getElementById('signupForm');
    const errBox = document.getElementById('signupError');
    const successBox = document.getElementById('signupSuccess');
    const btn = document.getElementById('signupBtn');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            errBox.style.display = 'none';
            successBox.style.display = 'none';

            const name = document.getElementById('suName').value;
            const email = document.getElementById('suEmail').value;
            const phone = document.getElementById('suPhone').value;
            const password = document.getElementById('suPassword').value;
            const age = parseInt(document.getElementById('suAge').value);
            const gender = document.getElementById('suGender').value;

            const ogBtn = btn.innerHTML;
            btn.innerHTML = `<i class='bx bx-loader-alt bx-spin'></i> Creating Account...`;
            btn.disabled = true;

            try {
                // 1. Create Supabase Auth User
                const { data: authData, error: authErr } = await supabase.auth.signUp({
                    email,
                    password
                });

                if (authErr) throw authErr;

                if (authData.user) {
                    // 2. Insert into 'patients' table combining Auth ID
                    const { error: dbErr } = await supabase.from('patients').insert([{
                        auth_user_id: authData.user.id,
                        full_name: name,
                        email: email,
                        phone_number: phone,
                        age: age,
                        gender: gender,
                        role: 'patient'
                    }]);

                    if (dbErr) throw dbErr;
                }

                // Success
                form.style.display = 'none';
                successBox.style.display = 'block';

                setTimeout(() => {
                    window.navigateTo('/patient-portal');
                }, 1500);

            } catch (err) {
                console.error("Signup Error:", err);
                errBox.innerText = err.message || "Failed to create account. Email may already be registered.";
                errBox.style.display = 'block';
                btn.innerHTML = ogBtn;
                btn.disabled = false;
            }
        });
    }
};
