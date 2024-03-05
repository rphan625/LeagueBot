const getFunFact = require("./league-fun-fact.js");
const Database = require("@replit/database");
const { Client, Collection } = require("discord.js");
const token = process.env["DISCORD_TOKEN"];
// const mongoose = require("mongoose");

// connect to mongodb
// const dbURI = 'mongodb+srv://rphan625:<AznGamer625>@leaguematches.xeusmko.mongodb.net/?retryWrites=true&w=majority&appName=LeagueMatches'
// mongoose.connect(dbURI);

// FOR TESTING PURPOSES ONLY
// console.log(getFunFact());


const client = new Client({ intents: ["Guilds"] });

//---------------------------------------------
// ALL THE DATABASES ARE HERE
// LEAGUE FUN FACTS DB
const ff_db = new Database();
// MATCHES DB
const matches_db = new Database();

let numID = 0;

// Db commands
// async func setkey(db, key, value)
async function setkey(db, key, value) {
  await db.set(key, value).then(console.log(`${Object.values(value)} saved to ${key}`));
}

// async func getkeyvalue(db, key)
async function getkeyvalue(db, key) {
  await db.get(key).then(value => {
    // console.log(value);
    Promise.resolve(value).then(value => {
      console.log("getkeyvalue value: ", value);
      return value;    
    })
  });
  // return value;
}

// async func deletekey(db, key)
async function deletekey(db, key) {
  await db.delete(`${key}`).then(console.log(`${key} deleted`));
}

async function deleteAll(db) {
  await db.list().then(keys => {
    keys.forEach(key => {
      db.delete(key);
    })
  })
}

// async func listkeys(db)
async function listkeys(db) {
  let listofkeys = [];
  await db.list().then(keys => {
    keys.forEach(key => {
      listofkeys.push(key);
      console.log("Pushed this key to ", listofkeys);
    });

  // console.log("type of keys: ", typeof keys);
  // console.log("keys:", keys);
  // console.log("typeof listofkeys: ", typeof listofkeys)
  // console.log("listofkeys: ", listofkeys);
  for (const elem in listofkeys) {
    console.log("elem: ", elem);
    // console.log(getkeyvalue(matches_db, elem));
    
  }
  listofkeys.forEach(key => {
    console.log("key: ", key);
  })
  console.log("listofkeys: ", listofkeys);
  return listofkeys;
  });
  // return keys;
}

async function getLengthOfDB(db) {
  db.getAll().then(value => {
    console.log("length: ", value.length);
  })
}

async function listkeyvalues(db) {
  db.getAll().then(value => {
    console.log("allkeyvalue: ", value);
    console.log("Length of " + db + ": " + Object.keys(value).length);
  });
}


//---------------------------------------------

const funFactsArray = getFunFact().split("\n");
// console.log(funFactsArray);

for (let i = 0; i < funFactsArray.length; i++) {
  // console.log(i+1);
  ff_db[`${i + 1}`] = funFactsArray[i];
  // ff_db.push({'key': `${i + 1}`, 'value': funFactsArray[i]})
}

// deletes all the keys in the database
// deleteAll(matches_db);

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
  } else if (interaction.commandName === "delete") {
      // Delete command
      const key = interaction.options.getString("key");
      deletekey(matches_db, key);
      interaction.reply(`Key ${key} deleted!`);
  } else if (interaction.commandName === "showfirst") {
    console.log("showfirst: ", getkeyvalue(matches_db,"0"));
    interaction.reply(getkeyvalue(matches_db, "0"));
  } 
  else if (interaction.commandName === "match") {
    // Match command
    const date = new Date().toLocaleString("en-US", {
      timeZone: "America/Los_Angeles",
    });
    const splitdate = date.split(",");
    const day = splitdate[0];
    const time = splitdate[1];
    // console.log(splitdate);
    console.log(`Day: ${day}\nTime: ${time}`);
    const game = interaction.options.getString("game");
    const player1 = interaction.options.getString("first-player");
    const player2 = interaction.options.getString("second-player");
    let winner = interaction.options.getNumber("winner");
    winner = winner === 1 ? player1 : player2;

    // WHEN YOU FIND THE DB LENGTH, numID = {DB_LENGTH}

    if (typeof numID === 'number') {
      setkey(matches_db, numID, {"day": day, "time": time, "game": game, "player1": player1, "player2": player2, "winner": winner});
    } else {
      console.log(`numID is not a number: ${numID}`);
    }

    

    

    interaction.reply(
      `Day: ${day}\nTime: ${time}\nGame: ${game}\nFirst Player: ${player1}\nSecond Player: ${player2}\nWinner: ${winner}!`,
    );
    console.log(
      `Key: ${numID}\nDay: ${day}\nTime: ${time}\nGame: ${game}\nFirst Player: ${player1}\nSecond Player: ${player2}\nWinner: ${winner}!\n------------------------------`,
    );
    
    numID++;
    // console.log("getkeyvalue: ", getkeyvalue(matches_db, "0"))
    
  } else if (interaction.commandName === "matches") {
    // Matches command
    
    // if (matches_db.list().length === 0) {
    //   console.log("matches_db.list().length === 0");
    // } else {
    //   console.log("matches_db.list().length !== 0");
    //   console.log("matches_db.list(): ", Object.keys(matches_db.list()).length);
    // }
    
    // console.log("typeof listkeys(matches_db): ", typeof listkeys(matches_db)); // listkeys(matches_db) is an object
    // console.log("Object.values(listkeys(matches_db)))",     Object.values(listkeys(matches_db)));  
    

    // let matches_string = "Currently there are " + Object.keys(matches_db).length + " matches.\n";
    let matches_string = "Hello World";
    // console.log("listkeys(matches_db): ", listkeys(matches_db));
    listkeyvalues(matches_db);
    
    // console.log("allkeyvalue: ", allkeyvalue);
    
    // console.log("listkeys: ", listkeys(matches_db));
    // console.log(getkeyvalue(matches_db, "0"));
    interaction.reply(`${matches_string}`);
  } 
});

client.login(token);
