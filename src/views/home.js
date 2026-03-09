import { initRouter, navigateTo } from '../router.js';

export const renderHome = (container) => {
  container.innerHTML = `
    <div class="home-page">
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-bg"></div>
        <div class="container hero-content">
          <div class="hero-text animate-fade-in" style="margin-top: -2rem;">
            <span class="badge" style="background: rgba(249, 115, 22, 0.1); color: var(--accent-dark); border-color: rgba(249, 115, 22, 0.2); border-radius: 20px; padding: 0.4rem 1.2rem; margin-bottom: 2rem;">Est. 2007</span>
            <h1 style="color: var(--primary-dark); font-size: 4.5rem; line-height: 1.1; font-weight: 800; letter-spacing: -1.5px; margin-bottom: 1.5rem;">Annai Hospital<br><span style="color: var(--accent-light);">Child & Maternity<br>Care</span></h1>
            <p class="hero-subtitle" style="font-size: 1.15rem; color: var(--primary); max-width: 90%; line-height: 1.6;">Providing compassionate maternity care and child speciality services for families in Tiruchengode. Your trusted partner for painless labor and comprehensive medical support.</p>
            <div class="hero-actions" style="margin-top: 2rem; max-width: 600px; display: flex; gap: 1rem;">
              <a href="/appointment" data-link class="btn btn-primary" style="padding: 1rem 2rem; font-size: 1.1rem; border-radius: 30px; box-shadow: 0 10px 20px rgba(249, 115, 22, 0.3); display: flex; align-items: center; gap: 0.5rem;">
                Book Appointment <i class='bx bx-calendar-event'></i>
              </a>
              <a href="/departments" data-link class="btn btn-outline" style="padding: 1rem 2rem; font-size: 1.1rem; border-radius: 30px; display: flex; align-items: center; gap: 0.5rem; background: rgba(255,255,255,0.5); backdrop-filter: blur(5px); color: var(--primary-dark); border-color: var(--primary-dark);">
                Our Services <i class='bx bx-right-arrow-alt'></i>
              </a>
            </div>
          </div>
          <div class="hero-image animate-fade-in" style="animation-delay: 0.3s; padding: 2rem; display: flex; align-items: center; justify-content: flex-end;">
             <div style="position: relative; width: 100%; max-width: 550px;">
                <img src="/hero-image.jpg" alt="Annai Hospital Facilities" style="width: 100%; height: auto; aspect-ratio: 4/3; object-fit: cover; border-radius: 30px; box-shadow: 0 25px 50px rgba(0,0,0,0.15);">
                
                <!-- Floating Trust Badge -->
                <div style="position: absolute; bottom: -20px; left: -30px; background: white; padding: 1.2rem; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); z-index: 4; display: flex; align-items: center; gap: 1rem; animation: float 3s ease-in-out infinite;">
                   <div style="background: rgba(14, 165, 233, 0.1); color: var(--primary); width: 45px; height: 45px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
                      <i class='bx bx-check-shield'></i>
                   </div>
                   <div>
                      <p style="margin: 0; font-weight: 700; color: var(--primary-dark); font-size: 1.1rem;">Expert Care</p>
                      <p style="margin: 0; font-size: 0.85rem; color: var(--text-secondary);">Trusted since 2007</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>      <!-- About Us Section -->
      <section class="section" id="about">
        <div class="container grid-2" style="align-items: center; gap: 3rem;">
          <div class="about-content animate-fade-in" style="animation-delay: 0.2s;">
            <span class="badge" style="background: rgba(14, 165, 233, 0.1); color: var(--primary); padding: 5px 15px; border-radius: 20px; font-weight: 600; font-size: 0.9rem; margin-bottom: 1rem; display: inline-block;">About Us</span>
            <h2 class="section-title text-left" style="margin-bottom: 1.5rem; font-size: 2.5rem; line-height: 1.2;">Annai Hospital <br><span style="color: var(--primary); font-size: 1.8rem; font-weight: 500;">Child Speciality & Maternity Care</span></h2>
            <p style="color: var(--text-secondary); font-size: 1.1rem; line-height: 1.8; margin-bottom: 1.5rem;">
              <strong>ANNAI CLINIC</strong> which was an outpatient facility is now being moved to a larger space with facilities like 24x7 emergency services, 24×7 labour and delivery assistance, Modular Operation Theatre facility, Neonatal Intensive Care Unit, Infertility Center and other Gynecological services at a new location near Valaraigate as <strong>ANNAI HOSPITAL</strong>. 
            </p>
            <p style="color: var(--text-secondary); font-size: 1.1rem; line-height: 1.8; margin-bottom: 1.5rem;">
              You will be under the care of <strong>Dr. P. Saravana Raja, MBBS., DCH.</strong>, and <strong>Dr. G. Jamuna Saravana Raja, MBBS., DGO.</strong>, leading practitioners in Tiruchengode. They have been serving people in and around Tiruchengode since 2007.
            </p>
            <blockquote style="border-left: 4px solid var(--primary); padding-left: 1rem; font-size: 1.2rem; font-style: italic; color: var(--primary-dark); margin: 2rem 0;">
              "Experience the Joy of Painless Labor and birth companion at Annai Hospital."
            </blockquote>
          </div>
          <div class="about-image glass-card animate-fade-in" style="animation-delay: 0.4s; padding: 2rem; display: flex; flex-direction: column; align-items: center; justify-content: center; background: linear-gradient(135deg, rgba(239, 246, 255, 0.8), rgba(219, 234, 254, 0.5)); border: 1px solid rgba(255, 255, 255, 0.8);">
            <i class='bx bx-building-house' style="font-size: 7rem; color: var(--primary); margin-bottom: 1.5rem; filter: drop-shadow(0 4px 6px rgba(14, 165, 233, 0.2));"></i>
            <h3 style="color: var(--primary-dark); text-align: center; font-size: 1.5rem;">Serving Since 2007</h3>
            <p style="color: var(--text-secondary); text-align: center; margin-top: 0.5rem;">Trusted by families in Tiruchengode</p>
            <div style="display: flex; gap: 1rem; margin-top: 2rem;">
               <div style="text-align: center; background: white; padding: 1rem; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                  <i class='bx bx-plus-medical' style="font-size: 2rem; color: var(--danger-color);"></i>
                  <p style="font-weight: 600; margin-top: 0.5rem; font-size: 0.9rem;">24x7 Care</p>
               </div>
               <div style="text-align: center; background: white; padding: 1rem; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                  <i class='bx bx-child' style="font-size: 2rem; color: var(--primary);"></i>
                  <p style="font-weight: 600; margin-top: 0.5rem; font-size: 0.9rem;">Maternity</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Stats Section -->
      <section class="stats-section section">
        <div class="container grid-4">
          <div class="stat-card glass-card">
            <div class="stat-icon"><i class='bx bx-group'></i></div>
            <div class="stat-info">
              <h3 class="counter" data-target="15000">0</h3>
              <span>+ Patients Treated</span>
            </div>
          </div>
          <div class="stat-card glass-card">
            <div class="stat-icon"><i class='bx bx-user-plus'></i></div>
            <div class="stat-info">
              <h3 class="counter" data-target="2">0</h3>
              <span>Dedicated Specialists</span>
            </div>
          </div>
          <div class="stat-card glass-card">
            <div class="stat-icon"><i class='bx bx-award'></i></div>
            <div class="stat-info">
              <h3 class="counter" data-target="15">0</h3>
              <span>+ Years Experience</span>
            </div>
          </div>
          <div class="stat-card glass-card">
            <div class="stat-icon" style="background: linear-gradient(135deg, var(--danger-color), #b91c1c);"><i class='bx bx-plus-medical'></i></div>
            <div class="stat-info">
              <h3>24/7</h3>
              <span>Emergency Care</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Quick Services -->
      <section class="section bg-light" id="services">
        <div class="container">
          <h2 class="section-title">Quick Services</h2>
          <p class="section-subtitle">Access our digital healthcare services with just a click. Easy, fast, and secure.</p>
          
          <div class="grid-3">
            <a href="/appointment" class="service-card glass-card" data-link>
              <div class="service-icon"><i class='bx bx-calendar'></i></div>
              <h3>Book Appointment</h3>
              <p>Schedule your visit with our expert doctors online instantly.</p>
              <span class="service-link">Book Now <i class='bx bx-right-arrow-alt'></i></span>
            </a>
            
            <a href="/doctors" class="service-card glass-card" data-link>
              <div class="service-icon"><i class='bx bx-user-pin'></i></div>
              <h3>Find Doctor</h3>
              <p>Search and filter through our roster of experienced specialists.</p>
              <span class="service-link">Find Doctors <i class='bx bx-right-arrow-alt'></i></span>
            </a>
            
            <a href="/departments" class="service-card glass-card" data-link>
              <div class="service-icon"><i class='bx bx-building-house'></i></div>
              <h3>Departments</h3>
              <p>Explore our wide range of specialized medical departments.</p>
              <span class="service-link">View Departments <i class='bx bx-right-arrow-alt'></i></span>
            </a>
            
            <a href="/lab-reports" class="service-card glass-card" data-link>
              <div class="service-icon"><i class='bx bx-file-blank'></i></div>
              <h3>Lab Reports</h3>
              <p>Securely download and view your recent laboratory test results.</p>
              <span class="service-link">Get Reports <i class='bx bx-right-arrow-alt'></i></span>
            </a>
            
            <a href="/telemedicine" class="service-card glass-card" data-link>
              <div class="service-icon"><i class='bx bx-video'></i></div>
              <h3>Online Consultation</h3>
              <p>Consult with doctors from the comfort of your home via video call.</p>
              <span class="service-link">Start Call <i class='bx bx-right-arrow-alt'></i></span>
            </a>
            
            <a href="/health-tools" class="service-card glass-card" data-link>
              <div class="service-icon"><i class='bx bx-heart-circle'></i></div>
              <h3>Health Tools</h3>
              <p>Use our calculators to check BMI, diabetes risk, and symptoms.</p>
              <span class="service-link">Use Tools <i class='bx bx-right-arrow-alt'></i></span>
            </a>
          </div>
        </div>
      </section>

      <!-- Doctor Highlights -->
      <section class="section">
        <div class="container">
          <div class="flex-header">
            <div>
              <h2 class="section-title text-left">Featured Specialists</h2>
              <p class="section-subtitle text-left">Highly qualified and experienced medical professionals dedicated to providing the best care.</p>
            </div>
            <a href="/doctors" class="btn btn-outline" data-link>View All Doctors</a>
          </div>
          
          <div class="grid-2 mt-2">
            <!-- Doctor Card 1 -->
            <div class="doctor-profile-card glass-card p-0">
              <div class="doctor-img-placeholder" style="background: linear-gradient(135deg, var(--primary-light), var(--primary));">
                 <i class='bx bx-user' style="color: white; font-size: 5rem;"></i>
              </div>
              <div class="doctor-info p-2">
                <h4>Dr. P. Saravana Raja</h4>
                <p class="specialty">MBBS., DCH.</p>
                <div class="doc-meta">
                  <span><i class='bx bx-medal'></i> 15+ Years Exp.</span>
                </div>
                <button class="btn btn-primary w-100 mt-1" onclick="window.navigateTo('/appointment')">Book Appointment</button>
              </div>
            </div>
            <!-- Doctor Card 2 -->
            <div class="doctor-profile-card glass-card p-0">
              <div class="doctor-img-placeholder" style="background: linear-gradient(135deg, var(--accent-light), var(--accent));">
                 <i class='bx bx-user' style="color: white; font-size: 5rem;"></i>
              </div>
              <div class="doctor-info p-2">
                <h4>Dr. G. Jamuna Saravana Raja</h4>
                <p class="specialty">MBBS., DGO.</p>
                <div class="doc-meta">
                  <span><i class='bx bx-medal'></i> 15+ Years Exp.</span>
                </div>
                <button class="btn btn-primary w-100 mt-1" onclick="window.navigateTo('/appointment')">Book Appointment</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Departments Preview -->
      <section class="section bg-light">
        <div class="container">
          <h2 class="section-title">Departments</h2>
          <p class="section-subtitle">Excellence in various medical specialties. State-of-the-art facilities and dedicated care.</p>
          
          <div class="grid-3 mt-2">
            <a href="/departments" class="dept-card glass-card" data-link>
              <div class="dept-icon"><i class='bx bx-heart'></i></div>
              <h3>Cardiology</h3>
              <p>Advanced heart care, surgeries, and diagnostics provided by leading cardiologists.</p>
            </a>
            <a href="/departments" class="dept-card glass-card" data-link>
              <div class="dept-icon"><i class='bx bx-brain'></i></div>
              <h3>Neurology</h3>
              <p>Comprehensive treatment for brain, spinal cord, and nervous system disorders.</p>
            </a>
            <a href="/departments" class="dept-card glass-card" data-link>
              <div class="dept-icon"><i class='bx bx-bone'></i></div>
              <h3>Orthopedics</h3>
              <p>Expert care for bones, joints, ligaments, tendons, and muscles.</p>
            </a>
            <a href="/departments" class="dept-card glass-card" data-link>
              <div class="dept-icon"><i class='bx bx-child'></i></div>
              <h3>Pediatrics</h3>
              <p>Specialized healthcare and medical treatments for infants, children, and adolescents.</p>
            </a>
            <a href="/departments" class="dept-card glass-card" data-link>
              <div class="dept-icon"><i class='bx bx-scan'></i></div>
              <h3>Radiology</h3>
              <p>Advanced imaging technologies including MRI, CT scans, X-Rays, and Ultrasound.</p>
            </a>
            <a href="/departments" class="dept-card glass-card" data-link>
              <div class="dept-icon"><i class='bx bx-first-aid'></i></div>
              <h3>General Medicine</h3>
              <p>Primary healthcare, prevention, diagnosis, and treatment of adult diseases.</p>
            </a>
          </div>
          <div class="text-center mt-3" style="text-align: center;">
             <a href="/departments" class="btn btn-primary btn-lg" data-link>View All Departments</a>
          </div>
        </div>
      </section>

      <!-- Infrastructure Gallery -->
      <section class="section" id="infrastructure">
        <div class="container">
          <h2 class="section-title">Our World-Class Infrastructure</h2>
          <p class="section-subtitle">Experience our state-of-the-art facilities designed for comfort, precision, and the highest standards of medical care.</p>
          
          <div class="infrastructure-gallery mt-2">
             <img src="/infrastructure/unnamed-2.jpg" alt="Hospital Facility" class="gallery-img" loading="lazy">
             <img src="/infrastructure/unnamed-3.jpg" alt="Hospital Facility" class="gallery-img" loading="lazy">
             <img src="/infrastructure/unnamed-4.jpg" alt="Hospital Facility" class="gallery-img" loading="lazy">
             <img src="/infrastructure/unnamed-5.jpg" alt="Hospital Facility" class="gallery-img" loading="lazy">
             <img src="/infrastructure/unnamed-6.jpg" alt="Hospital Facility" class="gallery-img" loading="lazy">
             <img src="/infrastructure/unnamed-7.jpg" alt="Hospital Facility" class="gallery-img" loading="lazy">
             <img src="/infrastructure/unnamed-8.jpg" alt="Hospital Facility" class="gallery-img" loading="lazy">
             <img src="/infrastructure/unnamed-9.jpg" alt="Hospital Facility" class="gallery-img" loading="lazy">
             <img src="/infrastructure/unnamed-10.jpg" alt="Hospital Facility" class="gallery-img" loading="lazy">
             <img src="/infrastructure/unnamed-11.jpg" alt="Hospital Facility" class="gallery-img" loading="lazy">
          </div>
        </div>
      </section>

      <!-- Patient Testimonials -->
      <section class="section">
        <div class="container">
          <h2 class="section-title">What Our Patients Say</h2>
          <p class="section-subtitle">Read stories from patients who have experienced our world-class care.</p>
          
          <div class="grid-3 mt-2">
            <div class="testimonial-card glass-card">
              <div class="stars">
                <i class='bx bxs-star'></i><i class='bx bxs-star'></i><i class='bx bxs-star'></i><i class='bx bxs-star'></i><i class='bx bxs-star'></i>
              </div>
              <p class="comment">"The staff at Annai Hospital saved my life. Their quick response during my emergency and the care from Dr. Jenkins was exceptional."</p>
              <div class="patient-info mt-2">
                <h4>Robert Downey</h4>
                <span>Cardiology Patient</span>
              </div>
            </div>
            
            <div class="testimonial-card glass-card">
              <div class="stars">
                <i class='bx bxs-star'></i><i class='bx bxs-star'></i><i class='bx bxs-star'></i><i class='bx bxs-star'></i><i class='bx bxs-star-half'></i>
              </div>
              <p class="comment">"Booking appointments is so easy through their digital platform. The telemedicine feature saved me a lot of travel time."</p>
              <div class="patient-info mt-2">
                <h4>Sarah Connor</h4>
                <span>General Medicine</span>
              </div>
            </div>
            
            <div class="testimonial-card glass-card">
              <div class="stars">
                <i class='bx bxs-star'></i><i class='bx bxs-star'></i><i class='bx bxs-star'></i><i class='bx bxs-star'></i><i class='bx bxs-star'></i>
              </div>
              <p class="comment">"The pediatrics department is wonderful. They made my child feel comfortable, and the facilities are very clean and modern."</p>
              <div class="patient-info mt-2">
                <h4>Emma Watson</h4>
                <span>Pediatric Parent</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Health Tips/Blog -->
      <section class="section bg-light">
        <div class="container">
          <div class="flex-header">
            <div>
              <h2 class="section-title text-left">Health Tips & Articles</h2>
              <p class="section-subtitle text-left">Stay informed with the latest health advice from our doctors.</p>
            </div>
            <a href="/blog" class="btn btn-outline" data-link>View All Articles</a>
          </div>
          
          <div class="grid-3 mt-2">
            <div class="blog-preview-card glass-card p-0">
               <div class="blog-img-placeholder" style="background: linear-gradient(135deg, #fca5a5, #f87171);">
                 <i class='bx bx-heart'></i>
               </div>
               <div class="blog-content p-2">
                 <span class="blog-category">Heart Health</span>
                 <h4>5 Daily Habits for a Stronger Heart</h4>
                 <p>Learn how simple lifestyle changes can significantly improve your cardiovascular health.</p>
                 <a href="/blog" class="read-more" data-link>Read More <i class='bx bx-right-arrow-alt'></i></a>
               </div>
            </div>
            
            <div class="blog-preview-card glass-card p-0">
               <div class="blog-img-placeholder" style="background: linear-gradient(135deg, #93c5fd, #60a5fa);">
                 <i class='bx bx-test-tube'></i>
               </div>
               <div class="blog-content p-2">
                 <span class="blog-category">Prevention</span>
                 <h4 style="margin-top: 5px; margin-bottom: 10px;">Preventing Type 2 Diabetes</h4>
                 <p style="margin-bottom: 15px; font-size: 0.95rem; color: var(--text-secondary);">Early detection and manageable diet changes are key to stopping diabetes before it starts.</p>
                 <a href="/blog" class="read-more" data-link style="font-weight: 600; display: inline-flex; align-items: center; gap: 5px;">Read More <i class='bx bx-right-arrow-alt'></i></a>
               </div>
            </div>
            
            <div class="blog-preview-card glass-card p-0">
               <div class="blog-img-placeholder" style="background: linear-gradient(135deg, #86efac, #4ade80);">
                 <i class='bx bx-run'></i>
               </div>
               <div class="blog-content p-2">
                 <span class="blog-category">Lifestyle</span>
                 <h4 style="margin-top: 5px; margin-bottom: 10px;">Maintaining a Healthy Lifestyle</h4>
                 <p style="margin-bottom: 15px; font-size: 0.95rem; color: var(--text-secondary);">Balancing work, diet, and exercise is essential for long-term health and wellness.</p>
                 <a href="/blog" class="read-more" data-link style="font-weight: 600; display: inline-flex; align-items: center; gap: 5px;">Read More <i class='bx bx-right-arrow-alt'></i></a>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;

  // Animate Counters functionality
  const counters = container.querySelectorAll('.counter');

  const animateCounters = () => {
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const inc = target / 200;

        if (count < target) {
          counter.innerText = Math.ceil(count + inc);
          setTimeout(updateCount, 15);
        } else {
          counter.innerText = target;
        }
      };

      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          updateCount();
          observer.disconnect();
        }
      });
      observer.observe(counter);
    });
  };

  setTimeout(animateCounters, 100);
};
