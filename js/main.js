const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function setMenu(open) {
  document.body.classList.toggle("nav-open", open);
  nav.classList.toggle("is-open", open);
  menuToggle.classList.toggle("is-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
}

menuToggle.addEventListener("click", () => {
  setMenu(!nav.classList.contains("is-open"));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenu(false);
  }
});

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 8);
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const delay = entry.target.dataset.delay;
      if (delay) {
        entry.target.style.setProperty("--delay", `${delay}ms`);
      }
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const activeLink = navLinks.find((link) => link.getAttribute("href") === `#${entry.target.id}`);
      navLinks.forEach((link) => link.classList.toggle("is-active", link === activeLink));
    });
  },
  {
    rootMargin: "-45% 0px -48% 0px",
    threshold: 0.01
  }
);

sections.forEach((section) => {
  sectionObserver.observe(section);
});

document.querySelectorAll("[data-map-frame]").forEach((frame) => {
  frame.addEventListener("load", () => {
    frame.classList.add("is-loaded");
  });
});
