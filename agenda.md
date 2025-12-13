---
title: Agenda
permalink: /agenda/
---

<h2>Concert agenda</h2>

{% assign today = site.time | date: "%Y-%m-%d" %}
{% assign concerts = site.concerts | sort: "start" %}

{% assign current_month = "" %}

<ul class="agenda">
{% for concert in concerts %}
  {% if concert.start %}
    {% assign concert_date = concert.start | date: "%Y-%m-%d" %}
    {% if concert_date >= today %}

      {% assign month_label = concert.start | date: "%B %Y" %}

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
          {{ concert.start | date: "%a %d" }}
        </strong>
        –
        <a href="{{ concert.url | relative_url }}">
          {{ concert.title }}
        </a>

        {% if concert.venue %}
          {% assign venue = site.venues | where: "slug", concert.venue | first %}
          {% if venue %}
            ({{ venue.city }})
          {% endif %}
        {% endif %}
      </li>

    {% endif %}
  {% endif %}
{% endfor %}
</ul>
