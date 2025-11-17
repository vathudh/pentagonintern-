document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    const body = document.body;
    const header = document.querySelector('header');

    // Toggle mobile menu
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function () {
            nav.classList.toggle('active');
            body.classList.toggle('menu-open');

            const spans = this.querySelectorAll('span');
            if (nav.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                resetHamburgerIcon();
            }
        });
    }

    // Close menu when clicking outside nav or toggle button
    document.addEventListener('click', function (e) {
        if (
            nav &&
            nav.classList.contains('active') &&
            !nav.contains(e.target) &&
            !mobileMenuToggle.contains(e.target)
        ) {
            nav.classList.remove('active');
            body.classList.remove('menu-open');
            resetHamburgerIcon();
        }
    });

    // Close menu when a nav link is clicked (mobile only)
    const navLinks = document.querySelectorAll('nav .menu li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 991) {
                nav.classList.remove('active');
                body.classList.remove('menu-open');
                resetHamburgerIcon();
            }
        });
    });

    // Reset hamburger icon to original
    function resetHamburgerIcon() {
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }

    // Header shadow effect only
    window.addEventListener('scroll', function () {
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        }
    });

    // Auto-close nav on window resize
    window.addEventListener('resize', function () {
        if (window.innerWidth > 991 && nav.classList.contains('active')) {
            nav.classList.remove('active');
            body.classList.remove('menu-open');
            resetHamburgerIcon();
        }
    });

    // Add padding to body equal to header height (fixed header support)
    window.addEventListener('load', function () {
        if (header) {
            const headerHeight = header.offsetHeight;
            document.body.style.paddingTop = `${headerHeight}px`;
        }
    });
});

    // Service item hover effect
    const serviceItems = document.querySelectorAll('.service-item');
    
    serviceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.classList.add('service-item-hover');
        });
        
        item.addEventListener('mouseleave', function() {
            this.classList.remove('service-item-hover');
        });
    });

    // Stats counter animation
   const statItems = document.querySelectorAll('.stat-info h3');
let hasAnimated = false;

// Function to animate numbers
function animateStats() {
    if (hasAnimated) return;

    statItems.forEach(item => {
        const rawTarget = item.getAttribute('data-target').replace(/[^0-9]/g, '');
        const targetValue = parseInt(rawTarget);

        const displayText = item.textContent.trim(); // Keep original Cr+ etc.
        const duration = 2000; // 2 seconds
        const startTime = performance.now();

        function updateNumber(timestamp) {
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const easeOutQuad = progress * (2 - progress);
            const currentValue = Math.floor(easeOutQuad * targetValue);

            item.textContent = currentValue.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                // Restore non-numeric suffix (e.g., "Cr+")
                if (displayText.match(/[^\d,]+$/)) {
                    item.textContent = currentValue.toLocaleString() + displayText.match(/[^\d,]+$/)[0];
                }
            }
        }

        requestAnimationFrame(updateNumber);
    });

    hasAnimated = true;
}

// Trigger animation when stats section is in view
const statsSection = document.querySelector('.stats');

if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(statsSection);
}

// Animate sections with .animate class on scroll
const animateElements = document.querySelectorAll('.animate');

