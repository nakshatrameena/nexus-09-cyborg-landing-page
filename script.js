/* =========================================
   NEXUS-09 INTERACTIONS
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  const initializeBtn = document.getElementById("initializeBtn");
  const modal = document.getElementById("modal");
  const modalClose = document.getElementById("modalClose");
  const closeSystem = document.getElementById("closeSystem");

  /* =========================================
     MOBILE MENU
     ========================================= */

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });

  /* =========================================
     MODAL
     ========================================= */

  function openModal() {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  initializeBtn.addEventListener("click", openModal);
  modalClose.addEventListener("click", closeModal);
  closeSystem.addEventListener("click", closeModal);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });

  /* =========================================
     LIVE SYSTEM DATA
     ========================================= */

  const responseValue = document.querySelector(
    ".hero-stats div:nth-child(2) strong"
  );

  const syncValue = document.querySelector(
    ".hero-stats div:nth-child(1) strong"
  );

  function updateSystemStats() {

    if (!responseValue || !syncValue) return;

    const response = (3 + Math.random() * 3).toFixed(1);

    const sync = (99.90 + Math.random() * 0.09).toFixed(2);

    responseValue.textContent = `${response}ms`;
    syncValue.textContent = `${sync}%`;
  }

  setInterval(updateSystemStats, 3000);

  /* =========================================
     FEATURE CARD GLOW
     ========================================= */

  document.querySelectorAll(".feature-card").forEach((card) => {

    card.addEventListener("mousemove", (event) => {

      const rect = card.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      card.style.background = `
        radial-gradient(
          300px circle at ${x}px ${y}px,
          rgba(0, 246, 255, 0.08),
          rgba(13, 18, 20, 0.8) 45%
        )
      `;
    });

    card.addEventListener("mouseleave", () => {
      card.style.background = "";
    });

  });

  /* =========================================
     CYBORG PARALLAX
     ========================================= */

  const cyborg = document.querySelector(".cyborg-head");

  if (cyborg && window.innerWidth > 720) {

    document.addEventListener("mousemove", (event) => {

      const x = (event.clientX / window.innerWidth - 0.5);
      const y = (event.clientY / window.innerHeight - 0.5);

      cyborg.style.transform = `
        translate(${x * 12}px, ${y * 10}px)
      `;
    });

  }

  /* =========================================
     INTERSECTION OBSERVER
     ========================================= */

  const observer = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";

        }

      });

    },
    {
      threshold: 0.12
    }
  );

  document
    .querySelectorAll(".feature-card, .system-row, .interface-content")
    .forEach((element) => {

      element.style.opacity = "0";
      element.style.transform = "translateY(20px)";
      element.style.transition = "opacity 0.7s ease, transform 0.7s ease";

      observer.observe(element);

    });

});
