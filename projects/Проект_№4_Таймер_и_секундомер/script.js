let timerInterval; // Время
let timerSeconds; // Секунды
let timerMinutes;// Минуты
let timerHours; // Часы
const firstPageButton = document.getElementById('showFirstTab'); // Первая страничка
const secondPageButton = document.getElementById('showSecondTab');// Вторая страничка
const timerTab = document.getElementById('timerTab');// Приложение Таймер
const stopwatchTab = document.getElementById('stopwatchTab');// Приложение секундомер
const history = document.getElementById('history');// История
const timerDisplay = document.getElementById('timer');// Экран таймера
const timerInputHours = document.getElementById('timerInputHours'); // Ввод для часов
const timerInputMinutes = document.getElementById('timerInputMinutes'); // Ввод для минут
const timerInputSeconds = document.getElementById('timerInputSeconds');// Ввод для секунд
const startTimerButton = document.getElementById('startTimer');// Старт таймера
const resetTimerButton = document.getElementById('resetTimer');//Сброс таймера
const setTimeButton = document.getElementById('setTime');

timerTab.style.display = 'none';//Скрытие таймера с экрана
stopwatchTab.style.display = 'none';//Скрытие секундомера с экрана

firstPageButton.addEventListener('click', function(){//Функция для включение первого приложения
    timerTab.style.display = 'block';
    stopwatchTab.style.display = 'none';
    startTimerButton.disabled = true;

});

secondPageButton.addEventListener('click', function(){//Включение второго приложения
    stopwatchTab.style.display = 'block';
    timerTab.style.display = 'none';

})

function updateTimer() {//Отсчёт для таймера
    timerDisplay.textContent = `${timerHours.toString().padStart(2, '0')}:${timerMinutes.toString().padStart(2, '0')}:${timerSeconds.toString().padStart(2, '0')}`;// Вывод экрана таймера
    timerSeconds--;
    if (timerSeconds < 0) {// Условие при котором отнимается минута
    timerSeconds = 59;
    timerMinutes--;
    if (timerMinutes < 0) {//Условие при котором отнимается час
        timerMinutes = 59;
        timerHours--;
        if (timerHours < 0) {//Условие при котором таймер перестаёт работать
        stopTimer();
        alert('Время вышло!');
        return;
        }
    }
    }
}

function setTimer(){
    timerSeconds = parseInt(timerInputSeconds.value);;// Значение берётся из ввода
    timerMinutes = parseInt(timerInputMinutes.value);;
    timerHours = parseInt(timerInputHours.value);
    timerDisplay.textContent = `${timerHours.toString().padStart(2, '0')}:${timerMinutes.toString().padStart(2, '0')}:${timerSeconds.toString().padStart(2, '0')}`;// Вывод экрана таймера
}

function startTimer() {// Функция для старта таймера
    timerInterval = setInterval(updateTimer, 1000);//Устанавливается таймер
    startTimerButton.textContent = 'Стоп';// После нажатия на кнопку изменится текст внутри
    updateTimer();// Обновление таймера
}

function stopTimer() {// Остановка таймера
    clearInterval(timerInterval);// Сброс времени
    startTimerButton.textContent = 'Старт';// Изменение внутреннего текста кнопки
    startTimerButton.disabled = true;
}

function resetTimer() {// Сброс времени таймера
    clearInterval(timerInterval);
    timerSeconds = parseInt(timerInputSeconds.value);
    timerMinutes = parseInt(timerInputMinutes.value);
    timerHours = parseInt(timerInputHours.value);
    timerDisplay.textContent = '00:00:00';
    startTimerButton.textContent = 'Старт';
    timerInputSeconds.value = 0;
    timerInputMinutes.value = 0;
    timerInputHours.value = 0;
}

setTimeButton.addEventListener('click', ()=>{
    setTimer();
    startTimerButton.disabled = false;
})

startTimerButton.addEventListener('click', () => {//Обработчик событий для кнопки Старт/Стоп таймера
    if (startTimerButton.textContent === 'Старт') {//Условие при котором работает первая функция и меняет кнопку
    startTimer();
    startTimerButton.disabled = false;
    } else {//Это условие работает иначе, когда в текст кнокпи 'Стоп'
    stopTimer();
    startTimerButton.disabled = false;
    }
});

resetTimerButton.addEventListener('click', resetTimer);//Сброс времени

// Секундомер
let stopwatchInterval;// Интервал для секундомера
let stopwatchSeconds = 0; //Секунды
let stopwatchMinutes = 0; //Минуты
let stopwatchHours = 0; // Часы
const stopwatchDisplay = document.getElementById('stopwatch'); // Экран секундомера
const startStopwatchButton = document.getElementById('startStopwatch'); // Кнопка старт
const stopStopwatchButton = document.getElementById('stopStopwatch'); // Кнопка стоп
const resetStopwatchButton = document.getElementById('resetStopwatch'); // Кнопка сброс
const recordStopwatchButton = document.getElementById('recordStopwatch'); // Кнопка запись

