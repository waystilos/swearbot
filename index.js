// Allows you to access your environtment variables in your env file
require("dotenv").config();

// assigning token to bot_token
const bot_token = process.env.SLACK_TOKEN;

// requiring botkit to the project
const Botkit = require("botkit");

// inititializing bot for simple RTM https://api.slack.com/rtm
// setting require delivery to true so our messages are sent in order
const controller = Botkit.slackbot({
  debug: false,
  require_delivery: true
});

// spawns an instance of the bot and connects to slack
// Because we're using RTM, we have to pass the token
const bot = controller.spawn({
  token: bot_token
});

// setting channelId
const channelId = process.env.CHANNEL_ID;

// opens a connection to slacks real time API
// the payload provides a ton of information. This info should be cached for performance
bot.startRTM((err, bot, payload) => {
  if (err) {
      console.error(err);
    throw new Error("Not working foo");
  }
});

controller.on(
  ["message_received", "direct_mention", "direct_message", "ambient"],
  (bot, message) => {
    console.dir(message);
    bot.reply(message, `hey <@${message.user}>, I heard you said ${message.text}!`);
  }
);

controller.hears(
  ["damn", "shit", "fuck", "ass", "hate"],
  ["direct_message", "direct_mention", "mention", "ambient"],
  (bot, message) => {
    console.dir(message);
    bot.reply(message, `<@${message.user}> said a bad word`);
  }
);
