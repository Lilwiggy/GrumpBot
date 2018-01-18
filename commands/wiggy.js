exports.run = (client, message, args, Discord) => {
  var memes = ['http://i.imgur.com/HdwbVA9.jpg',
    'http://i.imgur.com/nAjwnFQ.jpg',
    'http://i.imgur.com/fh6IqOe.jpg',
    'http://i.imgur.com/aeZSz5C.jpg',
    'http://i.imgur.com/uUDfWeZ.jpg',
    'http://i.imgur.com/quxBjiS.jpg',
    'http://i.imgur.com/dRoi2hf.jpg',
    'http://i.imgur.com/OEBFReP.jpg',
    'http://i.imgur.com/FT9ot5E.jpg',
    'http://i.imgur.com/0VxD026.jpg',
    'http://i.imgur.com/OqzK315.jpg',
    'http://i.imgur.com/c9VrMzD.jpg',
    'http://i.imgur.com/G50bzn3.jpg',
    'http://i.imgur.com/w7nQaTE.jpg',
    'http://i.imgur.com/fUaCONV.jpg',
    'http://i.imgur.com/3u2zeRU.jpg',
    'http://i.imgur.com/i1UKCZJ.png',
    'http://i.imgur.com/lQLjqWV.png',
    'https://cdn.discordapp.com/attachments/349619800147886081/349619829084389378/woggeronero.png',
  ];
  var meme = memes[Math.floor(Math.random() * memes.length)];
  if (message.guild.id === '151760749918683137') {
    if (message.channel.id === '222209999676506112') {
      message.channel.send("Here's your Wiggy Meme™ ", {
        file: meme,
      });
    }
  } else {
    message.channel.send("Here's your Wiggy Meme™ ", {
      file: meme,
    });
  }
};


exports.conf = {
  name: 'wiggy',
  description: 'lmao',
  usage: 'wiggy',
  aliases: ['wigwam', 'wiggle'],
};
