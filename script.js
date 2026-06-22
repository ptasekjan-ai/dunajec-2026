const dayTabs = document.querySelectorAll('.day-tab');
const dayPanels = document.querySelectorAll('.day-panel');

dayTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const day = tab.dataset.day;

    dayTabs.forEach((item) => {
      const isActive = item === tab;
      item.classList.toggle('is-active', isActive);
      item.setAttribute('aria-selected', String(isActive));
    });

    dayPanels.forEach((panel) => {
      const isActive = panel.dataset.panel === day;
      panel.classList.toggle('is-active', isActive);
      panel.hidden = !isActive;
    });
  });
});

const variantButtons = document.querySelectorAll('.switcher__button');
const variantPanels = document.querySelectorAll('[data-variant-panel]');
const mapVariantButtons = document.querySelectorAll('[data-map-variant]');
const mapDayButtons = document.querySelectorAll('[data-map-day]');

variantButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const variant = button.dataset.variant;

    variantButtons.forEach((item) => item.classList.toggle('is-active', item === button));
    variantPanels.forEach((panel) => {
      const isActive = panel.dataset.variantPanel === variant;
      panel.classList.toggle('is-active', isActive);
      panel.hidden = !isActive;
    });

    setMapVariant(variant);
  });
});

document.querySelectorAll('[data-copy]').forEach((button) => {
  button.addEventListener('click', async () => {
    const target = document.querySelector(button.dataset.copy);
    if (!target) return;

    try {
      await navigator.clipboard.writeText(target.textContent.trim());
      const original = button.textContent;
      button.textContent = 'Zkopírováno';
      setTimeout(() => {
        button.textContent = original;
      }, 1600);
    } catch {
      button.textContent = 'Označ text';
    }
  });
});

const routeColors = {
  fri: '#1f7890',
  sat: '#27695c',
  sun: '#d69d3c'
};

const pieninyRoute = [
  [49.405425, 20.369243],
  [49.4019, 20.377],
  [49.3997, 20.3896],
  [49.398953, 20.414287],
  [49.3984, 20.424],
  [49.3936, 20.4377],
  [49.3972, 20.4504],
  [49.4028, 20.4598],
  [49.4079, 20.4715],
  [49.4144, 20.4667],
  [49.4189, 20.4565],
  [49.423, 20.45954],
  [49.425995, 20.443757]
];

const szczawnicaToKroscienko = [
  [49.425995, 20.443757],
  [49.432, 20.4385],
  [49.4384, 20.4321],
  [49.440909, 20.43014],
  [49.447851, 20.425472]
];

const kroscienkoToTylmanowa = [
  [49.447851, 20.425472],
  [49.4562, 20.416],
  [49.4638, 20.4079],
  [49.4732, 20.398],
  [49.4828, 20.3886],
  [49.4938, 20.3826],
  [49.5035, 20.3863],
  [49.513249, 20.396737]
];

const tylmanowaToZabrzez = [
  [49.513249, 20.396737],
  [49.518, 20.402],
  [49.521832, 20.408179]
];

const tylmanowaToJazowsko = [
  [49.513249, 20.396737],
  [49.521832, 20.408179],
  [49.5305, 20.4165],
  [49.5438, 20.4218],
  [49.55767, 20.434928],
  [49.5644, 20.4526],
  [49.5595, 20.4738],
  [49.5466, 20.4932],
  [49.529779, 20.51713]
];

