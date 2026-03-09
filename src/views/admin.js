import { supabase } from '../lib/supabase.js';

export const renderAdminDash = async (container) => {

   // Check Admin Auth (Simulated check, real app would verify role='admin')
   const { data: { session } } = await supabase.auth.getSession();
   if (!session) {
      container.innerHTML = `<div style="padding: 5rem; text-align: center; color: var(--danger-color);"><h2>Access Denied</h2><p>You must be an authenticated administrator to view this page.</p><button class="btn btn-primary" onclick="window.navigateTo('/login')">Log In</button></div>`;
      return;
   }

   // 1. Fetch real appointments
   container.innerHTML = `
      <div style="display: flex; min-height: calc(100vh - 80px); background-color: var(--bg-color); flex-direction: column;">
         <div style="padding: 5rem; text-align: center;">
            <i class='bx bx-loader-alt bx-spin' style="font-size: 3rem; color: var(--primary);"></i>
            <p style="color: var(--text-secondary); margin-top: 1rem;">Loading Hospital Analytics & Data...</p>
         </div>
      </div>
   `;

   let appointments = [];
   let patients = [];

   try {
      // Fetch Appointments with nested Doctor and Patient data is complex without views, 
      // so we fetch separately for simplicity in this demo.
      const { data: aptsData } = await supabase.from('appointments').select('*').order('appointment_date', { ascending: true });
      appointments = aptsData || [];

      const { data: patsData } = await supabase.from('patients').select('id, full_name, email');
      patients = patsData || [];

   } catch (err) {
      console.error("Admin data fetch error:", err);
   }

   // Generate Appointments Table HTML
   let aptRows = '';
   if (appointments.length === 0) {
      aptRows = `<tr><td colspan="5" style="text-align: center; padding: 2rem; color: var(--text-secondary);">No appointments booked yet.</td></tr>`;
   } else {
      aptRows = appointments.map(apt => {
         // Resolve Patient Name
         const pat = patients.find(p => p.id === apt.patient_id);
         const patientName = pat ? pat.full_name : 'Unknown Patient';

         const statusColor = apt.status === 'Confirmed' ? 'var(--success-color)' : (apt.status === 'Cancelled' ? 'var(--danger-color)' : 'var(--warning-color)');

         return `
            <tr style="border-bottom: 1px solid var(--border-color);">
               <td style="padding: 1rem;">${new Date(apt.appointment_date).toLocaleDateString()} at ${apt.time_slot}</td>
               <td style="padding: 1rem; font-weight: 500;">${patientName}</td>
               <td style="padding: 1rem;">${apt.department}</td>
               <td style="padding: 1rem; color: var(--text-secondary); font-size: 0.9rem;">${apt.symptoms || 'None'}</td>
               <td style="padding: 1rem;"><span style="background: ${statusColor}20; color: ${statusColor}; padding: 0.25rem 0.75rem; border-radius: 1rem; font-size: 0.85rem; font-weight: 600;">${apt.status || 'Pending'}</span></td>
            </tr>
         `;
      }).join('');
   }

   // Generate Patient Dropdown for Upload Tool
   let patientOptions = patients.map(p => `<option value="${p.id}">${p.full_name} (${p.email})</option>`).join('');

   // Render Main Dashboard
   container.innerHTML = `
      <div style="display: flex; min-height: calc(100vh - 80px); background-color: var(--bg-color);">
        
        <!-- Main Dashboard Content -->
        <main style="flex-grow: 1; padding: 2rem; overflow-y: auto;">
           <div style="max-width: 1200px; margin: 0 auto;">
              
              <header style="margin-bottom: 2rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
                 <div>
                   <h1 style="color: var(--primary-dark); font-size: 2rem;">Admin Operations</h1>
                   <p style="color: var(--text-secondary);">Manage appointments and securely upload lab reports.</p>
                 </div>
                 <div style="display: flex; gap: 1rem; align-items: center;">
                    <div style="background: white; padding: 0.5rem 1rem; border-radius: var(--radius-md); box-shadow: var(--shadow-sm); display: flex; align-items: center; gap: 0.5rem;">
                       <div style="width: 10px; height: 10px; border-radius: 50%; background: var(--success-color);"></div>
                       <span style="font-size: 0.85rem; font-weight: 600; color: var(--text-secondary);">System Online</span>
                    </div>
                 </div>
              </header>
  
              <div class="grid-2" style="gap: 1.5rem; margin-bottom: 2.5rem;">
                 
                 <!-- Upload Lab Report Tool -->
                 <div class="glass-card" style="padding: 2rem;">
                    <h3 style="color: var(--primary-dark); font-size: 1.25rem; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
                       <i class='bx bx-cloud-upload' style="color: var(--accent);"></i> Upload Lab Report
                    </h3>
                    <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1.5rem;">Securely upload medical reports to a patient's vault.</p>
                    
                    <form id="uploadReportForm" style="display: flex; flex-direction: column; gap: 1rem;">
                       <div class="form-group" style="margin: 0;">
                          <label class="form-label">Select Patient</label>
                          <select id="urPatient" class="form-control" required>
                             <option value="" disabled selected>-- Select Patient --</option>
                             ${patientOptions}
                          </select>
                       </div>
                       <div class="form-group" style="margin: 0;">
                          <label class="form-label">Report Title</label>
                          <input type="text" id="urName" class="form-control" required placeholder="e.g. Complete Blood Count (CBC)">
                       </div>
                       <div class="form-group" style="margin: 0;">
                          <label class="form-label">File URL (e.g. S3 Link / PDF)</label>
                          <input type="url" id="urUrl" class="form-control" required placeholder="https://cdn.hospital.com/reports/123.pdf">
                       </div>
                       <div class="form-group" style="margin: 0;">
                          <label class="form-label">Ordered By (Doctor Name)</label>
                          <input type="text" id="urDoc" class="form-control" placeholder="Dr. Sarah Jenkins">
                       </div>
                       
                       <div id="urSuccess" style="display: none; padding: 0.75rem; background: var(--success-color); color: white; border-radius: var(--radius-md); text-align: center; font-size: 0.9rem; font-weight: 500;">Report Uploaded Successfully!</div>
                       <div id="urError" style="display: none; padding: 0.75rem; background: var(--danger-color); color: white; border-radius: var(--radius-md); text-align: center; font-size: 0.9rem; font-weight: 500;">Failed to upload report.</div>
                       
                       <button type="submit" id="urBtn" class="btn btn-primary w-100" style="margin-top: 0.5rem;"><i class='bx bx-upload'></i> Save Report to Vault</button>
                    </form>
                 </div>
  
                 <!-- Summary Stats -->
                 <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                    <div class="glass-card" style="padding: 1.5rem; border-left: 4px solid var(--primary); flex-grow: 1; display: flex; flex-direction: column; justify-content: center;">
                       <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.25rem; font-weight: 600; text-transform: uppercase;">Total Appointments</p>
                       <h4 style="font-size: 3rem; color: var(--primary-dark); margin: 0;">${appointments.length}</h4>
                    </div>
                    
                    <div class="glass-card" style="padding: 1.5rem; border-left: 4px solid var(--accent); flex-grow: 1; display: flex; flex-direction: column; justify-content: center;">
                       <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.25rem; font-weight: 600; text-transform: uppercase;">Registered Patients</p>
                       <h4 style="font-size: 3rem; color: var(--primary-dark); margin: 0;">${patients.length}</h4>
                    </div>
                 </div>

              </div>
  
              <!-- Appointments Table Section -->
              <div class="glass-card" style="padding: 2rem;">
                 <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
                   <h3 style="color: var(--primary-dark); font-size: 1.25rem; margin: 0; display: flex; align-items: center; gap: 0.5rem;">
                      <i class='bx bx-calendar-event'></i> All Appointments
                   </h3>
                 </div>
                 
                 <div style="overflow-x: auto;">
                    <table style="width: 100%; border-collapse: collapse; text-align: left;">
                       <thead>
                          <tr style="background: var(--bg-color-alt); color: var(--text-secondary); text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.5px;">
                             <th style="padding: 1rem; border-radius: 8px 0 0 8px;">Date & Time</th>
                             <th style="padding: 1rem;">Patient</th>
                             <th style="padding: 1rem;">Department</th>
                             <th style="padding: 1rem;">Symptoms/Notes</th>
                             <th style="padding: 1rem; border-radius: 0 8px 8px 0;">Status</th>
                          </tr>
                       </thead>
                       <tbody>
                          ${aptRows}
                       </tbody>
                    </table>
                 </div>
              </div>
  
           </div>
        </main>
      </div>
    `;

   // Upload Report Logic
   const form = document.getElementById('uploadReportForm');
   if (form) {
      form.addEventListener('submit', async (e) => {
         e.preventDefault();
         const btn = document.getElementById('urBtn');
         const successBox = document.getElementById('urSuccess');
         const errorBox = document.getElementById('urError');

         successBox.style.display = 'none';
         errorBox.style.display = 'none';
         const ogBtnText = btn.innerHTML;
         btn.innerHTML = `<i class='bx bx-loader-alt bx-spin'></i> Uploading...`;
         btn.disabled = true;

         try {
            const patientId = document.getElementById('urPatient').value;
            const reportName = document.getElementById('urName').value;
            const fileUrl = document.getElementById('urUrl').value;
            const orderedBy = document.getElementById('urDoc').value;

            const { error } = await supabase.from('lab_reports').insert([{
               patient_id: patientId,
               report_name: reportName,
               file_url: fileUrl,
               ordered_by: orderedBy
            }]);

            if (error) throw error;

            successBox.style.display = 'block';
            form.reset();

            // Hide success after 3s
            setTimeout(() => { successBox.style.display = 'none'; }, 3000);

         } catch (err) {
            console.error("Upload error:", err);
            errorBox.innerText = `Error: ${err.message}`;
            errorBox.style.display = 'block';
         } finally {
            btn.innerHTML = ogBtnText;
            btn.disabled = false;
         }
      });
   }
};
