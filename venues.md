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

<link
  rel="stylesheet"
  href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
  integrity="sha256-sA+4y5rZ5rsH3kMZ+Fs0nC3m8siP1A6l5g0hK8L7n0A="
  crossorigin=""
/>
<script
  src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
  integrity="sha256-oMQtP3t2F+QdTj1Zl0zHzEYsC1cPZqk+zFJj5N6reCI="
  crossorigin=""
></script>

<script>
document.addEventListener("DOMContentLoaded", function () {
  var map = L.map('venues-map').setView([41.98, 2.82], 12);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  {% for venue in site.venues %}
    {% if venue.coordinates %}
      L.marker([{{ venue.coordinates[0] }}, {{ venue.coordinates[1] }}])
        .addTo(map)
        .bindPopup('<strong><a href="{{ venue.url | relative_url }}">{{ venue.name }}</a></strong><br>{{ venue.address }}');
    {% endif %}
  {% endfor %}
});
</script>
