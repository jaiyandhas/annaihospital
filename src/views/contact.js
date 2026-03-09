import { initRouter, navigateTo } from '../router.js';

export const renderContact = (container) => {
   container.innerHTML = `
    <div class="page-header" style="background: linear-gradient(135deg, var(--primary-dark), var(--primary)); color: white; padding: 4rem 0; text-align: center;">
      <div class="container">
        <h1 style="font-size: 2.5rem; margin-bottom: 0.5rem;">Contact Us</h1>
        <p style="color: #cbd5e1;">Get in touch with our team for inquiries, feedback, or emergency support.</p>
      </div>
    </div>
    
    <section class="section bg-light">
      <div class="container">
        
        <div class="grid-2" style="gap: 3rem;">
          
          <!-- Contact Info & Form -->
          <div>
            <div style="margin-bottom: 3rem;">
               <h3 style="color: var(--primary-dark); margin-bottom: 1.5rem;">Get In Touch</h3>
               
               <div style="display: flex; gap: 1rem; align-items: flex-start; margin-bottom: 1.5rem;">
                  <div style="width: 50px; height: 50px; background: white; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; color: var(--primary); box-shadow: var(--shadow-sm);">
                     <i class='bx bx-map'></i>
                  </div>
                  <div>
                     <h4 style="color: var(--primary-dark); margin-bottom: 0.5rem;">Hospital Address</h4>
                  <p style="color: var(--text-secondary); margin: 0; line-height: 1.5;">Annai Hospital<br>Near Valaraigate<br>Tiruchengode</p>
                  </div>
               </div>

               <div style="display: flex; gap: 1rem; align-items: flex-start; margin-bottom: 1.5rem;">
                  <div style="width: 50px; height: 50px; background: white; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; color: var(--accent-dark); box-shadow: var(--shadow-sm);">
                     <i class='bx bx-phone-call'></i>
                  </div>
                  <div>
                     <h4 style="margin-bottom: 0.25rem;">Phone Numbers</h4>
                     <p style="color: var(--text-secondary); margin: 0;">Emergency: <strong style="color: var(--danger-color);">911</strong> or <strong>1-800-EMERGENCY</strong></p>
                     <p style="color: var(--text-secondary); margin: 0;">Reception: +1 (555) 123-4567</p>
                  </div>
               </div>

               <div style="display: flex; gap: 1rem; align-items: flex-start;">
                  <div style="width: 50px; height: 50px; background: white; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; color: var(--warning-color); box-shadow: var(--shadow-sm);">
                     <i class='bx bx-envelope'></i>
                  </div>
                  <div>
                     <h4 style="margin-bottom: 0.25rem;">Email Address</h4>
                     <p style="color: var(--text-secondary); margin: 0;">info@annaihospital.com<br>support@annaihospital.com</p>
                  </div>
               </div>
            </div>

            <div class="glass-card" style="padding: 2.5rem;">
               <h3 style="color: var(--primary-dark); margin-bottom: 1.5rem;">Send a Message</h3>
               <form id="contactForm">
                 <div class="grid-2" style="gap: 1.5rem; margin-bottom: 1.5rem;">
                    <div>
                      <input type="text" class="form-control" placeholder="Your Name" required>
                    </div>
                    <div>
                      <input type="email" class="form-control" placeholder="Email Address" required>
                    </div>
                 </div>
                 <div style="margin-bottom: 1.5rem;">
                    <input type="text" class="form-control" placeholder="Subject" required>
                 </div>
                 <div style="margin-bottom: 1.5rem;">
                    <textarea class="form-control" rows="5" placeholder="Your Message..." required></textarea>
                 </div>
                 <button type="submit" class="btn btn-primary w-100">Send Message <i class='bx bx-send'></i></button>
               </form>
               <div id="contactSuccess" style="display: none; margin-top: 1rem; padding: 1rem; background: rgba(34, 197, 94, 0.1); color: var(--accent-dark); border-radius: var(--radius-md); text-align: center; font-weight: 500;">
                  Message sent successfully! We will get back to you soon.
               </div>
            </div>
          </div>

          <!-- Map placeholder -->
          <div class="glass-card" style="padding: 1rem; height: 100%; border-radius: var(--radius-lg); overflow: hidden;">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114964.53925916665!2d-80.29949920266738!3d25.782390733064336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b0a20ec8c111%3A0xff96f271ddad4f65!2sMiami%2C%20FL!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" width="100%" height="100%" style="border:0; min-height: 400px; border-radius: 12px;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>

        </div>
      </div>
    </section>
  `;

   const form = document.getElementById('contactForm');
   const success = document.getElementById('contactSuccess');

   if (form) {
      form.addEventListener('submit', (e) => {
         e.preventDefault();
         const btn = form.querySelector('button');
         btn.innerHTML = `<i class='bx bx-loader-alt bx-spin'></i> Sending...`;

         setTimeout(() => {
            form.reset();
            btn.innerHTML = `Send Message <i class='bx bx-send'></i>`;
            success.style.display = 'block';
            setTimeout(() => { success.style.display = 'none'; }, 5000);
         }, 1000);
      });
   }
};
