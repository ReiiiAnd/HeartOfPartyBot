var TelegramBot = require('node-telegram-bot-api');
var Stream = require('fs');
var token = '1422948086:AAGOfViDOu7ooXR0d09wYUhb--nFKJWwG4M';

var flag = false
const bot = new TelegramBot(token, {polling: true});

function PatterningString(str){
	str = str.replace('...', 'autor')
	str = str.replace(/\s{0,}:\s{0,}/, '@')
	str = str.replace(/\s+/g, '_')
	str = str.toUpperCase()
	return str
}

function AddNodeToFile(nameOfFile, str, user_id){
	var record = '\n' + user_id + ' # ' + str
	Stream.appendFileSync(nameOfFile, record)
}

function SearchContent(nameOfFile, pattern){
	var output = Stream.readFileSync(nameOfFile)

	var rez = output.toString().match(pattern)
	return rez
}

function FileContent(nameOfFile){
	var output
	Stream.readFile(nameOfFile, (err, data)=> {
		if(err) throw err

		output = data;
	})

	return output
}

function ExpectMatch(str, user_id){
	var pattern = new RegExp("[A-Za-z0-9_\'. ]:[A-Za-z0-9_\'. ]")
    if(str.search(pattern) != -1){
	str = PatterningString(str)
    	var fileName = "music_list.txt"
    	var heard = SearchContent(fileName, str)
    	if(heard){
    		return 'yes I know this song'
    	}
	AddNodeToFile(fileName, str , user_id)
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
	bot.sendMessage(chatId, 'Yaa! send me a title of your favorite song!\n like this:\n\/send Lynyrd Skynyrd : Sweet Home Alabama')
});

bot.onText(/\/list/, (msg) => {
	flag = true
	const chatId = msg.from.id
try{
	var answer = Stream.readFileSync('music_list.txt')
}
catch(e){
	bot.sendMessage(chatId, 'error')
}
	bot.sendMessage(chatId, answer)
})


bot.onText(/\/send (.+)/, (msg, match) => {
	flag = true

	const chatId = msg.from.id;
	var resp = match[1]; 
    resp = ExpectMatch(resp, chatId)
	bot.sendMessage(chatId, resp);
});

bot.on('message', (msg) => {
	const chatId = msg.chat.id
	if(flag){
		bot.sendMessage(chatId, '...')
		flag = false
	}
	else{
		bot.sendMessage(chatId, ')')
	}
});
