document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const navbar = document.querySelector('.navbar');
  const scrollTopBtn = document.querySelector('.scroll-top');
  const sections = document.querySelectorAll('section');

  navToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }

      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });

  let lastScrollY = window.scrollY;
  let scrollTicking = false;

  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  });

  function handleScroll() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }

    if (currentScrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (currentScrollY > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }

    lastScrollY = currentScrollY;

    updateActiveNavLink();
  }

  function updateActiveNavLink() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const fadeInObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  const timelineItems = document.querySelectorAll('.timeline-item');
  const problemCards = document.querySelectorAll('.problem-card');
  const skillCategories = document.querySelectorAll('.skill-category');
  const valueCards = document.querySelectorAll('.value-card');
  const highlightItems = document.querySelectorAll('.highlight-item');

  [timelineItems, problemCards, skillCategories, valueCards, highlightItems].forEach(items => {
    items.forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(30px)';
      item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      fadeInObserver.observe(item);
    });
  });

  problemCards.forEach(card => {
    let isExpanded = false;

    card.addEventListener('click', function(e) {
      if (window.innerWidth <= 768) {
        isExpanded = !isExpanded;
        const expanded = this.querySelector('.solution-expanded');

        if (isExpanded) {
          this.classList.add('mobile-expanded');
          expanded.style.setProperty('max-height', expanded.scrollHeight + 'px', 'important');
          expanded.style.setProperty('opacity', '1', 'important');
        } else {
          this.classList.remove('mobile-expanded');
          expanded.style.setProperty('max-height', '0', 'important');
          expanded.style.setProperty('opacity', '0', 'important');
        }
      }
    });

    if (window.innerWidth > 768) {
      card.addEventListener('mouseenter', function() {
        const expanded = this.querySelector('.solution-expanded');
        if (expanded) {
          expanded.style.setProperty('max-height', expanded.scrollHeight + 'px', 'important');
          expanded.style.setProperty('opacity', '1', 'important');
        }
      });

      card.addEventListener('mouseleave', function() {
        const expanded = this.querySelector('.solution-expanded');
        if (expanded) {
          expanded.style.setProperty('max-height', '0', 'important');
          expanded.style.setProperty('opacity', '0', 'important');
        }
      });
    }
  });

  const skillBarsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const skillLevels = entry.target.querySelectorAll('.skill-level');
        skillLevels.forEach(level => {
          const width = level.style.width;
          level.style.width = '0';
          setTimeout(() => {
            level.style.width = width;
          }, 100);
        });
        skillBarsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  skillCategories.forEach(category => {
    skillBarsObserver.observe(category);
  });

  const expertiseObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const numbers = entry.target.querySelectorAll('.expertise-number');
        numbers.forEach(number => {
          const target = number.textContent;
          const numericPart = parseInt(target.replace(/\D/g, ''));
          const suffix = target.replace(/[\d\s]/g, '');

          let current = 0;
          const increment = numericPart / 50;
          const timer = setInterval(() => {
            current += increment;
            if (current >= numericPart) {
              number.textContent = target;
              clearInterval(timer);
            } else {
              number.textContent = Math.floor(current) + suffix;
            }
          }, 30);
        });
        expertiseObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const expertiseSummary = document.querySelector('.expertise-summary');
  if (expertiseSummary) {
    expertiseObserver.observe(expertiseSummary);
  }

  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const formData = new FormData(this);
      const name = formData.get('name');
      const email = formData.get('email');
      const subject = formData.get('subject');
      const message = formData.get('message');

      if (name && email && subject && message) {
        const mailtoLink = `mailto:ruhan.9mri@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        window.location.href = mailtoLink;

        this.reset();

        showNotification('Thank you! Your message has been prepared. Please send it via your email client.', 'success');
      } else {
        showNotification('Please fill in all fields.', 'error');
      }
    });
  }

  function showNotification(message, type = 'success') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
      existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 30px;
      max-width: 350px;
      padding: 18px 24px;
      background: ${type === 'success' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'};
      color: white;
      border-radius: 12px;
      z-index: 10000;
      opacity: 0;
      transform: translateX(400px);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
      font-weight: 500;
      font-size: 0.95rem;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(400px)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 400);
    }, 4000);
  }

  const heroContent = document.querySelector('.hero-content');
  const heroImage = document.querySelector('.hero-image');

  if (heroContent) {
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(40px)';
    heroContent.style.transition = 'opacity 1s ease, transform 1s ease';

    setTimeout(() => {
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateY(0)';
    }, 300);
  }

  if (heroImage) {
    heroImage.style.opacity = '0';
    heroImage.style.transform = 'scale(0.8)';
    heroImage.style.transition = 'opacity 1s ease, transform 1s ease';

    setTimeout(() => {
      heroImage.style.opacity = '1';
      heroImage.style.transform = 'scale(1)';
    }, 600);
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    if (!anchor.classList.contains('nav-link')) {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 70;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    }
  });

  const parallaxElements = document.querySelectorAll('.profile-circle, .hero-content');
  let parallaxTicking = false;

  window.addEventListener('scroll', () => {
    if (!parallaxTicking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        parallaxElements.forEach(element => {
          const speed = element.classList.contains('profile-circle') ? 0.3 : 0.2;
          const yPos = -(scrolled * speed);
          if (scrolled < window.innerHeight) {
            element.style.transform = `translateY(${yPos}px)`;
          }
        });
        parallaxTicking = false;
      });
      parallaxTicking = true;
    }
  });

  updateActiveNavLink();
});
