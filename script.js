// Ensure DOM is ready, then run interactions and intro animation
document.addEventListener("DOMContentLoaded", () => {
  // Mark page as loaded for intro animation
  document.body.classList.add("page-loaded");

  // Mobile nav toggle
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });

    navLinks.addEventListener("click", (event) => {
      if (event.target.tagName.toLowerCase() === "a") {
        navLinks.classList.remove("show");
      }
    });
  }

  // Theme toggle (simple dark toggle – you can extend this)
  const themeToggle = document.querySelector(".theme-toggle");
  const body = document.body;

  const THEME_KEY = "shibinks-theme";

  function applyStoredTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "light") {
      body.classList.add("light");
    }
  }

  applyStoredTheme();

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      body.classList.toggle("light");
      const isLight = body.classList.contains("light");
      localStorage.setItem(THEME_KEY, isLight ? "light" : "dark");
    });
  }

  // Simple smooth scroll for internal links (for older browsers)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    });
  });

  // Dynamic year in footer
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear().toString();
  }

  // Contact form submission interception
  const contactForm = document.getElementById("contactForm");
  const confirmationPopup = document.getElementById("confirmationPopup");

  if (contactForm && confirmationPopup) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault(); // Prevent default redirection behavior

      const formData = new FormData(contactForm);
      const actionUrl = contactForm.getAttribute("action");

      // We use no-cors to hide CORS errors when submitting to google forms via JS
      fetch(actionUrl, {
        method: "POST",
        mode: "no-cors",
        body: formData
      })
        .then(() => {
          // Show the popup overlay
          confirmationPopup.style.display = "flex";
          // Reset the form
          contactForm.reset();
        })
        .catch(error => {
          console.error("Form submission error:", error);
          alert("There was an error submitting your form. Please try again.");
        });
    });
  }
});

