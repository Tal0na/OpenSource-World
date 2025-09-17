const cardsContainer = document.getElementById("cards");

// Função para carregar o JSON externamente
async function loadApps() {
  const response = await fetch("/data/play.json"); // ou "data/play.json"
  const apps = await response.json();
  return apps;
}

// Renderiza lista de downloads
function renderDownloads(downloads) {
  return Object.entries(downloads)
    .map(([platform, url]) => `<li><a href="${url}" target="_blank">${platform}</a></li>`)
    .join("");
}

// Renderiza os cards
function renderApps(apps) {
  cardsContainer.innerHTML = "";
  apps.forEach(app => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <h2>${app.name}</h2>
      <p>${app.description}</p>
      <p>⭐ ${app.stars.toLocaleString()} estrelas no GitHub</p>
      <p><a href="${app.github}" target="_blank">Ver no GitHub</a></p>
      <h4>Downloads:</h4>
      <ul>${renderDownloads(app.downloads)}</ul>
      <p><small>Plataformas: ${app.platforms.join(", ")}</small></p>
    `;
    cardsContainer.appendChild(card);
  });
}

// Inicializa
async function init() {
  const apps = await loadApps();
  renderApps(apps);
}

init();
