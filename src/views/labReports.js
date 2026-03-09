import { initRouter } from '../router.js';
import { supabase } from '../lib/supabase.js';

export const renderLabReports = async (container) => {


  // Auth & Data Logic
  const initReports = async () => {
    // 1. Check Authentication Session
    const { data: { session }, error: sessionErr } = await supabase.auth.getSession();

    if (sessionErr || !session) {
      // User is not logged in
      container.innerHTML = `
        <div class="page-header" style="background: linear-gradient(135deg, var(--primary-dark), var(--primary)); color: white; padding: 4rem 0; text-align: center;">
          <div class="container">
            <h1 style="font-size: 2.5rem; margin-bottom: 0.5rem;">Lab Reports Download</h1>
            <p style="color: #cbd5e1;">Access your medical test reports securely online.</p>
          </div>
        </div>
        <section class="section" style="min-height: 50vh; display: flex; justify-content: center; align-items: center; background: var(--bg-color-alt);">
           <div class="glass-card" style="padding: 3rem; text-align: center; max-width: 500px;">
              <i class='bx bx-lock-alt' style="font-size: 4rem; color: var(--text-secondary); margin-bottom: 1rem;"></i>
              <h2 style="color: var(--primary-dark); margin-bottom: 1rem;">Authentication Required</h2>
              <p style="color: var(--text-secondary); margin-bottom: 2rem;">You must be logged into your Patient Portal account to view and download your secure lab reports.</p>
              <div style="display: flex; gap: 1rem; justify-content: center;">
                 <button class="btn btn-primary" onclick="window.navigateTo('/login')">Log In</button>
                 <button class="btn btn-outline" onclick="window.navigateTo('/signup')">Create Account</button>
              </div>
           </div>
        </section>
      `;
      return;
    }

    // User IS logged in. 
    // Wait UI
    container.innerHTML = `
       <div class="page-header" style="background: linear-gradient(135deg, var(--primary-dark), var(--primary)); color: white; padding: 4rem 0; text-align: center;">
          <div class="container">
            <h1 style="font-size: 2.5rem; margin-bottom: 0.5rem;">Lab Reports Download</h1>
            <p style="color: #cbd5e1;">Access your medical test reports securely online.</p>
          </div>
        </div>
        <div style="padding: 5rem 0; text-align: center;">
           <i class='bx bx-loader-alt bx-spin' style="font-size: 3rem; color: var(--primary);"></i>
           <p style="color: var(--text-secondary); margin-top: 1rem;">Verifying identity & fetching reports...</p>
        </div>
    `;

    try {
      // 2. Get Patient ID based on Auth ID
      const { data: patientData, error: patErr } = await supabase
        .from('patients')
        .select('id, full_name')
        .eq('auth_user_id', session.user.id)
        .maybeSingle();

      if (patErr) throw patErr;

      // 3. Fetch Lab Reports for this Patient
      let reportsHTML = '';

      if (!patientData) {
        reportsHTML = `<div style="text-align: center; padding: 3rem; color: var(--text-secondary);">Patient profile not found. Please contact administration.</div>`;
      } else {
        const { data: reports, error: repErr } = await supabase
          .from('lab_reports')
          .select('*')
          .eq('patient_id', patientData.id)
          .order('created_at', { ascending: false });

        if (repErr) throw repErr;

        if (!reports || reports.length === 0) {
          reportsHTML = `
               <div style="text-align: center; padding: 3rem; background: white; border-radius: var(--radius-md); border: 1px dashed var(--border-color);">
                  <i class='bx bx-folder-open' style="font-size: 3rem; color: var(--text-secondary); margin-bottom: 1rem;"></i>
                  <h3 style="color: var(--primary-dark);">No Reports Available</h3>
                  <p style="color: var(--text-secondary);">There are currently no lab reports uploaded to your secure file.</p>
               </div>
            `;
        } else {
          reportsHTML = reports.map(r => `
               <div class="glass-card" style="padding: 1.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; border-left: 4px solid var(--primary);">
                 <div style="display: flex; align-items: center; gap: 1rem;">
                    <div style="width: 50px; height: 50px; border-radius: var(--radius-md); background: rgba(15, 76, 129, 0.1); color: var(--primary); display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
                       <i class='bx bx-file'></i>
                    </div>
                    <div>
                       <h4 style="color: var(--text-primary); margin-bottom: 0.25rem;">${r.report_name}</h4>
                       <p style="color: var(--text-secondary); font-size: 0.85rem; margin: 0;">Date: ${new Date(r.created_at).toLocaleDateString()} ${r.ordered_by ? `| Ordered by: ${r.ordered_by}` : ''}</p>
                    </div>
                 </div>
                 <a href="${r.file_url}" target="_blank" class="btn btn-gradient"><i class='bx bx-download'></i> Download Report</a>
               </div>
            `).join('');
        }
      }

      // 4. Render Final View
      container.innerHTML = `
        <div class="page-header" style="background: linear-gradient(135deg, var(--primary-dark), var(--primary)); color: white; padding: 4rem 0; text-align: center;">
          <div class="container">
            <h1 style="font-size: 2.5rem; margin-bottom: 0.5rem;">Your Medical Reports</h1>
            <p style="color: #cbd5e1;">Securely access your clinical data, ${patientData ? patientData.full_name : 'Patient'}.</p>
          </div>
        </div>
        
        <section class="section" style="min-height: 50vh; background: var(--bg-color-alt);">
          <div class="container" style="max-width: 800px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
               <h2 style="color: var(--primary-dark); font-size: 1.5rem;"><i class='bx bx-check-shield' style="color: var(--success-color);"></i> Secure Vault</h2>
               <button class="btn btn-outline" style="font-size: 0.85rem; padding: 0.5rem 1rem;" onclick="window.navigateTo('/patient-portal')">Back to Portal</button>
            </div>
            
            <div style="display: flex; flex-direction: column; gap: 1rem;">
               ${reportsHTML}
            </div>
          </div>
        </section>
      `;

    } catch (err) {
      console.error("Lab Reports Error:", err);
      container.innerHTML = `<div style="text-align: center; padding: 5rem; color: var(--danger-color);">Failed to load reports: ${err.message}</div>`;
    }
  };

  initReports();
};
