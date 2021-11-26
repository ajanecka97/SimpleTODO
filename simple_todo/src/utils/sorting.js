

const compareByPosition = (a, b) => {
  return a.position - b.position;
}

const compareByName = (a, b) => {
  return a.name < b.name ? -1 : a.name > b.name;
}

const savePosition = (item, position) => {
    const todoItemId = item.todoItemId;
    const name = item.name;
    const description = item.description;
    const data = {todoItemId, name, description, position};

    console.log(item.name + ": Old position: " + item.position + ", New position: " + position);

    fetch('https://localhost:44374/api/todoitems/' + todoItemId, {
      method: "put",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
}

async function save(todos) {
  for(var i = 0; i < todos.length; i++){
    savePosition(todos[i], i);
  }
  return Promise.resolve(null);
}

export {compareByPosition, compareByName, savePosition, save};