const form = document.querySelector('form');
const log = form.querySelector('[name="name"]');
const pass = form.querySelector('[name="pswd"]');
const wrapper = document.querySelector('.wrapper');

let user = JSON.parse(localStorage.getItem('user')) || [];

form.addEventListener('submit', account);

function account(e) {
    e.preventDefault();


    let regex = /^[^~!#$%^&*()+\`'";:<>/\\|]+$/;
    if (regex.test(log.value) && regex.test(pass.value) && pass.value.trim() !== '') {
        let login = {
            name: log.value,
            pswd: pass.value,
        };
    
        user.push(login);
        localStorage.setItem('user', JSON.stringify(user));
        displayMessages();
    
        log.value = '';
        pass.value = '';
    } else {
        alert('Данные введены не верно. Повторите попытку ещё раз');
    }
}

function displayMessages() {
    let displayMessage = '';
    user.forEach((item, i) => {
        displayMessage += `
        <div id="user-${i}">
            <label>
                Логин: ${item.name}
            </label>
            <label>
                Пароль: ${item.pswd}
            </label>
            <button onclick="deleteMessage(${i})">Удалить</button>
            <input type="checkbox" id="cheked-${i}" ${item.checked ? 'checked' : ''} onchange="toggleChecked(${i})">
        </div>
        `;
    });
    wrapper.innerHTML = displayMessage;
}

function deleteMessage(i) {
    user.splice(i, 1);
    localStorage.setItem('user', JSON.stringify(user));
    displayMessages();
}

function toggleChecked(i) {
    user[i].checked = !user[i].checked;
    localStorage.setItem('user', JSON.stringify(user));
}