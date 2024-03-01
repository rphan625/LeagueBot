
const Database=require('@replit/database');
const {Client}= require('discord.js');
const token = process.env['DISCORD_TOKEN'];

// FOR TESTING PURPOSES ONLY
// console.log(token);

const client = new Client({intents: ["Guilds"]});

console.log(funFactString);


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  
});

client.on('interactionCreate', (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    interaction.reply('Pong!');
  }
  else if (interaction.commandName === 'ff') {
    const randomNum = Math.floor(Math.random() * 100) + 1
    interaction.reply();
  }
})


client.login(token);