exports.run = (client, message, args, Discord) => {
  const embed = new Discord.RichEmbed()
    .setTitle('GrumpBot support')
    .setAuthor('GrumpBot', client.user.avatarURL)
    .setColor('#ff9900')
    .setFooter('Grumpbot © Skymi16 & Lilwiggy 2017')
    .setURL('https://discord.gg/WhV5NVE ')
    .addField(`Stats`, `**Total servers:** ${client.guilds.size}\n**Ping:** ${Math.floor(client.ping)} ms\n**Total members:** ${client.users.size}\n**FrameWork:** Discord.js ${Discord.version}\n**Node.js version:** ${process.version.substr(1)}`, true);
  message.channel.send({
    embed,

  });
};


exports.conf = {
  name: 'stats',
  description: 'Stats',
  usage: 'stats',
  aliases: [],
};
