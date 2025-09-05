// Loading Screen Animation
document.addEventListener("DOMContentLoaded", () => {
  const loadingScreen = document.getElementById("loading-screen")

  // Show loading screen for 2 seconds, then slide up
  setTimeout(() => {
    loadingScreen.classList.add("slide-up")

    // Remove loading screen from DOM after animation
    setTimeout(() => {
      loadingScreen.style.display = "none"
    }, 1000)
  }, 2000)
})

// Mobile Navigation Toggle
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navMenu.classList.toggle("active")
    })

    // Close menu when clicking on a link
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active")
        navMenu.classList.remove("active")
      })
    })
  }
})

// Scroll-triggered Animations
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

function isElementPartiallyInViewport(el) {
  const rect = el.getBoundingClientRect()
  return rect.top < (window.innerHeight || document.documentElement.clientHeight) && rect.bottom >= 0
}

function handleScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    ".animate-fade-in, .animate-slide-in, .animate-slide-up, .animate-zoom-in",
  )

  animatedElements.forEach((element) => {
    if (isElementPartiallyInViewport(element)) {
      element.style.animationDelay = "0s"
      element.style.animationPlayState = "running"
    }
  })
}

// Throttle scroll events for better performance
let ticking = false
function requestTick() {
  if (!ticking) {
    requestAnimationFrame(handleScrollAnimations)
    ticking = true
    setTimeout(() => {
      ticking = false
    }, 100)
  }
}

window.addEventListener("scroll", requestTick)
window.addEventListener("load", handleScrollAnimations)

// Smooth scrolling for CTA button
document.addEventListener("DOMContentLoaded", () => {
  const ctaButton = document.querySelector(".cta-button")
  if (ctaButton) {
    ctaButton.addEventListener("click", (e) => {
      e.preventDefault()
      const servicesSection = document.querySelector(".services-section")
      if (servicesSection) {
        servicesSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  }
})

// Contact Form Handling
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const formData = new FormData(contactForm)
      const data = Object.fromEntries(formData)

      // Simple validation
      if (!data.parentName || !data.email || !data.message) {
        alert("Please fill in all required fields.")
        return
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(data.email)) {
        alert("Please enter a valid email address.")
        return
      }

      // Simulate form submission
      const submitBtn = contactForm.querySelector(".submit-btn")
      const originalText = submitBtn.textContent

      submitBtn.textContent = "Sending..."
      submitBtn.disabled = true

      // Simulate API call
      setTimeout(() => {
        alert("Thank you for your message! We will get back to you soon.")
        contactForm.reset()
        submitBtn.textContent = originalText
        submitBtn.disabled = false
      }, 2000)
    })
  }
})
const animatedElements = document.querySelectorAll('.fade-in, .slide-in, .slide-up, .zoom-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 150); // delay 150ms për secilin element
    }
  });
}, { threshold: 0.2 });

animatedElements.forEach(el => observer.observe(el));


// Add hover effects for service cards
document.addEventListener("DOMContentLoaded", () => {
  const serviceCards = document.querySelectorAll(".service-card")

  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })
})

// Add staggered animation delays for grid items
document.addEventListener("DOMContentLoaded", () => {
  const gridItems = document.querySelectorAll(
    ".services-grid .service-card, .staff-grid .staff-card, .gallery-grid .gallery-item",
  )

  gridItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`
  })
})

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
    navbar.style.backdropFilter = "blur(10px)"
  } else {
    navbar.style.background = "var(--white)"
    navbar.style.backdropFilter = "none"
  }
})

// Gallery lightbox effect (simple version)
document.addEventListener("DOMContentLoaded", () => {
  const galleryItems = document.querySelectorAll(".gallery-item")

  galleryItems.forEach((item) => {
    item.addEventListener("click", function () {
      const img = this.querySelector("img")
      const overlay = this.querySelector(".gallery-overlay span")

      // Create simple modal
      const modal = document.createElement("div")
      modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                cursor: pointer;
            `

      const modalImg = document.createElement("img")
      modalImg.src = img.src
      modalImg.alt = img.alt
      modalImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                border-radius: 10px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            `

      modal.appendChild(modalImg)
      document.body.appendChild(modal)

      // Close modal on click
      modal.addEventListener("click", () => {
        document.body.removeChild(modal)
      })
    })
  })
})

// Add parallax effect to hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const heroIllustration = document.querySelector(".hero-illustration")

  if (heroIllustration) {
    heroIllustration.style.transform = `translateY(${scrolled * 0.3}px)`
  }
})

// Pricing card interactions
document.addEventListener("DOMContentLoaded", () => {
  const pricingBtns = document.querySelectorAll(".pricing-btn")

  pricingBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const cardTitle = this.closest(".pricing-card").querySelector("h3").textContent
      alert(`Thank you for your interest in our ${cardTitle}! Please contact us to complete enrollment.`)
    })
  })
})
