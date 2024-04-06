const getFunFact = require("./league-fun-fact.js");
const Database = require("@replit/database");
const { Client, Collection } = require("discord.js");
const token = process.env["DISCORD_TOKEN"];
// const keepAlive = require("./server");

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
    // console.log(`Length is ${Object.keys(keyvalueobject).length}`);
    matches_string = keyvalueobject;
    // console.log(matches_string);
    // return matches_string;
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
}

// String Padding Function
const pad = (str, length, char = " ") => {
  const new_string = str
    .padStart((str.length + length) / 2, char)
    .padEnd(length, char);
  return new_string;
};

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

// List of Players
let players = [
  "Timpany",
  "Lily",
  "Blub",
  "Blade",
  "Sqeezey",
  "Gemini",
  "Timness",
];

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
  } else if (interaction.commandName === "recent") {
    // Recent command

    let recentNum = interaction.options.getString("number");
    // let lengthDB;

    getLengthOfDB(matches_db).then((length) => {
      console.log(`length: ${length}`);
      if (recentNum === "0") {
        interaction.reply(`You have requested for ${recentNum} matches!`);
      } else if (recentNum >= length) {
        // USER REQUESTS MORE THAN THE NUMBER OF MATCHES

        listkeyvalues(matches_db).then(() => {
          // console.log(`typeof keyvalueobject: ${typeof keyvalueobject}`);
          let listOfMatches = `
Matches
+―――――――――+――――――――――――+―――――――――――――――――――+――――――――――――+――――――――――――+――――――――――――+
|   Day   |    Time    |        Game       |  Player 1  |  Player 2  |   Winner   |
+―――――――――+――――――――――――+―――――――――――――――――――+――――――――――――+――――――――――――+――――――――――――+
`;
          // console.log(`typeof matches_string: ${typeof matches_string}`);
          let matches_reverse = Object.values(matches_string).reverse();
          // console.log(`matches_string reverse: ${matches_reverse}`);
          // console.log(matches_string);
          for (const elem in matches_reverse) {
            // listOfMatches.push([elem, matches_string[elem]])
            // console.log(matches_reverse[elem]);
            listOfMatches =
              listOfMatches +
              `|${pad(String(matches_string[elem]["day"]), 9)}|${pad(
                String(matches_string[elem]["time"]),
                12,
              )}|${pad(String(matches_string[elem]["game"]), 19)}|${pad(
                String(matches_string[elem]["first_player"]),
                12,
              )}|${pad(
                String(matches_string[elem]["second_player"]),
                12,
              )}|${pad(
                String(matches_string[elem]["winner"]),
                12,
              )}|\n+―――――――――+――――――――――――+―――――――――――――――――――+――――――――――――+――――――――――――+――――――――――――+\n`;
            length--;
          }
          // console.log(listOfMatches);
          if (listOfMatches === "") {
            interaction.reply("There are no matches yet!");
          } else {
            listOfMatches = "```" + listOfMatches + "```";
            interaction.reply(
              "User has requested max amount of matches: \n" + 
              listOfMatches
            );
          }
        });
      } else {
        // Returns number of matches that user asks for
        console.log(
          `User input num: ${interaction.options.getString("number")}`,
        );
        listkeyvalues(matches_db).then(() => {
          let listOfMatches = `
Matches
+―――――――――+――――――――――――+―――――――――――――――――――+――――――――――――+――――――――――――+――――――――――――+
|   Day   |    Time    |        Game       |  Player 1  |  Player 2  |   Winner   |
+―――――――――+――――――――――――+―――――――――――――――――――+――――――――――――+――――――――――――+――――――――――――+
`;
          console.log(`recentNum: ${recentNum}`);
          let countdown = recentNum;
          // console.log(`typeof matches_string: ${typeof matches_string}`);
          for (let i = Object.keys(matches_string).length - 1; i >= 0; i--) {
            if (countdown !== 0) {
              console.log(matches_string[i]);
              listOfMatches =
                listOfMatches +
                `|${pad(String(matches_string[i]["day"]), 9)}|${pad(
                  String(matches_string[i]["time"]),
                  12,
                )}|${pad(String(matches_string[i]["game"]), 19)}|${pad(
                  String(matches_string[i]["first_player"]),
                  12,
                )}|${pad(
                  String(matches_string[i]["second_player"]),
                  12,
                )}|${pad(
                  String(matches_string[i]["winner"]),
                  12,
                )}|\n+―――――――――+――――――――――――+―――――――――――――――――――+――――――――――――+――――――――――――+――――――――――――+\n`;
              countdown--;
            } else {
              break;
            }
          }
          listOfMatches = "```" + listOfMatches + "```";
          interaction.reply(
            `User requested ${recentNum} match(es)\n${listOfMatches}`,
          );
        });
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
    // console.log(`Winner is ${winner}`);
    console.log(`typeof winner: ${typeof winner}`);

    // FOUND OUT HOW TO GET THE DB.LENGTH WOOOO
    // This is to get the number for the match id
    // Then add the match to the DB
    getLengthOfDB(matches_db)
      .then(() => {
        if (typeof numID === "number") {
          setkey(matches_db, numID, {
            day: day,
            time: time,
            game: game,
            first_player: player1,
            second_player: player2,
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
      let listOfMatches = `
Matches
+―――――――――+――――――――――――+―――――――――――――――――――+――――――――――――+――――――――――――+――――――――――――+
|   Day   |    Time    |        Game       |  Player 1  |  Player 2  |   Winner   |
+―――――――――+――――――――――――+―――――――――――――――――――+――――――――――――+――――――――――――+――――――――――――+
`;
      // console.log(`typeof matches_string: ${typeof matches_string}`);
      // console.log(matches_string);
      for (const elem in matches_string) {
        // listOfMatches.push([elem, matches_string[elem]])
        listOfMatches =
          listOfMatches +
          `|${pad(String(matches_string[elem]["day"]), 9)}|${pad(
            String(matches_string[elem]["time"]),
            12,
          )}|${pad(String(matches_string[elem]["game"]), 19)}|${pad(
            String(matches_string[elem]["first_player"]),
            12,
          )}|${pad(String(matches_string[elem]["second_player"]), 12)}|${pad(
            String(matches_string[elem]["winner"]),
            12,
          )}|\n+―――――――――+――――――――――――+―――――――――――――――――――+――――――――――――+――――――――――――+――――――――――――+\n`;
      }
      // console.log(listOfMatches);
      if (listOfMatches === "") {
        interaction.reply("There are no matches yet!");
      } else {
        interaction.reply("```" + listOfMatches + "```");
      }
    });
  } else if (interaction.commandName === "stats") {
    // Stats Command

    console.log("Stats command");
    const player_name = interaction.options.getString("player");
    let stats_string = `
Stats
+――――――――――――――――――――――――――+―――――――+――――――――――――+
|          Player          | Win # |  Win Rate  |
+――――――――――――――――――――――――――+―――――――+――――――――――――+
`;
    let listOfMatches = `
Matches
+―――――――――+――――――――――――+―――――――――――――――――――+――――――――――――+――――――――――――+――――――――――――+
|   Day   |    Time    |        Game       |  Player 1  |  Player 2  |   Winner   |
+―――――――――+――――――――――――+―――――――――――――――――――+――――――――――――+――――――――――――+――――――――――――+
`;
    listkeyvalues(matches_db).then(() => {
      console.log(`typeof matches_string: ${typeof matches_string}`);
      // console.log(`stats matches_string ${Object.values(Object.values(matches_string))}
      let match_count = 0;
      let win_count = 0;
      for (const elem in matches_string) {
        // console.log(matches_string[elem]);
        if (
          matches_string[elem]["first_player"] === player_name ||
          matches_string[elem]["second_player"] === player_name
        ) {
          match_count++;
          // console.log(matches_string[elem]);
          listOfMatches =
            listOfMatches +
            `|${pad(String(matches_string[elem]["day"]), 9)}|${pad(
              String(matches_string[elem]["time"]),
              12,
            )}|${pad(String(matches_string[elem]["game"]), 19)}|${pad(
              String(matches_string[elem]["first_player"]),
              12,
            )}|${pad(String(matches_string[elem]["second_player"]), 12)}|${pad(
              String(matches_string[elem]["winner"]),
              12,
            )}|\n+―――――――――+――――――――――――+―――――――――――――――――――+――――――――――――+――――――――――――+――――――――――――+\n`;
          if (matches_string[elem]["winner"] === player_name) {
            win_count++;
          }
        }
      }
      if (match_count === 0) {
        interaction.reply(`${player_name} hasn't played any matches yet!`);
      } else {
        stats_string =
          stats_string +
          `|${pad(String(player_name), 26)}|${pad(
            String(win_count),
            3,
          )}/${pad(String(match_count), 3)}|${pad(
            `${String((win_count / match_count).toFixed(2) * 100)}%`,
            12,
          )}|\n+――――――――――――――――――――――――――+―――――――+――――――――――――+\n${listOfMatches}`;
        interaction.reply("```" + stats_string + "```");
      }
    });
  } else if (interaction.commandName === "scoreboard") {
    // Scoreboard Command

    // interaction.reply("Scoreboard Command");
    listkeyvalues(matches_db).then(() => {
      let scoreboard_string = `
Scoreboard
+――――――――――――――――――――――――――+―――――――+――――――――――――+
|          Player          | Win # |  Win Rate  |
+――――――――――――――――――――――――――+―――――――+――――――――――――+
`;
      for (const player in players) {
        console.log(players[player]); // This displays the names
        let match_count = 0;
        let win_count = 0;
        for (const elem in matches_string) {
          if (
            matches_string[elem]["first_player"] === players[player] ||
            matches_string[elem]["second_player"] === players[player]
          ) {
            match_count++;
            if (matches_string[elem]["winner"] === players[player]) {
              win_count++;
            }
          }
        }
        console.log(
          `Player: ${
            players[player]
          }\nWins: ${win_count} / ${match_count} matches\nPercentage: ${(
            win_count / match_count
          ).toFixed(2)}%\n`,
        );
        scoreboard_string =
          scoreboard_string +
          `|${pad(String(players[player]), 26)}|${pad(
            String(win_count),
            3,
          )}/${pad(String(match_count), 3)}|${pad(
            `${String((win_count / match_count).toFixed(2) * 100)}%`,
            12,
          )}|\n+――――――――――――――――――――――――――+―――――――+――――――――――――+\n`;
      }
      interaction.reply("```" + scoreboard_string + "```");
    });
  } else if (interaction.commandName === "leaderboard") {
    // Leaderboard Command

    let leaderboard_array = [];
    listkeyvalues(matches_db).then(() => {
      let leaderboard_string = `
Leaderboard
+―――――――――+――――――――――――――――――――――――――+―――――――+
| Ranking |          Player          | Win # |
+―――――――――+――――――――――――――――――――――――――+―――――――+
`;
      for (const player in players) {
        // calculate win count for each player
        let win_count = 0;
        for (const elem in matches_string) {
          if (matches_string[elem]["winner"] === players[player]) {
            win_count++;
          }
        }
        leaderboard_array.push([win_count, players[player]]);
      }
      leaderboard_array.sort();
      leaderboard_array.reverse();
      let placement = 1;
      for (const elem in leaderboard_array) {
        // console.log(leaderboard_array[elem])
        // console.log(`Index: ${elem}`);
        if (elem === "0") {
          console.log(`First Place ${leaderboard_array[elem][1]}`);
        } else {
          if (leaderboard_array[elem][0] === leaderboard_array[elem - 1][0]) {
            console.log(
              `Tied: ${leaderboard_array[elem - 1][1]} & ${
                leaderboard_array[elem][1]
              }`,
            );
          } else {
            placement++;
          }
        }
        leaderboard_string =
          leaderboard_string +
          `|${pad(String(placement), 9)}|${pad(
            String(leaderboard_array[elem][1]),
            26,
          )}|${pad(
            String(leaderboard_array[elem][0]),
            7,
          )}|\n+―――――――――+――――――――――――――――――――――――――+―――――――+\n`;
      }
      // console.log(leaderboard_array);
      // console.log(`Length: ${leaderboard_array.length}`);
      interaction.reply("```" + leaderboard_string + "```");
    });
  }
});

client.login(token);

// keepAlive();
