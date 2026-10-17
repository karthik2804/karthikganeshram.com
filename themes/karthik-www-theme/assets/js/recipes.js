(() => {
  "use strict";

  const filters = document.querySelector("[data-recipes-filters]");
  const cards = [...document.querySelectorAll("[data-recipe-card]")];
  if (!filters || !cards.length) return;

  const search = filters.querySelector("[data-recipe-search]");
  const category = filters.querySelector("[data-recipe-category]");
  const eggless = filters.querySelector("[data-recipe-eggless]");
  const count = filters.querySelector("[data-recipe-count]");
  const clear = filters.querySelector("[data-recipe-clear]");
  const empty = document.querySelector("[data-recipe-empty]");
  const sections = [...document.querySelectorAll(".recipes-section")];
  if (!search || !category || !eggless || !count || !clear || !empty) return;

  const update = () => {
    const terms = search.value.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    let visible = 0;

    cards.forEach((card) => {
      const matchesSearch = terms.every((term) => card.dataset.search.includes(term));
      const matchesCategory = !category.value || card.dataset.category === category.value;
      const matchesEggless = !eggless.checked || card.dataset.eggless === "true";
      const show = matchesSearch && matchesCategory && matchesEggless;
      card.hidden = !show;
      if (show) visible += 1;
    });

    sections.forEach((section) => {
      const sectionVisible = section.querySelectorAll("[data-recipe-card]:not([hidden])").length;
      section.hidden = sectionVisible === 0;
      const sectionCount = section.querySelector("[data-recipe-section-count]");
      if (sectionCount) {
        sectionCount.textContent = sectionVisible + " " + (sectionVisible === 1 ? "recipe" : "recipes");
      }
    });

    count.textContent = visible + " " + (visible === 1 ? "recipe" : "recipes") + " shown";
    clear.hidden = !search.value && !category.value && !eggless.checked;
    empty.hidden = visible !== 0;
  };

  search.addEventListener("input", update);
  category.addEventListener("change", update);
  eggless.addEventListener("change", update);
  clear.addEventListener("click", () => {
    search.value = "";
    category.value = "";
    eggless.checked = false;
    update();
    search.focus();
  });

  filters.hidden = false;
  update();
})();
