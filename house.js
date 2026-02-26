const params = new URLSearchParams(window.location.search);
const projectId = params.get('id');
const project = projects.find((item) => item.id === projectId) || projects[0];

document.title = `${project.name} — DomCraft`;
document.getElementById('houseTitle').textContent = project.name;

const page = document.getElementById('housePage');
const currentYearRate = 12;

function relatedProjects() {
  return projects
    .filter((item) => item.id !== project.id && item.material === project.material)
    .slice(0, 2)
    .map(
      (item) => `
      <a class="related-card" href="house.html?id=${item.id}">
        <img src="${item.heroImage}" alt="${item.name}" loading="lazy" />
        <div>
          <h4>${item.name}</h4>
          <p>${item.area} м² · от ${formatPrice(item.priceFrom)}</p>
        </div>
      </a>
    `
    )
    .join('');
}

page.innerHTML = `
  <section class="house-hero card">
    <div>
      <img id="mainHouseImage" src="${project.heroImage}" alt="${project.name}" />
      <div class="gallery-strip">
        ${project.gallery
          .map(
            (image, index) =>
              `<button class="gallery-thumb ${index === 0 ? 'active' : ''}" data-image="${image}" type="button"><img src="${image}" alt="Вид ${project.name} ${index + 1}" /></button>`
          )
          .join('')}
      </div>
    </div>
    <div>
      <p class="eyebrow">${project.style}</p>
      <h2>${project.name}</h2>
      <p>${project.description}</p>
      <ul class="meta">
        <li><strong>Площадь:</strong> ${project.area} м²</li>
        <li><strong>Спален:</strong> ${project.bedrooms}</li>
        <li><strong>Санузлов:</strong> ${project.bathrooms}</li>
        <li><strong>Этажей:</strong> ${project.floors}</li>
        <li><strong>Материал:</strong> ${project.material}</li>
        <li><strong>Срок:</strong> ${project.buildTimeMonths} мес.</li>
      </ul>
      <div class="features">
        ${project.features.map((feature) => `<span class="chip">${feature}</span>`).join('')}
      </div>
    </div>
  </section>

  <section class="card specs">
    <h3>Технические характеристики</h3>
    <div class="specs-grid">
      <article><h4>Фундамент</h4><p>${project.techSpecs.foundation}</p></article>
      <article><h4>Фасад</h4><p>${project.techSpecs.facade}</p></article>
      <article><h4>Кровля</h4><p>${project.techSpecs.roof}</p></article>
      <article><h4>Остекление</h4><p>${project.techSpecs.glazing}</p></article>
    </div>
  </section>

  <section class="card">
    <div class="section-head"><h3>Варианты комплектации</h3><p>Ставка для примера: ${currentYearRate}% годовых</p></div>
    <div class="packages-grid" id="packagesGrid">
      ${project.packages
        .map(
          (pkg, idx) => `
          <article class="package-card ${idx === 0 ? 'package-card--selected' : ''}" data-package-price="${pkg.price}">
            <h4>${pkg.name}</h4>
            <p class="price">${formatPrice(pkg.price)}</p>
            <ul>
              ${pkg.includes.map((item) => `<li>${item}</li>`).join('')}
            </ul>
            <button class="btn btn--primary package-choose" type="button">Выбрать комплектацию</button>
          </article>
      `
        )
        .join('')}
    </div>
    <div class="mortgage-box">
      <p>Ориентировочный платеж при взносе 30% и сроке 20 лет:</p>
      <h4 id="monthlyPayment"></h4>
    </div>
  </section>

  <section class="card">
    <h3>Похожие проекты</h3>
    <div class="related-grid">${relatedProjects() || '<p class="muted">Похожие проекты скоро появятся.</p>'}</div>
  </section>
`;

function updateGallery() {
  const mainImage = document.getElementById('mainHouseImage');
  page.querySelectorAll('.gallery-thumb').forEach((thumb) => {
    thumb.addEventListener('click', () => {
      page.querySelectorAll('.gallery-thumb').forEach((node) => node.classList.remove('active'));
      thumb.classList.add('active');
      mainImage.src = thumb.dataset.image;
    });
  });
}

function calcPayment(price) {
  const loan = price * 0.7;
  const monthlyRate = currentYearRate / 100 / 12;
  const months = 20 * 12;
  const payment = (loan * monthlyRate) / (1 - (1 + monthlyRate) ** -months);
  return Math.round(payment);
}

function bindPackageSelection() {
  const paymentNode = document.getElementById('monthlyPayment');
  const cards = page.querySelectorAll('.package-card');

  const updateState = (price, card) => {
    cards.forEach((item) => item.classList.remove('package-card--selected'));
    card.classList.add('package-card--selected');
    paymentNode.textContent = `${formatPrice(calcPayment(price))} / месяц`;
  };

  cards.forEach((card) => {
    card.querySelector('.package-choose').addEventListener('click', () => {
      const price = Number(card.dataset.packagePrice);
      updateState(price, card);
    });
  });

  const firstPrice = Number(cards[0]?.dataset.packagePrice || project.priceFrom);
  if (cards[0]) updateState(firstPrice, cards[0]);
}

updateGallery();
bindPackageSelection();
