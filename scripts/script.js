const header = document.querySelector('#header');
const navToggle = document.querySelector('#navToggle');
const mainNav = document.querySelector('#mainNav');
const navBtns = document.querySelectorAll('.nav-btn-drop');
const megaMenu = document.querySelector('#megaMenu');
const menuItems = document.querySelectorAll('#megaMenu .menu');

// States
let currentMenu = '';

// Globals
const menuBreakpoint = 1024;

navToggle.addEventListener('click', () => {
  mainNav.classList.toggle('hidden');
  navToggle.classList.toggle('fa-bars');
  navToggle.classList.toggle('fa-x');
});

navBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const menuId = btn.dataset.toggleFor;
    const iconEl = btn.querySelector('.fa');
    
    menuItems.forEach(item => {
      item.classList.add('hidden');
    });
    toggleMenuBtnIcon();
    
    if (currentMenu === menuId) {
      // megaMenu.classList.remove('lg:block');
      megaMenu.classList.add('hidden');
      currentMenu = '';
      iconEl.classList.remove('fa-angle-up');
      iconEl.classList.add('fa-angle-down');
    } else {
      moveMegaMenuBOS(btn)
      // megaMenu.classList.add('lg:block');
      megaMenu.classList.remove('hidden');
      currentMenu = menuId;
      iconEl.classList.remove('fa-angle-down');
      iconEl.classList.add('fa-angle-up');
      document.querySelector(`#${menuId}`).classList.remove('hidden');
    }
  })
})

window.addEventListener('resize', () => {
  if (currentMenu) {
    const btn = document.querySelector(`[data-toggle-for=${currentMenu}]`);
    moveMegaMenuBOS(btn);
  }
});

// Functions
function toggleMenuBtnIcon() {
  navBtns.forEach(btn => {
    const iconEl = btn.querySelector('.fa');
    iconEl.classList.remove('fa-angle-up');
    iconEl.classList.add('fa-angle-down');
  });
}
// move mega menu based on screen size
function moveMegaMenuBOS(btn) {
  const screenSize = window.innerWidth;

  if (screenSize >= menuBreakpoint) {
      header.appendChild(megaMenu);
    } else {
      btn.insertAdjacentElement('afterend', megaMenu);
      mainNav.classList.remove('hidden');
    }
}