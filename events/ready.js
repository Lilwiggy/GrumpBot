exports.run = (client) => {
  console.log('Hey I\'m Grump!');
  client.user.setPresence({ game: { name: 'Use ..help for help', type: 0 },
  });
};
