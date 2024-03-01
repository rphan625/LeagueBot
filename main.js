// use the require thing for the funfactstring
const Database = require("@replit/database");
const { Client, Collection } = require("discord.js");
const token = process.env["DISCORD_TOKEN"];

// FOR TESTING PURPOSES ONLY
// console.log(token);

const client = new Client({ intents: ["Guilds"] });

// LEAGUE FUN FACTS DB
const ff_db = new Database();
const funFactString = `1. Did you know that Vayne is the godfather of Katarina and Talon?
2. Did you know that Varus was an ancient bowman who fought for independence from Noxus?
3. Did you know that Zyra was once a proud member of the Solari, until she was betrayed by them?
4. Did you know that Sona is the result of an experiment by the Zaunite mad scientist Viktor?
5. Did you know that Kha’Zix was once a lowly creature who rose to power by devouring his rivals?
6. Did you know that Xerath was once a great mage who was consumed by power and madness?
7. Did you know that Rengar is the last of a proud line of warriors who once defended the world from demons?
8. Did you know that Graves was once a notorious outlaw before he was recruited by the League?
9. Did you know that Morgana is the twin sister of Kayle, and was once a member of the Heavenl
10. Did you know that Ahri is a nine-tailed fox who was born in the Plane of Fire?
11. Did you know that Master Yi is a five hundred year old warrior who has mastered the art of Wuju?
12. Did you know that Fiddlesticks is a living scarecrow who was once used to torture prisoners?
13. Did you know that Udyr is a wild man who wanders the jungle, searching for spiritual enlightenment?
14. Did you know that Mundo is a madman who wandering the world in search of pain and suffering?
15. Did you know that Blitzcrank was built by an eccentric scientist who was obsessed with bringing inanimate objects to life?
16. Did you know that Rammus is a armadillo from the Shurima Desert who was once worshipped as a god?
17. Did you know that Janna is a wind spirit who protects the people of Zaun from harm?
18. Did you know that Taric is the protector of the Gem of Valoran, and is sworn to defend it with his life?
19. Did you know that Swain is a master tactician who once served as the captain of the Noxian military?
20. Did you know that Bard is a wandering minstrel who uses his magic to help those in need?
21. Did you know that Corki is a daring pilot who has flown in the face of danger on many occasions?
22. Did you know that Heimerdinger is a brilliant scientist who invented many of the machines used by the League?
23. Did you know that Ashe is the leader of the Freljordian tribe of Avarosan, and is sworn to defend her people?
24. Did you know that Ziggs is a mad bomber who revels in destruction, and delights in causing mayhem?
25. Did you know that Lulu is a yordle who transformed herself into a magical creature known as a faerie?
26. Did you know that Bard was the first support champion designed specifically for the role?
27. Did you know that Blitzcrank was one of the earliest champions created, dating back to 2006?
28. Did you know that Braum was inspired by the character of Tarzan?
29. Did you know that Janna was the first support champion designed with an emphasis on zone control?
30. Did you know that Karma was one of the original 40 champions released in 2009?
31. Did you know that Lulu was designed as a counter to AP carry top lane champions?
32. Did you know that Nami was inspired by the character of Princess Mononoke?
33. Did you know that Bard was inspired by the character of the same name from The Legend of Zelda: Breath of the Wild?
34. Did you know that Blitzcrank is voiced by John DiMaggio, who also voices Bender from Futurama?
35. Did you know that Corki was one of the first champions designed for League of Legends?
36. Did you know that Darius’s axe, Noxus, is named after the in-game region where he hails from?
37. Did you know that Diana’s Crescent Strike ability is a homage to Sailor Moon’s signature move, Moon Tiara Action?
38. Did you know that Dr. Mundo’s Masochism ability gives him more health for each percentage of health he is missing?
39. Did you know that Ekko’s Parallel Convergence ability can trap enemies in a time loop, essentially resetting their health and location?
40. Did you know that Fiora’s Blade Waltz ability makes her immune to damage while she is using it?
41. Did you know that Fizz’s Chum the Waters ability can actually be used to catch other players while they’re mid-air?
42. Did you know that Galio’s Runic Bulwark ability gives him a temporary shield that scales with his maximum health?
43. Did you know that Gangplank’s Parley ability allows him to remove gold from an enemy player’s inventory?
44. Did you know that Garen’s Judgment ability allows him to spin his sword around for a brief period of time, damaging all enemies in range?
45. Did you know that Gnar’s Transformation ability causes him to transform into a giant, enraged version of himself?
46. Did you know that Graves’ Smoke Screen ability leaves a cloud of smoke in its wake, slowing and reducing the vision of all enemies who enter it?
47. Did you know that Hecarim’s Onslaught of Shadows ability summons spectral riders who stampede through enemies, dealing damage to them?
48. Did you know that Irelia’s Blade Surge ability damages and slows the first enemy hit, and then refunds some of the mana cost if she kills them with it?
49. Did you know that Jax’s Leap Strike ability allows him to jump to an enemy unit and strike them, dealing damage?
50. Did you know that Jayce’s Thundering Blow ability knocks back all enemies in front of him, and also deals damage based on their maximum health?
51. Did you know that Blitzcrank’s creator actually had a hard time thinking of a good name for him, and eventually settled on the German word for “lightning” after looking through a list of German words?
52. Did you know that Caitlyn was originally going to be named Sheriff Caitlyn, but her name was changed to avoid copyright issues with the TV show Justified?
53. Did you know that Darius’s axe used to be much larger, but was scaled down in order to make him look less like Paul Bunyan?
54. Did you know that Dr. Mundo’s original concept was actually a mad scientist, and his love of violence was something that was added in later?
55. Did you know that Elise’s spider form was inspired by the character of Shelob from The Lord of the Rings?
56. Did you know that Evelynn’s original concept was actually a succubus, but her design was changed to avoid too much similarity to Diablo III’s Lilith?
57. Did you know that Ezreal’s name is a play on the word “easy,” as in “easy mode?”
58. Did you know that Fiddlesticks’ original concept was actually a scarecrow, but his design was changed to make him look more like a clown?
59. Did you know that Gangplank’s original concept was actually a pirate, but his design was changed to make him look more like a modern-day mobster?
60. Did you know that Garen’s original concept was actually a knight, but his design was changed to make him look more like a Spartan warrior?
61. Did you know that Gnar’s original concept was actually a Yeti, but his design was changed to make him look more like a Waddle Dee from Kirby?
62. Did you know that Gragas’ name is a play on the word “garbage?”
63. Did you know that Graves’ name is a play on the word “grave?”
64. Did you know that Nasus was initially intended to be a fighter, but was changed to a juggernaut after playtesting?
65. Did you know that Rengar used to be able to leap over terrain, but this was removed in an update?
66. Did you know that Kha’Zix was designed to be a counter to Rengar?
67. Did you know that Irelia’s blades are inspired by the Japanese katana?
68. Did you know that Master Yi is named after a Chinese martial arts master from Wu-Tang Clan’s “Enter the Wu-Tang (36 Chambers)”?
69. Did you know that Darius’s axe used to be on fire, but this was removed in an update?
70. Did you know that Veigar was designed to be a “yordle version of Dr. Doom”?
71. Did you know that Blitzcrank was inspired by the Iron Giant?
72. Did you know that Taric was originally designed as a support character, but was later changed to a tank?
73. Did you know that Nunu was designed as a character who could “support his allies by annoyingly staying alive”?
74. Did you know that Syndra’s design is based on the sorceress Morgana from the TV show Merlin?
75. Did you know that Trundle was inspired by the character of Frankenstein’s monster?
76. Did you know that Twisted Fate’s design is based on a cardsharp from the Old West?
77. Did you know that Vayne was designed as an “AD carry who could take down tanky targets”?
78. Did you know that Yorick was designed to be a “grim reaper” type character?
79. Did you know that Ziggs was originally going to be named “BouncingBombGuy”, but this was changed before his release?
80. Did you know that Zyra’s plants are based on the Venus flytrap?
81. Did you know that Nasus was originally intended to be a dog-like creature?
82. Did you know that Nidalee was inspired by the game Princess Maker 2?
83. Did you know that Orianna is named after a type of music from Final Fantasy VI?
84. Did you know that Warwick was originally going to be a werewolf?
85. Did you know that Wukong’s staff, Cloud Drinker, is based on the weapon of the same name from Final Fantasy V?
86. Did you know that Xin Zhao is named after a character from Dynasty Warriors 3?
87. Did you know that Yorick was inspired by the character of the same name from Shakespeare’s Hamlet?
88. Did you know that Ziggs was inspired by the Mad Bomber archetype often seen in games and cartoons?
89. Did you know that Zyra’s plant forms are based on real world plants?
90. Did you know that Camille’s blade, The Equalizer, is a reference to the 2008 film of the same name?
91. Did you know that Bard was once a yordle who got lost in the jungle and was raised by apes?
92. Did you know that Blitzcrank is actually a malfunctioning prototype that was built to be the perfect enforcer?
93. Did you know that Brand was once a human pyromancer who was consumed by his own flames?
94. Did you know that Caitlyn is the sheriff of Piltover and one of the most celebrated law enforcement officers in all of Runeterra?
95. Did you know that Cho’Gath was an extradimensional creature that was born from the void between worlds?
96. Did you know that Corki is one of the few yordles who actually comes from Bandle City?
97. Did you know that Darius is the current leader of the Noxian military and one of the most feared generals in all of Runeterra?
98. Did you know that Diana was once a child of the moon who was granted immense power by the Lunari?
99. Did you know that Dr. Mundo is a madman who performs crude operations on himself in an attempt to become immune to pain?
100. Did you know that Draven is a showman and gladiator who always puts on a good show for his fans?`;

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
