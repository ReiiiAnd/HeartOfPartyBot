var TelegramBot = require('node-telegram-bot-api');
var Stream = require('fs');
// Устанавливаем токен, который выдавал нам бот
var token = '1422948086:AAGOfViDOu7ooXR0d09wYUhb--nFKJWwG4M';

var flag = false
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

function AddNodeToFile(str, user_id){
	var record = '\n' + user_id + ' : ' + str
	Stream.appendFileSync("music_list.txt", record)
}

function ExpectMatch(str, user_id){
	var patterns = new RegExp("[a-zA-Z0-9\s] - [a-zA-Z0-9\s]")
    if(str.search(patterns) != -1){
	AddNodeToFile(str, user_id)
        return 'nice!'
    }
    return 'sorry.. but I can\'t understand you((('
}


bot.onText(/\/start/, (msg) => {
	flag = true
	const chatId = msg.from.id
	bot.sendMessage(chatId, 'Hi, mom... I need get \/help from you')
});

bot.onText(/\/help/, (msg) => {
	flag = true
	const chatId = msg.from.id
	bot.sendMessage(chatId, 'Yaa! send me a title of your favorite song!\n like this:\n\/send Lynyrd Skynyrd - Sweet Home Alabama')
});

// Matches "/echo [whatever]"
bot.onText(/\/send (.+)/, (msg, match) => {
	flag = true
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.from.id;
  var resp = match[1]; // the captured "whatever"
    resp = ExpectMatch(resp, chatId)
//   resp = 'sorry'
  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

bot.on('message', (msg) => {
	const chatId = msg.chat.id
	if(flag){
		bot.sendMessage(chatId, '...')
	}
	else{
		bot.sendMessage(chatId, ')')
	}
});
