

require("dotenv").config();
const bot_token = process.env.SLACK_TOKEN;

const Botkit = require('botkit');
const controller = Botkit.slackbot();
const bot = controller.spawn({
    token: bot_token
});

const channelId = process.env.CHANNEL_ID;

bot.startRTM((err, bot, payload) => {
    if(err) {
        throw new Error('Not working foo');
    }
});

controller.on("message_received", (bot, message) => {
  bot.reply(message, "I heard... something!" + message.teams);
});

controller.hears(
  "damn",
  ["direct_message", "direct_mention", "mention", "ambient"],
  (bot, message) => {
      console.dir(message);
    bot.reply(message, `<@${message.user}> said damn.`);
  }
);



