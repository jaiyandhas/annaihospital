import { initRouter, navigateTo } from '../router.js';
import { supabase } from '../lib/supabase.js';

export const renderDoctors = async (container) => {
  container.innerHTML = `
    <div class="page-header" style="background: linear-gradient(135deg, var(--primary-dark), var(--primary)); color: white; padding: 4rem 0; text-align: center;">
      <div class="container">
        <h1 style="font-size: 2.5rem; margin-bottom: 0.5rem;">Find a Doctor</h1>
        <p style="color: #cbd5e1;">Search our complete directory of specialized medical professionals.</p>
      </div>
    </div>
    
    <section class="section">
      <div class="container">
        
        <!-- Filters -->
        <div class="filter-section glass-card" style="margin-bottom: 3rem; padding: 1.5rem;">
          <div class="grid-4" style="gap: 1rem;">
            <div class="form-group" style="margin: 0;">
              <input type="text" id="docSearch" class="form-control" placeholder="Search by name...">
            </div>
            <div class="form-group" style="margin: 0;">
              <select id="deptFilter" class="form-control">
                <option value="all">All Departments</option>
                <option value="cardiology">Cardiology</option>
                <option value="neurology">Neurology</option>
                <option value="orthopedics">Orthopedics</option>
                <option value="pediatrics">Pediatrics</option>
              </select>
            </div>
            <div class="form-group" style="margin: 0;">
              <select id="expFilter" class="form-control">
                <option value="all">Any Experience</option>
                <option value="5">5+ Years</option>
                <option value="10">10+ Years</option>
                <option value="15">15+ Years</option>
              </select>
            </div>
            <div class="form-group" style="margin: 0;">
              <button class="btn btn-primary w-100" id="filterBtn"><i class='bx bx-filter-alt'></i> Apply Filters</button>
            </div>
          </div>
        </div>

        <!-- Doctors Grid -->
        <div class="grid-4" id="doctorsGrid">
          <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
            <i class='bx bx-loader-alt bx-spin' style="font-size: 3rem; color: var(--primary);"></i>
            <p style="color: var(--text-secondary); margin-top: 1rem;">Loading directory...</p>
          </div>
        </div>
      </div>
    </section>
  `;

  // Fetch doctors from Supabase
  let doctors = [];
  try {
    const { data, error } = await supabase.from('doctors').select('*');
    if (error) throw error;
    doctors = data || [];
  } catch (err) {
    console.error('Error fetching doctors:', err);
    document.getElementById('doctorsGrid').innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--danger-color);">Failed to load doctor database.</div>';
    return;
  }

  const renderGrid = (list) => {
    const grid = document.getElementById('doctorsGrid');
    if (list.length === 0) {
      grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--text-secondary);">No doctors found matching filters.</div>';
      return;
    }

    grid.innerHTML = list.map(doc => `
      <div class="doctor-profile-card glass-card p-0" style="display: flex; flex-direction: column;">
        <div class="doctor-img-placeholder" style="height: 200px; background-image: url('${doc.image_url || ''}'); background-size: cover; background-position: top center;">
           ${!doc.image_url ? "<i class='bx bx-user-circle'></i>" : ""}
        </div>
        <div class="doctor-info p-2" style="flex-grow: 1; display: flex; flex-direction: column;">
          <h4>${doc.name}</h4>
          <p class="specialty">${doc.department}</p>
          <div class="doc-meta" style="flex-direction: column; gap: 0.5rem; align-items: flex-start;">
            <span><i class='bx bx-graduation'></i> ${doc.qualifications}</span>
            <span><i class='bx bx-medal'></i> ${doc.experience_years} Years Exp.</span>
            <span><i class='bx bx-time'></i> ${doc.availability}</span>
          </div>
          <button class="btn btn-outline w-100 mt-auto" onclick="window.navigateTo('/appointment?doc=${doc.id}')">Book Appointment</button>
        </div>
      </div>
    `).join('');
  };

  // Initial render
  renderGrid(doctors);

  // Filter Logic
  const filterBtn = document.getElementById('filterBtn');
  filterBtn.addEventListener('click', () => {
    const search = document.getElementById('docSearch').value.toLowerCase();
    const dept = document.getElementById('deptFilter').value;
    const exp = document.getElementById('expFilter').value;

    const filtered = doctors.filter(doc => {
      const matchSearch = doc.name.toLowerCase().includes(search);
      const matchDept = dept === 'all' || (doc.department && doc.department.toLowerCase() === dept);
      const matchExp = exp === 'all' || (doc.experience_years && doc.experience_years >= parseInt(exp));
      return matchSearch && matchDept && matchExp;
    });

    renderGrid(filtered);
  });
};
