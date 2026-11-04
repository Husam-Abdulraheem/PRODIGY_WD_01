/**
 * LUMINA BOTANICALS - Interactive Navigation & Landing Page Interactions
 * Prodigy InfoTech Task-01
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --- Element Selectors ---
  const header = document.getElementById('header');
  const scrollProgressBar = document.getElementById('scroll-progress');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const drawerClose = document.getElementById('drawer-close');
  const navLinks = document.querySelectorAll('.nav-link, .drawer-nav-link');
  const sections = document.querySelectorAll('main section[id]');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  // --------------------------------------------------------------------------
  // 1. Interactive Navigation: Header Styling on Scroll
  // --------------------------------------------------------------------------
  let ticking = false;

  const handleScroll = () => {
    const scrollY = window.scrollY || window.pageYOffset;

    // Header transition after scrolling 40px
    if (scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll Progress Indicator Calculation
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (documentHeight > 0) {
      const scrollPercentage = Math.min(100, Math.max(0, (scrollY / documentHeight) * 100));
      if (scrollProgressBar) {
        scrollProgressBar.style.width = `${scrollPercentage}%`;
      }
    }

    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(handleScroll);
      ticking = true;
    }
  }, { passive: true });

  // Initial check on load
  handleScroll();

  // --------------------------------------------------------------------------
  // 2. ScrollSpy: Highlight Current Section in Navigation Menu
  // --------------------------------------------------------------------------
  // Check if browser supports modern CSS scroll-target-group
  const supportsScrollTargetGroup = window.CSS && CSS.supports && CSS.supports('scroll-target-group: auto');

  const updateActiveNavLink = (activeId) => {
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      const isMatch = href === `#${activeId}`;

      // Synchronize class & ARIA current attribute
      link.classList.toggle('target-current', isMatch);
      if (isMatch) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  // IntersectionObserver for robust section detection
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -55% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');
        updateActiveNavLink(activeId);
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  // If modern CSS supports scroll-target-group, also listen for scrollend
  if (supportsScrollTargetGroup) {
    document.addEventListener('scrollend', () => {
      const currentLink = document.querySelector('nav a:target-current');
      if (currentLink) {
        const id = currentLink.getAttribute('href').replace('#', '');
        updateActiveNavLink(id);
      }
    });
  }

  // --------------------------------------------------------------------------
  // 3. Mobile Navigation Drawer
  // --------------------------------------------------------------------------
  const openDrawer = () => {
    mobileDrawer.classList.add('open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    drawerBackdrop.classList.add('active');
    drawerBackdrop.setAttribute('aria-hidden', 'false');
    mobileToggle.classList.add('active');
    mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    mobileDrawer.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    drawerBackdrop.classList.remove('active');
    drawerBackdrop.setAttribute('aria-hidden', 'true');
    mobileToggle.classList.remove('active');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('open');
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }

  if (drawerClose) {
    drawerClose.addEventListener('click', closeDrawer);
  }

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', closeDrawer);
  }

  // Close drawer on pressing Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  // Close drawer when clicking any drawer nav link
  const drawerLinks = document.querySelectorAll('.drawer-nav-link');
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // --------------------------------------------------------------------------
  // 4. Interactive Product Category Filter
  // --------------------------------------------------------------------------
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      productCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 5. Interactive Ritual Step Selection
  // --------------------------------------------------------------------------
  const ritualSteps = document.querySelectorAll('.ritual-step-item');
  ritualSteps.forEach(step => {
    step.addEventListener('click', () => {
      ritualSteps.forEach(s => s.classList.remove('active'));
      step.classList.add('active');
    });
  });

  // --------------------------------------------------------------------------
  // 6. Toast Notification for Actions
  // --------------------------------------------------------------------------
  let toastTimeout;
  const showToast = (message) => {
    if (!toast) return;
    toastMessage.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  };

  // Add to Bag buttons
  const addButtons = document.querySelectorAll('.add-to-bag');
  addButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const productCard = btn.closest('.product-card');
      const productName = productCard.querySelector('.product-name').textContent;
      showToast(`Added ${productName} to your ritual! ✨`);
    });
  });

  // Quick View buttons
  const quickViewButtons = document.querySelectorAll('.quick-view-btn');
  quickViewButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const productCard = btn.closest('.product-card');
      const productName = productCard.querySelector('.product-name').textContent;
      showToast(`Viewing details for ${productName}`);
    });
  });

  // --------------------------------------------------------------------------
  // 7. Consultation Form Validation & Submission
  // --------------------------------------------------------------------------
  const consultationForm = document.getElementById('consultation-form');
  const formFeedback = document.getElementById('form-feedback');

  if (consultationForm) {
    consultationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('user-name');
      const emailInput = document.getElementById('user-email');
      const skinTypeInput = document.getElementById('skin-type');

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        nameInput.closest('.form-group').classList.add('has-error');
        isValid = false;
      } else {
        nameInput.closest('.form-group').classList.remove('has-error');
      }

      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        emailInput.closest('.form-group').classList.add('has-error');
        isValid = false;
      } else {
        emailInput.closest('.form-group').classList.remove('has-error');
      }

      // Validate Skin Focus
      if (!skinTypeInput.value) {
        skinTypeInput.closest('.form-group').classList.add('has-error');
        isValid = false;
      } else {
        skinTypeInput.closest('.form-group').classList.remove('has-error');
      }

      if (isValid) {
        formFeedback.className = 'form-feedback success';
        formFeedback.textContent = `Thank you, ${nameInput.value.trim()}! Your customized skin ritual report is being prepared and will be sent to your email.`;
        consultationForm.reset();
        showToast('Consultation request sent successfully! 🌿');

        setTimeout(() => {
          formFeedback.textContent = '';
        }, 6000);
      } else {
        formFeedback.className = 'form-feedback';
        formFeedback.textContent = 'Please fill out all required fields marked with *';
      }
    });

    // Remove error on input change
    ['user-name', 'user-email', 'skin-type'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', () => {
          el.closest('.form-group').classList.remove('has-error');
        });
      }
    });
  }
});
