const dayTabs = document.querySelectorAll('.day-tab');
const dayPanels = document.querySelectorAll('.day-panel');

dayTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const day = tab.dataset.day;

    dayTabs.forEach((item) => {
      const isActive = item === tab;
      item.classList.toggle('is-active', isActive);
      item.setAttribute('aria-selected', String(isActive));
    });

    dayPanels.forEach((panel) => {
      const isActive = panel.dataset.panel === day;
      panel.classList.toggle('is-active', isActive);
      panel.hidden = !isActive;
    });
  });
});

const variantButtons = document.querySelectorAll('.switcher__button');
const variantPanels = document.querySelectorAll('[data-variant-panel]');

variantButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const variant = button.dataset.variant;

    variantButtons.forEach((item) => item.classList.toggle('is-active', item === button));
    variantPanels.forEach((panel) => {
      const isActive = panel.dataset.variantPanel === variant;
      panel.classList.toggle('is-active', isActive);
      panel.hidden = !isActive;
    });
  });
});

document.querySelectorAll('[data-copy]').forEach((button) => {
  button.addEventListener('click', async () => {
    const target = document.querySelector(button.dataset.copy);
    if (!target) return;

    try {
      await navigator.clipboard.writeText(target.textContent.trim());
      const original = button.textContent;
      button.textContent = 'Zkopírováno';
      setTimeout(() => {
        button.textContent = original;
      }, 1600);
    } catch {
      button.textContent = 'Označ text';
    }
  });
});
