// Need these (for drugs)      (not really)
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./modules/config.json');
const fs = require('fs');
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: config.sql.host,
  user: config.sql.username,
  password: config.sql.password,
  database: config.sql.db_name,
});

client.commands = new Map();
client.aliases = new Map();
client.config = config;
client.prefix = '..';


// Hey this is that thing in the other file I need
require('./modules/functions.js')(client, connection);

// This is the thing that does the thing on a client event broh
fs.readdir('./events/', (err, evtFiles) => {
  if (err)
    throw err;
  evtFiles.forEach((file) => {
    const eventName = file.split('.')[0];
    const event = require(`./events/${file}`);
    client.on(eventName, (...args) => event.run(client, ...args, Discord, connection));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});

// This is the bit that does the things with the commands man
fs.readdir('./commands/', (err, cmdFiles) => {
  if (err)
    throw err;
  cmdFiles.forEach((f) => {
    if (!f.endsWith('.js'))
      return;
    const response = client.loadCommand(f);
    if (response)
      console.log(response);
  });
});
// I bet you wish you had this ( ͡° ͜ʖ ͡°)
client.login(config.bot.token);
