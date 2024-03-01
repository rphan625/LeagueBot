// use the require thing for the funfactstring
const funFactsString = require("./league-fun-fact.js"); // figure this out
const Database = require("@replit/database");
const { Client, Collection } = require("discord.js");
const token = process.env["DISCORD_TOKEN"];

// FOR TESTING PURPOSES ONLY
console.log(funFactsString.quotes());

const client = new Client({ intents: ["Guilds"] });

// LEAGUE FUN FACTS DB
const ff_db = new Database();

const funFactsArray = funFactString.split("\n");
// console.log(funFactsArray);

for (let i = 0; i < funFactsArray.length; i++) {
  // console.log(i+1);
  ff_db[`${i + 1}`] = funFactsArray[i];
}

// Prints all the fun facts
// for (let j = 0; j < 100; j++) {
//   console.log(ff_db[`${j + 1}`]);
// }

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    // Ping command
    interaction.reply("Pong!");
  } else if (interaction.commandName === "ff") {
    // Fun fact command
    const randomNum = Math.floor(Math.random() * 100) + 1;
    interaction.reply(`${ff_db[randomNum]}`);
  } else if (interaction.commandName === "match") {
    // Match command
    const game = interaction.options.getString("game");
    const player1 = interaction.options.getString("first-player");
    const player2 = interaction.options.getString("second-player");
    const winner = interaction.options.getNumber("winner");
    interaction.reply(
      `Game: ${game}\nFirst Player: ${player1}\nSecond Player: ${player2}\nWinner: ${winner}!`,
    );
  }
});

client.login(token);
