const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");
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
  },
  {
    name: "matches",
    description: "Replies with all matches in database",
  },
  {
    name: "delete", 
    description: "Deletes a match from the database",
  },
  {
    name: "showfirst",
    description: "Returns first match in database",
  },
  {
    name: "match",
    description: "Add a 1v1 match to the database!",
    options: [
      {
        name: "game",
        description: "The game that 1v1 took place",
        type: ApplicationCommandOptionType.String,
        choices: [
          { name: "League of Legends", value: "League of Legends" },
          { name: "Roblox", value: "Roblox" },
          { name: "Overwatch", value: "Overwatch" },
        ],
        required: true,
      },
      {
        name: "first-player",
        description: "The First Player",
        type: ApplicationCommandOptionType.String,
        choices: [
          { name: "Blade", value: "Blade" },
          { name: "Blub", value: "Blub" },
          { name: "Timpany", value: "Timpany" },
          { name: "Scope", value: "Scope" },
          { name: "Slush", value: "Slush" },
          { name: "Lily", value: "Lily" },
          { name: "Gemini", value: "Gemini" },
          { name: "Lyfe", value: "Lyfe" },
          { name: "Lindsey", value: "Lindsey" },
          { name: "Sqeezey", value: "Sqeezey" },
          { name: "Timness", value: "Timness" },
          { name: "ToKKy", value: "Tokky" },
          { name: "Zero", value: "Zero" },
          { name: "neoma", value: "neoma" },
          { name: "Maii", value: "Maii" },
        ],
        required: true,
      },
      {
        name: "second-player",
        description: "The Second Player",
        type: ApplicationCommandOptionType.String,
        choices: [
          { name: "Blade", value: "Blade" },
          { name: "Blub", value: "Blub" },
          { name: "Timpany", value: "Timpany" },
          { name: "Scope", value: "Scope" },
          { name: "Slush", value: "Slush" },
          { name: "Lily", value: "Lily" },
          { name: "Gemini", value: "Gemini" },
          { name: "Lyfe", value: "Lyfe" },
          { name: "Lindsey", value: "Lindsey" },
          { name: "Sqeezey", value: "Sqeezey" },
          { name: "Timness", value: "Timness" },
          { name: "ToKKy", value: "Tokky" },
          { name: "Zero", value: "Zero" },
          { name: "Neoma", value: "Neoma" },
          { name: "Maii", value: "Maii" },
        ],
        required: true,
      },
      {
        name: "winner",
        description: "The Winner of the 1v1",
        type: ApplicationCommandOptionType.Number,
        choices: [
          { name: "Player 1", value: 1 },
          { name: "Player 2", value: 2 },
        ],
        required: true,
      },
    ],
  },
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
