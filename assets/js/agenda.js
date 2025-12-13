async function loadAgenda() {
  const response = await fetch("/quicanta/agenda.json");
  const concerts = await response.json();

  const choirSelect = document.getElementById("filter-choir");
  const citySelect = document.getElementById("filter-city");
  const calendar = document.getElementById("calendar");

  const choirs = new Set();
  const cities = new Set();

  concerts.forEach(c => {
    (c.choir_names || []).forEach(name => choirs.add(name));
    if (c.city) cities.add(c.city);
  });

  [...choirs].sort().forEach(ch => {
    choirSelect.add(new Option(ch, ch));
  });

  [...cities].sort().forEach(c => {
    citySelect.add(new Option(c, c));
  });

  function render() {
    const choirFilter = choirSelect.value;
    const cityFilter = citySelect.value;

    const filtered = concerts.filter(c => {
      if (choirFilter && !(c.choir_names || []).includes(choirFilter)) return false;
      if (cityFilter && c.city !== cityFilter) return false;
      return true;
    });

    renderCalendar(filtered);
  }

  choirSelect.onchange = render;
  citySelect.onchange = render;

  render();
}

function renderCalendar(concerts) {
  const calendar = document.getElementById("calendar");
  calendar.innerHTML = "";

  // Group concerts by month
  const byMonth = {};

  concerts.forEach(c => {
    const d = new Date(c.start);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    byMonth[key] ||= [];
    byMonth[key].push({ ...c, date: d });
  });

  Object.keys(byMonth).sort().forEach(key => {
    const monthConcerts = byMonth[key];
    monthConcerts.sort((a, b) => a.date - b.date);

    const firstDate = new Date(monthConcerts[0].date.getFullYear(), monthConcerts[0].date.getMonth(), 1);
    const lastDate = new Date(firstDate.getFullYear(), firstDate.getMonth() + 1, 0);
    const monthTitle = firstDate.toLocaleString("default", { month: "long", year: "numeric" });

    const section = document.createElement("section");
    section.className = "calendar-month";
    section.innerHTML = `<h3>${monthTitle}</h3>`;

    const grid = document.createElement("div");
    grid.className = "calendar-grid-weekdays";

    // Add weekday headers
    const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    weekdays.forEach(w => {
      const cell = document.createElement("div");
      cell.className = "calendar-header";
      cell.textContent = w;
      grid.appendChild(cell);
    });

    // Fill empty cells for first week
    const startWeekday = (firstDate.getDay() + 6) % 7; // Convert Sun=0 → 6, Mon=0 → 0
    for (let i = 0; i < startWeekday; i++) {
      const emptyCell = document.createElement("div");
      emptyCell.className = "calendar-item empty";
      grid.appendChild(emptyCell);
    }

    // Fill days
    for (let day = 1; day <= lastDate.getDate(); day++) {
      const date = new Date(firstDate.getFullYear(), firstDate.getMonth(), day);
      const dayCell = document.createElement("div");
      dayCell.className = "calendar-item";

      // Find concerts for this day
      const dayConcerts = monthConcerts.filter(c => c.date.getDate() === day);
      if (dayConcerts.length > 0) {
        dayCell.innerHTML = dayConcerts.map(c =>
          `<div class="date">${day}</div><a href="${c.url}">${c.title}</a>`
        ).join("");
      } else {
        dayCell.innerHTML = `<div class="date">${day}</div>`;
      }

      grid.appendChild(dayCell);
    }

    section.appendChild(grid);
    calendar.appendChild(section);
  });
}

loadAgenda();
