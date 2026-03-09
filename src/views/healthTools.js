import { initRouter, navigateTo } from '../router.js';

export const renderHealthTools = (container) => {
  container.innerHTML = `
    <div class="page-header" style="background: linear-gradient(135deg, var(--primary-dark), var(--primary)); color: white; padding: 4rem 0; text-align: center;">
      <div class="container">
        <h1 style="font-size: 2.5rem; margin-bottom: 0.5rem;">Health Calculators</h1>
        <p style="color: #cbd5e1;">Evaluate your health metrics instantly with our clinical-grade tools.</p>
      </div>
    </div>
    
    <section class="section bg-light">
      <div class="container" style="max-width: 1000px;">
        <div class="grid-2" style="gap: 2rem;">
          
          <!-- BMI Calculator -->
          <div class="glass-card" style="padding: 2.5rem; display: flex; flex-direction: column;">
            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem;">
              <i class='bx bx-body' style="font-size: 2.5rem; color: var(--primary);"></i>
              <h3 style="color: var(--primary-dark); margin: 0;">BMI Calculator</h3>
            </div>
            
            <form id="bmiForm" style="flex-grow: 1; display: flex; flex-direction: column;">
               <div class="form-group">
                 <label class="form-label">Height (cm)</label>
                 <input type="number" id="bmiHeight" class="form-control" placeholder="175" required min="50" max="300">
               </div>
               <div class="form-group">
                 <label class="form-label">Weight (kg)</label>
                 <input type="number" id="bmiWeight" class="form-control" placeholder="70" required min="10" max="400">
               </div>
               
               <div style="margin-top: auto;">
                 <button type="submit" class="btn btn-primary w-100"><i class='bx bx-calculator'></i> Calculate BMI</button>
               </div>
            </form>

            <div id="bmiResult" style="display: none; margin-top: 2rem; padding: 1.5rem; border-radius: var(--radius-md); background: white; text-align: center; border: 1px solid var(--border-color);">
               <!-- Populated by JS -->
            </div>
          </div>

          <!-- Diabetes Risk Checker -->
          <div class="glass-card" style="padding: 2.5rem; display: flex; flex-direction: column;">
            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem;">
              <i class='bx bx-reflect-horizontal' style="font-size: 2.5rem; color: var(--danger-color);"></i>
              <h3 style="color: var(--primary-dark); margin: 0;">Diabetes Risk Checker</h3>
            </div>
            
            <form id="diaForm" style="flex-grow: 1; display: flex; flex-direction: column;">
               <div class="form-group">
                 <label class="form-label">Age</label>
                 <input type="number" id="diaAge" class="form-control" placeholder="45" required min="1" max="120">
               </div>
               <div class="form-group">
                 <label class="form-label">Weight Status</label>
                 <select id="diaWeight" class="form-control" required>
                    <option value="1">Normal Weight</option>
                    <option value="2">Overweight</option>
                    <option value="3">Obese</option>
                 </select>
               </div>
               <div class="form-group" style="margin-bottom: 2rem;">
                 <label class="form-label">Family History of Diabetes?</label>
                 <select id="diaFamily" class="form-control" required>
                    <option value="0">No</option>
                    <option value="1">Yes (Parent or Sibling)</option>
                 </select>
               </div>
               
               <div style="margin-top: auto;">
                 <button type="submit" class="btn btn-primary w-100" style="background-color: var(--danger-color); box-shadow: 0 4px 14px 0 rgba(239, 68, 68, 0.39); border-color: transparent;"><i class='bx bx-line-chart'></i> Evaluate Risk</button>
               </div>
            </form>

            <div id="diaResult" style="display: none; margin-top: 2rem; padding: 1.5rem; border-radius: var(--radius-md); background: white; text-align: center; border: 1px solid var(--border-color);">
               <!-- Populated by JS -->
            </div>
          </div>

        </div>
      </div>
    </section>
  `;

  // BMI Logic
  const bmiForm = document.getElementById('bmiForm');
  const bmiResult = document.getElementById('bmiResult');

  if (bmiForm) {
    bmiForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const h = parseFloat(document.getElementById('bmiHeight').value) / 100; // to meters
      const w = parseFloat(document.getElementById('bmiWeight').value);

      const bmi = (w / (h * h)).toFixed(1);

      let category = '';
      let color = '';

      if (bmi < 18.5) { category = 'Underweight'; color = 'var(--warning-color)'; }
      else if (bmi >= 18.5 && bmi <= 24.9) { category = 'Normal Weight'; color = 'var(--success-color)'; }
      else if (bmi >= 25 && bmi <= 29.9) { category = 'Overweight'; color = 'var(--warning-color)'; }
      else { category = 'Obese'; color = 'var(--danger-color)'; }

      bmiResult.innerHTML = `
        <div style="background: rgba(248, 250, 252, 0.9); border-radius: 12px; padding: 1.5rem; border: 1px solid #e2e8f0; text-align: center;">
          <span style="font-size: 0.9rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">Clinical Assessment</span>
          
          <div style="margin: 1.5rem 0;">
            <h2 style="font-size: 4rem; color: ${color}; line-height: 1; margin: 0; font-weight: 800;">${bmi}</h2>
            <p style="margin-top: 0.5rem; font-size: 1.1rem; color: var(--primary-dark);">Body Mass Index (kg/m²)</p>
          </div>
          
          <div style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1.5rem; border-radius: 30px; background: ${color}15; color: ${color}; font-weight: 700; font-size: 1.2rem; margin-bottom: 1.5rem;">
            <i class='bx bxs-circle' style="font-size: 0.6rem;"></i> Status: ${category}
          </div>
          
          <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 2rem; line-height: 1.5;">
            ${category === 'Normal Weight'
          ? 'Excellent! You are within the healthy weight range. Maintaining this lowers your risk for serious health conditions.'
          : 'Your BMI falls outside the standard healthy range. We recommend consulting with our specialists to discuss a personalized health plan.'}
          </p>
          
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin-bottom: 2rem;">
          
          <h4 style="color: var(--primary-dark); margin-bottom: 1rem;">Take the Next Step</h4>
          <button class="btn btn-primary w-100" style="padding: 1rem; font-size: 1.1rem; box-shadow: 0 10px 20px rgba(14, 165, 233, 0.2);" onclick="window.navigateTo('/appointment')">
            Book Consultation <i class='bx bx-calendar-event' style="margin-left: 0.5rem;"></i>
          </button>
        </div>
      `;
      bmiResult.style.display = 'block';
    });
  }

  // Diabetes Risk Logic
  const diaForm = document.getElementById('diaForm');
  const diaResult = document.getElementById('diaResult');

  if (diaForm) {
    diaForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const age = parseInt(document.getElementById('diaAge').value);
      const weightScore = parseInt(document.getElementById('diaWeight').value);
      const famScore = parseInt(document.getElementById('diaFamily').value);

      let riskPoints = 0;
      if (age > 45) riskPoints += 2;
      else if (age > 35) riskPoints += 1;

      if (weightScore === 3) riskPoints += 3;
      else if (weightScore === 2) riskPoints += 1;

      if (famScore === 1) riskPoints += 3;

      let riskLabel = '';
      let color = '';
      let percent = 0;

      if (riskPoints <= 2) { riskLabel = 'Low Risk'; color = 'var(--success-color)'; percent = 15; }
      else if (riskPoints <= 4) { riskLabel = 'Moderate Risk'; color = 'var(--warning-color)'; percent = 50; }
      else { riskLabel = 'High Risk'; color = 'var(--danger-color)'; percent = 85; }

      diaResult.innerHTML = `
        <div style="background: rgba(248, 250, 252, 0.9); border-radius: 12px; padding: 1.5rem; border: 1px solid #e2e8f0; text-align: center;">
          <span style="font-size: 0.9rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">Risk Evaluation</span>
          
          <div style="margin: 1.5rem 0;">
            <i class='bx bx-pulse' style="font-size: 4rem; color: ${color}; opacity: 0.8;"></i>
            <h2 style="font-size: 2.2rem; color: ${color}; margin: 0.5rem 0 0 0; font-weight: 800;">${riskLabel}</h2>
          </div>
          
          <div style="width: 100%; height: 10px; background: #e2e8f0; border-radius: 5px; overflow: hidden; margin: 1.5rem 0;">
            <div style="width: ${percent}%; height: 100%; background: ${color}; border-radius: 5px; transition: width 1s ease-in-out;"></div>
          </div>
          
          <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 2rem; line-height: 1.5;">
            ${riskLabel === 'Low Risk'
          ? 'Great news! Your current profile indicates a low risk for type 2 diabetes. Continue maintaining a healthy lifestyle.'
          : 'Based on your inputs, you have an elevated risk profile. Early detection and manageable lifestyle changes are key.'}
          </p>
          
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin-bottom: 2rem;">
          
          <h4 style="color: var(--primary-dark); margin-bottom: 1rem;">${riskLabel === 'Low Risk' ? 'Stay Proactive' : 'Discuss Your Results'}</h4>
          <button class="btn btn-primary w-100" style="padding: 1rem; font-size: 1.1rem; background: ${riskLabel === 'Low Risk' ? 'var(--primary)' : 'var(--danger-color)'}; box-shadow: 0 10px 20px rgba(0,0,0,0.1); border: none;" onclick="window.navigateTo('/appointment')">
            Book Health Checkup <i class='bx bx-calendar-event' style="margin-left: 0.5rem;"></i>
          </button>
        </div>
      `;
      diaResult.style.display = 'block';
    });
  }
};
