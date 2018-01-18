exports.run = (client, message, args, Discord) => {
  message.channel.send("Wanna add the power of the grumps to your server? \nHere's the link: https://discordapp.com/oauth2/authorize?client_id=342688498320539668&scope=bot&permissions=0");
};


exports.conf = {
  name: 'invite',
  description: 'Invite this shit',
  usage: 'invite',
  aliases: [],
};
