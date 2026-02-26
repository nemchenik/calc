const catalogEl = document.getElementById('catalog');
const resultsCountEl = document.getElementById('resultsCount');

function projectCard(project) {
  return `
    <article class="project-card">
      <img src="${project.image}" alt="${project.name}" loading="lazy" />
      <div class="project-card__content">
        <div class="project-card__top">
          <h3>${project.name}</h3>
          <span class="chip">от ${formatPrice(project.priceFrom)}</span>
        </div>
        <p>${project.description}</p>
        <ul class="meta">
          <li>${project.area} м²</li>
          <li>${project.bedrooms} спальни</li>
          <li>${project.floors} этаж${project.floors === 1 ? '' : 'а'}</li>
          <li>${project.material}</li>
        </ul>
        <a class="btn btn--primary" href="house.html?id=${project.id}">Смотреть проект</a>
      </div>
    </article>
  `;
}

function applyFilters() {
  const minArea = Number(document.getElementById('minArea').value) || 0;
  const maxArea = Number(document.getElementById('maxArea').value) || Infinity;
  const bedrooms = Number(document.getElementById('bedrooms').value) || 0;
  const floors = Number(document.getElementById('floors').value) || 0;
  const maxPrice = Number(document.getElementById('maxPrice').value) || Infinity;
  const material = document.getElementById('material').value;

  const filtered = projects.filter((project) => {
    return (
      project.area >= minArea &&
      project.area <= maxArea &&
      project.bedrooms >= bedrooms &&
      (!floors || project.floors === floors) &&
      project.priceFrom <= maxPrice &&
      (!material || project.material === material)
    );
  });

  resultsCountEl.textContent = `Найдено проектов: ${filtered.length}`;
  catalogEl.innerHTML = filtered.map(projectCard).join('');

  if (filtered.length === 0) {
    catalogEl.innerHTML =
      '<div class="empty">По заданным параметрам ничего не найдено. Попробуйте изменить фильтр.</div>';
  }
}

document.getElementById('applyFilters').addEventListener('click', applyFilters);
document.getElementById('resetFilters').addEventListener('click', () => {
  document.getElementById('filtersForm').reset();
  applyFilters();
});

applyFilters();
