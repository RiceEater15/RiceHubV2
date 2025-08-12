let allApps = [];

function unescapeFromJSON(str) {
  return str.replace(/\\"/g, '"');
}

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
        <p><strong>Game Name:</strong> ${app.game}</p>
        <p><strong>Script Tags:</strong> ${app.tags}</p>
        <button class="download-button" data-url="${app.copylink}">Copy Script</button>
      </div>
    `;
    container.appendChild(card);
  });

  container.querySelectorAll('.download-button').forEach(btn => {
    btn.addEventListener('click', function () {
      const url = unescapeFromJSON(this.getAttribute('data-url'));
      navigator.clipboard.writeText(url)
        .then(() => {
          this.textContent = "Copied!";
          setTimeout(() => this.textContent = "Copy Script", 1500);
        })
        .catch(err => {
          console.error("Failed to copy:", err);
        });
    });
  });
}

document.getElementById('search-input').addEventListener('input', function () {
  const query = this.value.toLowerCase();
  const filtered = allApps.filter(app => app.name.toLowerCase().includes(query));
  displayApps(filtered);
});
