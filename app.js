const   onUserInput = document.querySelector('.inputTask'),
        onBtnTask = document.querySelector('.btnTask'),
        container = document.querySelector('.container');

let tasks = [];

onBtnTask.addEventListener('click', () => {
let inputText = onUserInput.value.trim();

    if (!inputText) {
        alert('You need to write something!');
        return;
    }

    if(inputText.length > 50) {
        inputText = inputText.slice(0, 50) + '...'
    }

    const div = document.createElement('div');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';  
    checkbox.className = 'todoTaskButton';

    const taskText = document.createElement('span');
    taskText.textContent = inputText;

    div.classList.add('todoTask');
    div.append(checkbox);
    div.append(taskText);
    div.style.display = 'block';
    container.append(div);
    onUserInput.value = '';
    tasks.push(div);

    const footerTask = document.querySelector('.footerTask');

    footerTask.innerHTML = ` 
        <div id="oneHover" class="itemsLeft">${tasks.length} item(s) left</div>
        <div class="moreBtn">
        <div id="oneHover" class="activeA">All</div>
        <div id="oneHover" class="activeB">Active</div>
        <div id="oneHover" class="activeC">Completed</div>
        </div>
        <div id="oneHover" class="clearCompleted">Clear Completed</div>
    `;
});

container.addEventListener('click', (event) => {
    if (event.target.classList.contains('todoTaskButton')) {
        const currentCheckbox = event.target;
        const parentDiv = currentCheckbox.parentElement;
        const taskText = parentDiv.querySelector('span');
        taskText.style.textDecoration = currentCheckbox.checked ? 'line-through' : 'none';
    }
});
