exports.run = (client, message, args, Discord) => {
  function complimentS() {
    var fs = require('fs');
    var compliments = ['Your smile is contagious.', 'You look great today.', "You're a smart cookie.",
      'I bet you make babies smile.', 'You have impeccable manners.', 'I like your style.', 'You have the best laugh.', 'I appreciate you.', 'You are the most perfect you there is.',
      'You are enough.', "You're strong.", 'Your perspective is refreshing.', "You're an awesome friend.", 'You light up the room.', 'You deserve a hug right now.', 'You should be proud of yourself.', "You're more helpful than you realize.",
      'You have a great sense of humor.', "You've got all the right moves!", 'Is that your picture next to "charming" in the dictionary?',
    ];
    var compliment = compliments[Math.floor(Math.random() * compliments.length)];
    fs.readFile('last.json', 'utf-8', (err, data1) => {
      if (err)
        throw err;
      let data = JSON.parse(data1);
      if (compliment === data.compliment) {
        complimentS();
      } else {
        message.channel.send(compliment);

        var fileName = `../last.json`;
        var file = require(fileName);


        file.compliment = compliment;


        fs.writeFile(fileName, JSON.stringify(file), (er) => {
          if (er)
            client.users.get('232614905533038593').send(`I'm sorry but this happened:\n${err}\n\nSorry...`);
        });
      }
    });
  }
  complimentS();
};


exports.conf = {
  name: 'compliment',
  description: 'Yes',
  usage: 'compliment',
  aliases: [],
};
