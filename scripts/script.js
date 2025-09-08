const navToggle = document.querySelector('#navToggle');
const mainNav = document.querySelector('#mainNav');
const navBtns = document.querySelectorAll('.nav-btn-drop');
const megaMenu = document.querySelector('#megaMenu');
const mainMenu = document.querySelector('#mainMenu');
const menuItems = document.querySelectorAll('#megaMenu .menu');

// Globals
const menuBreakpoint = 1024;

// States
let currentMenu = '';

navToggle.addEventListener('click', () => {
  console.log(currentMenu);
  
  if (currentMenu) {
    currentMenu = '';
    closeAllMenuBtnIcon();
    megaMenu.classList.add('hidden');
  }
  mainNav.classList.toggle('hidden');
  navToggle.classList.toggle('fa-bars');
  navToggle.classList.toggle('fa-x');
});

navBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const menuId = btn.dataset.toggleFor;
    
    menuItems.forEach(item => {
      item.classList.add('hidden');
    });
    closeAllMenuBtnIcon();
    
    if (currentMenu === menuId) {
      megaMenu.classList.add('hidden');
      toggleMenuBtnIcon(btn, 'close');
      mainMenu.classList.add('rounded-xl');
      currentMenu = '';
    } else {
      moveMegaMenuBOS(btn);
      mainNav.classList.remove('hidden');
      megaMenu.classList.remove('hidden');
      toggleMenuBtnIcon(btn, 'open')
      mainMenu.classList.remove('rounded-xl');
      navToggle.classList.remove('fa-bars');
      navToggle.classList.add('fa-x');
      document.querySelector(`#${menuId}`).classList.remove('hidden');
      currentMenu = menuId;
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
function closeAllMenuBtnIcon() {
  navBtns.forEach(btn => {
    toggleMenuBtnIcon(btn, 'close');
  });
}
function toggleMenuBtnIcon(btn, action) {
  const iconEl = btn.querySelector('.fa');
  if (action === 'close') {
    iconEl.classList.remove('fa-angle-up');
    iconEl.classList.add('fa-angle-down');
  } else {
    iconEl.classList.add('fa-angle-up');
    iconEl.classList.remove('fa-angle-down');
  }
}
// move mega menu based on screen size
function moveMegaMenuBOS(btn) {
  const screenSize = window.innerWidth;

  if (screenSize >= menuBreakpoint) {
      header.appendChild(megaMenu);
    } else {
      btn.insertAdjacentElement('afterend', megaMenu);
    }
}