console.log("script is working...");
const list = document.getElementById("todoList");
const addBtn = document.getElementById("addBtn");

function updateList(data) {
  list.innerHTML = "";
  if (!data) {
    fetch("http://localhost:3000/api/todos")
      .then((response) => response.json())
      .then((data) => updateList(data));
    return;
  }
  console.log(data);
  data.forEach((e) => {
    const li = document.createElement("li");
    li.textContent = e.text;

    // make it look completed if already done
    if (e.completed) {
      li.style.textDecoration = "line-through";
      li.style.color = "gray";
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
      fetch("http://localhost:3000/api/todos", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToComplete: e.id })
    }).then(() => updateList());
    });

    btnDelete.addEventListener('click', ()=> {
        fetch("http://localhost:3000/api/todos", {
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
  fetch("http://localhost:3000/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: input.value }),
  })
    .then((res) => res.json()) // wait for server response
    .then(() => updateList());
  input.value = "";
});
