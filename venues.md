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
