exports.run = (client, member, Discord, connection) => {
  let guild = member.guild;
  connection.query(`SELECT \`welcome\` FROM \`servers\` WHERE \`serverid\` = '${guild.id}'`, (err, res, fields) => {
    if (err)
      throw err;
    if (res[0].welcome === 1)
      guild.defaultChannel.send(`Ode to, ${member.user.username}. *(User left ${guild.name}.)*`);
  });
};

