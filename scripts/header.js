"use strict";

/*  Cache DOM  */
const els = {
  navToggle: document.querySelector("#navToggle"),
  mainNav:   document.querySelector("#mainNav"),
  navBtns:   Array.from(document.querySelectorAll(".nav-btn-drop")),
  megaMenu:  document.querySelector("#megaMenu"),
  mainMenu:  document.querySelector("#mainMenu"),
  // Where to park the mega menu on desktop; fallback prevents the old `header` ref error
  desktopPark: document.querySelector("#headerContainer") || document.body,
};
const menus = new Map(
  Array.from(document.querySelectorAll("#megaMenu .menuPanel")).map(m => [m.id, m])
);

/*  Config */
const MENU_BREAKPOINT = 1024;
let currentMenuId = "";

/*  Utilities  */
const show = el => el && el.classList.remove("hidden");
const hide = el => el && el.classList.add("hidden");
const isWide = () => window.innerWidth >= MENU_BREAKPOINT;
const menuBtnFor = id => document.querySelector(`[data-toggle-for="${id}"]`);
const setIcon = (btn, open) => {
  const icon = btn.querySelector(".fa");
  if (!icon) return;
  icon.classList.toggle("fa-angle-up",   open);
  icon.classList.toggle("fa-angle-down", !open);
};
const setExpanded = (btn, expanded) => {
  btn.setAttribute("aria-expanded", String(expanded));
};

/* Close icons for all menu buttons */
const closeAllBtnIcons = () => els.navBtns.forEach(btn => setIcon(btn, false));

/* Move mega menu depending on screen size */
const moveMegaMenu = btn => {
  if (isWide()) {
    els.desktopPark.appendChild(els.megaMenu);
  } else {
    btn.insertAdjacentElement("afterend", els.megaMenu);
  }
};

/* Hide all panels */
const hideAllPanels = () => menus.forEach(panel => hide(panel));

/*  Handlers  */
function toggleNav() {
  // If a submenu is open, close it when toggling the main nav
  if (currentMenuId) {
    currentMenuId = "";
    closeAllBtnIcons();
    hide(els.megaMenu);
    els.navBtns.forEach(btn => setExpanded(btn, false));
    els.mainMenu.classList.add("rounded-xl");
  }
  els.mainNav.classList.toggle("hidden");
  els.navToggle.classList.toggle("fa-bars");
  els.navToggle.classList.toggle("fa-x");
}

function onNavBtnClick(btn) {
  const menuId = btn.dataset.toggleFor;
  if (!menuId || !menus.has(menuId)) return;

  hideAllPanels();
  closeAllBtnIcons();

  const isSame = currentMenuId === menuId;

  if (isSame) {
    hide(els.megaMenu);
    setIcon(btn, false);
    setExpanded(btn, false);
    els.mainMenu.classList.add("rounded-xl");
    if (isWide()) toggleNav();
    currentMenuId = "";
  } else {
    moveMegaMenu(btn);
    // els.mainNav.classList.remove("hidden");
    show(els.mainNav);
    show(els.megaMenu);
    setIcon(btn, true);
    setExpanded(btn, true);
    els.mainMenu.classList.remove("rounded-xl");
    els.navToggle.classList.remove("fa-bars");
    els.navToggle.classList.add("fa-x");
    show(menus.get(menuId));
    currentMenuId = menuId;
  }
}

/*  Wire up  */
if (els.navToggle) els.navToggle.addEventListener("click", toggleNav);

els.navBtns.forEach(btn => {
  // a11y wiring
  const panelId = btn.dataset.toggleFor;
  if (panelId) {
    btn.setAttribute("aria-controls", panelId);
    setExpanded(btn, false);
  }
  btn.addEventListener("click", () => onNavBtnClick(btn));
});

/* Resize: reposition mega menu for the active button (rAF debounce) */
let resizeScheduled = false;
window.addEventListener("resize", () => {
  if (!currentMenuId) return;
  if (resizeScheduled) return;
  resizeScheduled = true;
  requestAnimationFrame(() => {
    const btn = menuBtnFor(currentMenuId);
    if (btn) moveMegaMenu(btn);
    resizeScheduled = false;
  });
});
