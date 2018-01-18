exports.run = (client, member, Discord, connection) => {
  let guild = member.guild;
  connection.query(`SELECT \`welcome\` FROM \`servers\` WHERE \`serverid\` = '${guild.id}'`, (err, res, fields) => {
    if (err)
      throw err;
    if (res[0].welcome === 1)
      guild.defaultChannel.send(`Hey there, ${member}! Welcome to ${guild.name}! Please check out the rules before you make us grumpy!`);
  });

  if (guild.id === '303525154464727041') {
    let role = guild.roles.find('name', 'Users');
    member.addRole(role);
  }
};
