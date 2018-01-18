exports.run = (client, message, args, Discord, connection) => {
  if (message.mentions.users.first()) {
    client.checkUser(message.mentions.users.first().id, message.mentions.users.first().avatarURL, () => {
      connection.query(`SELECT \`WJ\`, \`xp\`, \`next\`, \`level\` FROM \`user\` WHERE \`User_ID\` = '${message.mentions.users.first().id}'`, (error, results, fields) => {
        const embed = new Discord.RichEmbed()
          .setTitle('User Profile')
          .setThumbnail(message.mentions.users.first().avatarURL)
          .setFooter('Grumpbot © Skymi16 & Lilwiggy 2017')
          .setColor('#ff9900')
          .addField('Wolfjobs Recieved', results[0].WJ)
          .addField('Level', results[0].level)
          .addField('EXP', `${results[0].xp} / ${results[0].next}`);
        message.channel.send({
          embed,
        });
      });
    });
  } else {
    client.checkUser(message.author.id, message.author.avatarURL, () => {
      connection.query(`SELECT \`WJ\`, \`xp\`, \`next\`, \`level\` FROM \`user\` WHERE \`User_ID\` = '${message.author.id}'`, (error, results, fields) => {
        const embed = new Discord.RichEmbed()
          .setTitle('User Profile')
          .setThumbnail(message.author.avatarURL)
          .setFooter('Grumpbot © Skymi16 & Lilwiggy 2017')
          .setColor('#ff9900')
          .addField('Wolfjobs Recieved', results[0].WJ)
          .addField('Level', results[0].level)
          .addField('EXP', `${results[0].xp} / ${results[0].next}`);
        message.channel.send({
          embed,
        });
      });
    });
  }
};


exports.conf = {
  name: 'profile',
  description: 'Profiles',
  usage: 'profile',
  aliases: [],
};
