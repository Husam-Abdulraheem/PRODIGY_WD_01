/**
 * LUMINA BOTANICALS - Interactive Navigation & Landing Page Interactivity
 * Prodigy InfoTech Task-01
 * 
 * Satisfies all specifications:
 * 1. Fixed navigation menu visible on all pages
 * 2. Changes background color and style when scrolled (via JavaScript & CSS)
 * 3. Changes background color and font color when hovering over menu items (via JavaScript event listeners)
 * 4. Active section tracking (ScrollSpy)
 * 5. Responsive mobile drawer navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --- Element References ---
  const header = document.getElementById('header');
  const brandLogo = document.getElementById('brand-logo');
  const navLinks = document.querySelectorAll('.nav-link');
  const drawerLinks = document.querySelectorAll('.drawer-nav-link');
  const navCtaBtn = document.getElementById('nav-cta-btn');
  const scrollProgressBar = document.getElementById('scroll-progress');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const drawerClose = document.getElementById('drawer-close');
  const sections = document.querySelectorAll('main section[id]');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  // ==========================================================================
  // REQUIREMENT 1: JavaScript Scroll Interactivity (Changes Menu Color & Style)
  // ==========================================================================
  let isTicking = false;

  const updateNavbarOnScroll = () => {
    const scrollY = window.scrollY || window.pageYOffset;

    // Change background color and styling when scrolled past 40px
    if (scrollY > 40) {
      header.classList.add('scrolled');
      header.style.backgroundColor = '#FFFFFF';
      header.style.boxShadow = '0 4px 20px rgba(20, 36, 28, 0.08)';
      header.style.borderBottom = '1px solid rgba(31, 54, 42, 0.12)';
      
      // Update brand logo text color
      if (brandLogo) {
        brandLogo.style.color = '#14241C';
      }
    } else {
      header.classList.remove('scrolled');
      header.style.backgroundColor = 'rgba(250, 247, 242, 0.85)';
      header.style.boxShadow = 'none';
      header.style.borderBottom = '1px solid rgba(31, 54, 42, 0.06)';
      
      if (brandLogo) {
        brandLogo.style.color = '#1F362A';
      }
    }

    // Scroll Progress Indicator Bar
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (documentHeight > 0 && scrollProgressBar) {
      const scrollPercentage = Math.min(100, Math.max(0, (scrollY / documentHeight) * 100));
      scrollProgressBar.style.width = `${scrollPercentage}%`;
    }

    isTicking = false;
  };

  window.addEventListener('scroll', () => {
    if (!isTicking) {
      window.requestAnimationFrame(updateNavbarOnScroll);
      isTicking = true;
    }
  }, { passive: true });

  // Initial trigger
  updateNavbarOnScroll();

  // ==========================================================================
  // REQUIREMENT 2: JavaScript Hover Interactivity (Changes Background & Font Color)
  // ==========================================================================
  // Attach JavaScript mouseenter & mouseleave listeners to every navigation item
  navLinks.forEach(link => {
    // When hovering over a menu item
    link.addEventListener('mouseenter', () => {
      // JavaScript directly updates background color and font color
      link.style.backgroundColor = '#1F362A'; // Deep Forest Sage
      link.style.color = '#FFFFFF';           // Crisp White Font
      link.style.transform = 'translateY(-2px)';
    });

    // When mouse leaves the menu item
    link.addEventListener('mouseleave', () => {
      // Revert styles back so active state / normal state takes over
      link.style.backgroundColor = '';
      link.style.color = '';
      link.style.transform = '';
    });
  });

  // Also attach hover effects to mobile drawer links
  drawerLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      link.style.backgroundColor = '#1F362A';
      link.style.color = '#FFFFFF';
    });

    link.addEventListener('mouseleave', () => {
      link.style.backgroundColor = '';
      link.style.color = '';
    });
  });

  // ==========================================================================
  // REQUIREMENT 3: ScrollSpy (Highlights Active Section)
  // ==========================================================================
  const setActiveLink = (sectionId) => {
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      // Match section ID whether link is `#section` or `index.html#section`
      const isCurrentSection = href === `#${sectionId}` || href === `index.html#${sectionId}`;
      
      link.classList.toggle('active', isCurrentSection);
      link.classList.toggle('target-current', isCurrentSection);

      if (isCurrentSection) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });

    drawerLinks.forEach(link => {
      const href = link.getAttribute('href');
      const isCurrentSection = href === `#${sectionId}` || href === `index.html#${sectionId}`;
      link.classList.toggle('active', isCurrentSection);
    });
  };

  if (sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -55% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          setActiveLink(currentId);
        }
      });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));
  }

  // ==========================================================================
  // REQUIREMENT 4: Responsive Mobile Navigation Drawer
  // ==========================================================================
  const openMobileMenu = () => {
    mobileDrawer.classList.add('open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    drawerBackdrop.classList.add('active');
    drawerBackdrop.setAttribute('aria-hidden', 'false');
    mobileToggle.classList.add('active');
    mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileMenu = () => {
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
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (drawerClose) {
    drawerClose.addEventListener('click', closeMobileMenu);
  }

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', closeMobileMenu);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('open')) {
      closeMobileMenu();
    }
  });

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // ==========================================================================
  // INTERACTIVE FEATURE: Product Category Filter
  // ==========================================================================
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
          card.style.animation = 'fadeIn 0.35s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ==========================================================================
  // INTERACTIVE FEATURE: Ritual Step Selection
  // ==========================================================================
  const ritualSteps = document.querySelectorAll('.ritual-step-item');
  ritualSteps.forEach(step => {
    step.addEventListener('click', () => {
      ritualSteps.forEach(s => s.classList.remove('active'));
      step.classList.add('active');
    });
  });

  // ==========================================================================
  // INTERACTIVE FEATURE: Toast Notifications
  // ==========================================================================
  let toastTimer;
  const showToast = (message) => {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  };

  const addButtons = document.querySelectorAll('.add-to-bag');
  addButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const productCard = btn.closest('.product-card');
      const productName = productCard ? productCard.querySelector('.product-name').textContent : 'Item';
      showToast(`Added ${productName} to your ritual! ✨`);
    });
  });

  const quickViewButtons = document.querySelectorAll('.quick-view-btn');
  quickViewButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const productCard = btn.closest('.product-card');
      const productName = productCard ? productCard.querySelector('.product-name').textContent : 'Item';
      showToast(`Quick viewing ${productName}`);
    });
  });

  // ==========================================================================
  // INTERACTIVE FEATURE: Consultation Form Validation
  // ==========================================================================
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
