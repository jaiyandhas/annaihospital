import { initRouter, navigateTo } from '../router.js';

export const renderPatientPortal = (container) => {
   container.innerHTML = `
   < div style = "display: flex; min-height: calc(100vh - 80px); background-color: var(--bg-color);" >
      
      < !--Default Sidebar(Desktop)-- >
      <aside style="width: 280px; background: white; border-right: 1px solid var(--border-color); padding: 2rem; position: sticky; top: 80px; height: calc(100vh - 80px); overflow-y: auto;" class="desktop-only">
         <div style="text-align: center; margin-bottom: 2rem;">
            <div style="width: 80px; height: 80px; background: var(--primary-light); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; margin: 0 auto 1rem;">
               <i class='bx bx-user'></i>
            </div>
            <h3 style="color: var(--primary-dark); font-size: 1.25rem;">John Doe</h3>
            <p style="color: var(--text-secondary); font-size: 0.85rem;">PID: PAT-84920</p>
         </div>

         <ul style="display: flex; flex-direction: column; gap: 0.5rem; list-style: none;">
            <li><a href="#" class="portal-nav active"><i class='bx bx-grid-alt'></i> Dashboard</a></li>
            <li><a href="#" class="portal-nav"><i class='bx bx-calendar-event'></i> Appointments</a></li>
            <li><a href="/lab-reports" data-link class="portal-nav"><i class='bx bx-file-blank'></i> Lab Reports</a></li>
            <li><a href="#" class="portal-nav"><i class='bx bx-capsule'></i> Prescriptions</a></li>
            <li><a href="#" class="portal-nav"><i class='bx bx-credit-card'></i> Billing Details</a></li>
            <li><a href="#" class="portal-nav"><i class='bx bx-user-circle'></i> Profile Settings</a></li>
         </ul>

         <div style="margin-top: 2rem;">
            <button class="btn btn-outline w-100" style="color: var(--danger-color); border-color: var(--danger-color);"><i class='bx bx-log-out'></i> Logout</button>
         </div>
      </aside>

      <!--Main Dashboard Content-- >
   <main style="flex-grow: 1; padding: 2rem;">
      <div style="max-width: 1000px; margin: 0 auto;">

         <header style="margin-bottom: 2rem; display: flex; justify-content: space-between; align-items: center;">
            <div>
               <h1 style="color: var(--primary-dark); font-size: 2rem;">Welcome back, John!</h1>
               <p style="color: var(--text-secondary);">Here is an overview of your health profile.</p>
            </div>
            <button class="btn btn-primary" onclick="window.navigateTo('/appointment')"><i class='bx bx-plus'></i> New Appointment</button>
         </header>

         <div class="grid-3" style="gap: 1.5rem; margin-bottom: 2rem;">
            <div class="glass-card" style="padding: 1.5rem; display: flex; align-items: center; gap: 1rem;">
               <div style="width: 50px; height: 50px; background: rgba(34, 197, 94, 0.1); color: var(--accent-dark); border-radius: 12px; display: flex; justify-content: center; align-items: center; font-size: 1.5rem;">
                  <i class='bx bx-calendar-check'></i>
               </div>
               <div>
                  <h4 style="font-size: 1.5rem; color: var(--primary-dark); margin-bottom: 0;">2</h4>
                  <span style="color: var(--text-secondary); font-size: 0.85rem;">Upcoming Appts</span>
               </div>
            </div>
            <div class="glass-card" style="padding: 1.5rem; display: flex; align-items: center; gap: 1rem;">
               <div style="width: 50px; height: 50px; background: rgba(15, 76, 129, 0.1); color: var(--primary); border-radius: 12px; display: flex; justify-content: center; align-items: center; font-size: 1.5rem;">
                  <i class='bx bx-file'></i>
               </div>
               <div>
                  <h4 style="font-size: 1.5rem; color: var(--primary-dark); margin-bottom: 0;">5</h4>
                  <span style="color: var(--text-secondary); font-size: 0.85rem;">Lab Reports</span>
               </div>
            </div>
            <div class="glass-card" style="padding: 1.5rem; display: flex; align-items: center; gap: 1rem;">
               <div style="width: 50px; height: 50px; background: rgba(245, 158, 11, 0.1); color: var(--warning-color); border-radius: 12px; display: flex; justify-content: center; align-items: center; font-size: 1.5rem;">
                  <i class='bx bx-capsule'></i>
               </div>
               <div>
                  <h4 style="font-size: 1.5rem; color: var(--primary-dark); margin-bottom: 0;">1</h4>
                  <span style="color: var(--text-secondary); font-size: 0.85rem;">Active Prescription</span>
               </div>
            </div>
         </div>

         <div class="grid-2" style="gap: 1.5rem;">

            <!-- Upcoming Appointments -->
            <div class="glass-card" style="padding: 1.5rem;">
               <h3 style="color: var(--primary-dark); margin-bottom: 1.5rem; font-size: 1.25rem; display: flex; align-items: center; gap: 0.5rem;"><i class='bx bx-time'></i> Upcoming Appointments</h3>

               <div style="display: flex; flex-direction: column; gap: 1rem;">
                  <div style="padding: 1rem; border: 1px solid var(--border-color); border-radius: var(--radius-md); border-left: 4px solid var(--primary-light);">
                     <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                        <h4 style="color: var(--text-primary); margin: 0;">Cardiology Consultation</h4>
                        <span class="status-badge status-yellow" style="font-size: 0.7rem;">Tomorrow</span>
                     </div>
                     <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.5rem;"><i class='bx bx-user-pin'></i> Dr. Sarah Jenkins</p>
                     <p style="font-size: 0.85rem; color: var(--primary); font-weight: 500; margin: 0;"><i class='bx bx-calendar'></i> Oct 28, 2023 - 10:30 AM</p>
                  </div>

                  <div style="padding: 1rem; border: 1px solid var(--border-color); border-radius: var(--radius-md); border-left: 4px solid var(--border-color);">
                     <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                        <h4 style="color: var(--text-primary); margin: 0;">General Checkup</h4>
                        <span class="status-badge" style="background: rgba(0,0,0,0.05); color: var(--text-secondary); font-size: 0.7rem;">Nov 15</span>
                     </div>
                     <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.5rem;"><i class='bx bx-user-pin'></i> Dr. Emily Brown</p>
                     <p style="font-size: 0.85rem; color: var(--text-secondary); font-weight: 500; margin: 0;"><i class='bx bx-calendar'></i> Nov 15, 2023 - 09:00 AM</p>
                  </div>
               </div>
            </div>

            <!-- Recent Activity & Prescriptions -->
            <div style="display: flex; flex-direction: column; gap: 1.5rem;">

               <div class="glass-card" style="padding: 1.5rem;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                     <h3 style="color: var(--primary-dark); font-size: 1.25rem; display: flex; align-items: center; gap: 0.5rem; margin: 0;"><i class='bx bx-capsule'></i> Current Medication</h3>
                     <a href="#" style="font-size: 0.85rem;">View All</a>
                  </div>

                  <div style="padding: 1rem; background: var(--bg-color-alt); border-radius: var(--radius-md); display: flex; align-items: center; gap: 1rem;">
                     <i class='bx bx-plus-medical' style="font-size: 2rem; color: var(--accent-dark);"></i>
                     <div>
                        <h4 style="color: var(--text-primary); margin-bottom: 0.2rem;">Atorvastatin 20mg</h4>
                        <p style="color: var(--text-secondary); font-size: 0.85rem; margin: 0;">1 Tablet daily after dinner</p>
                     </div>
                  </div>
               </div>

               <div class="glass-card" style="padding: 1.5rem;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                     <h3 style="color: var(--primary-dark); font-size: 1.25rem; display: flex; align-items: center; gap: 0.5rem; margin: 0;"><i class='bx bx-receipt'></i> Recent Billing</h3>
                     <a href="#" style="font-size: 0.85rem;">History</a>
                  </div>

                  <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 0.8rem; border-bottom: 1px solid var(--border-color); margin-bottom: 0.8rem;">
                     <div>
                        <h4 style="font-size: 0.95rem; color: var(--text-primary); margin: 0;">Lab Test - CBC</h4>
                        <span style="font-size: 0.8rem; color: var(--text-secondary);">Oct 24, 2023</span>
                     </div>
                     <span style="font-weight: 600; color: var(--success-color);">Paid: $45.00</span>
                  </div>

                  <div style="display: flex; justify-content: space-between; align-items: center;">
                     <div>
                        <h4 style="font-size: 0.95rem; color: var(--text-primary); margin: 0;">Cardiology Visit</h4>
                        <span style="font-size: 0.8rem; color: var(--text-secondary);">Sep 12, 2023</span>
                     </div>
                     <span style="font-weight: 600; color: var(--success-color);">Paid: $120.00</span>
                  </div>
               </div>

            </div>
         </div>

      </div>
   </main>

    </div >

   <style>
      .portal-nav {
         display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      color: var(--text-secondary);
      border-radius: var(--radius-md);
      transition: all 0.2s;
      font-weight: 500;
      }
      .portal-nav:hover {
         background: rgba(15, 76, 129, 0.05);
      color: var(--primary);
      }
      .portal-nav.active {
         background: var(--primary);
      color: white;
      box-shadow: 0 4px 10px rgba(15, 76, 129, 0.2);
      }
   </style>
`;
};
