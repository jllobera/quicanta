---
title: Choirs
permalink: /choirs/
---

<h2>Choirs</h2>

<ul class="choir-list">
  {% for choir in site.choirs %}
    <li>
      <a href="{{ choir.url | relative_url }}" class="choir-name">
        {{ choir.name }}
      </a>
      –
      {{ choir.city }}
      –
      {{ choir.voice_types | join: ", " }}
    </li>
  {% endfor %}
</ul>

