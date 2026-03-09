export const renderFooter = () => {
  const footerHTML = `
    <footer class="footer">
      <div class="container">
        <div class="grid-4 footer-top">
          
          <div class="footer-widget brand-widget">
            <a href="/" class="logo logo-light" data-link style="gap: 0.5rem; text-decoration: none;">
              <img src="/logo.png" alt="Annai Hospital" style="width: 45px; height: 45px; object-fit: contain; filter: brightness(0) invert(1);" onerror="this.outerHTML='<div class=\\'logo-icon\\' style=\\'background: var(--accent);\\'><i class=\\'bx bx-child\\'></i></div>'"/>
              <div class="logo-text">
                <h2 style="color: white;">Annai</h2>
                <span style="color: var(--accent-light);">Hospital</span>
              </div>
            </a>
            <p class="brand-desc">Trusted Child Speciality and Maternity care since 2007. Experience the joy of painless labor and birth companionship.</p>
            <div class="social-links">
              <a href="#" aria-label="Facebook"><i class='bx bxl-facebook'></i></a>
              <a href="#" aria-label="Twitter"><i class='bx bxl-twitter'></i></a>
              <a href="#" aria-label="Instagram"><i class='bx bxl-instagram'></i></a>
              <a href="#" aria-label="LinkedIn"><i class='bx bxl-linkedin'></i></a>
            </div>
          </div>
          
          <div class="footer-widget links-widget">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/doctors" data-link>Find a Doctor</a></li>
              <li><a href="/appointment" data-link>Book Appointment</a></li>
              <li><a href="/departments" data-link>Departments</a></li>
              <li><a href="/reports" data-link>Download Reports</a></li>
              <li><a href="/telemedicine" data-link>Online Consultation</a></li>
            </ul>
          </div>
          
          <div class="footer-widget links-widget">
            <h3>Services</h3>
            <ul>
              <li><a href="/departments" data-link>Cardiology</a></li>
              <li><a href="/departments" data-link>Neurology</a></li>
              <li><a href="/departments" data-link>Orthopedics</a></li>
              <li><a href="/departments" data-link>24/7 Emergency</a></li>
              <li><a href="/health-tools" data-link>Health Calculators</a></li>
            </ul>
          </div>
          
          <div class="footer-widget contact-widget">
            <h3>Contact Us</h3>
            <ul class="contact-info">
              <li>
                <i class='bx bx-map'></i>
                <span>Near Valaraigate, Tiruchengode</span>
              </li>
              <li>
                <i class='bx bx-phone'></i>
                <span>+1 800 123 4567<br><small>Emergency: 1066</small></span>
              </li>
              <li>
                <i class='bx bx-envelope'></i>
                <span>info@annaihospital.com</span>
              </li>
            </ul>
          </div>
          
        </div>
        
        <div class="footer-bottom">
          <p>&copy; ${new Date().getFullYear()} Annai Hospital. All rights reserved.</p>
          <div class="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  `;

  document.getElementById('footer-placeholder').innerHTML = footerHTML;
};
