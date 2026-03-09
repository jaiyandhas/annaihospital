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
        <li><a href="/health-tools" data-link class="nav-item">HEALTH TOOLS <i class='bx bx-chevron-down'></i></a></li>
      </ul>

      <!-- Right: Actions -->
      <div class="nav-actions">
        <a href="/contact" class="action-icon phone-icon" aria-label="Call Us" data-link>
          <i class='bx bxs-phone'></i>
        </a>
        <button class="action-icon search-icon" aria-label="Search">
          <i class='bx bx-search'></i>
        </button>
        <div class="emergency-icon-wrapper">
          <i class='bx bxs-bell-ring'></i>
          <span>1066</span>
        </div>
        <button class="action-btn lang-btn" style="border-radius: 20px; padding: 0.3rem 0.8rem; font-size: 0.8rem; background: transparent; border: 1px solid rgba(255,255,255,0.8); color: white;">EN <i class='bx bx-chevron-down'></i></button>

        <button class="menu-toggle" aria-label="Toggle menu">
          <i class='bx bx-menu'></i>
        </button>
      </div>

      <!-- Mobile Menu -->
      <ul class="mobile-menu nav-links" style="margin: 0;">
        <li><a href="/" data-link class="nav-item">DISCOVER ANNAI <i class='bx bx-chevron-down'></i></a></li>
        <li><a href="/departments" data-link class="nav-item">MEDICAL SERVICES <i class='bx bx-chevron-down'></i></a></li>
        <li><a href="/health-tools" data-link class="nav-item">HEALTH TOOLS <i class='bx bx-chevron-down'></i></a></li>
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