if (animateElements.length > 0) {
    const animateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                animateObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animateElements.forEach(element => {
        animateObserver.observe(element);
    });
}

    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.footer-newsletter form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            // Simple email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!email || !emailRegex.test(email)) {
                // Show error
                if (!emailInput.classList.contains('error')) {
                    emailInput.classList.add('error');
                    
                    const errorMessage = document.createElement('div');
                    errorMessage.classList.add('error-message');
                    errorMessage.textContent = 'Please enter a valid email address';
                    
                    // Add error message after the input
                    emailInput.parentNode.insertBefore(errorMessage, emailInput.nextSibling);
                    
                    // Remove error after 3 seconds
                    setTimeout(() => {
                        emailInput.classList.remove('error');
                        errorMessage.remove();
                    }, 3000);
                }
                return;
            }
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.classList.add('success-message');
            successMessage.textContent = 'Thank you for subscribing!';
            
            // Clear input
            emailInput.value = '';
            
            // Show success message after the form
            this.parentNode.insertBefore(successMessage, this.nextSibling);
            
            // Remove success message after 3 seconds
            setTimeout(() => {
                successMessage.style.opacity = '0';
                setTimeout(() => {
                    successMessage.remove();
                }, 300);
            }, 3000);
        });
    }
    
    // Update copyright year
    const yearElement = document.querySelector('.current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroSection && heroImage) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            const sectionTop = heroSection.offsetTop;
            const scrollRelative = scrollPosition - sectionTop;
            
            if (scrollPosition >= sectionTop) {
                heroImage.style.transform = `translateY(${scrollRelative * 0.1}px)`;
            }
        });
    }
    
    // Add hover effect for client logos
    const clientLogos = document.querySelectorAll('.client-logos img');
    
    clientLogos.forEach(logo => {
        logo.addEventListener('mouseenter', function() {
            clientLogos.forEach(l => {
                if (l !== this) {
                    l.style.opacity = '0.3';
                }
            });
        });
        
        logo.addEventListener('mouseleave', function() {
            clientLogos.forEach(l => {
                l.style.opacity = '';
            });
        });
    });
    
    // Add animation classes to elements
    function addAnimationClasses() {
        // Hero section animations
        const heroContent = document.querySelector('.hero-content');
        const heroImg = document.querySelector('.hero-image');
        
        if (heroContent) {
            heroContent.classList.add('animate');
            setTimeout(() => {
                heroContent.classList.add('active');
            }, 100);
        }
        
        if (heroImg) {
            heroImg.classList.add('animate', 'animate-delay-200');
            setTimeout(() => {
                heroImg.classList.add('active');
            }, 100);
        }
        
        // Services section animations
        const services = document.querySelectorAll('.service-item');
        services.forEach((service, index) => {
            const delay = 400 + (index % 4) * 100;
            service.classList.add('animate', `animate-delay-${delay}`);
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            service.classList.add('active');
                        }, delay);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(service);
        });
        
        // Management items animations
        const managementItems = document.querySelectorAll('.management-item');
        managementItems.forEach((item, index) => {
            const delay = index * 200;
            item.classList.add('animate', `animate-delay-${delay}`);
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            item.classList.add('active');
                        }, delay);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(item);
        });
        
        // Blog cards animations
        const blogCards = document.querySelectorAll('.blog-card');
        blogCards.forEach((card, index) => {
            const delay = index * 200;
            card.classList.add('animate', `animate-delay-${delay}`);
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            card.classList.add('active');
                        }, delay);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(card);
        });
    }
    
    // Call the function to add animation classes
    addAnimationClasses();



document.addEventListener('DOMContentLoaded', () => {
  let currentSlide = 0;
  const slides = document.querySelectorAll(".testimonial-slide");
  const slider = document.querySelector(".testimonial-slider");
  const prevBtn = document.querySelector("#prevBtn");
  const nextBtn = document.querySelector("#nextBtn");

  function showSlide(index) {
      slider.style.transform = `translateX(-${index * 100}%)`;
      slides.forEach((slide, i) => {
          slide.classList.toggle("active", i === index);
      });
  }

  function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
  }

  function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
  }

  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);

  showSlide(currentSlide);
});



document.addEventListener('DOMContentLoaded', () => {
  const blogSlider = document.querySelector('.blog-slider');
  const blogCards = document.querySelectorAll('.blog-card');
  const blogGrid = document.querySelector('.blog-grid');

  const cardWidth = blogCards[0].offsetWidth + 30; // 320 + margins
  const cardsPerView = Math.floor(blogGrid.offsetWidth / 350);

  let currentIndex = cardsPerView; // Start from the first real card

  // Clone first and last few cards
  const totalCards = blogCards.length;
  const clonesBefore = [];
  const clonesAfter = [];

  for (let i = 0; i < cardsPerView; i++) {
    const cloneFirst = blogCards[i].cloneNode(true);
    const cloneLast = blogCards[totalCards - 1 - i].cloneNode(true);
    cloneFirst.classList.add('clone');
    cloneLast.classList.add('clone');
    clonesBefore.unshift(cloneLast); // Add at the beginning
    clonesAfter.push(cloneFirst);    // Add at the end
  }

  clonesBefore.forEach(clone => blogSlider.prepend(clone));
  clonesAfter.forEach(clone => blogSlider.append(clone));

  const allCards = blogSlider.querySelectorAll('.blog-card');

  function updateTransform() {
    blogSlider.style.transition = 'transform 0.5s ease';
    blogSlider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  }

  function nextSlide1() {
    if (currentIndex >= allCards.length - cardsPerView) return;
    currentIndex++;
    updateTransform();
  }

  function prevSlide1() {
    if (currentIndex <= 0) return;
    currentIndex--;
    updateTransform();
  }

  blogSlider.addEventListener('transitionend', () => {
    if (currentIndex === allCards.length - cardsPerView) {
      // Reached end clone, jump to real first
      blogSlider.style.transition = 'none';
      currentIndex = cardsPerView;
      blogSlider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    } else if (currentIndex === 0) {
      // Reached start clone, jump to real last
      blogSlider.style.transition = 'none';
      currentIndex = allCards.length - (2 * cardsPerView);
      blogSlider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }
  });

  window.nextSlide1 = nextSlide1;
  window.prevSlide1 = prevSlide1;

  // Initial position
  blogSlider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
});





