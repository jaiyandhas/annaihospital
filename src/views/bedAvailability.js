import { initRouter, navigateTo } from '../router.js';

export const renderBedAvailability = (container) => {
    container.innerHTML = `
    <div class="page-header" style="background: linear-gradient(135deg, var(--primary-dark), var(--primary)); color: white; padding: 4rem 0; text-align: center;">
      <div class="container">
        <h1 style="font-size: 2.5rem; margin-bottom: 0.5rem;">Live Bed Availability</h1>
        <p style="color: #cbd5e1;">Real-time updates on hospital bed availability.</p>
      </div>
    </div>
    
    <section class="section bg-light">
      <div class="container">
        
        <div style="background: white; padding: 1.5rem; border-radius: var(--radius-lg); box-shadow: var(--shadow-sm); margin-bottom: 2rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <div style="display: flex; gap: 1rem; align-items: center;">
             <span style="font-weight: 600; color: var(--text-secondary);">Last Updated:</span>
             <span id="updateTime" style="color: var(--primary-dark); font-weight: 700;">Just now</span>
          </div>
          <button class="btn btn-outline" id="refreshBeds" style="padding: 0.5rem 1rem;"><i class='bx bx-refresh'></i> Refresh Data</button>
        </div>

        <div class="grid-3" id="bedGrid">
          <!-- Populated by JS -->
        </div>

        <div style="margin-top: 3rem; text-align: center;">
          <h3 style="margin-bottom: 1.5rem; color: var(--primary-dark);">Status Overview</h3>
          <div style="display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span style="display: inline-block; width: 16px; height: 16px; border-radius: 50%; background: var(--success-color);"></span>
              <span>Available (>20%)</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span style="display: inline-block; width: 16px; height: 16px; border-radius: 50%; background: var(--warning-color);"></span>
              <span>Limited (<20%)</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span style="display: inline-block; width: 16px; height: 16px; border-radius: 50%; background: var(--danger-color);"></span>
              <span>Full (0)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

    const bedData = [
        { type: 'Intensive Care Unit (ICU)', total: 50, occupied: 45, icon: 'bx-pulse' },
        { type: 'General Ward', total: 200, occupied: 120, icon: 'bx-bed' },
        { type: 'Private Room', total: 80, occupied: 78, icon: 'bx-building-house' },
        { type: 'Emergency (ER)', total: 40, occupied: 25, icon: 'bx-first-aid' },
        { type: 'Maternity Ward', total: 60, occupied: 50, icon: 'bx-child' },
        { type: 'Pediatrics', total: 45, occupied: 45, icon: 'bx-face' } // Full example
    ];

    const renderGrid = () => {
        const grid = document.getElementById('bedGrid');

        grid.innerHTML = bedData.map(bed => {
            const available = bed.total - bed.occupied;
            const percentOccupied = (bed.occupied / bed.total) * 100;

            let statusColor = 'var(--success-color)';
            let statusText = 'Available';
            let statusBg = 'rgba(16, 185, 129, 0.1)';

            if (available === 0) {
                statusColor = 'var(--danger-color)';
                statusText = 'Full';
                statusBg = 'rgba(239, 68, 68, 0.1)';
            } else if (percentOccupied > 80) {
                statusColor = 'var(--warning-color)';
                statusText = 'Limited';
                statusBg = 'rgba(245, 158, 11, 0.1)';
            }

            return `
        <div class="glass-card" style="padding: 2rem; position: relative; overflow: hidden; display: flex; flex-direction: column;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem;">
            <div>
               <i class='bx ${bed.icon}' style="font-size: 2.5rem; color: var(--primary); margin-bottom: 0.5rem;"></i>
               <h3 style="color: var(--primary-dark); font-size: 1.25rem;">${bed.type}</h3>
            </div>
            <span style="background: ${statusBg}; color: ${statusColor}; padding: 0.25rem 0.75rem; border-radius: var(--radius-full); font-size: 0.85rem; font-weight: 600; border: 1px solid ${statusColor};">${statusText}</span>
          </div>
          
          <div style="display: flex; align-items: flex-end; gap: 0.5rem; margin-bottom: 1.5rem;">
             <span style="font-size: 3rem; font-weight: 800; line-height: 1; color: ${statusColor};">${available}</span>
             <span style="color: var(--text-secondary); margin-bottom: 0.5rem; font-weight: 500;">Beds Available</span>
          </div>
          
          <div style="margin-top: auto;">
             <div style="display: flex; justify-content: space-between; font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.5rem;">
                <span>Occupied: ${bed.occupied}</span>
                <span>Total: ${bed.total}</span>
             </div>
             <div style="width: 100%; height: 8px; background: whitesmoke; border-radius: 4px; overflow: hidden;">
                <div style="width: ${percentOccupied}%; height: 100%; background: ${statusColor}; border-radius: 4px;"></div>
             </div>
          </div>
        </div>
      `;
        }).join('');

        const d = new Date();
        document.getElementById('updateTime').innerText = d.toLocaleTimeString();
    };

    renderGrid();

    document.getElementById('refreshBeds').addEventListener('click', (e) => {
        const btn = e.currentTarget;
        btn.innerHTML = `<i class='bx bx-loader-alt bx-spin'></i> Refreshing...`;

        // Randomize some data mock
        setTimeout(() => {
            bedData[0].occupied = Math.max(0, bedData[0].occupied + Math.floor(Math.random() * 5) - 2);
            bedData[1].occupied = Math.max(0, bedData[1].occupied + Math.floor(Math.random() * 10) - 5);
            renderGrid();
            btn.innerHTML = `<i class='bx bx-refresh'></i> Refresh Data`;
        }, 800);
    });
};
