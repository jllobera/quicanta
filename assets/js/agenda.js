async function loadAgenda() {
  const response = await fetch("/quicanta/agenda.json");
  const concerts = await response.json();

  const choirSelect = document.getElementById("filter-choir");
  const citySelect = document.getElementById("filter-city");
  const calendar = document.getElementById("calendar");

  const choirs = new Set();
  const cities = new Set();

  concerts.forEach(c => {
    (c.choirs || []).forEach(ch => choirs.add(ch));
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
      if (choirFilter && !c.choirs?.includes(choirFilter)) return false;
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

  const byMonth = {};

  concerts.forEach(c => {
    const d = new Date(c.start);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    byMonth[key] ||= [];
    byMonth[key].push({ ...c, date: d });
  });

  Object.values(byMonth).forEach(monthConcerts => {
    monthConcerts.sort((a, b) => a.date - b.date);

    const monthTitle = monthConcerts[0].date.toLocaleString("default", {
      month: "long",
      year: "numeric"
    });

    const section = document.createElement("section");
    section.className = "calendar-month";
    section.innerHTML = `<h3>${monthTitle}</h3>`;

    const grid = document.createElement("div");
    grid.className = "calendar-grid";

    monthConcerts.forEach(c => {
      const cell = document.createElement("div");
      cell.className = "calendar-item";
      cell.innerHTML = `
        <div class="date">${c.date.getDate()}</div>
        <a href="${c.url}">${c.title}</a>
      `;
      grid.appendChild(cell);
    });

    section.appendChild(grid);
    calendar.appendChild(section);
  });
}

loadAgenda();
