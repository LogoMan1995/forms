const form = document.querySelector('form');
const wrapper = document.querySelector('.wrapper');
const deleteBtn = document.querySelector('#delete_btn')

window.onload = () => {
    renderList();
};


let todos = JSON.parse(localStorage.getItem('todos')) || [];
form.addEventListener('submit', formEvent);

function formEvent(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const todoText = formData.get('todo');
    
    
    const todo = {
        checked: false,
        text: todoText
    };

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
    renderList();

    e.target.reset();
}

function renderList() {
    wrapper.innerHTML = "";
    
    todos.forEach((todo, i) => {
        wrapper.innerHTML += `
            <div id="user-${i}">
                <label for='todo-check'>
                    ${i + 1}. ${todo.text}
                </label>
                <button onclick="deleteMessage(${i})">Удалить</button>
                <input type="checkbox" name='todo-check' id="cheked-${i}" ${todo.checked ? 'checked' : ''} onchange="toggleChecked(${i})">
            </div>
        `;
    });
}

function deleteMessage(i) {
    todos.splice(i, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    renderList();
}

function toggleChecked(i) {
    todos[i].checked = !todos[i].checked;
    localStorage.setItem('todos', JSON.stringify(todos));
}


deleteBtn.addEventListener('click', () => {
    todos.forEach((todo, i) => {
        if(todo.checked === true){
            todos.splice(i, 1);
        }
    })
    localStorage.setItem('todos', JSON.stringify(todos));
    renderList();
}) 