const tripRoutes = {
  safe: {
    fri: {
      day: 'Pátek 28. 8.',
      title: 'Niedzica / Sromowce -> Szczawnica',
      meta: 'Port Pienin, cca 15-16 km, bezpečnější hlavní průlom.',
      coords: pieninyRoute,
      markers: [
        ['Start Sromowce Wyżne / Kąty', [49.405425, 20.369243]],
        ['Sromowce Niżne', [49.398953, 20.414287]],
        ['Szczawnica / Port Pienin', [49.425995, 20.443757]]
      ]
    },
    sat: {
      day: 'Sobota 29. 8.',
      title: 'Szczawnica -> Tylmanowa',
      meta: 'Port Pienin, cca 15 km, jednodušší pokračování.',
      coords: [...szczawnicaToKroscienko, ...kroscienkoToTylmanowa.slice(1)],
      markers: [
        ['Szczawnica / Port Pienin', [49.425995, 20.443757]],
        ['Krościenko', [49.447851, 20.425472]],
        ['Tylmanowa', [49.513249, 20.396737]]
      ]
    },
    sun: {
      day: 'Neděle 30. 8.',
      title: 'Tylmanowski průlom volitelně',
      meta: 'Adventure Sky, krátký úsek jen pokud se rozhodnete pro vodu.',
      optional: true,
      coords: tylmanowaToZabrzez,
      markers: [
        ['Tylmanowa', [49.513249, 20.396737]],
        ['Wietrznice / Zabrzeż', [49.521832, 20.408179]]
      ]
    }
  },
  sport: {
    fri: {
      day: 'Pátek 28. 8.',
      title: 'Sromowce -> Krościenko',
      meta: 'KajakiDunajcem.pl, 21 km, 3-4 h.',
      coords: [...pieninyRoute, ...szczawnicaToKroscienko.slice(1)],
      markers: [
        ['Start Sromowce Wyżne / Kąty', [49.405425, 20.369243]],
        ['Sromowce Niżne', [49.398953, 20.414287]],
        ['Krościenko / Cypel', [49.447851, 20.425472]]
      ]
    },
    sat: {
      day: 'Sobota 29. 8.',
      title: 'Krościenko -> Łącko / Jazowsko',
      meta: 'KajakiDunajcem.pl, 26 km, 4,5-5,5 h; jen pro zkušenější.',
      coords: [...kroscienkoToTylmanowa, ...tylmanowaToJazowsko.slice(1)],
      markers: [
        ['Krościenko / Cypel', [49.447851, 20.425472]],
        ['Tylmanowa', [49.513249, 20.396737]],
        ['Łącko', [49.55767, 20.434928]],
        ['Jazowsko', [49.529779, 20.51713]]
      ]
    },
    sun: {
      day: 'Neděle 30. 8.',
      title: 'Rezerva bez pevné vody',
      meta: 'Po sportovní sobotě dává větší smysl pěší dopoledne nebo jen domluvený krátký spodní úsek.',
      optional: true,
      coords: [],
      markers: [
        ['Wietrznice / Zabrzeż', [49.521832, 20.408179]],
        ['Jazowsko', [49.529779, 20.51713]]
      ]
    }
  }
};

let tripMap;
let routeLayer;
let activeMapVariant = 'safe';
let activeMapDay = 'all';
let currentGpxUrl;

function setMapVariant(variant) {
  if (!tripRoutes[variant]) return;
  activeMapVariant = variant;

  mapVariantButtons.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.mapVariant === variant);
  });

  renderTripMap();
}

function setMapDay(day) {
  activeMapDay = day;
  mapDayButtons.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.mapDay === day);
  });
  renderTripMap();
}

function getVisibleRoutes() {
  const routes = tripRoutes[activeMapVariant];
  return Object.entries(routes).filter(([day]) => activeMapDay === 'all' || activeMapDay === day);
}

function routePopup(route) {
  return `<div class="route-popup"><strong>${route.day}: ${route.title}</strong><span>${route.meta}</span></div>`;
}

function renderTripMap() {
  if (!tripMap || !routeLayer) return;

  routeLayer.clearLayers();
  const bounds = [];
  const visibleRoutes = getVisibleRoutes();

  visibleRoutes.forEach(([day, route]) => {
    const color = routeColors[day];
    if (route.coords.length) {
      const line = L.polyline(route.coords, {
        color,
        weight: 6,
        opacity: route.optional ? 0.72 : 0.92,
        dashArray: route.optional ? '8 9' : null,
        lineJoin: 'round'
      }).bindPopup(routePopup(route));

      line.addTo(routeLayer);
      route.coords.forEach((coord) => bounds.push(coord));
    }

    route.markers.forEach(([name, coord]) => {
      const marker = L.circleMarker(coord, {
        radius: 7,
        color: '#ffffff',
        weight: 2,
        fillColor: color,
        fillOpacity: 0.95
      }).bindTooltip(name, {
        permanent: true,
        direction: 'top',
        offset: [0, -8],
        className: 'map-label'
      }).bindPopup(routePopup(route));

      marker.addTo(routeLayer);
      bounds.push(coord);
    });
  });

  updateMapSummary(visibleRoutes);
  updateMapLinks(visibleRoutes, bounds);

  if (bounds.length) {
    tripMap.fitBounds(bounds, { padding: [34, 34], maxZoom: activeMapDay === 'all' ? 12 : 13 });
  }
}

