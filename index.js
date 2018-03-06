

require("dotenv").config();
const bot_token = process.env.SLACK_TOKEN;
const verification_token = process.env.VERIFICATION_TOKEN;

const { WebClient, RtmClient, CLIENT_EVENTS, RTM_EVENTS } = require('@slack/client');

const channelId = process.env.CHANNEL_ID;

const appData = {};

const web = new WebClient(bot_token);

const rtm = new RtmClient(bot_token, {
  dataStore: false,
  useRtmConnect: true
});

rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (connectData) => {
    appData.selfId = connectData.self.id;
    console.log(`Logged in as ${appData.selfId} of team ${connectData.team.id}`);
});

rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, () => {
    console.log(`Ready`);
});

rtm.on(RTM_EVENTS.MESSAGE, (message) => {
    console.dir(message);
    rtm
      .sendMessage(`message sent to channel name: ${message.channel}`, channelId)
      .then(() => {
        console.log(`message sent to channel name: <${message.channel}>`);
      })
      .catch(console.error);
});

rtm.start();


