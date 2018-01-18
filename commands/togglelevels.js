exports.run = (client, message, args, Discord, connection) => {
  if (message.member.hasPermission('ADMINISTRATOR')) {
    connection.query(`SELECT \`levels\` FROM \`servers\` WHERE \`serverid\` = '${message.guild.id}'`, (err, res, fields) => {
      if (err)
        throw err;
      if (res[0].levels === 0) {
        connection.query(`UPDATE \`servers\` SET \`levels\` = 1 WHERE \`serverid\` = '${message.guild.id}'`);
        message.channel.send('Level up messages enabled.');
      } else {
        connection.query(`UPDATE \`servers\` SET \`levels\` = 0 WHERE \`serverid\` = '${message.guild.id}'`);
        message.channel.send('Level up messages disabled.');
      }
    });
  } else {
    message.channel.send("AW NUTS! You don't have permission to use this command.");
  }
};


exports.conf = {
  name: 'togglelevels',
  description: 'Yes',
  usage: 'togglelevels',
  aliases: [],
};
