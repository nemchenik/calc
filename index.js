const storageKeys = {
  favorites: 'domcraft:favorites',
  compare: 'domcraft:compare',
  theme: 'domcraft:theme',
  consultation: 'domcraft:last-consultation'
};

const catalogEl = document.getElementById('catalog');
const resultsCountEl = document.getElementById('resultsCount');
const quickFiltersEl = document.getElementById('quickFilters');
const compareTableEl = document.getElementById('compareTable');

const state = {
  favorites: new Set(JSON.parse(localStorage.getItem(storageKeys.favorites) || '[]')),
  compare: new Set(JSON.parse(localStorage.getItem(storageKeys.compare) || '[]'))
};

const quickFilterPresets = [
  { label: 'До 6 млн', query: { maxPrice: 6000000 } },
  { label: 'С гаражом', query: { garage: true } },
  { label: '1 этаж', query: { floors: 1 } },
  { label: 'Премиум класс', query: { minPrice: 10000000 } }
];

function persistSet(key, set) { localStorage.setItem(key, JSON.stringify([...set])); }

function fillSelectOptions() {
  const material = document.getElementById('material');
  const style = document.getElementById('style');
  filterOptions.materials.forEach((item) => material.insertAdjacentHTML('beforeend', `<option value="${item}">${item}</option>`));
  filterOptions.styles.forEach((item) => style.insertAdjacentHTML('beforeend', `<option value="${item}">${item}</option>`));
}

function projectCard(project) {
  const favorite = state.favorites.has(project.id);
  const inCompare = state.compare.has(project.id);
  return `
    <article class="project-card">
      <img src="${project.heroImage}" alt="${project.name}" loading="lazy" />
      <div class="project-card__content">
        <div class="project-card__top"><h3>${project.name}</h3><span class="chip">от ${formatPrice(project.priceFrom)}</span></div>
        <p>${project.description}</p>
        <ul class="meta"><li>${project.area} м²</li><li>${project.bedrooms} спальни</li><li>${project.bathrooms} санузла</li><li>${project.floors} этаж${project.floors === 1 ? '' : 'а'}</li><li>${project.material}</li><li>Класс ${project.energyClass}</li></ul>
        <div class="project-card__actions">
          <a class="btn btn--primary" href="house.html?id=${project.id}">Смотреть проект</a>
          <button class="btn" data-favorite="${project.id}" type="button">${favorite ? '★ В избранном' : '☆ В избранное'}</button>
          <button class="btn" data-compare="${project.id}" type="button">${inCompare ? 'Убрать из сравнения' : 'Сравнить'}</button>
        </div>
      </div>
    </article>
  `;
}

function getFilteredProjects() {
  const minArea = Number(document.getElementById('minArea').value) || 0;
  const maxArea = Number(document.getElementById('maxArea').value) || Infinity;
  const bedrooms = Number(document.getElementById('bedrooms').value) || 0;
  const floors = Number(document.getElementById('floors').value) || 0;
  const maxPrice = Number(document.getElementById('maxPrice').value) || Infinity;
  const material = document.getElementById('material').value;
  const style = document.getElementById('style').value;
  const search = document.getElementById('searchInput').value.trim().toLowerCase();
  const onlyFavorites = document.getElementById('onlyFavorites').checked;

  return projects.filter((project) => {
    const text = `${project.name} ${project.style} ${project.material}`.toLowerCase();
    return (
      project.area >= minArea && project.area <= maxArea && project.bedrooms >= bedrooms && (!floors || project.floors === floors) &&
      project.priceFrom <= maxPrice && (!material || project.material === material) && (!style || project.style === style) &&
      (!search || text.includes(search)) && (!onlyFavorites || state.favorites.has(project.id))
    );
  });
}

function sortProjects(items) {
  const sortBy = document.getElementById('sortBy').value;
  const map = { popular: () => 0, priceAsc: (a, b) => a.priceFrom - b.priceFrom, priceDesc: (a, b) => b.priceFrom - a.priceFrom, areaAsc: (a, b) => a.area - b.area, areaDesc: (a, b) => b.area - a.area };
  return [...items].sort(map[sortBy] || map.popular);
}

