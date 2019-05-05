const telegraf = require('telegraf');

exports.sendTelegramMessage = function sendTelegramMessage(content) {
	const bot = new telegraf.Telegram(functions.config().bot.token);
	return bot.sendMessage(functions.config().bot.chat, content);
}