const getFunFact = require("./league-fun-fact.js");
const Database = require("@replit/database");
const { Client, Collection } = require("discord.js");
const token = process.env["DISCORD_TOKEN"];

// FOR TESTING PURPOSES ONLY
// console.log(getFunFact());

const client = new Client({ intents: ["Guilds"] });

//---------------------------------------------
// ALL THE DATABASES ARE HERE
// LEAGUE FUN FACTS DB
const ff_db = new Database();
// MATCHES DB
const matches_db = new Database();

// Db commands
// async func setkey(db, key, value)
async function setkey(db, key, value) {
  await db
    .set(key, value)
    .then(console.log(`${Object.values(value)} saved to ${key}`));
}

// async func getkeyvalue(db, key)
async function getkeyvalue(db, key) {
  await db.get(key).then((value) => {
    // console.log(value);
    Promise.resolve(value).then((value) => {
      console.log("getkeyvalue value: ", value);
      return value;
    });
  });
  // return value;
}

// async func deletekey(db, key)
async function deletekey(db, key) {
  await db.delete(`${key}`).then(console.log(`${key} deleted`));
}

async function deleteAll(db) {
  await db.list().then((keys) => {
    keys.forEach((key) => {
      db.delete(key);
    });
  });
  // db.empty();
}

// async func listkeys(db)
async function listkeys(db) {
  let listofkeys = [];
  await db.list().then((keys) => {
    keys.forEach((key) => {
      listofkeys.push(key);
      console.log("Pushed this key to ", listofkeys);
    });

    for (const elem in listofkeys) {
      console.log("elem: ", elem);
      // console.log(getkeyvalue(matches_db, elem));
    }
    listofkeys.forEach((key) => {
      console.log("key: ", key);
    });
    console.log("listofkeys: ", listofkeys);
    return listofkeys;
  });
  // return keys;
}

async function getkeyvalues(db) {
  return db.getAll(); // this returns a promise, so use (async () => {}) when want data
}

let numID;
let matches_string;

async function getLengthOfDB(db) {
  try {
    const keyvalueobject = await getkeyvalues(db);
    let length = Object.keys(keyvalueobject).length;
    console.log(`Length is ${length}`);
    numID = length;

    console.log(`numID value inside getLengthOfDB: ${numID}`);
    return length;
    // return Object.keys(keyvalueobject).length;
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
}

async function listkeyvalues(db) {
  try {
    const keyvalueobject = await getkeyvalues(db);
    console.log(`Length is ${Object.keys(keyvalueobject).length}`);
    matches_string = keyvalueobject;
    // console.log(matches_string);
    // return matches_string;
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
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

console.log("On Startup!");

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
    // Show First command
    let showfirststring = "";
    listkeyvalues(matches_db).then(() => {
      console.log("showfirst: ", matches_string["0"]);
      console.log(`values of first match: ${Object.values(matches_string[0])}`);
      // showfirststring = showfirststring + Object.values(matches_string[0]);
      showfirststring =
        showfirststring +
        `Day: ${matches_string[0]["day"]}\nTime: ${matches_string[0]["time"]}\nGame: ${matches_string[0]["game"]}\nFirst Player: ${matches_string[0]["first-player"]}\nSecond Player: ${matches_string[0]["second-player"]}\nWinner: ***${matches_string[0]["winner"]}***`;
      interaction.reply(showfirststring);
    });
  } else if (interaction.commandName === "recent") {
    // Recent command
    let recentNum = interaction.options.getString("number");
    let lengthDB;

    getLengthOfDB(matches_db).then((length) => {
      console.log(`length: ${length}`);
      if (recentNum > length) {
        // USER REQUESTS MORE THAN THE NUMBER OF MATCHES
        listkeyvalues(matches_db).then(() => {
          // console.log(`typeof keyvalueobject: ${typeof keyvalueobject}`);
          let listOfMatches = "";
          // console.log(`typeof matches_string: ${typeof matches_string}`);
          // console.log(matches_string);
          for (const elem in matches_string) {
            // listOfMatches.push([elem, matches_string[elem]])
            listOfMatches =
              listOfMatches +
              `-----------------------------\nMatch ${elem}: \nDay: ${matches_string[elem]["day"]}\nTime: ${matches_string[elem]["time"]}\nGame: ${matches_string[elem]["game"]}\nFirst Player: ${matches_string[elem]["first-player"]}\nSecond Player: ${matches_string[elem]["second-player"]}\nWinner: ***${matches_string[elem]["winner"]}***\n`;
          }
          console.log(listOfMatches);
          if (listOfMatches === "") {
            interaction.reply("There are no matches yet!");
          } else {
            interaction.reply(listOfMatches);
          }
        });
      } else {
        // THIS IS TEMP, NEED TO GET THE MOST RECENT MATCHES ACCORDING TO USER INPUT
        console.log(
          `User input num: ${interaction.options.getString("number")}`,
        );
        interaction.reply(`User requested ${recentNum} match(es)`);
      }
    });
  } else if (interaction.commandName === "match") {
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

    // FOUND OUT HOW TO GET THE DB.LENGTH WOOOO
    getLengthOfDB(matches_db)
      .then(() => {
        if (typeof numID === "number") {
          setkey(matches_db, numID, {
            day: day,
            time: time,
            game: game,
            "first-player": player1,
            "second-player": player2,
            winner: winner,
          });
        } else {
          console.log(`numID is not a number: ${numID}`);
        }
      })
      .catch((error) => {
        console.error("Error occurred: ", error);
      });

    interaction.reply(
      `Day: ${day}\nTime: ${time}\nGame: ${game}\nFirst Player: ${player1}\nSecond Player: ${player2}\nWinner: ${winner}!`,
    );
    console.log(
      `Key: ${numID}\nDay: ${day}\nTime: ${time}\nGame: ${game}\nFirst Player: ${player1}\nSecond Player: ${player2}\nWinner: ${winner}!\n------------------------------`,
    );
  } else if (interaction.commandName === "deleteall") {
    deleteAll(matches_db);
    interaction.reply("All keys deleted!");
    console.log("All keys deleted!");
  } else if (interaction.commandName === "matches") {
    // Matches command

    console.log("In matches commands");

    listkeyvalues(matches_db).then(() => {
      // console.log(`typeof keyvalueobject: ${typeof keyvalueobject}`);
      let listOfMatches = "";
      // console.log(`typeof matches_string: ${typeof matches_string}`);
      // console.log(matches_string);
      for (const elem in matches_string) {
        // listOfMatches.push([elem, matches_string[elem]])
        listOfMatches =
          listOfMatches +
          `-----------------------------\nMatch ${elem}: \nDay: ${matches_string[elem]["day"]}\nTime: ${matches_string[elem]["time"]}\nGame: ${matches_string[elem]["game"]}\nFirst Player: ${matches_string[elem]["first-player"]}\nSecond Player: ${matches_string[elem]["second-player"]}\nWinner: ***${matches_string[elem]["winner"]}***\n`;
      }
      console.log(listOfMatches);
      if (listOfMatches === "") {
        interaction.reply("There are no matches yet!");
      } else {
        interaction.reply(listOfMatches);
      }
    });
  }
});

client.login(token);
