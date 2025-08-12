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
        <p><strong>Script Name:</strong> ${app.bundle_id}</p>
        <p><strong>Script Tags:</strong> ${app.version}</p>
        <button class="download-button" data-url="${app.download}">Copy Script</button>
      </div>
    `;
    container.appendChild(card);
  });

  container.querySelectorAll('.download-button').forEach(btn => {
    btn.addEventListener('click', function () {
      const url = this.getAttribute('data-url');
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
