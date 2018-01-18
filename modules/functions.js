module.exports = (client, connection) => {
  client.loadCommand = (commandName) => {
    try {
      const props = require(`../commands/${commandName}`);
      console.log(`Loading Command: ${props.conf.name}. `);
      if (props.init)
        props.init(client);

      client.commands.set(props.conf.name, props);
      props.conf.aliases.forEach((alias) => {
        client.aliases.set(alias, props.conf.name);
      });
      return false;
    } catch (e) {
      return `Unable to load command ${commandName}: ${e}`;
    }
  };

  // Check to see if the user is in the database.
  client.checkUser = (userID, userAvatar, callback) => {
    connection.query(`SELECT COUNT(*) AS \`count\`, \`UserAvatar\` FROM \`user\` WHERE \`User_ID\`='${userID}'`, (error, results, fields) => {
      if (results[0].count === 0) {
        connection.query(`INSERT INTO \`user\`(\`User_ID\`) VALUES ('${userID}')`, (error1, result1s, fields1) => {
          callback();
        });
      } else if (results[0].userAvatar != userAvatar) {
        connection.query(`UPDATE \`user\` SET \`UserAvatar\` = '${userAvatar}' WHERE \`User_ID\`='${userID}'`, (error2, results2, fields2) => {
          callback();
        });
      }
    });
  };


  // But is the guild in the db?
  client.checkServer = (serverID, serverName, serverIcon, callback) => {
    connection.query(`SELECT COUNT(*) AS \`count\`, \`serveravatar\`,\`servername\` FROM \`servers\` WHERE \`serverid\` ='${serverID}'`, (error, results, ffields) => {
      if (results[0].count === 0) {
        connection.query(`INSERT INTO \`servers\`(\`serverid\`, \`servername\`) VALUES ('${serverID}', ${connection.escape(serverName)})`, (error, results, fields) => {
          callback();
        });
      } else {
        if (results[0].ServerIcon != serverIcon)
          connection.query(`UPDATE \`servers\` SET \`serveravatar\` = '${serverIcon}' WHERE \`serverid\` = '${serverID}'`, (error, results, fields) => {});

        if (results[0].ServerName != serverName) {
          connection.query(`UPDATE \`servers\` SET \`servername\` = ${connection.escape(serverName)} WHERE \`serverid\` = '${serverID}'`, (error, results, fields) => {
            callback();
          });
        }
      }
    });
  };
};
