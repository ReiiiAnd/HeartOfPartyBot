var TelegramBot = require('node-telegram-bot-api');

// Устанавливаем токен, который выдавал нам бот
var token = '1422948086:AAGOfViDOu7ooXR0d09wYUhb--nFKJWwG4M';


// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

function ExpectMatch(str){
    const pattern = /[A-Za-z - A-Za-z]/
    if(str.search(pattern) == -1){
        return "sorry";
    }
    return str
}

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  var resp = match[1]; // the captured "whatever"
    resp = ExpectMatch(resp)
  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'Received your message');
});
