const catalogEl = document.getElementById('catalog');
const resultsCountEl = document.getElementById('resultsCount');
const quickFiltersEl = document.getElementById('quickFilters');

const quickFilterPresets = [
  { label: 'До 6 млн', query: { maxPrice: 6000000 } },
  { label: 'С гаражом', query: { garage: true } },
  { label: '1 этаж', query: { floors: 1 } },
  { label: 'Премиум класс', query: { minPrice: 10000000 } }
];

function fillSelectOptions() {
  const material = document.getElementById('material');
  const style = document.getElementById('style');

  filterOptions.materials.forEach((item) => {
    material.insertAdjacentHTML('beforeend', `<option value="${item}">${item}</option>`);
  });

  filterOptions.styles.forEach((item) => {
    style.insertAdjacentHTML('beforeend', `<option value="${item}">${item}</option>`);
  });
}

function projectCard(project) {
  return `
    <article class="project-card">
      <img src="${project.heroImage}" alt="${project.name}" loading="lazy" />
      <div class="project-card__content">
        <div class="project-card__top">
          <h3>${project.name}</h3>
          <span class="chip">от ${formatPrice(project.priceFrom)}</span>
        </div>
        <p>${project.description}</p>
        <ul class="meta">
          <li>${project.area} м²</li>
          <li>${project.bedrooms} спальни</li>
          <li>${project.bathrooms} санузла</li>
          <li>${project.floors} этаж${project.floors === 1 ? '' : 'а'}</li>
          <li>${project.material}</li>
          <li>Класс ${project.energyClass}</li>
        </ul>
        <div class="project-card__actions">
          <a class="btn btn--primary" href="house.html?id=${project.id}">Смотреть проект</a>
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

  return projects.filter((project) => {
    return (
      project.area >= minArea &&
      project.area <= maxArea &&
      project.bedrooms >= bedrooms &&
      (!floors || project.floors === floors) &&
      project.priceFrom <= maxPrice &&
      (!material || project.material === material) &&
      (!style || project.style === style)
    );
  });
}

function sortProjects(items) {
  const sortBy = document.getElementById('sortBy').value;

  const map = {
    popular: () => 0,
    priceAsc: (a, b) => a.priceFrom - b.priceFrom,
    priceDesc: (a, b) => b.priceFrom - a.priceFrom,
    areaAsc: (a, b) => a.area - b.area,
    areaDesc: (a, b) => b.area - a.area
  };

  const sorter = map[sortBy] || map.popular;
  return [...items].sort(sorter);
}

function applyFilters() {
  const filtered = sortProjects(getFilteredProjects());
  resultsCountEl.textContent = `Найдено проектов: ${filtered.length}`;
  catalogEl.innerHTML = filtered.map(projectCard).join('');

  if (filtered.length === 0) {
    catalogEl.innerHTML =
      '<div class="empty">По заданным параметрам ничего не найдено. Попробуйте изменить фильтр.</div>';
  }
}

function renderQuickFilters() {
  quickFiltersEl.innerHTML = quickFilterPresets
    .map((preset, index) => `<button class="chip chip--button" data-preset-index="${index}">${preset.label}</button>`)
    .join('');

  quickFiltersEl.addEventListener('click', (event) => {
    const button = event.target.closest('[data-preset-index]');
    if (!button) return;

    const preset = quickFilterPresets[Number(button.dataset.presetIndex)];

    if (preset.query.maxPrice) {
      document.getElementById('maxPrice').value = String(preset.query.maxPrice);
    }
    if (preset.query.floors) {
      document.getElementById('floors').value = String(preset.query.floors);
    }

    if (preset.query.minPrice) {
      document.getElementById('maxPrice').value = '';
      document.getElementById('sortBy').value = 'priceDesc';
    }

    if (preset.query.garage) {
      const withGarage = projects.filter((project) => project.garage);
      resultsCountEl.textContent = `Найдено проектов: ${withGarage.length}`;
      catalogEl.innerHTML = sortProjects(withGarage).map(projectCard).join('');
      return;
    }

    applyFilters();
  });
}

function bindConsultForm() {
  const form = document.getElementById('consultForm');
  const status = document.getElementById('consultStatus');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const payload = {
      name: document.getElementById('clientName').value.trim(),
      phone: document.getElementById('clientPhone').value.trim(),
      createdAt: new Date().toISOString()
    };

    localStorage.setItem('domcraft:last-consultation', JSON.stringify(payload));
    status.textContent = 'Спасибо! Заявка отправлена. Менеджер свяжется с вами в ближайшее время.';
    form.reset();
  });
}

document.getElementById('applyFilters').addEventListener('click', applyFilters);
document.getElementById('resetFilters').addEventListener('click', () => {
  document.getElementById('filtersForm').reset();
  applyFilters();
});

fillSelectOptions();
renderQuickFilters();
bindConsultForm();
applyFilters();
