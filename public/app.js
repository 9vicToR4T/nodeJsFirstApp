document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;
    remove(id);
    event.target.closest("li").remove();
  }
  if (event.target.dataset.edit === "edit") {
    const id = event.target.dataset.id;
    const title = event.target.dataset.title;

    let promptResponse = prompt("Edit selected note: ", title);
    if (promptResponse) {
      console.log("response true");
      put({ id: id, title: promptResponse }).then(()=>{
        event.target.closest("li").querySelector("span").innerText = promptResponse
  });;
    } else if (response === null) {
      console.log("prompt is null");
    }
  }
});

async function remove(id) {
  await fetch(`/${id}`, {
    method: "DELETE",
  });
}

async function put(newNote) {
  await fetch(`/${newNote.id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newNote)
  })
}

