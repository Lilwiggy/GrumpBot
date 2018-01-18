exports.run = (client, message, args, Discord, connection) => {
  if (message.member.hasPermission('ADMINISTRATOR')) {
    connection.query(`SELECT \`welcome\` FROM \`servers\` WHERE \`serverid\` = '${message.guild.id}'`, (err, res, fields) => {
      if (err)
        throw err;
      if (res[0].welcome === 0) {
        connection.query(`UPDATE \`servers\` SET \`welcome\` = 1 WHERE \`serverid\` = '${message.guild.id}'`);
        message.channel.send('Welcome messages enabled.');
      } else {
        connection.query(`UPDATE \`servers\` SET \`welcome\` = 0 WHERE \`serverid\` = '${message.guild.id}'`);
        message.channel.send('Welcome messages disabled.');
      }
    });
  } else {
    message.channel.send("AW NUTS! You don't have permission to use this command.");
  }
};


exports.conf = {
  name: 'togglewelcome',
  description: 'Does things',
  usage: 'togglewelcome',
  aliases: [],
};
