// VERV Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // FAQ Toggle functionality
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const toggle = item.querySelector('.faq-toggle');
    
    if (toggle) {
      toggle.addEventListener('click', function() {
        // Close all other FAQ items
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('faq-item-open')) {
            otherItem.classList.remove('faq-item-open');
            const otherToggle = otherItem.querySelector('.faq-toggle');
            if (otherToggle) {
              otherToggle.classList.remove('faq-toggle-open');
            }
          }
        });
        
        // Toggle current item
        item.classList.toggle('faq-item-open');
        toggle.classList.toggle('faq-toggle-open');
      });
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Intersection Observer for scroll animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document.querySelectorAll('.hero-card, .style-card, .preset-card, .section-title').forEach(el => {
    observer.observe(el);
  });

  // Navigation scroll effect
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
      navbar.style.background = 'transparent';
    }
    
    lastScroll = currentScroll;
  });

  // Testimonial Carousel functionality
  const testimonialTrack = document.querySelector('.testimonial-track');
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const prevBtn = document.querySelector('.testimonial-prev');
  const nextBtn = document.querySelector('.testimonial-next');
  const dots = document.querySelectorAll('.testimonial-dot');
  
  if (testimonialTrack && testimonialCards.length > 0) {
    let currentIndex = 0;
    const totalCards = testimonialCards.length;
    
    // Update dots to reflect current position
    function updateDots(index) {
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }
    
    // Scroll to specific card (for mobile view)
    function scrollToCard(index) {
      if (window.innerWidth <= 768) {
        const card = testimonialCards[index];
        if (card) {
          card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        }
      }
      currentIndex = index;
      updateDots(index);
    }
    
    // Previous button click
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        scrollToCard(currentIndex);
      });
    }
    
    // Next button click
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalCards;
        scrollToCard(currentIndex);
      });
    }
    
    // Dot click
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        scrollToCard(index);
      });
    });
    
    // Add hover effect to cards
    testimonialCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-4px)';
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
      });
    });
  }
});
