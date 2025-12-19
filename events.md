---
title: Events
permalink: /events/
---

<h2>Events</h2>

<ul class="event-list">
  {% assign events = site.events | sort: "start" %}
  {% for event in events %}
    <li>
      <h3>
        <a href="{{ event.url | relative_url }}">
          {{ event.title }}
        </a>
      </h3>

      {% if event.start %}
        <p>{{ event.start | date: "%d %B %Y" }}</p>
      {% endif %}
    </li>
  {% endfor %}
</ul>
