const { REST, Routes } = require("discord.js");
//Info needed for slash commands
const botID = process.env["BOT_ID"];
const serverID = process.env["TEST_SERVER_ID"];
const botToken = process.env["DISCORD_TOKEN"];

const commands = [
  {
    name: "ping",
    description: "Replies with Pong!",
  },
  {
    name: "ff",
    description: "Replies with random LOL fun facts!",
  }
];

const rest = new REST({ version: "10" }).setToken(process.env["DISCORD_TOKEN"]);
// console.log(process.env['lmao']);

(async () => {
  try {
    console.log("Registering slash commands...");
    
    await rest.put(Routes.applicationGuildCommands(botID, serverID), {
      body: commands,
    });
    console.log("Slash commands were registered successfully!");
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
})();
