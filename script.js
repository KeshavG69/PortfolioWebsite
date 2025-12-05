function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Terminal Industries-style Animations
document.addEventListener('DOMContentLoaded', function() {
  
  // Split text into spans for character-by-character animation
  function splitTextIntoSpans(element) {
    const text = element.textContent;
    element.textContent = '';
    element.classList.add('split-text');
    
    text.split('').forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.animationDelay = `${index * 0.03}s`;
      span.classList.add('char');
      element.appendChild(span);
    });
  }

  // Apply split text to main titles only (for performance)
  document.querySelectorAll('#profile .title').forEach(splitTextIntoSpans);

  // Smooth reveal animation for sections
  const revealElements = document.querySelectorAll(
    '.details-container, .timeline-item, .testimonial-card, .bento-card, .project-metric, .about-containers > *, section > .title, section > .section__text__p1'
  );
  
  revealElements.forEach((el, index) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(index % 4) * 0.1}s`;
  });

  // Create intersection observer for reveal animations
  const observerOptions = {
    root: null,
    rootMargin: '-50px',
    threshold: 0.15
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        
        // Trigger character animation for titles
        if (entry.target.classList.contains('split-text')) {
          entry.target.querySelectorAll('.char').forEach(char => {
            char.classList.add('animate');
          });
        }
      }
    });
  }, observerOptions);

  // Observe all reveal elements
  document.querySelectorAll('.reveal, .split-text').forEach(el => {
    revealObserver.observe(el);
  });

  // Add parallax effect to profile image
  const profilePic = document.querySelector('#profile .section__pic-container');
  if (profilePic) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.3;
      profilePic.style.transform = `translateY(${rate}px)`;
    });
  }

  // Magnetic hover effect for buttons
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });

  // Smooth counter animation for metrics
  document.querySelectorAll('.metric-value').forEach(metric => {
    const text = metric.textContent;
    const match = text.match(/(\d+)/);
    
    if (match) {
      const targetNum = parseInt(match[0]);
      const suffix = text.replace(match[0], '');
      let current = 0;
      
      const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && current === 0) {
            const increment = targetNum / 30;
            const counter = setInterval(() => {
              current += increment;
              if (current >= targetNum) {
                metric.textContent = text;
                clearInterval(counter);
              } else {
                metric.textContent = Math.floor(current) + suffix;
              }
            }, 30);
          }
        });
      }, { threshold: 0.5 });
      
      counterObserver.observe(metric);
    }
  });
});
