// выпадающее меню
//1.кнопка открытия-закрытия
//2.Меню
const tbtn = document.querySelector('#tbtn');
const dropdownMenu = document.getElementById('dropdownMenu');

tbtn.addEventListener('click', function() {
    if (dropdownMenu.style.display === 'none' || dropdownMenu.style.display === "") {
        dropdownMenu.style.display = 'block'
    } else {
        dropdownMenu.style.display = 'none'
    }
})

window.addEventListener('click', function (event) {
    if (!event.target.matches('#tbtn')) {
        dropdownMenu.style.display = 'none';
    }
})


//выпадающее меню с подпунктами
//1. Все пункты меню
//2. Подменю

const mainMenuItems = document.querySelectorAll('.main-menu li')

mainMenuItems.forEach( function (item) {
    item.addEventListener('mouseover', function () {
        const submenu = item.querySelector('.summenu')
            if (submenu) {
                submenu.style.display = 'block'
            }
    })
    item.addEventListener('mouseout', function () {
        const submenu = item.querySelector('.summenu')
            if (submenu) {
                submenu.style.display = 'none'
            }
            })
})

//слайдер
//1.кнопки туда/обратно
//2.слайды
const prevbtn = document.getElementById('prevbtn')
const nextbtn = document.getElementById('nextbtn')
const slides = document.querySelectorAll('.slide')

//Индекс текущего слайда
let currentslide = 0;

function showSlide(index) {
    slides.forEach((slide, i) =>{
        if (i === index) {
            slide.style.display = "block"
        } else {
            slide.style.display = "none" 
        }
    })
}
showSlide(currentslide)
prevbtn.addEventListener('click', function () {
    currentslide = (currentslide -1 + slides.length) % slides.length
    showSlide(currentslide)
})
nextbtn.addEventListener('click', function () {
    currentslide = (currentslide +1) % slides.length
    showSlide(currentslide)
});

//Форма обратной связи

// Найдем нашу форму и добавим обработчик событий submit
document.getElementById('feedbackForm').addEventListener('submit', function (event) {
    // Предотвращаем стандартное поведение формы (перезагрузка страницы)
    event.preventDefault();
    // Создаем объект FormData для сбора данных из формы
    let formData = new FormData(this);
    // Создаем пустой объект для хранения данных формы
    let feedbackData = {};
    // Преобразуем данные из объекта FormData в обычный объект
    formData.forEach(function (value, key) {
        feedbackData[key] = value;
    });
    // Добавляем дополнительное поле userId к данным формы
    feedbackData['userId'] = 1;
    // Делаем асинхронный HTTP-запрос методом POST к JSONPlaceholder
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
    })
    .then(response => response.json())
    .then(data => {
        // Выводим успешный результат в консоль
        console.log('Успешно отправлено:', data);
        // Очищаем значения полей формы
        this.reset();
    })
    .catch(error => {
        // Выводим ошибку в консоль
        console.error('Ошибка:', error);
        // Здесь можно добавить обработку ошибки
    });
});