---
title: Agenda List
permalink: /agenda-list/
---

<h2>Event agenda</h2>

{% assign today = site.time | date: "%Y-%m-%d" %}
{% assign events = site.events | sort: "start" %}

{% assign current_month = "" %}

<ul class="agenda">
{% for event in events %}
  {% if event.start %}
    {% assign event_date = event.start | date: "%Y-%m-%d" %}
    {% if event_date >= today %}

      {% assign month_label = event.start | date: "%B %Y" %}

      {% if month_label != current_month %}
        {% unless forloop.first %}
          </ul>
        {% endunless %}

        <h3>{{ month_label }}</h3>
        <ul>
        {% assign current_month = month_label %}
      {% endif %}

      <li class="agenda-item">
        <strong>
          {{ event.start | date: "%a %d" }}
        </strong>
        –
        <a href="{{ event.url | relative_url }}">
          {{ event.title }}
        </a>

        {% if event.venue %}
          {% assign venue = site.venues | where: "slug", event.venue | first %}
          {% if venue %}
            ({{ venue.city }})
          {% endif %}
        {% endif %}
      </li>

    {% endif %}
  {% endif %}
{% endfor %}
</ul>