function updateStopwatch() {//Отсчёт
    stopwatchSeconds++;
    if (stopwatchSeconds >= 60) {
    stopwatchSeconds = 0;
    stopwatchMinutes++;
    if (stopwatchMinutes >= 60) {
        stopwatchMinutes = 0;
        stopwatchHours++;
    }
    }
    stopwatchDisplay.textContent = `${stopwatchHours.toString().padStart(2, '0')}:${stopwatchMinutes.toString().padStart(2, '0')}:${stopwatchSeconds.toString().padStart(2, '0')}`;// Вывод экрана секундомера
}

function startStopwatch() {//Старт таймера
    stopwatchInterval = setInterval(updateStopwatch, 1000);// Отсчёт
    startStopwatchButton.disabled = true;//Кнопка старт выключается после запуска функии
    stopStopwatchButton.disabled = false;//Кнопка стоп включается после запуска функции
}

function stopStopwatch() {
    clearInterval(stopwatchInterval);
    startStopwatchButton.disabled = false;//Кнопка старт включается после запуска функции
    stopStopwatchButton.disabled = true; //Кнопка стоп выключается после запуска функии
}

function resetStopwatch() {//Сброс секундомера
    clearInterval(stopwatchInterval);//Сброс таймера
    stopwatchSeconds = 0;
    stopwatchMinutes = 0;
    stopwatchHours = 0;
    stopwatchDisplay.textContent = '00:00:00';// Всё сбрасывается до 0
    startStopwatchButton.disabled = false;//Кнопка старт включается
    stopStopwatchButton.disabled = false;// Кнопка стоп выключается
}

function recordStopwatch() {//Функция записи времени в историю
    const time = `${stopwatchHours.toString().padStart(2, '0')}:${stopwatchMinutes.toString().padStart(2, '0')}:${stopwatchSeconds.toString().padStart(2, '0')}`;// Экран секундомера
    const recordList = document.getElementById('recordList'); //Список
    const newListItem = document.createElement('li');// Создаётся элемент списка
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.addEventListener('click', taskDeleteButton);
    newListItem.textContent = `Секундомер: ${time}`;// Элементу присвается время
    recordList.appendChild(newListItem);//В список добавляется элемент
    newListItem.appendChild(deleteButton);
}

function taskDeleteButton(event){// Функция с событием удалени
    const newListItem = event.target.parentNode; // Предмет задачи, которому присваивается значение родителя(taskList)
    recordList.removeChild(newListItem);// Удаление дочернего элемента
    localStorage.removeItem('stopwatchHistory', stopwatchHistory);// Удаление записи из личного хранилища
};

startStopwatchButton.addEventListener('click', startStopwatch);//Обработчик событий для старта секундомера
stopStopwatchButton.addEventListener('click', stopStopwatch);//Обработчик событий для остановки секундомера
resetStopwatchButton.addEventListener('click', resetStopwatch);//Обработчик событий для сброса секундомера
recordStopwatchButton.addEventListener('click', recordStopwatch);//Обработчик событий для записи секундомера

// История
const historyList = document.getElementById('recordList'); //Получаем список записей
const stopwatchHistory = localStorage.getItem('stopwatchHistory');// Создаём хранилище для истории секундомера

if (stopwatchHistory) {//Проверка на наличие переменной
    stopwatchHistory.split(',').forEach(time => {// История делит элементы на индексы в массиве по запятой и потом перебирает каждый и выполняет следующий код
    const newListItem = document.createElement('li');// Создаёт элемент
    newListItem.textContent = `Секундомер: ${time}`;// Вписывает в элемент значение времени
    historyList.appendChild(newListItem); // Добавляет предмет списка в сам список
    const deleteButton = document.createElement('button'); // Создаёт элемент
    deleteButton.textContent = 'Удалить';// Вписывает текст в него
    deleteButton.addEventListener('click', taskDeleteButton); // Добавляет обработчик событий с функцией
    newListItem.appendChild(deleteButton); // Добавляет кнопку в сам предмет списка
    });
}

// Сохранение истории
function saveStopwatchHistory() {//Функция которая сохраняет историю секундомера
    const time = `${stopwatchHours.toString().padStart(2, '0')}:${stopwatchMinutes.toString().padStart(2, '0')}:${stopwatchSeconds.toString().padStart(2, '0')}`;// Получаем экран таймера
    let stopwatchHistory = localStorage.getItem('stopwatchHistory');// Создаём хранилище для предметов списка
    if (stopwatchHistory) {//Если переменная есть то выполняется условие
    stopwatchHistory += `,${time}`;// Добавление Времени в хранилище
    } else {
    stopwatchHistory = time;// Не ебу
    }
    localStorage.setItem('stopwatchHistory', stopwatchHistory);// Полученное значение засовываем в хранилище
}
recordStopwatchButton.addEventListener('click', saveStopwatchHistory);//Обработчик событий для кнопки запись 