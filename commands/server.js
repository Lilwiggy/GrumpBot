exports.run = (client, message, args, Discord) => {
  const embed = new Discord.RichEmbed()
    .setAuthor('---Server Information---')
    .setTitle(message.guild.name)
    .setFooter('Grumpbot © Skymi16 & Lilwiggy 2017')
    .setColor('#ff9900')
    .setThumbnail(message.guild.iconURL)
    .addField('Number of members', message.guild.memberCount)
    .addField('Server ID', message.guild.id)
    .addField('Server Birthday', message.guild.createdAt)
    .addField('Server Owner', message.guild.owner)
    .addField('Server Reigion', message.guild.region);
  message.channel.send({
    embed,
  });
};


exports.conf = {
  name: 'server',
  description: 'Server info',
  usage: 'server',
  aliases: [],
};
