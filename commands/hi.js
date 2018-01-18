exports.run = (client, message, args, Discord) => {
  var his = ['http://i.imgur.com/nj8E5H5.png',
    'https://cdn.discordapp.com/attachments/367503031190683648/370364147306856448/image.jpg',
    'https://i.giphy.com/media/KOVlHmbBA09XO/giphy.gif',
    'https://cdn.discordapp.com/attachments/346651380372602880/370366486587637761/YoshiHello.png',
    'https://cdn.discordapp.com/attachments/346651380372602880/370364813898940416/qtwave.jpg',
    'https://media.giphy.com/media/a1QLZUUtCcgyA/giphy.gif',
    'https://media.giphy.com/media/yyVph7ANKftIs/giphy.gif',
    'https://media.giphy.com/media/nF64geTGfVoNq/giphy.gif',
    'https://m.popkey.co/51ca23/gN3L_f-maxage-0_s-200x150.gif',
    'https://media.tenor.com/images/474fdcfc364b81ee00c1727b27564dd0/tenor.gif',
    'https://media.giphy.com/media/cy1lMcwRc2Fyg/giphy.gif',
    'http://49.media.tumblr.com/687b0fc5b406ee9851b932c5176ea74b/tumblr_o19n9s5UuQ1r3h5rdo1_400.gif',
    'http://data.whicdn.com/images/201202630/original.gif',
    'https://media.tenor.com/images/059ada68643e52ee8ea5b2f32908f957/tenor.gif',
  ];
  var hi = his[Math.floor(Math.random() * his.length)];
  message.channel.send({
    file: hi,
  });
};


exports.conf = {
  name: 'hi',
  description: 'Hey there',
  usage: 'hi',
  aliases: ['hello', 'hey'],
};
