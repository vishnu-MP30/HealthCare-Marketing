/**
 * LifeCare Healthcare Illustration — Controller Script
 * Fixed, hand-written SVG vector art (no random or JS-generated shapes)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Menu pill hover / focus accessibility
  const menuPill = document.querySelector('.menu-pill');
  if (menuPill) {
    menuPill.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        menuPill.click();
      }
    });
  }
});
