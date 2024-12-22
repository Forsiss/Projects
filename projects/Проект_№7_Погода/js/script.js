import apiKey from "./apiKey.js";

const form = document.querySelector('.head-banner form');
const input = document.querySelector('.head-banner input');
const msg = document.querySelector('.head-banner .msg');
const list = document.querySelector('.ajax-section .cities');



form.addEventListener("submit", e => {
    e.preventDefault(); // To prevent rebooting the web-page
    let inputVal = input.value;  // bring out the input value of const input
    
    // checks if there's already a city
    const listItem = list.querySelectorAll('.ajax-section .city'); // Кусок целого списка list
    const listItemsArray = Array.from(listItem); // Создаём массив из кусков списка list

    if(listItemsArray.length > 0){
        const filteredArray = listItemsArray.filter( el => { // sort array to check if city already is in list
            let content = ""; // variable to output value of el function

            if(inputVal.includes(',')){ // checks if User introduce city and city-code
                if(inputVal.split(',')[1].length > 2){ // Принимает второе значение массива или же код города и проверяет его, если оно > 2, тогда
                    inputVal = inputVal.split(',')[0]; // Введённое значение принимает первое значение массива или же название города
                    content = el.querySelector(".city-name span").textContent.toLowerCase(); // Принимает название города
                } else {
                    content = el.querySelector('.city-name').dataset.name.toLowerCase(); // Принимает название загаловка если первое условие не выполнится
                }
            }   else    {
                content = el.querySelector('.city-name span').textContent.toLowerCase(); // Принимает название города
            }
            return content == inputVal.toLowerCase(); // Возвращает введнённое значение или же название города
        });

    if(filteredArray.length > 0)   { // Если длина массива > 0
        msg.textContent = `You already know the weather for ${
        filteredArray[0].querySelector(".city-name span").textContent
      } ...otherwise be more specific by providing the country code as well 😉` // Присвоили первое значение отфильтрованного массива или же название города
        form.reset(); // Сброс
        input.focus(); // Выделение
        return;
    };
}

// ajax here
const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

fetch(url)
    .then(response => response.json())
    .then(data => {
        /* 
            `const { main, name, sys, weather} = data;`:
            Это деструктуризация объекта `data`.  Из объекта `data` извлекаются следующие свойства:
            `main` - содержит основную информацию о погоде (температура, давление, влажность).
            `name` - имя города.
            `sys` - содержит информацию о стране и восходе/закате.
            `weather` - содержит массив с описанием текущей погоды (состояние, иконка). 
        */
        const { main, name, sys, weather} = data;
        const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`; // Создаём "иконку" и указываем ссылку
        
        const li = document.createElement('li'); // Создаём элемент li 
        li.classList.add('city'); // Добавляем класс элементу li
        /*
        Создаём маркировку для li или же города
        1.Создаём заголовок и указываем class и data-name, потом указываем это же в span и sup
        2.Создаём контейнер(div) указываем class и записываем в него температуру
        3.Создаём изображение и вкладываем в него значение weather
        4.Присваиваем значение markup(маркировки) внутреннему описанию li
        5.В list создаём дочернюю строку li
        Если что-то непонятно смотреть выше
        */
        const markup = `
        <h2 class = "city-name" data-name = "${name},${sys.country}">
            <span>${name}</span>
            <sup>${sys.country}</sup>
        </h2>
        <div class = "city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
        <figure>
            <img class="city-icon" src="${icon}" alt="${
        weather[0]["description"]
        }">
                <figcaption>${weather[0]["description"]}</figcaption>
            </figure>
        `;
        li.innerHTML = markup;
        list.appendChild(li);
    })
    .catch(() => {
        msg.textContent = "Please search for a valid city"; // Вызывает ошибку, если города нет в списке
    });

    msg.textContent = "";
    form.reset();
    input.focus();
});