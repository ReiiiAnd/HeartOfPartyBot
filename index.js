var TelegramBot = require('node-telegram-bot-api');

// Устанавливаем токен, который выдавал нам бот
var token = '1422948086:AAGOfViDOu7ooXR0d09wYUhb--nFKJWwG4M';
// Включить опрос сервера. Бот должен обращаться к серверу Telegram, чтобы получать актуальную информацию
// Подробнее: https://core.telegram.org/bots/api#getupdates
var bot = new TelegramBot(token, { polling: true });

function TestRegex(str, regex){
    return str.search(regex) != -1;
}

// Написать мне ... (/echo Hello World! - пришлет сообщение с этим приветствием, то есть "Hello World!")
bot.onText(/\/echo (.+)/, function (msg, match) {
    var fromId = msg.from.id; // Получаем ID отправителя
    var resp = match[1]; // Получаем текст после /echo
    var pattern = /[A-Za-z - A-Za-z]/
    var error = 'sorry.. but I can\'t understand you'
    if(TestRegex(resp, pattern)){
        bot.sendMessage(fromId, resp);
    }
    else{
        bot.sendMessage(fromId, error);
    }
});

// Простая команда без параметров
bot.on('message', function (msg) {
    var chatId = msg.chat.id; // Берем ID чата (не отправителя)
   // var fromId = msg.from.id;
    // Фотография может быть: путь к файлу, поток (stream) или параметр file_id
    var photo = 'cats.png'; // в папке с ботом должен быть файл "cats.png"
   // bot.sendMessage(fromId, "Maybe you want this...")
    bot.sendPhoto(chatId, photo, { caption: 'Is that what you\'re looking for' });
});
