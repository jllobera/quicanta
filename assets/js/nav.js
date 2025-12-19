document.addEventListener("DOMContentLoaded", function() {
  const navToggle = document.getElementById("nav-toggle");
  const mainNav = document.getElementById("main-nav");

  navToggle.addEventListener("click", function() {
    mainNav.classList.toggle("active");
  });

  // Submenu toggle for mobile
  const submenuToggles = document.querySelectorAll(".submenu-toggle");
  submenuToggles.forEach(function(toggle) {
    toggle.addEventListener("click", function(e) {
      e.preventDefault();
      const parent = toggle.parentElement;
      parent.classList.toggle("active");
    });
  });
});
