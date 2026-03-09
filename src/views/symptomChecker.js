import { initRouter, navigateTo } from '../router.js';

export const renderSymptomChecker = (container) => {
    container.innerHTML = `
    <div class="page-header" style="background: linear-gradient(135deg, var(--primary-dark), var(--primary)); color: white; padding: 4rem 0; text-align: center;">
      <div class="container">
        <h1 style="font-size: 2.5rem; margin-bottom: 0.5rem;">AI Symptom Checker</h1>
        <p style="color: #cbd5e1;">Analyze your symptoms and find out which department to visit.</p>
      </div>
    </div>
    
    <section class="section">
      <div class="container" style="max-width: 800px;">
        <div class="glass-card" style="padding: 3rem;">
          
          <div class="text-center" style="margin-bottom: 2rem;">
            <i class='bx bx-brain' style="font-size: 4rem; color: var(--primary); margin-bottom: 1rem;"></i>
            <h3>Describe your symptoms</h3>
            <p style="color: var(--text-secondary);">Enter your symptoms separated by spaces or commas (e.g., "fever cough headache").</p>
          </div>
          
          <form id="symptomForm">
            <div class="form-group">
              <input type="text" id="symptomsInput" class="form-control" style="font-size: 1.2rem; padding: 1rem;" placeholder="E.g., chest pain, shortness of breath..." required>
            </div>
            <button type="submit" class="btn btn-primary btn-lg w-100"><i class='bx bx-analyse'></i> Analyze Symptoms</button>
          </form>

          <!-- Loading State -->
          <div id="aiLoading" style="display: none; text-align: center; padding: 3rem 0;">
            <div style="font-size: 3rem; color: var(--primary); animation: pulse 1.5s infinite;">
              <i class='bx bx-loader-alt bx-spin'></i>
            </div>
            <p style="margin-top: 1rem; color: var(--text-secondary); font-weight: 500;">AI Engine is analyzing...</p>
          </div>

          <!-- Result Card -->
          <div id="aiResult" style="display: none; margin-top: 3rem; padding-top: 2rem; border-top: 1px solid var(--border-color);">
            <h3 style="color: var(--primary-dark); margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
               <i class='bx bx-check-shield' style="color: var(--success-color);"></i> Analysis Complete
            </h3>
            
            <div class="grid-2">
              <div style="background: var(--bg-color-alt); padding: 1.5rem; border-radius: var(--radius-md); border-left: 4px solid var(--warning-color);">
                <span style="font-size: 0.85rem; color: var(--text-secondary); text-transform: uppercase; font-weight: 600;">Possible Condition</span>
                <h4 id="resCondition" style="color: var(--text-primary); font-size: 1.25rem; margin-top: 0.25rem;">Viral Infection</h4>
              </div>
              <div style="background: var(--bg-color-alt); padding: 1.5rem; border-radius: var(--radius-md); border-left: 4px solid var(--primary-light);">
                <span style="font-size: 0.85rem; color: var(--text-secondary); text-transform: uppercase; font-weight: 600;">Recommended Action</span>
                <p style="color: var(--text-primary); font-weight: 500; margin-top: 0.25rem;">Consult a Specialist</p>
              </div>
            </div>

            <div style="margin-top: 1.5rem; padding: 1.5rem; border: 1px solid var(--border-color); border-radius: var(--radius-md);">
               <h4 style="margin-bottom: 1rem; color: var(--text-primary);">Suggested Department & Doctor</h4>
               <p style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                 <i class='bx bx-building-house' style="color: var(--primary);"></i>
                 <strong>Department:</strong> <span id="resDept">General Medicine</span>
               </p>
               <p style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.5rem;">
                 <i class='bx bx-user-pin' style="color: var(--accent-dark);"></i>
                 <strong>Suggested Doctor:</strong> <span id="resDoc">Any Available Doctor</span>
               </p>
               <button class="btn btn-gradient w-100" onclick="window.navigateTo('/appointment')">Book Appointment Now</button>
            </div>
            
            <p style="font-size: 0.8rem; color: var(--text-light); text-align: center; margin-top: 1.5rem;">
              *Disclaimer: This is an AI-generated assessment and does not constitute professional medical advice. Always consult a real doctor for accurate diagnosis.
            </p>
          </div>
        </div>
      </div>
    </section>
    
    <style>
      @keyframes pulse {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.1); opacity: 0.7; }
        100% { transform: scale(1); opacity: 1; }
      }
    </style>
  `;

    // Logic
    const form = document.getElementById('symptomForm');
    const loading = document.getElementById('aiLoading');
    const result = document.getElementById('aiResult');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = document.getElementById('symptomsInput').value.toLowerCase();

            // Hide form elements instantly
            form.style.display = 'none';
            loading.style.display = 'block';
            result.style.display = 'none';

            // Simple Keyword matching logic simulation
            setTimeout(() => {
                let condition = 'Mild Illness / Needs Review';
                let dept = 'General Medicine';
                let doc = 'Dr. Emily Brown';

                if (input.includes('chest') || input.includes('heart') || input.includes('breath')) {
                    condition = 'Possible Cardiovascular Issue';
                    dept = 'Cardiology';
                    doc = 'Dr. Sarah Jenkins';
                } else if (input.includes('headache') || input.includes('dizzy') || input.includes('numb')) {
                    condition = 'Neurological Symptoms';
                    dept = 'Neurology';
                    doc = 'Dr. Michael Chen';
                } else if (input.includes('bone') || input.includes('joint') || input.includes('pain') || input.includes('fracture')) {
                    condition = 'Orthopedic Injury / Arthritis';
                    dept = 'Orthopedics';
                    doc = 'Dr. James Wilson';
                } else if (input.includes('child') || input.includes('baby') || input.includes('fever') && input.includes('kid')) {
                    condition = 'Pediatric Infection';
                    dept = 'Pediatrics';
                    doc = 'Dr. Emily Brown';
                }

                document.getElementById('resCondition').innerText = condition;
                document.getElementById('resDept').innerText = dept;
                document.getElementById('resDoc').innerText = doc;

                loading.style.display = 'none';
                result.style.display = 'block';

            }, 2000); // 2 second mock delay
        });
    }
};
