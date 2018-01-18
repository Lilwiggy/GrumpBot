exports.run = (client, message, args, Discord) => {
  if (message.member.hasPermission('MANAGE_ROLES') && message.guild.id === '151760749918683137') {
    if (args.length === 1) {
      message.channel.send('Usage: `..ar role name | @user`');
    } else if (!message.mentions.users.first()) {
      message.channel.send('Who would you like me to add the role to?');
    } else {
      let nm = message.content.split(' |');
      let role = message.guild.roles.find('name', `${nm[0].substring(client.prefix.length + 3)}`);
      if (role) {
        message.mentions.members.first().addRole(role);
        message.channel.send(`Added the role ${nm[0].substring(client.prefix.length + 3)} to ${message.mentions.users.first()}`);
      } else {
        message.channel.send('It seems I cannot find that role. Roles are CaSe SeNsItIvE');
      }
    }
  }
};


exports.conf = {
  name: 'ar',
  description: 'Auto role',
  usage: 'ar @user',
  aliases: [],
};
