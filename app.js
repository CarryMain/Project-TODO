const onUserInput = document.querySelector('.inputTask'),
    onBtnTask = document.querySelector('.btnTask'),
    container = document.querySelector('.container');

let tasks = [];

onBtnTask.addEventListener('click', () => {
let inputText = onUserInput.value.trim();

    if (!inputText) {
        alert('You need to write something!');
        return;
    }

    if(inputText.length > 30) {
        inputText = inputText.slice(0, 30) + '...'
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

    updateFooter();
    removeTodo();
});

function visibilityFilter(filter) {
    tasks.forEach(task => {
            switch (filter) {
                case "all":
                    task.style.display = "block";
                    break;
                case "active":
                    if (task.getElementsByTagName('input')[0].checked) {
                        task.style.display = "none";
                    } else {
                        task.style.display = "block";
                    }
                    break;
                case "completed":
                    if (!task.getElementsByTagName('input')[0].checked) {
                        task.style.display = "none";
                    } else {
                        task.style.display = "block";
                    }
                    break;
            }
        });
}

function updateTodoCount() {
    let count = 0;
    for(let i = 0; i < tasks.length; i++) {
        const checkbox = tasks[i].querySelector('.todoTaskButton');
        if (!checkbox.checked) {
            count++;
        }
    }
    return count;
}


function updateFooter() {
    const footerTask = document.querySelector('.footerTask');

    let activeA = document.querySelector('.activeA');
    let activeB = document.querySelector('.activeB');
    let activeC = document.querySelector('.activeC');

    if(activeA) activeA.removeEventListener('click', visibilityFilter.bind(null, 'all'));
    if(activeB) activeB.removeEventListener('click', visibilityFilter.bind(null, 'active'));
    if(activeC) activeC.removeEventListener('click', visibilityFilter.bind(null, 'completed'));

    footerTask.innerHTML = ` 
        <div id="oneHover" class="itemsLeft"> item(s) left</div>
        <div class="moreBtn">
        <div id="oneHover" class="activeA">All</div>
        <div id="oneHover" class="activeB">Active</div>
        <div id="oneHover" class="activeC">Completed</div>
        </div>
        <div id="oneHover" class="clearCompleted">Clear Completed</div>
    `;

    document.querySelector('.itemsLeft').textContent = `${updateTodoCount()} item(s) left`;

    activeA = document.querySelector('.activeA');
    activeB = document.querySelector('.activeB');
    activeC = document.querySelector('.activeC');

    let arrayOfElements = [activeA, activeB, activeC];

    function removeClassFromAll(elements, className) {
         elements.forEach(element => element.classList.remove(className));
}
    
    activeA.addEventListener('click', () => {
        removeClassFromAll(arrayOfElements, 'maggi');
        visibilityFilter('all')
        activeA.classList.add('maggi');
    });

    activeB.addEventListener('click', () => {
        removeClassFromAll(arrayOfElements, 'maggi');
        visibilityFilter('active');
        activeB.classList.add('maggi');
    });

    activeC.addEventListener('click', () => {
        removeClassFromAll(arrayOfElements, 'maggi');
        visibilityFilter('completed');
        activeC.classList.add('maggi');
    });
}

function removeTodo() {
    let clearCom = document.querySelector('.clearCompleted');
    clearCom.addEventListener('click', () => {
        tasks = tasks.filter(task => {
            const checkbox = task.querySelector('.todoTaskButton');
            if (checkbox.checked) {
                task.remove();
                return false;
            }
            return true;
        });
        updateFooter();
    })
}


container.addEventListener('click', (event) => {
    if (event.target.classList.contains('todoTaskButton')) {
        const currentCheckbox = event.target;
        const parentDiv = currentCheckbox.parentElement;
        const taskText = parentDiv.querySelector('span');
        taskText.style.textDecoration = currentCheckbox.checked ? 'line-through' : 'none';
        
    }
});