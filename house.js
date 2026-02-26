const params = new URLSearchParams(window.location.search);
const projectId = params.get('id');
const project = projects.find((item) => item.id === projectId) || projects[0];

document.title = `${project.name} — DomCraft`;
document.getElementById('houseTitle').textContent = project.name;

const page = document.getElementById('housePage');
page.innerHTML = `
  <section class="house-hero card">
    <img src="${project.image}" alt="${project.name}" />
    <div>
      <p class="eyebrow">${project.style}</p>
      <h2>${project.name}</h2>
      <p>${project.description}</p>
      <ul class="meta">
        <li><strong>Площадь:</strong> ${project.area} м²</li>
        <li><strong>Спален:</strong> ${project.bedrooms}</li>
        <li><strong>Этажей:</strong> ${project.floors}</li>
        <li><strong>Материал:</strong> ${project.material}</li>
      </ul>
      <div class="features">
        ${project.features.map((feature) => `<span class="chip">${feature}</span>`).join('')}
      </div>
    </div>
  </section>

  <section class="card">
    <h3>Варианты комплектации</h3>
    <div class="packages-grid">
      ${project.packages
        .map(
          (pkg) => `
          <article class="package-card">
            <h4>${pkg.name}</h4>
            <p class="price">${formatPrice(pkg.price)}</p>
            <ul>
              ${pkg.includes.map((item) => `<li>${item}</li>`).join('')}
            </ul>
            <button class="btn btn--primary" type="button">Оставить заявку</button>
          </article>
      `
        )
        .join('')}
    </div>
  </section>
`;
