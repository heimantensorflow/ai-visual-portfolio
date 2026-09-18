const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const filterButtons = [...document.querySelectorAll("[data-filter]")];
const archiveItems = [...document.querySelectorAll("[data-category]")];
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxCaption = document.querySelector("[data-lightbox-caption]");
const lightboxTriggers = [...document.querySelectorAll(".lightbox-trigger")];
const toast = document.querySelector("[data-toast-output]");
let currentImage = 0;
let toastTimer;

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 32);
}

function closeMenu() {
  nav.classList.remove("open");
  header.classList.remove("menu-visible");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "打开菜单");
  document.body.classList.remove("menu-open");
}

menuToggle.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!open));
  menuToggle.setAttribute("aria-label", open ? "打开菜单" : "关闭菜单");
  nav.classList.toggle("open", !open);
  header.classList.toggle("menu-visible", !open);
  document.body.classList.toggle("menu-open", !open);
});

nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.setAttribute("aria-selected", String(item === button)));
    archiveItems.forEach((item) => {
      item.hidden = filter !== "all" && item.dataset.category !== filter;
    });
  });
});

function renderLightbox(index) {
  currentImage = (index + lightboxTriggers.length) % lightboxTriggers.length;
  const trigger = lightboxTriggers[currentImage];
  lightboxImage.src = trigger.dataset.image;
  lightboxImage.alt = trigger.dataset.title;
  lightboxCaption.textContent = trigger.dataset.title;
}

lightboxTriggers.forEach((trigger, index) => {
  trigger.addEventListener("click", () => {
    renderLightbox(index);
    lightbox.showModal();
  });
});

document.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());
document.querySelector(".lightbox-nav.previous").addEventListener("click", () => renderLightbox(currentImage - 1));
document.querySelector(".lightbox-nav.next").addEventListener("click", () => renderLightbox(currentImage + 1));

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});

lightbox.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") renderLightbox(currentImage - 1);
  if (event.key === "ArrowRight") renderLightbox(currentImage + 1);
});

document.querySelectorAll("[data-toast]").forEach((button) => {
  button.addEventListener("click", () => {
    window.clearTimeout(toastTimer);
    toast.textContent = button.dataset.toast;
    toast.classList.add("visible");
    toastTimer = window.setTimeout(() => toast.classList.remove("visible"), 2600);
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
document.querySelector("[data-year]").textContent = new Date().getFullYear();
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();
