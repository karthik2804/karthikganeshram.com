(() => {
  "use strict";

  const parseData = (id) => {
    const element = document.getElementById(id);
    if (!element) return null;
    try { return JSON.parse(element.textContent); }
    catch (error) { console.error(`Could not parse ${id}`, error); return null; }
  };

  const addTiles = (map) => L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  const createPopup = (country, trips) => {
    const wrapper = document.createElement("div");
    const heading = document.createElement("strong");
    const list = document.createElement("ul");
    heading.className = "map-popup-title";
    heading.textContent = country;
    list.className = "map-popup-list";

    trips.forEach((trip) => {
      const item = document.createElement("li");
      const link = document.createElement("a");
      const detail = document.createElement("small");
      link.href = trip.url;
      link.textContent = trip.title;
      detail.textContent = `${trip.date} · ${trip.activity}`;
      item.append(link, detail);
      list.append(item);
    });
    wrapper.append(heading, list);
    return wrapper;
  };

  const initOverviewMap = () => {
    const element = document.getElementById("travel-map");
    const trips = parseData("travel-data");
    if (!element || !Array.isArray(trips) || typeof L === "undefined") return;

    const map = L.map(element, { scrollWheelZoom: false, worldCopyJump: true }).setView([48, 4], 4);
    addTiles(map);
    const groups = new Map();
    trips.filter((trip) => Number.isFinite(trip.latitude) && Number.isFinite(trip.longitude)).forEach((trip) => {
      if (!groups.has(trip.country)) groups.set(trip.country, []);
      groups.get(trip.country).push(trip);
    });

    const bounds = [];
    groups.forEach((countryTrips, country) => {
      const { latitude, longitude } = countryTrips[0];
      bounds.push([latitude, longitude]);
      const icon = L.divIcon({
        className: "map-marker",
        html: '<span class="map-marker-dot" aria-hidden="true">●</span>',
        iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -18]
      });
      L.marker([latitude, longitude], { icon, title: country })
        .bindPopup(createPopup(country, countryTrips))
        .addTo(map);
    });
    if (bounds.length) map.fitBounds(bounds, { padding: [35, 35], maxZoom: 5 });
  };

  const initTripMap = () => {
    const element = document.getElementById("single-trip-map");
    const trip = parseData("single-trip-data");
    if (!element || !trip || typeof L === "undefined") return;

    const points = (trip.locations || []).filter((point) => Number.isFinite(point.latitude) && Number.isFinite(point.longitude));
    if (!points.length && Number.isFinite(trip.latitude) && Number.isFinite(trip.longitude)) {
      points.push({ name: trip.title, latitude: trip.latitude, longitude: trip.longitude });
    }
    const center = points[0] || { latitude: 48, longitude: 4 };
    const map = L.map(element, { scrollWheelZoom: false }).setView([center.latitude, center.longitude], 8);
    addTiles(map);
    points.forEach((point) => L.marker([point.latitude, point.longitude]).bindTooltip(point.name).addTo(map));
    if (Array.isArray(trip.route) && trip.route.length > 1) {
      L.polyline(trip.route, { color: "#c65337", weight: 4, opacity: .85 }).addTo(map);
    }
    if (points.length > 1) map.fitBounds(points.map((point) => [point.latitude, point.longitude]), { padding: [35, 35] });
  };

  window.addEventListener("DOMContentLoaded", () => { initOverviewMap(); initTripMap(); });
})();
