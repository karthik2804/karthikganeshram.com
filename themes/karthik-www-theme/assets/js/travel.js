(() => {
  "use strict";

  const SVG_NS = "http://www.w3.org/2000/svg";
  const createSvg = (name, attributes = {}) => {
    const node = document.createElementNS(SVG_NS, name);
    Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value));
    return node;
  };
  const parseData = (id) => {
    const element = document.getElementById(id);
    if (!element) return null;
    try { return JSON.parse(element.textContent); }
    catch (error) { console.error(`Could not parse ${id}`, error); return null; }
  };
  const activityLabel = (activities = []) => activities.map((item) => item.replace(/-/g, " ")).join(" · ");

  const renderMapDetail = (container, country, trips) => {
    container.replaceChildren();
    const heading = document.createElement("strong");
    const list = document.createElement("ul");
    heading.textContent = country;
    trips.forEach((trip) => {
      const item = document.createElement("li");
      const link = document.createElement("a");
      const meta = document.createElement("small");
      link.href = trip.url;
      link.textContent = trip.title;
      meta.textContent = `${trip.date} · ${activityLabel(trip.activities)}`;
      item.append(link, meta);
      list.append(item);
    });
    container.append(heading, list);
  };

  const initOverview = () => {
    const trips = parseData("travel-data");
    const layer = document.getElementById("travel-marker-layer");
    const detail = document.getElementById("map-detail");
    if (!Array.isArray(trips) || !layer || !detail) return;

    const groups = new Map();
    trips.filter((trip) => Number.isFinite(trip.latitude) && Number.isFinite(trip.longitude)).forEach((trip) => {
      if (!groups.has(trip.country)) groups.set(trip.country, []);
      groups.get(trip.country).push(trip);
    });

    const occupied = [];
    groups.forEach((countryTrips, country) => {
      const trip = countryTrips[0];
      let x = ((trip.longitude + 180) / 360) * 1000;
      let y = ((90 - trip.latitude) / 180) * 500;
      let attempts = 0;
      while (occupied.some((point) => Math.hypot(point.x - x, point.y - y) < 31) && attempts < 8) {
        const angle = attempts * 1.8;
        x += Math.cos(angle) * 23;
        y += Math.sin(angle) * 20;
        attempts += 1;
      }
      occupied.push({ x, y });
      const marker = createSvg("g", {
        class: "svg-map-marker",
        transform: `translate(${x.toFixed(1)} ${y.toFixed(1)})`,
        tabindex: "0", role: "button",
        "aria-label": `${country}, ${countryTrips.length} ${countryTrips.length === 1 ? "journey" : "journeys"}`,
        "data-activities": [...new Set(countryTrips.flatMap((item) => item.activities))].join(" ")
      });
      marker.append(createSvg("circle", { r: "12", class: "marker-halo" }), createSvg("circle", { r: "6", class: "marker-core" }));
      const label = createSvg("text", { x: "0", y: "-18", "text-anchor": "middle" });
      label.textContent = country;
      marker.append(label);
      const select = () => {
        layer.querySelectorAll(".is-selected").forEach((node) => node.classList.remove("is-selected"));
        marker.classList.add("is-selected");
        renderMapDetail(detail, country, countryTrips);
      };
      marker.addEventListener("click", select);
      marker.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") { event.preventDefault(); select(); }
      });
      layer.append(marker);
    });

    const cards = [...document.querySelectorAll(".trip-card")];
    const markers = [...layer.querySelectorAll(".svg-map-marker")];
    const count = document.getElementById("trip-count");
    const empty = document.getElementById("travel-empty");
    document.querySelectorAll(".travel-filter").forEach((button) => button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      document.querySelectorAll(".travel-filter").forEach((item) => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      let visible = 0;
      cards.forEach((card) => {
        const show = filter === "all" || card.dataset.activities.split(" ").includes(filter);
        card.hidden = !show;
        if (show) visible += 1;
      });
      markers.forEach((marker) => {
        marker.hidden = filter !== "all" && !marker.dataset.activities.split(" ").includes(filter);
      });
      count.textContent = String(visible);
      empty.hidden = visible !== 0;
      const message = document.createElement("p");
      message.textContent = filter === "all" ? "Select a marker to explore a place." : `Showing ${activityLabel([filter])} journeys.`;
      detail.replaceChildren(message);
    }));
  };

  const initRoute = () => {
    const trip = parseData("single-trip-data");
    const layer = document.getElementById("route-layer");
    const detail = document.getElementById("route-detail");
    if (!trip || !layer || !detail) return;
    const locations = (trip.locations || []).filter((point) => Number.isFinite(point.latitude) && Number.isFinite(point.longitude));
    if (!locations.length && Number.isFinite(trip.latitude) && Number.isFinite(trip.longitude)) locations.push({ name: trip.title, latitude: trip.latitude, longitude: trip.longitude });
    if (!locations.length) return;
    const route = Array.isArray(trip.route) && trip.route.length ? trip.route : locations.map((point) => [point.latitude, point.longitude]);
    const coordinates = [...route, ...locations.map((point) => [point.latitude, point.longitude])];
    const latitudes = coordinates.map(([latitude]) => latitude);
    const longitudes = coordinates.map(([, longitude]) => longitude);
    const minLat = Math.min(...latitudes), maxLat = Math.max(...latitudes);
    const minLng = Math.min(...longitudes), maxLng = Math.max(...longitudes);
    const project = ([latitude, longitude]) => ({
      x: minLng === maxLng ? 450 : 70 + ((longitude - minLng) / (maxLng - minLng)) * 760,
      y: minLat === maxLat ? 210 : 350 - ((latitude - minLat) / (maxLat - minLat)) * 280
    });
    if (route.length > 1) {
      layer.append(createSvg("polyline", {
        class: "route-line",
        points: route.map((point) => { const { x, y } = project(point); return `${x},${y}`; }).join(" ")
      }));
    }
    locations.forEach((location, index) => {
      const { x, y } = project([location.latitude, location.longitude]);
      const marker = createSvg("g", { class: "route-stop", transform: `translate(${x} ${y})`, tabindex: "0", role: "button", "aria-label": `Stop ${index + 1}: ${location.name}` });
      marker.append(createSvg("circle", { r: "12" }));
      const number = createSvg("text", { y: "4", "text-anchor": "middle" });
      number.textContent = String(index + 1);
      marker.append(number);
      const select = () => {
        layer.querySelectorAll(".is-selected").forEach((node) => node.classList.remove("is-selected"));
        marker.classList.add("is-selected");
        detail.textContent = `${index + 1}. ${location.name}`;
      };
      marker.addEventListener("click", select);
      marker.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") { event.preventDefault(); select(); }
      });
      layer.append(marker);
    });
    detail.textContent = locations.map((location, index) => `${index + 1}. ${location.name}`).join("  ·  ");
  };

  window.addEventListener("DOMContentLoaded", () => { initOverview(); initRoute(); });
})();
