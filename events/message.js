exports.run = (client, message, Discord, connection) => {
  // Now this is the fun bit right here
  const msg = message.content.toLowerCase();
  const adminP = 'g@'; // This is mine ignore it.
  const prefix = '..';

  // To prevent the robot uprising...
  if (message.author.bot)
    return;
  if (message.channel.type !== 'text')
    return;

  // Custom prefix things
  client.checkServer(message.guild.id, message.guild.name, message.guild.iconURL, () => {});
  client.checkUser(message.author.id, message.author.displayAvatarURL, () => {});
  const args = message.content.slice(prefix.length).split(' ');


  // Adds XP
  client.checkUser(message.author.id, message.author.avatarURL, () => {
    connection.query(`SELECT \`xp\`, \`next\`, \`level\` FROM \`user\` WHERE \`User_ID\` = '${message.author.id}'`, (err, res, fields) => {
      connection.query(`SELECT *,NOW()-INTERVAL 1 MINUTE > \`xp_cool\` AS xpAdd FROM \`user\` WHERE \`User_ID\` = '${message.author.id}'`, (err1, res1, fields1) => {
        if (err || err1)
          throw err;
        if (res1[0].xpAdd === 1) {
          var xp_amount = ['10', '11', '12', '13', '14', '15'];
          var xP = xp_amount[Math.floor(Math.random() * xp_amount.length)];
          connection.query(`UPDATE \`user\` SET \`xp_cool\` =NOW(), \`xp\`=\`xp\` + '${xP}' WHERE \`User_ID\` = '${message.author.id}'`);
          if (res[0].xp > res[0].next) {
            connection.query(`SELECT * FROM \`servers\` WHERE \`serverid\` = ${message.guild.id}`, (errS, results, feildsS) => {
              if (results[0].levels === 1)
                message.channel.send(`| :up: | <@${message.author.id}>! You just leveled up to level ${res[0].level + 1}!`);

              connection.query(`UPDATE \`user\` SET \`next\`=\`next\` + 100, \`xp\` = 0, \`level\`=\`level\`+1 WHERE \`User_ID\` = '${message.author.id}'`);
            });
          }
        }
      });
    });
  });

  // And this allows me to rule the world.
  if (msg.startsWith(`${adminP}eval`) && message.author.id === '232614905533038593') {
    if (args.length === 1) {
      message.channel.send('What am I evaling? Fucking dumbass.');
    } else {
      try {
        let evaled = eval(message.content.substr(adminP.length + 4));
        if (typeof evaled !== 'string')
          evaled = require('util').inspect(evaled);
        message.channel.send(clean(evaled));
      } catch (err) {
        message.channel.send(`${clean(err)}`);
      }
    }
  }

  // This uh, uhm, yeah it does that one thing where it ignores things with some other bits.
  if (message.content.indexOf(prefix) !== 0)
    return;

  const command = message.content.toLowerCase().substr(prefix.length).split(' ');
  const cmd = client.commands.get(command[0]) || client.commands.get(client.aliases.get(command[0]));
  if (cmd) {
    try {
      cmd.run(client, message, args, Discord, connection);
    } catch (e) {
      client.users.get('232614905533038593').send(`Error:\n${e}\nUsed in:\n${message.content}`);
    }
  }
};

function clean(text) {
  if (typeof text === 'string')
    return text.replace(/`/g, `\`${String.fromCharCode(8203)}`).replace(/@/g, `@${String.fromCharCode(8203)}`);
  else
    return text;
}
