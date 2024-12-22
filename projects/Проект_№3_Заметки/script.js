const taskInput = document.getElementById("task-input");// Ввод инфы
const addTaskButton = document.getElementById("add-task");// Кнопка
const taskList = document.getElementById("task-list");// Список
const taskDate = document.getElementById("task-date");// Дата


function addTask() {// Функция для добавления задачи 
    const taskText = taskInput.value.trim(); // Получение значения из ввода и удаление лишних пробелов методом trim
    const taskDateTime = taskDate.value; // Получение значения из даты
    const taskInnerText = {//Внутренний текст задачи
        taskText,
        taskDateTime,
    };
    if (taskText !== '') {//Условие при котором создаётся задача
        const taskItem = document.createElement('li'); // Создаётся предмет списка, задача
        const taskCheckbox = document.createElement('input');// Создаётся область для отметки
        taskCheckbox.type = 'checkbox';// Задаётся тип вводу(input)
        taskCheckbox.addEventListener('change', toggleTaskStatus); // Обработчик событий для отметки на изменение класса
        const taskLabel = document.createElement('label'); // Создаётся этикетка
        taskLabel.textContent = taskInnerText.taskText + " " + taskInnerText.taskDateTime; // Присвоение значений объекта taskInnerText
        const deleteButton = document.createElement('button');// Добавление кнопки удаления заметки
        deleteButton.textContent = 'Удалить'; // То что будет вписано в кнопку
        deleteButton.addEventListener('click', taskDeleteButton); // Обработчик событий для кнокпи на клик выполняется функция
        taskItem.appendChild(taskCheckbox);
        taskItem.appendChild(taskLabel);
        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);
    }
};

function toggleTaskStatus(event){// Функция с событием добавления/удаления
    const taskItem = event.target.parentNode;// Предмет задачи, которому присвается значение родителя(taskCheckbox)
    taskItem.classList.toggle('completed');// Добавление или удаление класса
};

function taskDeleteButton(event){// Функция с событием удалени
    const taskItem = event.target.parentNode;// Предмет задачи, которому присваивается значение родителя(taskList)
    taskList.removeChild(taskItem);// Удаление дочернего элемента
};

addTaskButton.addEventListener('click', addTask);// Обработчик событий на клик, выполняется функция