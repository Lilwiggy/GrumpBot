exports.run = (client, message, args, Discord, connection) => {
  var Jimp = require('jimp');
  client.checkUser(message.author.id, message.author.avatarURL, () => {
    connection.query(`SELECT *,NOW()-INTERVAL 12 HOUR > \`DailyTime\` AS canGetDaily,(TO_SECONDS(\`DailyTime\`)-TO_SECONDS(NOW() - INTERVAL 12 HOUR)) AS restTime, NOW()  FROM \`user\` WHERE \`User_ID\`='${message.author.id}'`, (error, results, fields) => {
      if (results[0].canGetDaily === 1) {
        if (message.mentions.users.first()) {
          if (message.mentions.users.first().bot) {
            message.channel.send("You can't give robots a wolfjob dummy!");
          } else
          if (message.mentions.users.first().id === message.author.id) {
            message.channel.send("You can't give yourself a wolfjob. That's just weird.");
          } else {
            message.channel.startTyping();
            client.checkUser(message.mentions.users.first().id, message.mentions.users.first().avatarURL, () => {
              connection.query(`UPDATE \`user\` SET \`WJ\` = \`WJ\` + 1 WHERE \`User_ID\` = '${message.mentions.users.first().id}'`);
              connection.query(`UPDATE \`user\` SET \`DailyTime\`=NOW() WHERE \`User_ID\` = '${message.author.id}'`, () => {
                Jimp.read(message.author.avatarURL, (err, img) => {
                  if (err)
                    throw err;
                  Jimp.read(`WJ.jpg`, (error, res) => {
                    Jimp.read(message.mentions.users.first().avatarURL, (errorr, j) => {
                      img.resize(30, 30)
                        .quality(100);
                      j.resize(30, 30)
                        .quality(100);
                      res.composite(img, 60, 32);

                      res.composite(j, 80, 5)
                        .getBuffer(Jimp.MIME_PNG, (err, wjr) => {
                          if (err)
                            throw err;
                          let wj = new Discord.Attachment()
                            .setAttachment(wjr, `${message.author.id}.png`);
                          message.channel.send(`<@${message.author.id}> just gave <@${message.mentions.users.first().id}> a wolfjob!`, {
                            file: wj,
                          }).then(message.channel.stopTyping());
                        });
                    });
                  });
                });
              });
            });
          }
        } else {
          message.channel.send('Please mention a valid user.');
        }
      } else {
        let date = new Date(null);
        date.setSeconds(results[0].restTime);
        let hours = date.toISOString().substr(11, 2);
        let minutes = date.toISOString().substr(14, 2);
        let seconds = date.toISOString().substr(17, 2);

        message.channel.send(`You can give someone a wolfjob in, ${hours} hours, ${minutes} minutes, and ${seconds} seconds.`);
      }
    });
  });
};


exports.conf = {
  name: 'wolfjob',
  description: 'Ew gross',
  usage: 'wolfjob @user',
  aliases: ['wj'],
};
