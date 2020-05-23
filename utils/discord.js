import Discord from "discord.js";
import webhook from "webhook-discord";

const client = new Discord.Client();
const PREFIX = "!";

client.once("ready", () => {
  console.log("discord client is ready");
});

client.on("message", async (message) => {
  if (message.content.startsWith(PREFIX)) {
    const input = message.content.slice(PREFIX.length).split(" ");
    const command = input.shift();
    const commandArgs = input.join(" ");

    if (command === "test") {
      console.log("test worked");
    }

    if (command === "weebhook") {
      if (!process.env.DISCORD_WEBHOOK) {
        _pushWebhookMessage(commandArgs || "hello webhook");
      }
    }
  }
});

client.login(process.env.DISCORD_TOKEN);

function _pushWebhookMessage(msg, hookUrl) {
  const url = hookUrl || process.env.DISCORD_WEBHOOK;

  const Hook = new webhook.Webhook(url);
  const text = new webhook.MessageBuilder()
    // .setColor("#aabbcc")
    .setText(msg);
  Hook.send(text);
}

export default {
  pushMessage: (msg, channelId) =>
    client.channels.cache.get(channelId).send(msg),
  pushWebhookMessage: _pushWebhookMessage,
};
