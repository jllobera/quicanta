---
title: Choirs
permalink: /choirs/
---

<link rel="stylesheet" href="{{ '/assets/css/choirs.css' | relative_url }}">

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

<div class="choir-grid">
  {% for choir in site.choirs %}
    <a
      href="{{ choir.url | relative_url }}"
      class="choir-card"
      style="
        --choir-color: {{ choir.color | default: '#cfd8dc' }};
        {% if choir.cover_image %}
          --choir-image: url('{{ choir.cover_image | relative_url }}');
        {% endif %}
      "
    >
      <div class="choir-card-content">
        <div class="choir-card-name">
          {{ choir.name }}
        </div>
        <div class="choir-card-city">
          {{ choir.city }}
        </div>
        <div class="choir-card-types">
          {{ choir.voice_types | join: ", " }}
        </div>
      </div>
    </a>
  {% endfor %}
</div>


