(() => {
  "use strict";

  const cards = [...document.querySelectorAll(".trip-card")];
  const buttons = [...document.querySelectorAll(".travel-filter")];
  const count = document.getElementById("trip-count");
  const empty = document.getElementById("travel-empty");
  if (!cards.length || !buttons.length || !count || !empty) return;

  buttons.forEach((button) => button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    buttons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    let visible = 0;
    cards.forEach((card) => {
      const activities = card.dataset.activities.split(" ");
      const show = filter === "all" || activities.includes(filter);
      card.hidden = !show;
      if (show) visible += 1;
    });
    count.textContent = String(visible);
    empty.hidden = visible !== 0;
  }));
})();
