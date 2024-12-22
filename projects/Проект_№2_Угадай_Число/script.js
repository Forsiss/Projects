let targetNumber = Math.floor(Math.random() * 100) + 1; //Получение случайного числа
let timeLeftInSeconds = 60; //Время для таймера
let attemptsLeft = 10; //Количество попыток
let timerInterval; //Сам таймер
let isTimerStarted = false; //Проверяет запущен ли таймер
let changeDifficulty = document.getElementById('difficultyLevel');//Получаем значения для изменения сложности
let changeTimerDuration = document.getElementById('timeDuration');//Получаем значение для изменения времени таймера
let changeAttemptsQuantity = document.getElementById('attemptsQuantity')//Получаем значение для изменения количества попыток


function checkGuess() {// Функция для проверки всего процесса игры
  if (!isTimerStarted) {
    startTimer();
  }
  const playerGuess = parseInt(document.getElementById("guessInput").value);
  decreaseAttempts();
  document.getElementById("attemptsLeft").textContent = attemptsLeft;

  if (attemptsLeft === 0 || timeLeftInSeconds === 0) {
    endGame("Время вышло или вы исчерпали все попытки!");
    return;
  }

  if (playerGuess === targetNumber) {//Условие при котором игра заканчивается
    clearInterval(timerInterval);// Сброс таймера
    document.getElementById("result").textContent = "Поздравляем, вы угадали!";// Вывод результата
    document.getElementById("playAgainButton").style.display = "inline"; // Появление кнопки
  } else if (playerGuess < targetNumber) {//Условие при котором выводится подсказка
    document.getElementById("result").textContent = "Ваше число меньше загаданного.";
  } else {//Условие при котором выводится подсказка
    document.getElementById("result").textContent = "Ваше число больше загаданного.";
  }
}

function startTimer() {//Запуск таймера
  isTimerStarted = true;
  timerInterval = setInterval(updateTimer, 1000);//Установка интервала времени с отсчётом
}

function updateTimer() {//Отсчёт
  timeLeftInSeconds--;
  document.getElementById("timeLeft").textContent = timeLeftInSeconds;

  if (timeLeftInSeconds === 0) {// Условие при котором игра заканчивается
    endGame("Время вышло!");//Функция конец игры, с параметром
  }
}

function startGame() {//Запуск самой игры
  timeLeftInSeconds = 60;
  attemptsLeft = 10;
  isTimerStarted = false;
  document.getElementById("timeLeft").textContent = timeLeftInSeconds;// После старта в строке с оставшимся временем будет выведено значение оставшегося времени
  document.getElementById("attemptsLeft").textContent = attemptsLeft;// После старта в строке с оставшимися попытками будет выведено значение оставшихся попыток
  document.getElementById("result").textContent = "";// Очещение строки после предыдущей игры
  document.getElementById("guessInput").value = "";// Очищение строки после предыдущей игры
  document.getElementById("playAgainButton").style.display = "none";// Скрывание кнопки "начать заново"

    changeDifficulty.addEventListener('change', function(){// Добавляем обработчик событий на изменение сложности
    
      let selectedLevel = this.value.split("-"); //Значение выбранной сложности делиться на массив, т.к значений 2
      let minNumber = parseInt(selectedLevel[0]);// Первое значение после разделения
      let maxNumber = parseInt(selectedLevel[1]);// Второе значение после разделения
      targetNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber; // Получение случайного числа из заданных значений массива 
      console.log(targetNumber); //Проверка
    });

    changeTimerDuration.addEventListener('change', function(){ //Обработчик событий для изменения длительности времени

      let selectedDuration = this.value;// Получение значения из changeTimerDuration
      timeLeftInSeconds = parseInt(selectedDuration) + 1; // Присвоение этого значения в timeLeftInSeconds чтобы работала функиця отсчёт
      console.log(timeLeftInSeconds);//Проверка
      updateTimer();// Отсчёт

    });

    changeAttemptsQuantity.addEventListener('change', function(){//Обработчик событий для изменения сложности

      let selectedQuantity = this.value;// Получения значения из changeAttemptsQuantity
      attemptsLeft = parseInt(selectedQuantity) + 1;// Для того чтобы работала функиця присваиваем это значение в переменную attemptsLeft(Оставшиеся попытки)
      console.log(attemptsLeft)//Проверка
      decreaseAttempts();//Функция для уменьшения количества попыток

    });
}

function endGame(message) {//Функция завершения игры когда попытки или время заканчиваются
  clearInterval(timerInterval);//Сброс таймера
  document.getElementById("result").textContent = message;// Присвоение результату параметр функции
  document.getElementById("playAgainButton").style.display = "inline"; // Появление кнопки начать заново
}

function decreaseAttempts(){// Функция для вычета попыток
    if(attemptsLeft > 0){// Условие, при котором выполняются действия
        attemptsLeft--;
        document.getElementById('attemptsLeft').textContent = attemptsLeft;
    }
};


startGame();//Запуск игры