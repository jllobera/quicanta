---
title: Choirs
---

<h2>Choirs</h2>

<ul class="choir-list">
  {% for choir in site.choirs %}
    <li>
      <h3>
        <a href="{{ choir.url | relative_url }}">
          {{ choir.name }}
        </a>
      </h3>
      <p>{{ choir.city }}</p>
    </li>
  {% endfor %}
</ul>
