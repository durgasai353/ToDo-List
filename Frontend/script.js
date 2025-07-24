let todos=[];
document.addEventListener('DOMContentLoaded', async function () {
  let data=  await fetch('http://localhost:3000',{
      method:'GET',
      headers:{'content-type':'application/json'}
    })
  let originalData = await data.json();
  console.log(originalData);
  originalData.map(item=>{
    todos.push({ID:item.ID,
         text:item.itemDesc,
         editing:false
        });
    return todos;
  })
  renderTodos();
}
)

const addInput = document.getElementById('addTaskButton');
const form = document.getElementById('taskForm'); 
form.addEventListener('submit', function (e) {
    e.preventDefault(); 

    const taskInput = document.getElementById('taskInput');
    const taskValue = taskInput.value.trim();
    fetch('http://localhost:3000/addTask',{
        method:'POST',
        headers:{'content-type':'application/json'},
        body:JSON.stringify({text: taskValue})
    })
     taskInput.value=''; 
});
 function renderTodos() {
      const list = document.getElementById('taskList');
      list.innerHTML = '';
      todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = 'task-item';
        if (todo.editing) {
          li.innerHTML = 
  `<input class="form-control edit-input" type="text" value="${todo.text}" onkeyup="editTodo(event, ${index})" />
  <div class="todo-actions1">
    <button class="save-btn" onclick="saveTodo(${index})">Save</button>
    <button class="cancel-btn" onclick="cancelTodo()">Cancel</button>
  </div>
`;

        } else {
          li.innerHTML = `
            <span>${todo.text}</span>
            <div class="todo-actions">
              <button class="edit-btn " onclick="editTodo(${index})">Edit</button>
              <button class="delete-btn" onclick="deleteTodo(${index})">Delete</button>
            </div>
          `;
        }
        list.appendChild(li);
      });
    }
    function deleteTodo(index) {
       const todo=todos[index];
       fetch('http://localhost:3000/deletetask',{
        method:'DELETE',
        headers:{'content-type':'application/json'},
        body:JSON.stringify({ID:todo.ID})
       })
         renderTodos();
    }


    function editTodo(index) {
      todos[index].editing =true;
      renderTodos();
    }
function saveTodo(index) {
  const updatedText = document.querySelector('.edit-input').value.trim();
  const todo = todos[index];

  fetch('http://localhost:3000/editTask', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ID: todo.ID,
      itemDesc: updatedText
    })
  })
  .then(response => response.json())
  .then(() => {
    todos[index].text = updatedText;
    todos[index].editing = false;
    renderTodos();
  })
  .catch(error => {
    console.error('Failed to save todo:', error);
  });
}

function cancelTodo(){
    todos.forEach(todo => {
        todo.editing = false;
    });
    renderTodos();
}

    function updateTodoText(event, index) {
  todos[index].text = event.target.value;
}