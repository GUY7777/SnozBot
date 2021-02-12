require("dotenv").config();
const { Client } = require("discord.js");
const Canvas = require("canvas");
const client = new Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
const StateManger = require("./utils/StateManger");
const keepAlive = require("./server");

const { registerCommands, registerEvents } = require("./utils/registry");

(async () => {
  client.commands = new Map();
  client.events = new Map();
  await registerCommands(client, "../commands");
  await registerEvents(client, "../events");
  keepAlive();
  await client.login(process.env.DISCORD_BOT_TOKEN);
})();
