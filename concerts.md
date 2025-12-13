---
title: Concerts
permalink: /concerts/
---

<h2>Concerts</h2>

<ul class="concert-list">
  {% assign concerts = site.concerts | sort: "start" %}
  {% for concert in concerts %}
    <li>
      <h3>
        <a href="{{ concert.url | relative_url }}">
          {{ concert.title }}
        </a>
      </h3>

      {% if concert.start %}
        <p>{{ concert.start | date: "%d %B %Y" }}</p>
      {% endif %}
    </li>
  {% endfor %}
</ul>