function updateMapSummary(visibleRoutes) {
  const summary = document.querySelector('[data-map-summary]');
  if (!summary) return;

  summary.innerHTML = visibleRoutes.map(([day, route]) => `
    <article>
      <span class="tag ${day === 'sat' ? 'tag--warn' : ''}">${route.day.split(' ')[0]}</span>
      <h3>${route.title}</h3>
      <p>${route.meta}</p>
    </article>
  `).join('');
}

function xmlEscape(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function routeCoordsForGpx(route) {
  return route.coords;
}

function makeGpx(visibleRoutes) {
  const tracks = visibleRoutes.map(([, route]) => {
    const coords = routeCoordsForGpx(route);
    if (!coords.length) return '';

    const points = coords.map(([lat, lon]) => `      <trkpt lat="${lat}" lon="${lon}"></trkpt>`).join('\n');
    return `  <trk>
    <name>${xmlEscape(route.day)} - ${xmlEscape(route.title)}</name>
    <desc>${xmlEscape(route.meta)}</desc>
    <trkseg>
${points}
    </trkseg>
  </trk>`;
  }).filter(Boolean).join('\n');

  const waypoints = visibleRoutes.flatMap(([, route]) => {
    if (route.coords.length) return [];
    return route.markers.map(([name, [lat, lon]]) => `  <wpt lat="${lat}" lon="${lon}">
    <name>${xmlEscape(name)}</name>
    <desc>${xmlEscape(route.day)} - bez pevné vodní trasy</desc>
  </wpt>`);
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Dunajec 2026 web" xmlns="http://www.topografix.com/GPX/1/1">
  <metadata>
    <name>Dunajec 2026 - ${activeMapVariant === 'safe' ? 'bezpečnější' : 'sportovní'} varianta</name>
  </metadata>
${tracks}
${waypoints}
</gpx>
`;
}

function updateMapLinks(visibleRoutes, bounds) {
  const gpxLink = document.querySelector('#map-gpx-link');
  const mapyLink = document.querySelector('#mapy-area-link');
  if (!gpxLink || !mapyLink) return;

  if (currentGpxUrl) URL.revokeObjectURL(currentGpxUrl);
  currentGpxUrl = URL.createObjectURL(new Blob([makeGpx(visibleRoutes)], { type: 'application/gpx+xml' }));

  const dayName = activeMapDay === 'all' ? 'vse' : activeMapDay;
  gpxLink.href = currentGpxUrl;
  gpxLink.download = `dunajec-${activeMapVariant}-${dayName}.gpx`;

  const centerSource = bounds.length ? bounds : visibleRoutes.flatMap(([, route]) => route.markers.map(([, coord]) => coord));
  const center = centerSource.reduce((acc, [lat, lon]) => [acc[0] + lat, acc[1] + lon], [0, 0]).map((value) => value / centerSource.length);
  const zoom = activeMapDay === 'all' ? 12 : 13;
  mapyLink.href = `https://mapy.com/fnc/v1/showmap?mapset=outdoor&center=${center[1].toFixed(6)},${center[0].toFixed(6)}&zoom=${zoom}`;
  mapyLink.textContent = activeMapDay === 'all' ? 'Otevřít oblast v Mapy.com' : 'Otevřít oblast dne v Mapy.com';
}

function initTripMap() {
  const mapElement = document.querySelector('#trip-map');
  if (!mapElement || typeof L === 'undefined') return;

  tripMap = L.map(mapElement, {
    scrollWheelZoom: false,
    tap: true
  }).setView([49.47, 20.43], 11);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(tripMap);

  routeLayer = L.layerGroup().addTo(tripMap);
  renderTripMap();
}

mapVariantButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const variant = button.dataset.mapVariant;
    setMapVariant(variant);

    const linkedVariantButton = document.querySelector(`.switcher__button[data-variant="${variant}"]`);
    if (linkedVariantButton) linkedVariantButton.click();
  });
});

mapDayButtons.forEach((button) => {
  button.addEventListener('click', () => setMapDay(button.dataset.mapDay));
});

initTripMap();
