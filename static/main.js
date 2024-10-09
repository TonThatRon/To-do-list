function fetchTodos() {
    fetch('/todos')
        .then(response => response.json())
        .then(todos => {
            const todoList = document.getElementById('todo-list');
            todoList.innerHTML = '';
            todos.forEach(todo => {
                const li = document.createElement('li');
                li.className = 'todo-item';
                if (todo.completed) {
                    li.classList.add('completed');
                }
                li.innerHTML = `
                    <span>${todo.title} - ${todo.description}</span>
                    <div>
                        <button onclick="toggleTodo(${todo.id}, ${!todo.completed})">
                            ${todo.completed ? 'Undo' : 'Complete'}
                        </button>
                        <button onclick="deleteTodo(${todo.id})">Delete</button>
                    </div>
                `;
                todoList.appendChild(li);
            });
        })
        .catch(error => console.error('Error:', error));
}
function addTodo(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    fetch('/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
        fetchTodos();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function toggleTodo(id, completed) {
    fetch(`/todos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        fetchTodos();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function deleteTodo(id) {
    fetch(`/todos/${id}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            fetchTodos();
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

document.addEventListener('DOMContentLoaded', fetchTodos);
document.getElementById('todo-form').addEventListener('submit', addTodo);