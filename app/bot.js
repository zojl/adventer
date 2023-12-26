const locMessages = {
    noHintsToday: "No hints for today...",
    noHintsTomorrow: "No hints for tomorrow, check your config!",
}
const commands = ['where', 'where?', '/where', '/where?', 'advent', '/advent'];

const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

const tgToken = process.env.TELEGRAM_API_TOKEN;
const bot = new TelegramBot(tgToken, {polling: true});
const secretCommand = process.env.SECRET_COMMAND;

bot.on('message', async (msg) => {
    if (process.env.ENV === 'dev') {
        console.debug(msg);
    }
    
    if (typeof(msg.text) === 'undefined') {
        return;
    }
    
    if (commands.includes(msg.text.toLocaleLowerCase())) {
        return handleAdvent(msg.chat.id);
    }

    if (msg.text === secretCommand) {
        handleSecret(msg.chat.id, (Math.floor(new Date().getTime() / 1000 + 24*60*60)));
    }
});

function handleAdvent(chatId) {
    const adventHint = getAdventHintData(new Date());
    
    if (adventHint === null) {
        return bot.sendMessage(chatId, locMessages['noHintsToday']);
    }
    
    bot.sendMessage(chatId, adventHint.location);
}

function handleSecret(chatId) {
    const tomorrowDate = new Date();
    tomorrowDate.setDate((new Date()).getDate() + 1)
    const adventHint = getAdventHintData(tomorrowDate);
    
    if (adventHint === null) {
        return bot.sendMessage(chatId, locMessages['noHintsTomorrow']);
    }
    
    return bot.sendMessage(chatId, `${adventHint.gift} @ ${adventHint.location}`);
}

function getAdventHintData(selectedDate) {
    const jsonString = fs.readFileSync('./conf/hints.json', 'utf-8');
    const adventHints = JSON.parse(jsonString);
    
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1;
    const day = selectedDate.getDate();
    const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
    
    if (adventHints[formattedDate]) {
        return adventHints[formattedDate];
    }
    
    return null;
}