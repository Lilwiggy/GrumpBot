exports.run = (client, message, args, Discord) => {
  if (!message.guild.member(message.author).hasPermission('BAN_MEMBERS')) {
    message.channel.send("AW NUTS! You don't have permission to ban users!");
  } else if (!message.mentions.users.first()) {
    message.channel.send('<:woah:332985084145827840> You forgot to mention someone!');
  } else

  if (message.mentions.users.first().id === '342688498320539668') {
    message.channel.send(`I'm sorry, ${message.author.username}, I can't let you do that.`);
  } else {
    message.guild.member(message.mentions.users.first()).ban();
    var bans = [
      'http://i.imgur.com/H98LML4.gif',
      'http://i2.kym-cdn.com/photos/images/masonry/000/791/407/40c.gif',
      'http://i.imgur.com/azCR8D1.gif',
      'https://media.tenor.com/images/1b1c4076f6cdc343502d0fc899421946/tenor.gif',
      'http://i.imgur.com/Nziie7u.gif',
      'http://i.imgur.com/rUQHO5H.gif',
      'https://uploads.disquscdn.com/images/9ddc223b561ae7d4f314049633bdf2aba66290bc09fb58be02318f608d5c9779.gif',
      'https://img.ifcdn.com/images/7d8358425d233e926a6a78060990a415d56ac8497e98062f9fdb6356fa52af87_1.gif',
    ];
    var ban = bans[Math.floor(Math.random() * bans.length)];
    message.channel.send({
      file: ban,
    });
  }
};


exports.conf = {
  name: 'ban',
  description: 'Banned',
  usage: 'ban',
  aliases: [],
};
