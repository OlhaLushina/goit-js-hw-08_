var throttle = require('lodash.throttle');

const refs = {
    form: document.querySelector('.feedback-form'),
    input: document.querySelector('input[name="email"]'),
    textarea: document.querySelector('textarea[name="message"]'),
}

let formData = {};
// Ключ для локального сховища
const STORAGE_KEY = "feedback-form-state"; 

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

// Завантаження сторінки
loadPage();

// Відправка форми
function onFormSubmit(e) {
    // Забороняємо перезавантаження сторінки
    e.preventDefault(); 

    // Очищуємо форму
    e.currentTarget.reset(); 

    // Очищуємо локальне сховище
    localStorage.removeItem(STORAGE_KEY);

    // Виводимо поточне значення полів форми
    console.log(formData);

    // Очищуємо змінну
    formData = {};
}

// Зміна полів форми
function onFormInput(e) {
    // Зберігаємо значення полів форми
    formData[e.target.name] = e.target.value;

    // Записуємо значення полів форми у локальне сховище
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

// Завантаження сторінки
function loadPage() {
    // Отримуємо дані з локального сховища
    try {
        formData = JSON.parse(localStorage.getItem(STORAGE_KEY));

        // Якщо в локальному сховищі є значення email, то заповнюємо його
        if (formData.email) {
            refs.input.value = formData.email;
        }

        // Якщо в локальному сховищі є значення textarea, то заповнюємо його
        if (formData.message) {
            refs.textarea.value = formData.message;
        }
    } catch(error) {

    }
}