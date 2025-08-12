let allApps = [];

fetch('json/scripts.json')
  .then(res => res.json())
  .then(apps => {
    allApps = apps; 
    displayApps(apps);
  })
  .catch(err => {
    console.error("Failed to load apps.json:", err);
    document.getElementById("app-list").innerHTML = "<p>Failed to load app list.</p>";
  });

function displayApps(apps) {
  const container = document.getElementById('app-list');
  container.innerHTML = ''; 

  apps.forEach(app => {
    const card = document.createElement('div');
    card.className = 'app-box app-box2';
    card.innerHTML = `
      <img class="people-pic" src="${app.icon}" alt="${app.name}">
      <div class="people-info">
        <h2>${app.name}</h2>
        <p><strong>Bundle ID:</strong> ${app.bundle_id}</p>
        <p><strong>Version:</strong> ${app.version}</p>
        <a class="download-button" href="${app.download}">Download IPA</a>
      </div>
    `;
    container.appendChild(card);
  });
}

document.getElementById('search-input').addEventListener('input', function () {
  const query = this.value.toLowerCase();
  const filtered = allApps.filter(app => app.name.toLowerCase().includes(query));
  displayApps(filtered);
});
