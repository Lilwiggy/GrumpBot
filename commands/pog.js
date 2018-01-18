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
      const stream = ytdl('https://youtu.be/QNSdL4bTyz8', {
        filter: 'audioonly',
      });
      const dispatcher = connection.playStream(stream, streamOptions);
      dispatcher.on('end', () => {
        voiceChannel.leave();
      });
    });
  }
};


exports.conf = {
  name: 'pog',
  description: 'Magic cards',
  usage: 'pog',
  aliases: [],
};
