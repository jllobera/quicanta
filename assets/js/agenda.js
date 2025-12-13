async function loadAgenda() {
  const response = await fetch("/quicanta/agenda.json");
  const concerts = await response.json();

  const choirSelect = document.getElementById("filter-choir");
  const citySelect = document.getElementById("filter-city");
  const toggleButton = document.getElementById("toggle-view");
  const calendar = document.getElementById("calendar");

  let view = "list"; // default view

  // Collect unique choirs and cities
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

    if (view === "list") {
      renderList(filtered);
    } else {
      renderCalendar(filtered);
    }
  }

  choirSelect.onchange = render;
  citySelect.onchange = render;

  toggleButton.onclick = () => {
    view = view === "list" ? "calendar" : "list";
    toggleButton.textContent = view === "list" ? "Switch to Calendar View" : "Switch to List View";
    render();
  };

  render();
}

// --- List view (existing month-grouped list) ---
function renderList(concerts) {
  const calendar = document.getElementById("calendar");
  calendar.innerHTML = "";

  const todayStr = new Date().toISOString().slice(0, 10);

  let currentMonth = "";
  calendar.innerHTML = "";

  concerts.sort((a,b) => new Date(a.start) - new Date(b.start)).forEach(concert => {
    if (!concert.start) return;
    const concertDate = concert.start.slice(0,10);
    if (concertDate < todayStr) return;

    const monthLabel = new Date(concert.start).toLocaleString("default", { month: "long", year: "numeric" });
    if (monthLabel !== currentMonth) {
      const h3 = document.createElement("h3");
      h3.textContent = monthLabel;
      calendar.appendChild(h3);
      const ul = document.createElement("ul");
      ul.className = "agenda";
      calendar.appendChild(ul);
      currentMonth = monthLabel;
    }

    const ul = calendar.querySelector("ul:last-of-type");
    const li = document.createElement("li");
    li.className = "agenda-item";
    if (concert.start.slice(0,10) === todayStr) li.classList.add("today");
    li.innerHTML = `<strong>${new Date(concert.start).toLocaleDateString(undefined, { weekday:'short', day:'2-digit' })}</strong> – 
                    <a href="${concert.url}">${concert.title}</a>`;
    ul.appendChild(li);
  });
}

// --- Calendar view (weekday-aligned) ---
function renderCalendar(concerts) {
  const calendar = document.getElementById("calendar");
  calendar.innerHTML = "";

  const today = new Date();
  today.setHours(0,0,0,0);

  const byMonth = {};
  concerts.forEach(c => {
    const d = new Date(c.start);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    byMonth[key] ||= [];
    byMonth[key].push({ ...c, date: d });
  });

  Object.keys(byMonth).sort().forEach(key => {
    const monthConcerts = byMonth[key];
    monthConcerts.sort((a,b) => a.date - b.date);

    const firstDate = new Date(monthConcerts[0].date.getFullYear(), monthConcerts[0].date.getMonth(), 1);
    const lastDate = new Date(firstDate.getFullYear(), firstDate.getMonth() + 1, 0);
    const monthTitle = firstDate.toLocaleString("default", { month: "long", year: "numeric" });

    const section = document.createElement("section");
    section.className = "calendar-month";
    section.innerHTML = `<h3>${monthTitle}</h3>`;

    const grid = document.createElement("div");
    grid.className = "calendar-grid-weekdays";

    // Weekday headers
    const weekdays = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
    weekdays.forEach(w => {
      const cell = document.createElement("div");
      cell.className = "calendar-header";
      cell.textContent = w;
      grid.appendChild(cell);
    });

    const startWeekday = (firstDate.getDay() + 6) % 7; // Mon=0
    for (let i=0; i<startWeekday; i++) {
      const emptyCell = document.createElement("div");
      emptyCell.className = "calendar-item empty";
      grid.appendChild(emptyCell);
    }

    for (let day=1; day<=lastDate.getDate(); day++) {
      const date = new Date(firstDate.getFullYear(), firstDate.getMonth(), day);
      const dayCell = document.createElement("div");
      dayCell.className = "calendar-item";
      if (+date === +today) dayCell.classList.add("today");

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
