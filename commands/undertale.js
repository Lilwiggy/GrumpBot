exports.run = (client, message, args, Discord) => {
  let voiceChannel = message.member.voiceChannel;

  // Play streams using ytdl-core
  const ytdl = require('ytdl-core');
  const streamOptions = {
    seek: 0,
    volume: 1,
  };
  if (!voiceChannel) {
    message.channel.send('Hey dumbass! Get in a VC!');
  } else {
    voiceChannel.join().then((connection) => {
      const stream = ytdl('https://www.youtube.com/watch?v=1OFc6LZo91w', {
        filter: 'audioonly',
      });
      const dispatcher = connection.playStream(stream, streamOptions);
      dispatcher.on('end', () => {
        voiceChannel.leave();
      });
    })
      .catch(console.error);
  }
};


exports.conf = {
  name: 'undertale',
  description: 'No',
  usage: 'undertale',
  aliases: [],
};
