import { initRouter, navigateTo } from '../router.js';
import { supabase } from '../lib/supabase.js';

export const renderAppointment = async (container) => {
  container.innerHTML = `
    <div class="page-header" style="background: linear-gradient(135deg, var(--primary-dark), var(--primary)); color: white; padding: 4rem 0; text-align: center;">
      <div class="container">
        <h1 style="font-size: 2.5rem; margin-bottom: 0.5rem;">Book an Appointment</h1>
        <p style="color: #cbd5e1;">Schedule a visit with our expert medical professionals quickly and easily.</p>
      </div>
    </div>
    
    <section class="section">
      <div class="container" style="max-width: 900px;">
        <div class="glass-card" style="padding: 3rem; position: relative;">
          
          <div id="formLoading" style="position: absolute; inset: 0; background: rgba(255,255,255,0.8); z-index: 10; display: flex; flex-direction: column; justify-content: center; align-items: center; border-radius: inherit;">
            <i class='bx bx-loader-alt bx-spin' style="font-size: 3rem; color: var(--primary);"></i>
            <p style="color: var(--text-secondary); margin-top: 1rem;">Loading providers...</p>
          </div>

          <form id="appointmentForm" style="display: none;">
            <!-- Dummy auth note -->
            <div style="background: var(--bg-color-alt); padding: 1rem; border-radius: var(--radius-md); margin-bottom: 2rem; border-left: 4px solid var(--warning-color); font-size: 0.9rem;">
               <i class='bx bx-info-circle'></i> <strong>Note:</strong> Patient profiles aren't fully implemented yet. For this demo, a temporary patient record will be created or updated based on the email provided.
            </div>

            <h3 style="color: var(--primary-dark); margin-bottom: 1.5rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">Patient Details</h3>
            
            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">Full Name *</label>
                <input type="text" id="patName" class="form-control" required placeholder="John Doe">
              </div>
              <div class="form-group">
                <label class="form-label">Email Address *</label>
                <input type="email" id="patEmail" class="form-control" required placeholder="john@example.com">
              </div>
              <div class="form-group">
                <label class="form-label">Phone Number *</label>
                <input type="tel" id="patPhone" class="form-control" required placeholder="+1 234 567 8900">
              </div>
              <div class="form-group">
                <label class="form-label">Age *</label>
                <input type="number" id="patAge" class="form-control" required placeholder="35" min="0" max="120">
              </div>
            </div>

            <h3 style="color: var(--primary-dark); margin-top: 1.5rem; margin-bottom: 1.5rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">Appointment Details</h3>
            
            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">Department *</label>
                <select id="apptDept" class="form-control" required>
                  <option value="" disabled selected>Select Department</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="General">General Medicine</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Preferred Doctor *</label>
                <select id="apptDoctor" class="form-control" required>
                  <option value="" disabled selected>Select Doctor</option>
                  <!-- Populated by JS -->
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Preferred Date *</label>
                <input type="date" id="apptDate" class="form-control" required>
              </div>
              <div class="form-group">
                <label class="form-label">Time Slot *</label>
                <select id="apptTime" class="form-control" required>
                  <option value="" disabled selected>Select Time Slot</option>
                  <option value="09:00 AM">09:00 AM - 10:00 AM</option>
                  <option value="10:30 AM">10:30 AM - 11:30 AM</option>
                  <option value="01:00 PM">01:00 PM - 02:00 PM</option>
                  <option value="03:00 PM">03:00 PM - 04:00 PM</option>
                </select>
              </div>
            </div>
            
            <div class="form-group" style="margin-top: 1rem;">
              <label class="form-label">Describe Symptoms (Optional)</label>
              <textarea id="apptSymptoms" class="form-control" rows="4" placeholder="Briefly describe your medical concerns..."></textarea>
            </div>

            <div id="formError" style="display: none; padding: 1rem; background: rgba(239, 68, 68, 0.1); color: var(--danger-color); border-radius: var(--radius-md); margin-top: 1rem; border: 1px solid var(--danger-color);"></div>

            <div class="form-group" style="text-align: center; margin-top: 2rem;">
              <button type="submit" id="submitBtn" class="btn btn-primary btn-lg w-100" style="max-width: 300px;"><i class='bx bx-check-circle'></i> Confirm Appointment</button>
            </div>
          </form>

          <!-- Success Message Placeholder -->
          <div id="successMsg" style="display: none; text-align: center; padding: 3rem 1rem; color: var(--success-color);">
            <i class='bx bxs-check-circle' style="font-size: 5rem; margin-bottom: 1rem;"></i>
            <h2 style="color: var(--text-primary); margin-bottom: 1rem;">Appointment Confirmed!</h2>
            <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">Your appointment has been successfully booked and saved to our system.</p>
            <div style="background: var(--bg-color); padding: 1.5rem; border-radius: var(--radius-md); display: inline-block; text-align: left; border: 1px dashed var(--border-color);">
               <p style="margin-bottom: 0.5rem"><strong>Database ID:</strong> <span id="genAptId" style="font-family: monospace;"></span></p>
               <p style="margin-bottom: 0.5rem"><strong>Date & Time:</strong> <span id="genAptDT"></span></p>
               <p style="margin: 0"><strong>Doctor:</strong> <span id="genAptDoc"></span></p>
            </div>
            <div style="margin-top: 2rem;">
               <button class="btn btn-outline" onclick="window.navigateTo('/')">Return Home</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  const form = document.getElementById('appointmentForm');
  const successMsg = document.getElementById('successMsg');
  const loader = document.getElementById('formLoading');
  const docSelect = document.getElementById('apptDoctor');
  const errBox = document.getElementById('formError');
  const submitBtn = document.getElementById('submitBtn');

  // Set minimum date to today
  const dateInput = document.getElementById('apptDate');
  const today = new Date().toISOString().split('T')[0];
  if (dateInput) dateInput.setAttribute('min', today);

  // Fetch Doctors for dropdown
  let doctors = [];
  try {
    const { data, error } = await supabase.from('doctors').select('id, name, department');
    if (error) throw error;
    doctors = data || [];

    // Check URL params for pre-selected doctor
    const urlParams = new URLSearchParams(window.location.search);
    const preselectedDocId = urlParams.get('doc');

    let optionsHtml = '<option value="" disabled selected>Select Doctor</option>';
    doctors.forEach(d => {
      const selected = d.id === preselectedDocId ? 'selected' : '';
      optionsHtml += `<option value="${d.id}" ${selected}>${d.name} (${d.department})</option>`;
    });

    docSelect.innerHTML = optionsHtml;
    loader.style.display = 'none';
    form.style.display = 'block';

  } catch (err) {
    console.error("Error loading doctors:", err);
    loader.innerHTML = '<p style="color: var(--danger-color);">Error loading booking form. Database connection failed.</p>';
  }

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      errBox.style.display = 'none';

      const originalBtnText = submitBtn.innerHTML;
      submitBtn.innerHTML = `<i class='bx bx-loader-alt bx-spin'></i> Processing...`;
      submitBtn.disabled = true;

      try {
        // 1. Upsert Patient
        const email = document.getElementById('patEmail').value;
        const name = document.getElementById('patName').value;
        const phone = document.getElementById('patPhone').value;
        const age = parseInt(document.getElementById('patAge').value);

        let patientId = null;

        // Check if patient exists by email
        const { data: existingPat, error: searchErr } = await supabase.from('patients').select('id').eq('email', email).maybeSingle();
        if (searchErr) throw searchErr;

        if (existingPat) {
          patientId = existingPat.id;
          // Optionally update details here if needed.
        } else {
          // Create new patient
          const { data: newPat, error: insertErr } = await supabase.from('patients').insert([{
            full_name: name,
            email: email,
            phone_number: phone,
            age: age
          }]).select('id').single();

          if (insertErr) throw insertErr;
          patientId = newPat.id;
        }

        // 2. Create Appointment
        const aptDate = document.getElementById('apptDate').value;
        const aptTime = document.getElementById('apptTime').value;
        const aptDocId = document.getElementById('apptDoctor').value;
        const aptDept = document.getElementById('apptDept').value;
        const aptSymptoms = document.getElementById('apptSymptoms').value;

        const { data: aptData, error: aptErr } = await supabase.from('appointments').insert([{
          patient_id: patientId,
          doctor_id: aptDocId,
          appointment_date: aptDate,
          time_slot: aptTime,
          department: aptDept,
          symptoms: aptSymptoms,
          status: 'Confirmed'
        }]).select('id').single();

        if (aptErr) throw aptErr;

        // Success! Get doctor name for receipt
        const docName = doctors.find(d => d.id === aptDocId)?.name || 'Unknown Doctor';

        // 3. Send Email Notification to Admin via Web3Forms
        try {
          await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              access_key: "944aa710-b3ad-4420-83d6-c368805954e0",
              subject: `New Appointment: ${name}`,
              from_name: "Annai Hospital System",
              message: `New appointment booked!

Patient Details:
- Name: ${name}
- Email: ${email}
- Phone: ${phone}
- Age: ${age}

Appointment Details:
- Doctor: ${docName}
- Department: ${aptDept}
- Date: ${aptDate}
- Time: ${aptTime}
- Symptoms/Notes: ${aptSymptoms || 'None provided'}`
            })
          });
        } catch (emailErr) {
          console.error("Failed to send admin notification email:", emailErr);
          // Proceed anyway because the database insert succeeded
        }

        form.style.display = 'none';
        successMsg.style.display = 'block';

        document.getElementById('genAptId').innerText = aptData.id;
        document.getElementById('genAptDT').innerText = aptDate + ' at ' + aptTime;
        document.getElementById('genAptDoc').innerText = docName;

        window.scrollTo({ top: 0, behavior: 'smooth' });

      } catch (err) {
        console.error("Booking error:", err);
        errBox.innerText = `Failed to book appointment: ${err.message || 'Unknown error. Please try again later.'}`;
        errBox.style.display = 'block';
      } finally {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
      }
    });
  }
};
