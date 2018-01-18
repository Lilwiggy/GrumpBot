exports.run = (client, message, args, Discord) => {
  var nm = message.content.split(' | ');
  var fs = require('fs');
  if (args[1] && nm[1]) {
    fs.readFile('roles.txt', 'utf-8', (err, res) => {
      if (err)
        throw err;
      var thing = res.split(' | ');
      if (thing.includes(nm[0].substring(client.prefix.length + 5))) {
        message.channel.send('Sorry but you aren\'t allowed to edit this role.');
      } else if (message.member.roles.find('name', `${nm[0].substring(client.prefix.length + 5)}`)) {
        var hexThing = /^#[0-9A-F]{6}$/i;
        if (hexThing.test(nm[1])) {
          var rtu = message.guild.roles.find('name', nm[0].substring(client.prefix.length + 5));
          rtu.setColor(nm[1], `Color change requested by ${message.author.username}`);
          message.channel.send(`Your role color is now ${nm[1]}. Enjoy!`);
        } else {
          message.channel.send('Please use a valid hex code.');
        }
      } else {
        message.channel.send('I cannot seem to find that role. Roles are case sensitive. I can also only edit roles that you have.');
      }
    });
  } else {
    message.channel.send('Usage: ..edit role name | hex');
  }
};


exports.conf = {
  name: 'edit',
  description: 'Edit color',
  usage: 'edit [hex]',
  aliases: [],
};
