(() => {
  "use strict";

  const filters = document.querySelector("[data-recipes-filters]");
  const cards = [...document.querySelectorAll("[data-recipe-card]")];
  if (!filters || !cards.length) return;

  const search = filters.querySelector("[data-recipe-search]");
  const groups = [...filters.querySelectorAll("[data-recipe-group]")];
  const eggless = filters.querySelector("[data-recipe-eggless]");
  const count = filters.querySelector("[data-recipe-count]");
  const clear = filters.querySelector("[data-recipe-clear]");
  const empty = document.querySelector("[data-recipe-empty]");
  const sections = [...document.querySelectorAll(".recipes-section")];
  const subgroups = [...document.querySelectorAll("[data-recipe-subgroup]")];
  if (!search || !groups.length || !eggless || !count || !clear || !empty) return;

  let selectedGroup = "";

  const update = () => {
    const terms = search.value.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    let visible = 0;

    cards.forEach((card) => {
      const matchesSearch = terms.every((term) => card.dataset.search.includes(term));
      const matchesType = !selectedGroup || card.dataset.group === selectedGroup;
      const matchesEggless = !eggless.checked || card.dataset.eggless === "true";
      const show = matchesSearch && matchesType && matchesEggless;
      card.hidden = !show;
      if (show) visible += 1;
    });

    subgroups.forEach((subgroup) => {
      const subgroupVisible = subgroup.querySelectorAll("[data-recipe-card]:not([hidden])").length;
      subgroup.hidden = subgroupVisible === 0;
      const subgroupCount = subgroup.querySelector("[data-recipe-subgroup-count]");
      if (subgroupCount) {
        subgroupCount.textContent = subgroupVisible + " " + (subgroupVisible === 1 ? "recipe" : "recipes");
      }
    });

    sections.forEach((section) => {
      const sectionVisible = section.querySelectorAll("[data-recipe-card]:not([hidden])").length;
      section.hidden = sectionVisible === 0;
      const sectionCount = section.querySelector("[data-recipe-section-count]");
      const change = section.querySelector("[data-recipe-change]");
      if (sectionCount) {
        sectionCount.textContent = sectionVisible + " " + (sectionVisible === 1 ? "recipe" : "recipes");
      }
      if (change) change.hidden = !selectedGroup;
    });

    count.textContent = visible + " " + (visible === 1 ? "recipe" : "recipes") + " shown";
    clear.hidden = !search.value && !selectedGroup && !eggless.checked;
    empty.hidden = visible !== 0;
    groups.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.recipeGroup === selectedGroup));
    });
  };

  search.addEventListener("input", update);
  groups.forEach((button) => {
    button.addEventListener("click", () => {
      selectedGroup = button.dataset.recipeGroup;
      update();
      const target = selectedGroup ? document.getElementById(selectedGroup) : sections[0];
      const destination = target && !target.hidden ? target : empty;
      destination.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    });
  });
  eggless.addEventListener("change", update);
  clear.addEventListener("click", () => {
    search.value = "";
    selectedGroup = "";
    eggless.checked = false;
    update();
    search.focus();
  });

  filters.hidden = false;
  update();
})();
