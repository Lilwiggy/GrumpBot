exports.run = (client, message, args, Discord) => {
  if (args.length === 1) {
    const embed = new Discord.RichEmbed()
      .setAuthor('---Help Menu---')
      .setTitle('Grumpbot Support')
      .setURL('https://discord.gg/WhV5NVE')
      .setFooter('Grumpbot © Skymi16 & Lilwiggy 2017')
      .setColor('#ff9900')
      .addField('Text Commands', '..help text')
      .addField('Voice Channel Commands', '..help vc')
      .addField('Profile Commands', '..help profile')
      .addField('Meme Commands', '..help memes')
      .addField('Admin Commands', '..help admin')
      .addField('Bot Information', '..stats');
    message.channel.send({
      embed,
    });
  } else if (args[1] === 'text') {
    const embed = new Discord.RichEmbed()
      .setAuthor('---Text Commands---')
      .setTitle('Grumpbot Support')
      .setURL('https://discord.gg/WhV5NVE')
      .setFooter('Grumpbot © Skymi16 & Lilwiggy 2017')
      .setColor('#ff9900')
      .addField('..hi', 'Bot will say hello.')
      .addField('..invite', 'A link to invite Grumpbot to your own server.')
      .addField('..stats', 'View bot information and status.')
      .addField('..server', 'View information about this server.')
      .addField('..topic', 'Generate a random topic of conversation.')
      .addField('..hug', 'EEEK THE HUGS! <3')
      .addField('..compliment', "That's a nice color on you...");
    message.channel.send({
      embed,
    });
  } else if (args[1] === 'vc') {
    const embed = new Discord.RichEmbed()
      .setAuthor('---VC Commands---')
      .setTitle('Grumpbot Support')
      .setURL('https://discord.gg/WhV5NVE')
      .setFooter('Grumpbot © Skymi16 & Lilwiggy 2017')
      .setColor('#ff9900')
      .addField('..pog', 'What does pot of greed do?')
      .addField('..undertale', 'Idk what this is Sky said to add it.')
      .addField('..thot', 'BEGONE!!!')
      .addField('..bee', "There's a bee?");
    message.channel.send({
      embed,
    });
  } else if (args[1] === 'profile') {
    const embed = new Discord.RichEmbed()
      .setAuthor('---Profile Commands---')
      .setTitle('Grumpbot Support')
      .setURL('https://discord.gg/WhV5NVE')
      .setFooter('Grumpbot © Skymi16 & Lilwiggy 2017')
      .setColor('#ff9900')
      .addField('..profile', 'View your own profile.')
      .addField('..profile {@user}', "View mentioned user's profile.")
      .addField('..wolfjob {@user}', 'Give mentioned user a Wolfjob.');
    message.channel.send({
      embed,
    });
  } else if (args[1] === 'memes') {
    const embed = new Discord.RichEmbed()
      .setAuthor('---Meme Commands---')
      .setTitle('Grumpbot Support')
      .setURL('https://discord.gg/WhV5NVE')
      .setFooter('Grumpbot © Skymi16 & Lilwiggy 2017')
      .setColor('#ff9900')
      .addField('..goodluck', 'You see chris...')
    message.channel.send({
      embed,
    });
  } else if (args[1] === 'admin') {
    const embed = new Discord.RichEmbed()
      .setAuthor('---Admin Commands---')
      .setTitle('Grumpbot Support')
      .setURL('https://discord.gg/WhV5NVE')
      .setFooter('Grumpbot © Skymi16 & Lilwiggy 2017')
      .setColor('#ff9900')
      .addField('..ban {@user}', 'Bans the mentioned user and leaves a present in their wake.')
      .addField('..togglewelcome', "enable/disable welcome messages in the server's default channel.")
      .addField('..togglelevels', 'enable/disable level up messages.');
    message.channel.send({
      embed,
    });
  }
};


exports.conf = {
  name: 'help',
  description: 'Help shit',
  usage: 'help',
  aliases: [],
};
