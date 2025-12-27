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

<div class="choir-filters">
  <label>
    City:
    <select id="city-filter">
      <option value="">All</option>
      {% assign cities = site.choirs | map: "city" | uniq | sort %}
      {% for city in cities %}
        <option value="{{ city }}">{{ city }}</option>
      {% endfor %}
    </select>
  </label>

  <label>
    Voice type:
    <select id="voice-filter">
      <option value="">All</option>
      {% assign all_types = site.choirs | map: "voice_types" | compact | uniq | sort %}
      {% for type in all_types %}
        <option value="{{ type }}">{{ type }}</option>
      {% endfor %}
    </select>
  </label>

  <label>
    Search:
    <input type="text" id="search-filter" placeholder="Type a choir name">
  </label>
</div>

<div class="choir-grid">
  {% assign sorted_choirs = site.choirs | sort: "name" %}
  {% for choir in sorted_choirs %}
    <a
      href="{{ choir.url | relative_url }}"
      class="choir-card"
      data-city="{{ choir.city }}"
      data-types="{{ choir.voice_types | join: ',' }}"
      style="
        --choir-color: {{ choir.color | default: '#cfd8dc' }};
        {% if choir.cover_image %}
          --choir-image: url('{{ choir.cover_image | relative_url }}');
        {% endif %}
      "
    >
      <div class="choir-card-content">
        <div class="choir-card-name">{{ choir.name }}</div>
        <div class="choir-card-city">{{ choir.city }}</div>
        <div class="choir-card-types">{{ choir.voice_types | join: ", " }}</div>
      </div>
    </a>
  {% endfor %}
</div>

<script>
  const cityFilter = document.getElementById("city-filter");
  const voiceFilter = document.getElementById("voice-filter");
  const searchInput = document.getElementById("search-filter");
  const cards = document.querySelectorAll(".choir-card");

  function applyFilters() {
    const city = cityFilter.value.toLowerCase();
    const voice = voiceFilter.value.toLowerCase();
    const search = searchInput.value.toLowerCase();

    cards.forEach(card => {
      const cardCity = card.dataset.city.toLowerCase();
      const cardTypes = card.dataset.types.toLowerCase().split(",");
      const cardName = card.querySelector(".choir-card-name").textContent.toLowerCase();

      const matchesCity = !city || cardCity === city;
      const matchesVoice = !voice || cardTypes.includes(voice);
      const matchesSearch = !search || cardName.includes(search);

      if (matchesCity && matchesVoice && matchesSearch) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
  }

  cityFilter.addEventListener("change", applyFilters);
  voiceFilter.addEventListener("change", applyFilters);
  searchInput.addEventListener("input", applyFilters);
</script>

