const chatMessages = document.querySelector('.chat-messages');// Получаем сообщение чата
const chatInput = document.getElementById('chat-input'); // Ввод в чат

function addMessage(message) {//Функция добавления сообщения в чат
  const messageElement = document.createElement('div');// Создаём само сообщение
  messageElement.textContent = message;// То, что вписано в чат отобразиться внутри сообщения
  chatMessages.appendChild(messageElement);// Добавляем сообщение в чат
  chatMessages.scrollTop = chatMessages.scrollHeight;// Прокрутка
}
function sendMessage() {// Отправка сообщений
  const message = chatInput.value.trim();// Удаляются лишние пробелы
  if (message) {//Если сообщение существует
    addMessage(message);//Добавляется
    chatInput.value = '';//Ввод в чат обновляется
  }
}
chatInput.addEventListener('keydown', (event) => {//Обработчик событий на нажатие кнопки
  if (event.key === 'Enter') {//Если нажат Enter
    sendMessage();//Выполняется отправка сообщения
  }
});