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
    
    <section class="section" style="background-color: #f0f4f8;">
      <div class="container" style="max-width: 1000px;">
        
        <div id="formLoading" style="text-align: center; padding: 4rem 0;">
          <i class='bx bx-loader-alt bx-spin' style="font-size: 3rem; color: var(--primary);"></i>
          <p style="color: var(--text-secondary); margin-top: 1rem;">Loading providers & slots...</p>
        </div>

        <div id="appointmentUI" style="display: none; display: flex; flex-direction: column; gap: 1.5rem;">
          
          <!-- Doctor Selection & Profile Header -->
          <div class="glass-card doctor-header" style="padding: 1.5rem; display: flex; flex-wrap: wrap; gap: 1.5rem; align-items: flex-start; background: white;">
            
            <div style="flex: 1; min-width: 250px;">
              <label class="form-label" style="font-weight: 700; color: var(--primary-dark); font-size: 1.1rem; margin-bottom: 1rem;"><i class='bx bx-user-pin'></i> Select Your Doctor</label>
              <select id="apptDoctor" class="form-control" style="font-size: 1.1rem; padding: 0.8rem; border-color: var(--primary-light); background: var(--bg-color-alt);">
                <option value="" disabled selected>Loading doctors...</option>
              </select>
            </div>

            <!-- Doctor Card Content, populated dynamically -->
            <div id="selectedDoctorProfile" style="flex: 2; display: none; border-left: 1px solid var(--border-color); padding-left: 1.5rem;">
               <div style="display: flex; gap: 1.5rem; align-items: center;">
                 <div id="sdImage" style="width: 100px; height: 100px; border-radius: 50%; background: var(--bg-color-alt); display: flex; align-items: center; justify-content: center; font-size: 3rem; color: var(--primary-light); overflow: hidden; box-shadow: var(--shadow-sm);">
                    <i class='bx bxs-user'></i>
                 </div>
                 <div>
                    <h2 id="sdName" style="color: var(--primary-dark); font-size: 1.5rem; margin-bottom: 0.2rem;"></h2>
                    <p id="sdDept" style="color: var(--accent); font-weight: 600; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 1px; margin-bottom: 0.5rem;"></p>
                    <div style="display: flex; gap: 0.5rem; margin-bottom: 0.3rem;">
                      <span class="status-badge" style="background: var(--bg-color-alt); color: var(--text-secondary);"><i class='bx bxs-graduation'></i> <span id="sdQual"></span></span>
                      <span class="status-badge" style="background: var(--bg-color-alt); color: var(--text-secondary);"><i class='bx bxs-briefcase'></i> <span id="sdExp"></span></span>
                    </div>
                 </div>
               </div>
               <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px dashed var(--border-color); display: flex; gap: 2rem; color: var(--text-secondary); font-size: 0.9rem;">
                  <div style="display: flex; align-items: center; gap: 0.5rem;"><i class='bx bxs-map' style="color: var(--accent); font-size: 1.2rem;"></i> <span>Annai Hospital, Coimbatore</span></div>
                  <div style="display: flex; align-items: center; gap: 0.5rem;"><i class='bx bxs-phone' style="color: var(--accent); font-size: 1.2rem;"></i> <span>+91 123 456 7890</span></div>
               </div>
            </div>
            <div id="noDoctorSelected" style="flex: 2; display: flex; align-items: center; justify-content: center; border-left: 1px dashed var(--border-color); padding-left: 1.5rem; color: var(--text-light);">
               <p><i class='bx bx-hand-left' style="font-size: 1.5rem; vertical-align: middle; margin-right: 0.5rem;"></i> Please select a doctor from the drop-down to proceed.</p>
            </div>
          </div>

          <!-- Date & Time Slots (Hidden until doctor selected) -->
          <div id="dateTimeSection" style="display: none; flex-direction: column; gap: 1.5rem;">
            
            <!-- Date Slider -->
            <div class="glass-card" style="padding: 1rem 0; background: white;">
              <div class="date-slider" id="dateSlider" style="display: flex; overflow-x: auto; scroll-behavior: smooth; gap: 0.5rem; padding: 0 1rem; scrollbar-width: none;">
                 <!-- Populated by JS -->
              </div>
            </div>

            <!-- Time Slots Grid -->
            <div class="glass-card" style="padding: 0; background: white; overflow: hidden;">
              <div style="display: grid; grid-template-columns: 1fr 2fr; align-items: stretch; border-bottom: 1px solid var(--border-color);">
                 <div style="background: #e0f2fe; padding: 1rem; text-align: center; display: flex; flex-direction: column; justify-content: center; align-items: center; border-right: 1px solid var(--border-color);">
                    <i class='bx bx-coffee' style="font-size: 1.5rem; color: #0284c7; margin-bottom: 0.3rem;"></i>
                    <strong style="color: #0284c7; font-size: 0.9rem;">Morning</strong>
                 </div>
                 <div class="slot-grid" id="morningSlots" style="padding: 1rem; display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;"></div>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 2fr; align-items: stretch; border-bottom: 1px solid var(--border-color);">
                 <div style="background: #fffbeb; padding: 1rem; text-align: center; display: flex; flex-direction: column; justify-content: center; align-items: center; border-right: 1px solid var(--border-color);">
                    <i class='bx bxs-sun' style="font-size: 1.5rem; color: #d97706; margin-bottom: 0.3rem;"></i>
                    <strong style="color: #d97706; font-size: 0.9rem;">Afternoon</strong>
                 </div>
                 <div class="slot-grid" id="afternoonSlots" style="padding: 1rem; display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;"></div>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 2fr; align-items: stretch;">
                 <div style="background: #f3f4f6; padding: 1rem; text-align: center; display: flex; flex-direction: column; justify-content: center; align-items: center; border-right: 1px solid var(--border-color);">
                    <i class='bx bxs-moon' style="font-size: 1.5rem; color: #4b5563; margin-bottom: 0.3rem;"></i>
                    <strong style="color: #4b5563; font-size: 0.9rem;">Evening</strong>
                 </div>
                 <div class="slot-grid" id="eveningSlots" style="padding: 1rem; display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;"></div>
              </div>
            </div>

            <!-- Booking Footer Footer & Form Container (Hidden until slot selected) -->
            <div id="bookingFormSection" style="display: none;">
              
              <!-- Session Header -->
              <div class="glass-card" style="padding: 1rem 2rem; background: #e0f2fe; border: 1px solid #bae6fd; display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
                <div style="font-size: 1.1rem; font-weight: 700; color: var(--primary-dark);">
                  <strong style="font-size: 1.4rem;">₹ 600</strong> <span style="font-size: 0.8rem; font-weight: 500; color: var(--text-secondary);">[ Doctor Fees + Registration Fees ]</span>
                </div>
                <div style="font-size: 1.1rem; font-weight: 600; color: var(--primary-dark); display: flex; align-items: center; gap: 0.5rem;">
                  <i class='bx bx-calendar'></i> <span id="summaryDateTime"></span>
                </div>
                <!-- Optional Timer like in screenshot -->
                <div style="font-size: 0.9rem; font-weight: 600; color: var(--danger-color); display: flex; align-items: center; gap: 0.3rem;">
                  <i class='bx bx-timer'></i> <span>Hold time: 10:00</span>
                </div>
              </div>

              <!-- Registration Form Card -->
              <div class="glass-card" style="padding: 2rem; background: white;">
                
                <!-- Toggle -->
                <div style="display: flex; justify-content: center; margin-bottom: 2rem;">
                  <div style="display: inline-flex; overflow: hidden; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
                    <button class="reg-toggle btn-active" data-type="new" style="padding: 0.8rem 2rem; border: none; background: #0ea5e9; color: white; font-weight: 600; cursor: pointer; transition: all 0.2s;"><i class='bx bx-check'></i> I am New to Hospital</button>
                    <button class="reg-toggle" data-type="existing" style="padding: 0.8rem 2rem; border: none; background: white; color: var(--text-primary); font-weight: 600; cursor: pointer; border-left: 1px solid var(--border-color); transition: all 0.2s;"><i class='bx bx-id-card' style="opacity: 0;"></i> I have a Registration Number</button>
                  </div>
                </div>

                <form id="appointmentForm">
                  
                  <div id="existingPatientSection" style="display: none; padding-bottom: 2rem; border-bottom: 1px solid var(--border-color);">
                    <div style="display: flex; gap: 1rem; align-items: flex-end; flex-wrap: wrap;">
                      <div class="form-group" style="margin-bottom: 0; flex: 1; min-width: 200px;">
                        <label class="form-label" style="font-size: 0.8rem; color: var(--accent);">Registration No *</label>
                        <input type="text" id="regNo" class="form-control" style="background: var(--bg-color-alt);" placeholder="Enter Registration Number">
                      </div>
                      <div class="form-group" style="margin-bottom: 0; flex: 1; min-width: 200px;">
                        <label class="form-label" style="font-size: 0.8rem; color: var(--accent);">Phone Number *</label>
                        <input type="tel" id="regPhone" class="form-control" style="background: var(--bg-color-alt);" placeholder="Enter Registered Phone">
                      </div>
                      <div style="padding-bottom: 0.5rem; font-weight: 700; color: var(--accent);">OR</div>
                      <div class="form-group" style="margin-bottom: 0; flex: 1; min-width: 150px;">
                        <label class="form-label" style="font-size: 0.8rem; color: var(--accent);">Year of Birth</label>
                        <input type="number" id="regYob" class="form-control" style="background: var(--bg-color-alt);" placeholder="YYYY">
                      </div>
                      <button type="button" class="btn" style="background: var(--success-color); color: white; height: 45px; padding: 0 2rem;">Search</button>
                    </div>
                  </div>

                  <div id="newPatientSection">
                    <div class="grid-4" style="gap: 1rem; margin-bottom: 1rem;">
                      <div class="form-group" style="margin-bottom: 0;">
                        <select id="patSalutation" class="form-control" style="font-size: 0.9rem;" required>
                          <option value="Mr.">Mr.</option>
                          <option value="Ms.">Ms.</option>
                          <option value="Mrs.">Mrs.</option>
                          <option value="Mast.">Mast.</option>
                        </select>
                      </div>
                      <div class="form-group" style="margin-bottom: 0; grid-column: span 2;">
                        <input type="text" id="patName" class="form-control" placeholder="Patient Name *" required style="font-size: 0.9rem;">
                      </div>
                      <div class="form-group" style="margin-bottom: 0; display: flex; justify-content: space-around; align-items: center; border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 0 1rem; background: white;">
                        <label style="display: flex; align-items: center; gap: 0.3rem; font-size: 0.9rem; cursor: pointer;"><input type="radio" name="patGender" value="Male" required> Male</label>
                        <label style="display: flex; align-items: center; gap: 0.3rem; font-size: 0.9rem; cursor: pointer;"><input type="radio" name="patGender" value="Female"> Female</label>
                      </div>
                    </div>

                    <div class="grid-3" style="gap: 1rem; margin-bottom: 1rem;">
                      <div class="form-group" style="margin-bottom: 0;">
                         <input type="email" id="patEmail" class="form-control" placeholder="Email Id" style="font-size: 0.9rem;">
                      </div>
                      <div class="form-group" style="margin-bottom: 0;">
                         <input type="date" id="patDob" class="form-control" style="font-size: 0.9rem;">
                      </div>
                      <div class="form-group" style="margin-bottom: 0;">
                         <input type="number" id="patAge" class="form-control" placeholder="Age *" required min="0" max="120" style="font-size: 0.9rem;">
                      </div>
                    </div>

                    <div class="grid-3" style="gap: 1rem; margin-bottom: 1rem;">
                      <div class="form-group" style="margin-bottom: 0;">
                        <input type="tel" id="patPhone" class="form-control" placeholder="Mobile No *" required style="font-size: 0.9rem;">
                      </div>
                      <div class="form-group" style="margin-bottom: 0;">
                        <select id="patMaritalStatus" class="form-control" style="font-size: 0.9rem;">
                          <option value="" disabled selected>Marital Status</option>
                          <option value="Single">Single</option>
                          <option value="Married">Married</option>
                        </select>
                      </div>
                      <div class="form-group" style="margin-bottom: 0;">
                         <!-- Invisible spacer -->
                      </div>
                    </div>

                    <div class="form-group" style="margin-bottom: 1rem;">
                      <textarea id="patAddress" class="form-control" rows="2" placeholder="Mailing Address" style="font-size: 0.9rem;"></textarea>
                    </div>

                    <div class="grid-2" style="gap: 1rem; margin-bottom: 1rem;">
                       <div class="form-group" style="margin-bottom: 0;">
                         <input type="text" id="patPincode" class="form-control" placeholder="Pincode / City" style="font-size: 0.9rem;">
                       </div>
                       <div class="form-group" style="margin-bottom: 0;">
                         <input type="text" id="patCity" class="form-control" placeholder="City" style="font-size: 0.9rem;">
                       </div>
                    </div>
                  </div>

                  <div id="formError" style="display: none; padding: 1rem; background: rgba(239, 68, 68, 0.1); color: var(--danger-color); border-radius: var(--radius-md); margin-top: 1rem; border: 1px solid var(--danger-color);"></div>

                  <div style="text-align: center; margin-top: 2rem; padding-top: 2rem; border-top: 1px solid var(--border-color);">
                     <button type="submit" id="submitBtn" class="btn" style="background: #0ea5e9; color: white; padding: 0.8rem 3rem; font-size: 1.1rem; border-radius: 4px; box-shadow: 0 4px 6px -1px rgba(14, 165, 233, 0.2);"><i class='bx bx-check-circle'></i> Confirm Appointment</button>
                  </div>
                  
                  <div style="margin-top: 1.5rem; text-align: left; font-size: 0.8rem; color: var(--text-secondary);">
                    <label style="display: flex; align-items: flex-start; gap: 0.5rem; cursor: pointer;">
                      <input type="checkbox" required style="margin-top: 3px;">
                      <span>I have read and agree to <a href="#" style="color: #0ea5e9; text-decoration: underline;">Terms & Conditions</a> | <a href="#" style="color: #0ea5e9; text-decoration: underline;">Privacy Policy</a> of Booking Appointments</span>
                    </label>
                    <p style="color: var(--danger-color); margin-top: 1rem; font-weight: 500;">You will be redirected to a secure payment gateway.</p>
                    <ul style="color: var(--danger-color); margin-top: 0.5rem; padding-left: 1rem; list-style-type: disc;">
                       <li>Your registration will be completed once your payment is successful.</li>
                       <li>Appointments booked online cannot be refunded.</li>
                    </ul>
                  </div>

                </form>
              </div>

            </div>
          </div>

          <!-- Success Message Placeholder -->
          <div id="successMsg" style="display: none; text-align: center; padding: 3rem 1rem; color: var(--success-color); background: white; border-radius: var(--radius-lg); box-shadow: var(--shadow-sm);">
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

    <style>
      /* Custom styles for the complex slider and grid layout */
      .date-item {
        min-width: 100px;
        text-align: center;
        padding: 0.8rem 0;
        cursor: pointer;
        border-right: 1px solid var(--border-color);
        transition: all 0.2s;
        display: flex;
        flex-direction: column;
        color: var(--text-secondary);
      }
      .date-item:last-child {
        border-right: none;
      }
      .date-item:hover {
        background: var(--bg-color-alt);
      }
      .date-item.active {
        background: #0ea5e9;
        color: white;
        border-radius: var(--radius-md);
        border: none;
        transform: scale(1.05);
        box-shadow: 0 4px 6px -1px rgba(14, 165, 233, 0.3);
      }
      .date-item.active .date-num, .date-item.active .date-day {
        color: white;
      }
      .date-num { font-size: 1.5rem; font-weight: 700; line-height: 1; margin-bottom: 0.2rem; color: var(--primary-dark); }
      .date-day { font-size: 0.8rem; text-transform: uppercase; font-weight: 600; letter-spacing: 1px; color: var(--text-secondary); }

      .time-slot {
        background: transparent;
        border: 1px solid #0ea5e9;
        color: #0ea5e9;
        padding: 0.5rem 1rem;
        border-radius: var(--radius-sm);
        font-size: 0.85rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
        border-radius: 4px;
      }
      .time-slot:hover {
        background: #e0f2fe;
      }
      .time-slot.active {
        background: #0ea5e9;
        color: white;
        box-shadow: 0 2px 4px rgba(14, 165, 233, 0.3);
      }
      .time-slot:disabled {
        border-color: var(--border-color);
        color: var(--text-light);
        cursor: not-allowed;
        background: transparent;
      }
      
      @media (max-width: 768px) {
         .grid-4, .grid-3 { grid-template-columns: 1fr; }
         .btn-active, .reg-toggle { width: 100%; text-align: center; border: 1px solid var(--border-color); }
         .reg-toggle[data-type="existing"] { border-left: 1px solid var(--border-color); border-top: none; }
         .doctor-header > div { border-left: none !important; padding-left: 0 !important; }
      }
    </style>
  `;

  // --- Logic Implementation ---

  const uiContainer = document.getElementById('appointmentUI');
  const loader = document.getElementById('formLoading');
  const docSelect = document.getElementById('apptDoctor');
  const selDocProfile = document.getElementById('selectedDoctorProfile');
  const noDocProfile = document.getElementById('noDoctorSelected');
  const dateTimeSection = document.getElementById('dateTimeSection');
  const bookingFormSection = document.getElementById('bookingFormSection');
  const dateSlider = document.getElementById('dateSlider');
  const summaryDateTime = document.getElementById('summaryDateTime');
  const form = document.getElementById('appointmentForm');

  let doctors = [];
  let selectedDoctorId = null;
  let selectedDate = null;
  let selectedTime = null;

  // 1. Fetch Doctors Data
  try {
    const { data, error } = await supabase.from('doctors').select('*');
    if (error) throw error;
    doctors = data || [];

    const urlParams = new URLSearchParams(window.location.search);
    const preselectedDocId = urlParams.get('doc');

    let optionsHtml = '<option value="" disabled selected>Select Doctor</option>';
    doctors.forEach(d => {
      const isPreselected = d.id === preselectedDocId ? 'selected' : '';
      optionsHtml += `<option value="${d.id}" ${isPreselected}>${d.name} (${d.department})</option>`;
    });

    docSelect.innerHTML = optionsHtml;
    loader.style.display = 'none';
    uiContainer.style.display = 'flex';

    if (preselectedDocId) {
      docSelect.value = preselectedDocId;
      triggerDoctorSelection(preselectedDocId);
    }
  } catch (err) {
    console.error("Error loading doctors:", err);
    loader.innerHTML = '<p style="color: var(--danger-color);">Error loading booking form. Database connection failed.</p>';
  }

  // 2. Doctor Selection Handler
  docSelect.addEventListener('change', (e) => {
    triggerDoctorSelection(e.target.value);
  });

  function triggerDoctorSelection(docId) {
    selectedDoctorId = docId;
    const docData = doctors.find(d => d.id === docId);
    if (docData) {
      noDocProfile.style.display = 'none';
      selDocProfile.style.display = 'flex';

      document.getElementById('sdName').innerText = docData.name;
      document.getElementById('sdDept').innerText = docData.department;
      document.getElementById('sdQual').innerText = docData.qualifications || 'Expert Specialist';
      document.getElementById('sdExp').innerText = (docData.experience_years ? docData.experience_years + ' Yrs Exp' : 'Experienced');

      // Generate Dates
      generateDateSlider();
      dateTimeSection.style.display = 'flex';

      // Reset form section
      bookingFormSection.style.display = 'none';
      selectedDate = null;
      selectedTime = null;
    }
  }

  // 3. Date Slider Generation
  function generateDateSlider() {
    dateSlider.innerHTML = '';
    const today = new Date();
    let firstValidDate = null;
    let firstValidItem = null;

    // Generate next 14 days
    for (let i = 0; i < 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);

      const dayStr = d.toLocaleDateString('en-US', { weekday: 'short' });
      const numStr = d.getDate();
      const monthStr = d.toLocaleDateString('en-US', { month: 'short' });
      const fullDateStr = d.toISOString().split('T')[0];

      const dItem = document.createElement('div');
      dItem.className = 'date-item';
      dItem.dataset.date = fullDateStr;
      dItem.innerHTML = `<span class="date-num">${numStr}</span><span class="date-day">${dayStr} <br> ${monthStr}</span>`;

      if (i === 0) {
        firstValidDate = fullDateStr;
        firstValidItem = dItem;
        dItem.classList.add('active');
      }

      dItem.addEventListener('click', function () {
        document.querySelectorAll('.date-item').forEach(el => el.classList.remove('active'));
        this.classList.add('active');
        triggerDateSelection(fullDateStr, this);
      });

      dateSlider.appendChild(dItem);
    }

    if (firstValidDate) {
      triggerDateSelection(firstValidDate, firstValidItem);
    }
  }

  // 4. Date Selection & Slot Generation
  function triggerDateSelection(dateStr, element) {
    selectedDate = dateStr;
    const formattedDate = new Date(dateStr).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' });

    // Generate dummy slots
    const morningSlots = ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'];
    const afternoonSlots = ['12:00 PM', '12:30 PM', '01:00 PM', '02:00 PM', '03:00 PM', '03:30 PM'];
    const eveningSlots = ['04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM'];

    renderSlots('morningSlots', morningSlots);
    renderSlots('afternoonSlots', afternoonSlots);
    renderSlots('eveningSlots', eveningSlots);

    // Hide form if date changes
    bookingFormSection.style.display = 'none';
    selectedTime = null;
  }

  function renderSlots(containerId, times) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    if (!times || times.length === 0) {
      container.innerHTML = '<span style="color: var(--text-light); font-size: 0.9rem;">No slots</span>';
      return;
    }

    times.forEach((t, i) => {
      const btn = document.createElement('button');
      btn.className = 'time-slot';
      btn.innerText = t;

      // Randomly disable some slots to make it look realistic
      if (Math.random() > 0.7) {
        btn.disabled = true;
      } else {
        btn.addEventListener('click', function () {
          document.querySelectorAll('.time-slot').forEach(el => el.classList.remove('active'));
          this.classList.add('active');
          triggerSlotSelection(t);
        });
      }
      container.appendChild(btn);
    });
  }

  // 5. Slot Selection
  function triggerSlotSelection(timeStr) {
    selectedTime = timeStr;

    const formattedDate = new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
    summaryDateTime.innerText = `${selectedDate} ${formattedDate} (${selectedTime})`;

    // Show booking form
    bookingFormSection.style.display = 'block';
    bookingFormSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // 6. Registration Toggle Logic
  const toggles = document.querySelectorAll('.reg-toggle');
  const newSec = document.getElementById('newPatientSection');
  const existSec = document.getElementById('existingPatientSection');

  toggles.forEach(t => {
    t.addEventListener('click', (e) => {
      e.preventDefault();
      toggles.forEach(btn => {
        btn.classList.remove('btn-active');
        btn.style.background = 'white';
        btn.style.color = 'var(--text-primary)';
        btn.querySelector('i').style.opacity = '0';
      });

      t.classList.add('btn-active');
      t.style.background = '#0ea5e9';
      t.style.color = 'white';
      t.querySelector('i').style.opacity = '1';

      if (t.dataset.type === 'new') {
        newSec.style.display = 'block';
        existSec.style.display = 'none';

        // Set required fields for new
        document.getElementById('patName').setAttribute('required', 'true');
        document.getElementById('patAge').setAttribute('required', 'true');
        document.getElementById('patPhone').setAttribute('required', 'true');

      } else {
        newSec.style.display = 'none';
        existSec.style.display = 'block';

        // Remove required from hidden fields
        document.getElementById('patName').removeAttribute('required');
        document.getElementById('patAge').removeAttribute('required');
        document.getElementById('patPhone').removeAttribute('required');
      }
    });
  });

  // 7. Form Submission
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = document.getElementById('submitBtn');
      const errBox = document.getElementById('formError');
      errBox.style.display = 'none';

      if (!selectedDoctorId || !selectedDate || !selectedTime) {
        errBox.innerText = "Please select Doctor, Date, and Time slots above.";
        errBox.style.display = 'block';
        return;
      }

      const originalBtnText = submitBtn.innerHTML;
      submitBtn.innerHTML = `<i class='bx bx-loader-alt bx-spin'></i> Processing...`;
      submitBtn.disabled = true;

      try {
        const isNew = document.querySelector('.reg-toggle.btn-active').dataset.type === 'new';

        let patientId = null;
        let finalPatName = '';
        let finalPatEmail = '';
        let finalPatPhone = '';
        let finalPatAge = 0;

        if (isNew) {
          finalPatName = document.getElementById('patName').value;
          finalPatEmail = document.getElementById('patEmail').value || `noemail_${Date.now()}@example.com`;
          finalPatPhone = document.getElementById('patPhone').value;
          finalPatAge = parseInt(document.getElementById('patAge').value);
          const genderInput = document.querySelector('input[name="patGender"]:checked');
          const gender = genderInput ? genderInput.value : null;

          // Check if patient exists by email
          const { data: existingPat, error: searchErr } = await supabase.from('patients').select('id').eq('email', finalPatEmail).maybeSingle();
          if (searchErr) throw searchErr;

          if (existingPat) {
            patientId = existingPat.id;
          } else {
            // Create new patient
            const { data: newPat, error: insertErr } = await supabase.from('patients').insert([{
              full_name: document.getElementById('patSalutation').value + ' ' + finalPatName,
              email: finalPatEmail,
              phone_number: finalPatPhone,
              age: finalPatAge,
              gender: gender
            }]).select('id').single();

            if (insertErr) throw insertErr;
            patientId = newPat.id;
          }
        } else {
          // Mock fetching existing patient
          finalPatName = 'Existing Patient (Demo)';
          finalPatPhone = document.getElementById('regPhone').value || '1234567890';
          // Since patient profiles aren't fully auth'd, we mock saving to the first patient or insert a dummy for the demo
          const { data: existingPat, error: searchErr } = await supabase.from('patients').select('id, email, age').limit(1).single();
          if (existingPat) {
            patientId = existingPat.id;
            finalPatEmail = existingPat.email;
            finalPatAge = existingPat.age;
          } else {
            throw new Error("No existing records found. Please register as new.");
          }
        }

        const aptDocData = doctors.find(d => d.id === selectedDoctorId);

        // ── Duplicate booking guard ──────────────────────────────────────────
        const { data: existing, error: dupErr } = await supabase
          .from('appointments')
          .select('id')
          .eq('doctor_id', selectedDoctorId)
          .eq('appointment_date', selectedDate)
          .eq('time_slot', selectedTime)
          .in('status', ['Confirmed', 'pending'])
          .maybeSingle();

        if (dupErr) throw dupErr;

        if (existing) {
          errBox.innerText = `This time slot (${selectedTime} on ${selectedDate}) is already booked for ${aptDocData.name}. Please select a different time.`;
          errBox.style.display = 'block';
          submitBtn.innerHTML = originalBtnText;
          submitBtn.disabled = false;
          return;
        }
        // ────────────────────────────────────────────────────────────────────
        const { data: aptData, error: aptErr } = await supabase.from('appointments').insert([{
          patient_id: patientId,
          doctor_id: selectedDoctorId,
          appointment_date: selectedDate,
          time_slot: selectedTime,
          department: aptDocData.department,
          status: 'Confirmed'
        }]).select('id').single();

        if (aptErr) throw aptErr;

        // Success UI Update
        document.getElementById('dateTimeSection').style.display = 'none';
        document.querySelector('.doctor-header').style.display = 'none';

        const successMsg = document.getElementById('successMsg');
        successMsg.style.display = 'block';

        document.getElementById('genAptId').innerText = aptData.id;
        document.getElementById('genAptDT').innerText = selectedDate + ' at ' + selectedTime;
        document.getElementById('genAptDoc').innerText = aptDocData.name;

        // Optional Email Send Check
        try {
          await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              access_key: "ec08be00-7d1d-4962-9da6-d4af523109cb",
              subject: `New Mega Appointment: ${finalPatName}`,
              from_name: "Annai Hospital System",
              message: `New appointment booked!
Patient: ${finalPatName}
Phone: ${finalPatPhone}
Doctor: ${aptDocData.name}
Date: ${selectedDate}
Time: ${selectedTime}`
            })
          });
        } catch (emailErr) {
          // Ignore email error
        }

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
