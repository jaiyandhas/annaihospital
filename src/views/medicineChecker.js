import { initRouter } from '../router.js';
import { supabase } from '../lib/supabase.js';

export const renderMedicineChecker = async (container) => {
   container.innerHTML = `
    <div class="page-header" style="background: linear-gradient(135deg, var(--primary-dark), var(--primary)); color: white; padding: 4rem 0; text-align: center;">
      <div class="container">
        <h1 style="font-size: 2.5rem; margin-bottom: 0.5rem;">Pharmacy & Medicine Checker</h1>
        <p style="color: #cbd5e1;">Check real-time availability of medicines in our hospital pharmacy.</p>
      </div>
    </div>
    
    <section class="section" style="min-height: 60vh;">
      <div class="container" style="max-width: 800px;">
        
        <div class="glass-card" style="padding: 2.5rem; margin-bottom: 2rem;">
          <h3 style="color: var(--primary-dark); margin-bottom: 1.5rem; text-align: center;">Search Inventory</h3>
          
          <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
             <div style="flex-grow: 1; position: relative;">
                <i class='bx bx-search' style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--text-secondary); font-size: 1.25rem;"></i>
                <input type="text" id="medSearchInput" class="form-control" placeholder="Search by medicine name or type (e.g., Paracetamol, Antibiotic)..." style="padding-left: 3rem;">
             </div>
             <button id="medSearchBtn" class="btn btn-primary" style="padding: 0.75rem 2rem;"><i class='bx bx-search-alt-2'></i> Check Stock</button>
          </div>
          
          <div style="margin-top: 1rem; font-size: 0.85rem; color: var(--text-secondary); text-align: center;">
             <p><i class='bx bx-error-circle'></i> Prescription is required for all antibiotics and specialized care medicines.</p>
          </div>
        </div>

        <div id="medResultsArea">
           <!-- Initial State Placeholder -->
           <div id="medInitialState" style="text-align: center; padding: 3rem; color: var(--text-secondary);">
              <i class='bx bx-capsule' style="font-size: 4rem; opacity: 0.2; margin-bottom: 1rem;"></i>
              <p>Enter a medicine name above to check its real-time availability in our pharmacy.</p>
           </div>

           <!-- Loading State -->
           <div id="medLoading" style="display: none; text-align: center; padding: 3rem;">
              <i class='bx bx-loader-alt bx-spin' style="font-size: 3rem; color: var(--primary);"></i>
              <p style="color: var(--text-secondary); margin-top: 1rem;">Searching inventory...</p>
           </div>
           
           <!-- Results Container -->
           <div id="medResultsList" style="display: flex; flex-direction: column; gap: 1rem;"></div>
        </div>

      </div>
    </section>
  `;

   const searchInput = document.getElementById('medSearchInput');
   const searchBtn = document.getElementById('medSearchBtn');
   const initial = document.getElementById('medInitialState');
   const loading = document.getElementById('medLoading');
   const results = document.getElementById('medResultsList');

   const executeSearch = async () => {
      const q = searchInput.value.trim().toLowerCase();
      if (!q) {
         results.innerHTML = '';
         initial.style.display = 'block';
         return;
      }

      initial.style.display = 'none';
      results.innerHTML = '';
      loading.style.display = 'block';

      try {
         // Use ilike to match search_terms or name
         const { data, error } = await supabase
            .from('medicine_stock')
            .select('*')
            .or(`name.ilike.%${q}%,search_terms.ilike.%${q}%`);

         if (error) throw error;

         loading.style.display = 'none';

         if (!data || data.length === 0) {
            results.innerHTML = `
          <div class="glass-card" style="padding: 2rem; text-align: center;">
             <i class='bx bx-search-alt' style="font-size: 3rem; color: var(--warning-color); margin-bottom: 1rem;"></i>
             <h4 style="color: var(--text-primary);">No medicines found</h4>
             <p style="color: var(--text-secondary);">We couldn't find any matches for "${q}". Please check the spelling or contact the pharmacy directly.</p>
          </div>
        `;
            return;
         }

         results.innerHTML = data.map(med => `
        <div class="glass-card" style="padding: 1.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; border-left: 4px solid ${med.color_code};">
           <div>
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                 <h4 style="margin: 0; color: #0f172a;">${med.name}</h4>
                 ${med.requires_prescription ? `<span style="background: rgba(239, 68, 68, 0.1); color: var(--danger-color); padding: 0.1rem 0.4rem; border-radius: 4px; font-size: 0.7rem; font-weight: bold;"><i class='bx bx-file'></i> Rx Required</span>` : ''}
              </div>
              <p style="color: var(--text-secondary); margin: 0; font-size: 0.9rem;">
                 <span style="font-weight: 500; color: ${med.color_code};">● ${med.status}</span> 
                 ${med.stock_quantity > 0 ? `(${med.stock_quantity} units)` : ''} &nbsp;|&nbsp; 
                 ${med.format_type}
              </p>
           </div>
           <div style="text-align: right;">
              <div style="font-size: 1.2rem; font-weight: bold; color: var(--primary-dark);">${med.price_per_unit}</div>
           </div>
        </div>
      `).join('');

      } catch (err) {
         console.error("Medicine search error:", err);
         loading.style.display = 'none';
         results.innerHTML = `
          <div class="glass-card" style="padding: 2rem; text-align: center; border-left: 4px solid var(--danger-color);">
             <h4 style="color: var(--danger-color);">Search Failed</h4>
             <p style="color: var(--text-secondary);">Unable to connect to the pharmacy database.</p>
          </div>
      `;
      }
   };

   if (searchBtn) {
      searchBtn.addEventListener('click', executeSearch);
      searchInput.addEventListener('keypress', (e) => {
         if (e.key === 'Enter') executeSearch();
      });
   }
};
