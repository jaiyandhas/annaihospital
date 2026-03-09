import { initRouter, navigateTo } from '../router.js';

export const renderDepartments = (container) => {
   container.innerHTML = `
    <div class="page-header" style="background: linear-gradient(135deg, var(--primary-dark), var(--primary)); color: white; padding: 4rem 0; text-align: center;">
      <div class="container">
        <h1 style="font-size: 2.5rem; margin-bottom: 0.5rem;">Centers of Excellence</h1>
        <p style="color: #cbd5e1;">World-class specialists and state-of-the-art facilities dedicated to your health.</p>
      </div>
    </div>
    
    <section class="section">
      <div class="container">
        
        <div class="grid-2" style="gap: 2.5rem; margin-bottom: 3rem;">
           
           <!-- Real Doctor 1 -->
           <div class="glass-card dept-detail-card" style="padding: 0; overflow: hidden; display: flex; flex-direction: column; border: 2px solid var(--primary);">
              <div style="height: 200px; background: linear-gradient(135deg, rgba(15, 76, 129, 0.9), rgba(34, 197, 94, 0.9)); display: flex; align-items: center; justify-content: center;">
                 <i class='bx bx-child' style="font-size: 5rem; color: white;"></i>
              </div>
              <div style="padding: 2rem; flex-grow: 1; display: flex; flex-direction: column;">
                 <h2 style="color: var(--primary-dark); margin-bottom: 1rem;">Pediatrics & Child Care</h2>
                 <p style="color: var(--text-secondary); margin-bottom: 1.5rem; flex-grow: 1;">Compassionate and specialized healthcare for infants, children, and adolescents. Our child-friendly environment ensures reduced anxiety during treatments and checkups.</p>
                 <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.5rem;">
                    <span style="font-size: 0.8rem; background: var(--bg-color); padding: 0.25rem 0.5rem; border-radius: 4px;">Vaccinations</span>
                    <span style="font-size: 0.8rem; background: var(--bg-color); padding: 0.25rem 0.5rem; border-radius: 4px;">Neonatal Care</span>
                    <span style="font-size: 0.8rem; background: var(--bg-color); padding: 0.25rem 0.5rem; border-radius: 4px;">General Checkups</span>
                 </div>
                 <div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto;">
                    <div style="display: flex; align-items: center; gap: 0.5rem; color: var(--text-primary); font-weight: 500;">
                       <i class='bx bx-user-circle' style="font-size: 1.5rem; color: var(--primary);"></i> Dr. P. Saravana Raja
                    </div>
                    <button class="btn btn-primary" onclick="window.navigateTo('/appointment')">Book Now</button>
                 </div>
              </div>
           </div>

           <!-- Real Doctor 2 -->
           <div class="glass-card dept-detail-card" style="padding: 0; overflow: hidden; display: flex; flex-direction: column; border: 2px solid var(--primary);">
              <div style="height: 200px; background: linear-gradient(135deg, rgba(236, 72, 153, 0.9), rgba(15, 76, 129, 0.9)); display: flex; align-items: center; justify-content: center;">
                 <i class='bx bx-female' style="font-size: 5rem; color: white;"></i>
              </div>
              <div style="padding: 2rem; flex-grow: 1; display: flex; flex-direction: column;">
                 <h2 style="color: var(--primary-dark); margin-bottom: 1rem;">Obstetrics & Gynecology</h2>
                 <p style="color: var(--text-secondary); margin-bottom: 1.5rem; flex-grow: 1;">Comprehensive women's health services from adolescence through menopause, including expert maternity care, reproductive health, and surgical interventions.</p>
                 <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.5rem;">
                    <span style="font-size: 0.8rem; background: var(--bg-color); padding: 0.25rem 0.5rem; border-radius: 4px;">Maternity Care</span>
                    <span style="font-size: 0.8rem; background: var(--bg-color); padding: 0.25rem 0.5rem; border-radius: 4px;">Women's Wellness</span>
                    <span style="font-size: 0.8rem; background: var(--bg-color); padding: 0.25rem 0.5rem; border-radius: 4px;">Surgical Obstetrics</span>
                 </div>
                 <div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto;">
                    <div style="display: flex; align-items: center; gap: 0.5rem; color: var(--text-primary); font-weight: 500;">
                       <i class='bx bx-user-circle' style="font-size: 1.5rem; color: var(--primary);"></i> Dr. G. Jamuna Saravana Raja
                    </div>
                    <button class="btn btn-primary" onclick="window.navigateTo('/appointment')">Book Now</button>
                 </div>
              </div>
           </div>

           <!-- General Department -->
           <div class="glass-card dept-detail-card" style="padding: 0; overflow: hidden; display: flex; flex-direction: column;">
              <div style="height: 150px; background: linear-gradient(135deg, rgba(15, 76, 129, 0.7), rgba(22, 163, 74, 0.7)); display: flex; align-items: center; justify-content: center;">
                 <i class='bx bx-plus-medical' style="font-size: 3.5rem; color: white;"></i>
              </div>
              <div style="padding: 1.5rem; flex-grow: 1; display: flex; flex-direction: column;">
                 <h2 style="color: var(--primary-dark); font-size: 1.25rem; margin-bottom: 0.5rem;">General Medicine</h2>
                 <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1rem; flex-grow: 1;">Primary care and comprehensive health management for non-surgical adult diseases.</p>
                 <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem;">
                    <span style="font-size: 0.7rem; background: var(--bg-color); padding: 0.2rem 0.4rem; border-radius: 4px;">Diagnostics</span>
                    <span style="font-size: 0.7rem; background: var(--bg-color); padding: 0.2rem 0.4rem; border-radius: 4px;">Preventative Care</span>
                 </div>
                 <button class="btn btn-outline" style="padding: 0.5rem; font-size: 0.85rem;" onclick="window.navigateTo('/appointment')">Request Consultation</button>
              </div>
           </div>

           <!-- General Department -->
           <div class="glass-card dept-detail-card" style="padding: 0; overflow: hidden; display: flex; flex-direction: column;">
              <div style="height: 150px; background: linear-gradient(135deg, rgba(8, 145, 178, 0.7), rgba(15, 76, 129, 0.7)); display: flex; align-items: center; justify-content: center;">
                 <i class='bx bx-test-tube' style="font-size: 3.5rem; color: white;"></i>
              </div>
              <div style="padding: 1.5rem; flex-grow: 1; display: flex; flex-direction: column;">
                 <h2 style="color: var(--primary-dark); font-size: 1.25rem; margin-bottom: 0.5rem;">Clinical Diagnostics</h2>
                 <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1rem; flex-grow: 1;">State-of-the-art laboratory and imaging services for accurate and timely testing.</p>
                 <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem;">
                    <span style="font-size: 0.7rem; background: var(--bg-color); padding: 0.2rem 0.4rem; border-radius: 4px;">Blood Tests</span>
                    <span style="font-size: 0.7rem; background: var(--bg-color); padding: 0.2rem 0.4rem; border-radius: 4px;">X-Ray & MRI</span>
                 </div>
                 <button class="btn btn-outline" style="padding: 0.5rem; font-size: 0.85rem;" onclick="window.navigateTo('/appointment')">Request Consultation</button>
              </div>
           </div>

        </div>

        <!-- Additional info -->
        <div class="glass-card" style="padding: 3rem; text-align: center; background: linear-gradient(135deg, var(--bg-color-alt), white);">
           <h2 style="color: var(--primary-dark); margin-bottom: 1rem;">Need help choosing the right department?</h2>
           <p style="color: var(--text-secondary); margin-bottom: 2rem; max-width: 600px; margin-left: auto; margin-right: auto;">If you are unsure which specialist to consult, use our AI Symptom Checker or book a General Medicine consultation for an initial diagnosis.</p>
           <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
              <button class="btn btn-primary" onclick="window.navigateTo('/symptom-checker')"><i class='bx bx-analyse'></i> Use AI Symptom Checker</button>
              <button class="btn btn-outline" onclick="window.navigateTo('/appointment')">Book General Checkup</button>
           </div>
        </div>

      </div>
    </section>
  `;
};
