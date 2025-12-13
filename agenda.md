---
title: Agenda
permalink: /agenda/
---

<h2>Concert agenda</h2>

<div id="agenda-controls">
  <label>
    Choir:
    <select id="filter-choir">
      <option value="">All choirs</option>
    </select>
  </label>

  <label>
    City:
    <select id="filter-city">
      <option value="">All cities</option>
    </select>
  </label>
</div>

<div id="calendar"></div>

<noscript>
  <p>This agenda works best with JavaScript enabled.</p>
</noscript>

<script src="{{ '/assets/js/agenda.js' | relative_url }}"></script>
<link rel="stylesheet" href="{{ '/assets/css/agenda.css' | relative_url }}">
