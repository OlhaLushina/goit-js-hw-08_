var throttle = require('lodash.throttle');
import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const STORAGE_KEY = "videoplayer-current-time";

// Завантаження сторінки
loadPage();

// Подія оновлення часу відтворення плеєра
player.on('timeupdate', throttle(onTimeupdate, 1000));

// Функція при оновленні часу відтворення плеєра
function onTimeupdate(data) {
    console.log(data.seconds);
    // Зберігаємо у локальне сховище час відтворення плеєра
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data.seconds));
}

// Завантаження сторінки
function loadPage() {
    try {
        // Отримуємо із локального сховища час відтворення плеєра
        const seconds = JSON.parse(localStorage.getItem(STORAGE_KEY));

        // Устанавлюємо позицію часу на плеєрі
        player.setCurrentTime(seconds).then(function(seconds) {
        }).catch(function(error) {
        });
    } catch(error) {

    }
}
