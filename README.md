# Responsive Header with Mega Menu

The challenge with responsive headers—especially those with mega menus—is that you often have to maintain **two separate versions**: one for small screens (mobile/tablet) and another for wide screens (desktop). This quickly leads to code duplication, harder updates, and inconsistent behavior.

This project solves that problem by providing a **single header implementation** that adapts fluidly to both breakpoints. The mega menu is dynamically repositioned in the DOM depending on screen size, so you only need to manage one set of markup and one set of styles.

---

## Features

* **Single Source of Truth**
  One header structure works across all screen sizes—no duplicate markup.

* **Dynamic Mega Menu Placement**
  On wide screens, the mega menu is parked inside the header. On small screens, it’s repositioned below the trigger button that opened it.

* **Accessible Toggle Buttons**
  Menu buttons include ARIA attributes (`aria-controls`, `aria-expanded`) for better screen reader support.

* **Icon State Syncing**
  Buttons toggle between up/down arrow states, and the hamburger (`fa-bars`) toggles to close (`fa-x`) consistently.

* **Configurable Breakpoint**
  Switch between mobile/desktop behavior at a single configurable breakpoint (`MENU_BREAKPOINT`).

* **Resilient Resizing**
  On window resize, the mega menu repositions without breaking the open/close state.

---

## Configuration

In `header.js`, update the breakpoint constant if needed:

```js
const MENU_BREAKPOINT = 1024; // px
```

This defines the screen width at which the mega menu switches between desktop and mobile positioning.

---

## How It Works

1. **Initial Setup**

   * All menu panels are hidden by default.
   * Toggle buttons (`.nav-btn-drop`) control which panel to show.

2. **Opening a Menu**

   * Hides all other panels.
   * Opens the clicked panel.
   * Repositions the mega menu either inside the header (desktop) or below the clicked button (mobile).

3. **Closing a Menu**

   * Clicking the same button again hides its panel and resets states.

4. **Resizing the Window**

   * The currently open panel (if any) is repositioned without closing.

---

## Development Notes

* **DOM References**
  All key elements are stored in an `els` object, making it easier to maintain and debug.
  Example: `els.navToggle`, `els.mainNav`.

* **Accessibility**
  Each nav button is annotated with `aria-controls` and `aria-expanded`. Icons visually mirror these states.

* **Performance**
  Resize handling is debounced with `requestAnimationFrame` to avoid layout thrashing.

---

## Benefits

* **No duplicate markup**: One header structure works everywhere.
* **Easy to update**: Change content in one place, and it reflects on both mobile and desktop.
* **Scalable**: Add more menus by just adding a new button with `data-toggle-for="menuId"` and a corresponding panel.
* **Lightweight**: Pure vanilla JavaScript, no dependencies.

---

## Future Enhancements

* Animated transitions when opening/closing menus.
* Auto-close menus on outside click or focus loss.
