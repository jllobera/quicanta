---
title: Venues
permalink: /venues/
---

<h2>Venues</h2>

<ul>
  {% for venue in site.venues %}
    <li>
      <a href="{{ venue.url | relative_url }}">
        {{ venue.name }}
      </a>
      – {{ venue.city }}
    </li>
  {% endfor %}
</ul>

<div id="venues-map" style="height: 500px; margin-top: 2em;"></div>

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

<script>
document.addEventListener("DOMContentLoaded", function () {
  var map = L.map('venues-map');

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  var bounds = [];

  {% for venue in site.venues %}
    {% if venue.coordinates %}
      var marker = L.marker([{{ venue.coordinates[0] }}, {{ venue.coordinates[1] }}]).addTo(map);
      marker.bindPopup('<strong><a href="{{ venue.url | relative_url }}">{{ venue.name }}</a></strong><br>{{ venue.address }}');
      bounds.push([{{ venue.coordinates[0] }}, {{ venue.coordinates[1] }}]);
    {% endif %}
  {% endfor %}

  if(bounds.length > 0) {
    map.fitBounds(bounds, {padding: [50, 50]}); // automatically zooms and centers
  } else {
    map.setView([41.98, 2.82], 12); // fallback if no venues
  }
});
</script>
