
const root = document.documentElement;
const themeToggle = document.querySelector("#themeToggle");
const themeIcon = document.querySelector("#themeIcon");
const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");

// Dark by default. Restore the user's saved preference when available.
function getSavedTheme() {
  try {
    const saved = localStorage.getItem("portfolio-theme");
    return saved === "light" || saved === "dark" ? saved : "dark";
  } catch {
    return "dark";
  }
}

function applyTheme(theme) {
  const isLight = theme === "light";

  root.dataset.theme = isLight ? "light" : "dark";

  if (themeIcon) {
    themeIcon.textContent = isLight ? "☾" : "☼";
  }

  if (themeToggle) {
    const label = isLight ? "Switch to dark mode" : "Switch to light mode";
    themeToggle.setAttribute("aria-label", label);
    themeToggle.setAttribute("title", label);
  }

  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) {
    themeColor.content = isLight ? "#f4f6f0" : "#0a0f0d";
  }
}

applyTheme(getSavedTheme());

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);

    try {
      localStorage.setItem("portfolio-theme", nextTheme);
    } catch {
      // Theme still works for this page view if storage is unavailable.
    }
  });
}

// Mobile navigation
function closeMenu() {
  if (!menuToggle || !navLinks) return;

  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navLinks.classList.contains("open")) {
      closeMenu();
      menuToggle.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 650) closeMenu();
  });
}

// Current year
const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

// Prevent the example LinkedIn link from jumping to the top.
const linkedinLink = document.querySelector("#linkedinLink");
if (linkedinLink) {
  linkedinLink.addEventListener("click", (event) => {
    if (linkedinLink.getAttribute("href") === "#") {
      event.preventDefault();
    }
  });
}
