import country_list from "./country_list.js";
import apiKey from "./apikey.js";

// Константы из index.js
const dropList = document.querySelectorAll(".drop-list select");
const getButton = document.querySelector("form button");
const fromCurrency = document.querySelector(".From select");
const toCurrency = document.querySelector(".To select");
const exchangeIcon = document.querySelector(".drop-list .icon");


//Цикл, чтобы внести в select данные из списка country_list и через if задаётся базовая валюта
for(let i = 0;  i < dropList.length; i++){
    for(let currency_code in country_list){
        // selecting "Currency" by default as FROM currency and NPR as TO currency
        let selected;
        if(i === 0){
            selected = currency_code === "USD" ? "selected" : ""; // first column
        } else if (i == 1){
            selected = currency_code === "RUB" ?  "selected" : ""; // second column
        }
        let optionTag = `<option value="${currency_code}" ${selected}> ${currency_code}</option>` // Метка по для выбора валюты
        dropList[i].insertAdjacentHTML('beforeend', optionTag) // insert the value into select-box at the begin to the end
    }
    dropList[i].addEventListener("change", e=>{ // Обработчик событий чтобы менять флаги под соответствующую валюту
        loadFlag(e.target); // Вызов метода проходящий элементы цели(Флаги) как через аргументы
    });
}

function loadFlag(element){
    for(let code in country_list){
        if(code === element.value){ // Если код валюты из списка стран равняется значению опции
            let imgTag = element.parentElement.querySelector("img"); // Выбирает метку изображения для строки выпадающего списка
            imgTag.src = `https://flagcdn.com/48x36/${country_list[code].toLowerCase()}.png`// Выбирает подходящий код страны для выбранного значения
        }
    }
};

window.addEventListener("load", () =>{ // После загрузки функция прогонится один раз и выведет всю "Базу"
    getExchangeRate();
});

getButton.addEventListener("click", e =>{
    e.preventDefault(); // preventing form from submitting
    getExchangeRate(); // Функция которая выдаёт курс валют
});


exchangeIcon.addEventListener("click", ()=>{
    let tempCode = fromCurrency.value; // Временная валюта из ИЗ выпадающего списка
    fromCurrency.value = toCurrency.value; // Проходящая код В валюты к ИЗ валюты
    toCurrency.value = tempCode; // Проходяшая временную валюту к валюте В
    loadFlag(fromCurrency); //Смена флага ИЗ в В
    loadFlag(toCurrency); //Смена флага В в ИЗ
    getExchangeRate();
});

function getExchangeRate(){
    const amount = document.querySelector(".amount input"); // Количество валюты которое ввели в Input
    const exchangeRateTxt = document.querySelector(".exchange-rate"); // То что выводится после основного кода
    let amountVal = amount.value; // Значение количества валюты в новую переменную
    if(amountVal === "" || amountVal === "0"){//Если строка пустая то
        amount.value = "1";
        amountVal = 1;
    }
    exchangeRateTxt.innerText = "Getting exchange rate"; // Если пользователь не ввёл ничего или 0
    let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}` // После всех действий вставляем ссылку и начинаем работу с API;
    fetch(url).then(response => response.json()).then(result => {// Обращаемся к API проверяем на подключение console.log(result);
        console.log(result)
        let exchangeRate = result.conversion_rates[toCurrency.value]; // Получение значения из списка самого API и передача в переменную
        console.log(exchangeRate);
        let totalExchangeRate = (amountVal * exchangeRate).toFixed(2); // Настраиваем подсчёт курс валют и вызываем метод toFixed чтобы перевести в тип строка
        console.log(totalExchangeRate)
        exchangeRateTxt.innerHTML = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value} ` // Сравнение одной валюты с другой
    }).catch(() => {// Если произойдёт ошибка или пользователь будет оффлайн
        exchangeRateTxt.innerText = "Something went wrong";
    });
};


