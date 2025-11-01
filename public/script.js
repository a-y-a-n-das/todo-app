console.log("script is working...");
const list = document.getElementById("todoList");
const addBtn = document.getElementById("addBtn");
const themeToggle = document.getElementById("themeToggle");

function updateList(data) {
  list.innerHTML = "";
  if (!data) {
    fetch("/api/todos")
      .then((response) => response.json())
      .then((data) => updateList(data));
    return;
  }
  console.log(data);
  data.forEach((e) => {
    const li = document.createElement("li");
    const textEl = document.createElement("span");
    textEl.className = "text";
    textEl.textContent = e.text;
    li.appendChild(textEl);

    // make it look completed if already done (via class, not inline styles)
    if (e.completed) {
      li.classList.add("completed");
    }
    // create a button for toggling
    const btn = document.createElement("button");
    btn.textContent = e.completed ? "Undo" : "Complete";
    btn.style.marginLeft = "10px";

    //create a delete button
    const btnDelete = document.createElement("button");
    btnDelete.textContent = "Delete";
    btnDelete.style.marginLeft = "10px";

    btn.addEventListener("click", () => {
      fetch("/api/todos", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToComplete: e.id })
    }).then(() => updateList());
    });

    btnDelete.addEventListener('click', ()=> {
        fetch("/api/todos", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({idToDelete: e.id})
        }).then(()=> updateList());
    });

    li.appendChild(btn);
    li.appendChild(btnDelete);
    list.appendChild(li);
  });
}

updateList();

addBtn.addEventListener("click", () => {
  const input = document.getElementById("todoInput");
  fetch("/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: input.value }),
  })
    .then((res) => res.json()) // wait for server response
    .then(() => updateList());
  input.value = "";
});

// Theme toggle: simple light/dark switch using data-theme on <html>
if (themeToggle) {
  const root = document.documentElement;
  const preferLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  // Initial icon and theme from system preference
  root.setAttribute('data-theme', preferLight ? 'light' : 'dark');
  themeToggle.textContent = preferLight ? '🌙' : '☀️';

  themeToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') || (preferLight ? 'light' : 'dark');
    const next = current === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    themeToggle.textContent = next === 'light' ? '🌙' : '☀️';
  });
}