function renderCompare() {
  const list = projects.filter((p) => state.compare.has(p.id)).slice(0, 3);
  if (list.length < 2) {
    compareTableEl.className = 'compare-table muted';
    compareTableEl.textContent = 'Добавьте 2–3 проекта в сравнение.';
    return;
  }

  compareTableEl.className = 'compare-table';
  compareTableEl.innerHTML = `
    <table>
      <thead><tr><th>Параметр</th>${list.map((p) => `<th>${p.name}</th>`).join('')}</tr></thead>
      <tbody>
        <tr><td>Цена от</td>${list.map((p) => `<td>${formatPrice(p.priceFrom)}</td>`).join('')}</tr>
        <tr><td>Площадь</td>${list.map((p) => `<td>${p.area} м²</td>`).join('')}</tr>
        <tr><td>Спальни</td>${list.map((p) => `<td>${p.bedrooms}</td>`).join('')}</tr>
        <tr><td>Этажей</td>${list.map((p) => `<td>${p.floors}</td>`).join('')}</tr>
        <tr><td>Материал</td>${list.map((p) => `<td>${p.material}</td>`).join('')}</tr>
      </tbody>
    </table>`;
}

function applyFilters() {
  const filtered = sortProjects(getFilteredProjects());
  resultsCountEl.textContent = `Найдено проектов: ${filtered.length}`;
  catalogEl.innerHTML = filtered.length ? filtered.map(projectCard).join('') : '<div class="empty">По заданным параметрам ничего не найдено. Попробуйте изменить фильтр.</div>';
}

function renderQuickFilters() {
  quickFiltersEl.innerHTML = quickFilterPresets.map((preset, i) => `<button class="chip chip--button" data-preset-index="${i}">${preset.label}</button>`).join('');
  quickFiltersEl.addEventListener('click', (event) => {
    const button = event.target.closest('[data-preset-index]');
    if (!button) return;
    const preset = quickFilterPresets[Number(button.dataset.presetIndex)];
    if (preset.query.maxPrice) document.getElementById('maxPrice').value = String(preset.query.maxPrice);
    if (preset.query.floors) document.getElementById('floors').value = String(preset.query.floors);
    if (preset.query.minPrice) { document.getElementById('maxPrice').value = ''; document.getElementById('sortBy').value = 'priceDesc'; }
    if (preset.query.garage) {
      const withGarage = sortProjects(projects.filter((project) => project.garage));
      resultsCountEl.textContent = `Найдено проектов: ${withGarage.length}`;
      catalogEl.innerHTML = withGarage.map(projectCard).join('');
      return;
    }
    applyFilters();
  });
}

function bindCatalogActions() {
  catalogEl.addEventListener('click', (event) => {
    const fav = event.target.closest('[data-favorite]');
    const cmp = event.target.closest('[data-compare]');

    if (fav) {
      const id = fav.dataset.favorite;
      state.favorites.has(id) ? state.favorites.delete(id) : state.favorites.add(id);
      persistSet(storageKeys.favorites, state.favorites);
      applyFilters();
    }

    if (cmp) {
      const id = cmp.dataset.compare;
      if (state.compare.has(id)) state.compare.delete(id);
      else if (state.compare.size < 3) state.compare.add(id);
      persistSet(storageKeys.compare, state.compare);
      renderCompare();
      applyFilters();
    }
  });
}

function bindConsultForm() {
  const form = document.getElementById('consultForm');
  const status = document.getElementById('consultStatus');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const payload = { name: document.getElementById('clientName').value.trim(), phone: document.getElementById('clientPhone').value.trim(), createdAt: new Date().toISOString() };
    localStorage.setItem(storageKeys.consultation, JSON.stringify(payload));
    status.textContent = 'Спасибо! Заявка отправлена. Менеджер свяжется с вами в ближайшее время.';
    form.reset();
  });
}

function bindTheme() {
  const toggle = document.getElementById('themeToggle');
  const saved = localStorage.getItem(storageKeys.theme);
  if (saved === 'dark') document.body.classList.add('theme-dark');
  toggle.addEventListener('click', () => {
    document.body.classList.toggle('theme-dark');
    const isDark = document.body.classList.contains('theme-dark');
    localStorage.setItem(storageKeys.theme, isDark ? 'dark' : 'light');
    toggle.textContent = isDark ? 'Светлая тема' : 'Тёмная тема';
  });
}

document.getElementById('applyFilters').addEventListener('click', applyFilters);
document.getElementById('resetFilters').addEventListener('click', () => { document.getElementById('filtersForm').reset(); document.getElementById('searchInput').value = ''; document.getElementById('onlyFavorites').checked = false; applyFilters(); });
document.getElementById('searchInput').addEventListener('input', applyFilters);
document.getElementById('onlyFavorites').addEventListener('change', applyFilters);
document.getElementById('clearCompare').addEventListener('click', () => { state.compare.clear(); persistSet(storageKeys.compare, state.compare); renderCompare(); applyFilters(); });

fillSelectOptions();
renderQuickFilters();
bindCatalogActions();
bindConsultForm();
bindTheme();
renderCompare();
applyFilters();
