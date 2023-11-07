const onUserInput = document.querySelector('.inputTask'),
      onBtnTask = document.querySelector('.btnTask'),
      container = document.querySelector('.container');

onBtnTask.addEventListener('click', () => {
const inputText = onUserInput.value.trim();

if (!inputText) {
    alert('You need to write something!');
    return;
}

const div = document.createElement('div');

const checkbox = document.createElement('input');
checkbox.type = 'checkbox';  
checkbox.className = 'todoTaskButton';

div.classList.add('todoTask');
div.append(checkbox);
div.append(inputText);
div.style.display = 'block';
container.append(div);
onUserInput.value = '';
});




