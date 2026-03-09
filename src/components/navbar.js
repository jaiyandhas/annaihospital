export const renderNavbar = () => {
  const navbarHTML = `
  <header class="navbar-container">
    <nav class="container navbar">
    <nav class="container navbar">
      <!-- Left: Logo -->
      <a href="/" class="logo" data-link>
        <img src="/logo.png" alt="Annai Hospital" style="width: 50px; height: 50px; object-fit: contain; filter: brightness(0) invert(1);" onerror="this.outerHTML='<div class=\\'logo-icon\\' style=\\'background: var(--accent);\\'><i class=\\'bx bx-child\\'></i></div>'"/>
        <div class="logo-text" style="text-align: left; display: flex; flex-direction: column; justify-content: center;">
          <h2 style="color: white; font-size: 1.4rem; letter-spacing: 0.5px; line-height: 1; transition: color 0.3s;" class="dynamic-text">Annai</h2>
          <span style="color: white; font-size: 0.7rem; letter-spacing: 2px; transition: color 0.3s;" class="dynamic-sub">HOSPITAL</span>
        </div>
      </a>

      <!-- Center: Navigation Links -->
      <ul class="nav-links desktop-links">
        <li><a href="/" data-link class="nav-item">DISCOVER ANNAI <i class='bx bx-chevron-down'></i></a></li>
        <li><a href="/departments" data-link class="nav-item">MEDICAL SERVICES <i class='bx bx-chevron-down'></i></a></li>
        <li class="nav-dropdown">
          <a href="#" class="nav-item">SERVICES & FEATURES <i class='bx bx-chevron-down'></i></a>
          <ul class="dropdown-menu shadow-md">
            <li><a href="/appointment" data-link><i class='bx bx-calendar-check'></i> Book Appointment</a></li>
            <li><a href="/doctors" data-link><i class='bx bx-user-pin'></i> Our Doctors</a></li>
            <li><a href="/telemedicine" data-link><i class='bx bx-video'></i> Telemedicine</a></li>
            <li><a href="/bed-availability" data-link><i class='bx bx-bed'></i> Bed Availability</a></li>
            <li><a href="/patient-portal" data-link><i class='bx bx-laptop'></i> Patient Portal</a></li>
            <li><a href="/lab-reports" data-link><i class='bx bx-test-tube'></i> Lab Reports</a></li>
            <li><a href="/health-tools" data-link><i class='bx bx-heart'></i> Health Tools</a></li>
          </ul>
        </li>
      </ul>

      <!-- Right: Actions -->
      <div class="nav-actions" style="gap: 1rem;">
        <a href="/contact" class="premium-icon-btn phone-btn" aria-label="Call Us" data-link title="Contact Us">
          <div class="icon-pulse"></div>
          <i class='bx bxs-phone-call'></i>
        </a>
        <button class="premium-icon-btn search-btn" aria-label="Search" title="Search">
          <i class='bx bx-search-alt-2'></i>
        </button>
        <div class="divider" style="width: 1px; height: 24px; background: rgba(255,255,255,0.3); margin: 0 0.5rem;"></div>
        <button class="action-btn lang-btn premium-lang-btn">EN <i class='bx bx-chevron-down'></i></button>

        <button class="menu-toggle" aria-label="Toggle menu">
          <i class='bx bx-menu'></i>
        </button>
      </div>

      <!-- Mobile Menu -->
      <ul class="mobile-menu nav-links" style="margin: 0;">
        <li><a href="/" data-link class="nav-item">DISCOVER ANNAI <i class='bx bx-chevron-down'></i></a></li>
        <li><a href="/departments" data-link class="nav-item">MEDICAL SERVICES <i class='bx bx-chevron-down'></i></a></li>
        <li class="mobile-dropdown-parent">
          <div class="nav-item" style="cursor: pointer; display: flex; justify-content: space-between; align-items: center;">SERVICES & FEATURES <i class='bx bx-chevron-down dropdown-arrow'></i></div>
          <ul class="mobile-dropdown-menu">
            <li><a href="/appointment" data-link><i class='bx bx-calendar-check'></i> Book Appointment</a></li>
            <li><a href="/doctors" data-link><i class='bx bx-user-pin'></i> Our Doctors</a></li>
            <li><a href="/telemedicine" data-link><i class='bx bx-video'></i> Telemedicine</a></li>
            <li><a href="/bed-availability" data-link><i class='bx bx-bed'></i> Bed Availability</a></li>
            <li><a href="/patient-portal" data-link><i class='bx bx-laptop'></i> Patient Portal</a></li>
            <li><a href="/lab-reports" data-link><i class='bx bx-test-tube'></i> Lab Reports</a></li>
            <li><a href="/health-tools" data-link><i class='bx bx-heart'></i> Health Tools</a></li>
          </ul>
        </li>
      </ul>
    </nav>
  </header>
  `;

  document.getElementById('navbar-placeholder').innerHTML = navbarHTML;

  // Add CSS logic directly for this component or it can be in style.css. 
  // Let's attach a small specific style block inside style.css later, but for now we manipulate DOM classes.

  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
  });

  // Mobile Accordion Logic
  const mobileDropdownParent = document.querySelector('.mobile-dropdown-parent .nav-item');
  if (mobileDropdownParent) {
    mobileDropdownParent.addEventListener('click', (e) => {
      e.stopPropagation();
      const parentLi = mobileDropdownParent.closest('.mobile-dropdown-parent');
      parentLi.classList.toggle('active');
    });
  }

  // Add scroll effect
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.navbar-container');
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
};
