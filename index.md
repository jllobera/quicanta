---
title: Home
---

Welcome to the **Amateur Choirs Directory**.

This platform presents amateur choirs in the region, their concerts,
conductors, and venues.

{% assign now = "now" | date: "%s" %}
{% assign upcoming_events = "" | split: "," %}

{% for event in site.events %}
  {% if event.start %}
    {% assign event_ts = event.start | date: "%s" %}
    {% if event_ts >= now %}
      {% assign upcoming_events = upcoming_events | push: event %}
    {% endif %}
  {% endif %}
{% endfor %}

{% assign upcoming_events = upcoming_events | sort: "start" %}

<h2>Upcoming Events</h2>

{% if upcoming_events.size > 0 %}
  <ul>
    {% for event in upcoming_events limit:5 %}
      <li>
        <a href="{{ event.url | relative_url }}">
          {{ event.title }}
        </a>
        {% if event.start %}
          – {{ event.start | date: "%d %B %Y" }}
        {% endif %}
      </li>
    {% endfor %}
  </ul>
{% else %}
  <p>There are no upcoming events scheduled.</p>
{% endif %}
