const express = require("express");
const server = express();

server.all(`/`, (req, res) => {
  res.send(`Please connect me to a hosting website in-order to work 24/7.`);
});

function keepAlive() {
  server.listen(3000, () => {
    console.log(`Creator: ItzNexus`);
    // this part of the code is used to keep the bot online 24/7
    // I did not make this code.
  });
}

module.exports = keepAlive;
