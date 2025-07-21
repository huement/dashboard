import "./styles/dashboard.scss";

// Import all Bootstrap JavaScript modules
import { Alert } from "bootstrap";
import { Button } from "bootstrap";
import { Carousel } from "bootstrap";
import { Collapse } from "bootstrap";
import { Dropdown } from "bootstrap";
import { Modal } from "bootstrap";
import { Offcanvas } from "bootstrap";
import { Popover } from "bootstrap";
import { ScrollSpy } from "bootstrap";
import { Tab } from "bootstrap";
import { Toast } from "bootstrap";
import { Tooltip } from "bootstrap";

import "@huement/cosmicwave";

// ======= Sidebar Collapse Logic =======
const sidebar = document.getElementById("sidebar");
const sidebarCollapseBtn = document.getElementById("sidebarCollapseBtn");
const mainContent = document.getElementById("mainContent");
const mobileSidebarToggle = document.getElementById("mobileSidebarToggle");

// Collapse/expand sidebar (desktop)
sidebarCollapseBtn.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
  mainContent.classList.toggle("wide-load");

  // Toggle visibility of desktop and mobile icons
  const desktopIcon = sidebarCollapseBtn.querySelector(".desktop-icon");
  const mobileIcon = sidebarCollapseBtn.querySelector(".mobile-icon");
  if (desktopIcon) desktopIcon.classList.toggle("d-none");
  if (mobileIcon) mobileIcon.classList.toggle("d-none");
});

// Mobile sidebar show/hide (small screen toggle)
mobileSidebarToggle.addEventListener("click", () => {
  sidebar.classList.toggle("show");
  mainContent.classList.toggle("wide-load");

  // Optionally, add a backdrop for mobile
  if (sidebar.classList.contains("show")) {
    document.body.insertAdjacentHTML(
      "beforeend",
      '<div class="sidebar-backdrop" id="sidebarBackdrop" style="position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:1039;background:rgba(0,0,0,0.2);"></div>'
    );
    document.getElementById("sidebarBackdrop").addEventListener("click", () => {
      sidebar.classList.remove("show");
      document.getElementById("sidebarBackdrop").remove();
    });
  } else {
    const backdrop = document.getElementById("sidebarBackdrop");
    if (backdrop) backdrop.remove();
  }
});

// Remove sidebar show on resize (if > lg)
window.addEventListener("resize", () => {
  if (window.innerWidth >= 992) {
    sidebar.classList.remove("show");
    const backdrop = document.getElementById("sidebarBackdrop");
    if (backdrop) backdrop.remove();
  }
});

// ======= Offcanvas Sidebar Logic =======
const offcanvasToggle = document.getElementById("offcanvasToggle");
const offcanvasSidebar = document.getElementById("offcanvasSidebar");
offcanvasToggle.addEventListener("click", () => {
  const bsOffcanvas = new bootstrap.Offcanvas(offcanvasSidebar);
  bsOffcanvas.toggle();
});

// ======= User Dropdown (Bootstrap handles this) =======
// No extra JS needed for dropdown, handled by Bootstrap's data-bs-toggle

// ======= Accessibility: Close sidebar with Esc on mobile =======
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && sidebar.classList.contains("show")) {
    sidebar.classList.remove("show");
    const backdrop = document.getElementById("sidebarBackdrop");
    if (backdrop) backdrop.remove();
  }
});

// Initialize components (example initializations for testing)
document.addEventListener("DOMContentLoaded", () => {
  // Alert: Initialize alerts
  document.querySelectorAll(".alert").forEach((alert) => {
    new Alert(alert);
  });

  // Button: No explicit initialization needed (handled by Bootstrap automatically)

  // Carousel: Initialize carousels
  document.querySelectorAll(".carousel").forEach((carousel) => {
    new Carousel(carousel, { interval: 5000 });
  });

  // Collapse: Initialize collapsible elements (e.g., navbar)
  document.querySelectorAll(".collapse").forEach((collapse) => {
    new Collapse(collapse, { toggle: false });
  });

  // Dropdown: Initialize dropdowns
  document.querySelectorAll(".dropdown-toggle").forEach((dropdown) => {
    new Dropdown(dropdown);
  });

  // Modal: Initialize modals
  document.querySelectorAll(".modal").forEach((modal) => {
    new Modal(modal);
  });

  // Offcanvas: Initialize offcanvas
  document.querySelectorAll(".offcanvas").forEach((offcanvas) => {
    new Offcanvas(offcanvas);
  });

  // Popover: Initialize popovers
  document.querySelectorAll('[data-bs-toggle="popover"]').forEach((popover) => {
    new Popover(popover);
  });

  // ScrollSpy: Initialize scrollspy
  document.querySelectorAll('[data-bs-spy="scroll"]').forEach((scrollspy) => {
    new ScrollSpy(document.body, {
      target: scrollspy.getAttribute("data-bs-target"),
    });
  });

  // Tab: Initialize tabs
  document.querySelectorAll('[data-bs-toggle="tab"]').forEach((tab) => {
    new Tab(tab);
  });

  // Toast: Initialize toasts
  document.querySelectorAll(".toast").forEach((toast) => {
    new Toast(toast);
  });

  // Tooltip: Initialize tooltips
  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((tooltip) => {
    new Tooltip(tooltip);
  });
});

// Example: Add event listeners for navbar toggler (specific to Collapse)
document.addEventListener("DOMContentLoaded", () => {
  const navbarTogglers = document.querySelectorAll(".navbar-toggler");
  navbarTogglers.forEach((toggler) => {
    const target = document.querySelector(toggler.dataset.bsTarget);
    const collapse = new Collapse(target, { toggle: false });
    toggler.addEventListener("click", () => {
      collapse.toggle();
    });
  });
});
