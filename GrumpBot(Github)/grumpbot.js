//////////////////////////////////////////////////////////
//
//Authors: Skymi16 (He pays for the VPS) & Lilwiggy (I do most of the coding)
//
//Program name: Grumpbot
//Purpose: To manage the Game Grumps discord server
//
//////////////////////////////////////////////////////////
//Need these
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
//SQL Shiz
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: config.sql.host,
    user: config.sql.username,
    password: config.sql.password,
    database: config.sql.db_name
});
const fs = require('fs');

//functions

//Prefix
const prefix = '..';

const adminP = "g@";


//checkUser
function checkUser(userID, UserName, UserAvatar, callback) {

    connection.query("SELECT COUNT(*) AS `count`, `UserAvatar`, `UserName` FROM `user` WHERE `User_ID`='" + userID + "'", function(error, results, fields) {
        if (results[0].count === 0) {
            connection.query("INSERT INTO `user`(`User_ID`, `UserName`) VALUES ('" + userID + "', " + connection.escape(UserName) + ")", function(error, results, fields) {
                callback()
            })
        } else {
            if (results[0].UserAvatar != UserAvatar) {
                connection.query("UPDATE `user` SET `UserAvatar` = '" + UserAvatar + "' WHERE `User_ID`='" + userID + "'", function(error, results, fields) {})
            }
            if (results[0].UserName != UserName) {
                connection.query("UPDATE `user` SET `UserName` = " + connection.escape(UserName) + " WHERE `User_ID` ='" + userID + "'", function(error, results, fields) {})
            }
            callback()
        }
    });
}


//CheckServer
function checkServer(serverID, ServerName, ServerAvatar, callback) {

    connection.query("SELECT COUNT(*) AS `count`, `serveravatar`, `servername` FROM `servers` WHERE `serverid`='" + serverID + "'", function(error, results, fields) {
        if (results[0].count === 0) {
            connection.query("INSERT INTO `servers`(`serverid`, `servername`) VALUES ('" + serverID + "', " + connection.escape(ServerName) + ")", function(error, results, fields) {
                callback()
            })
        } else {
            if (results[0].serveravatar != ServerAvatar) {
                connection.query("UPDATE `servers` SET `serveravatar` = '" + ServerAvatar + "' WHERE `serverid`='" + serverID + "'", function(error, results, fields) {})
            }
            if (results[0].servername != ServerName) {
                connection.query("UPDATE `servers` SET `servername` = " + connection.escape(ServerName) + " WHERE `serverid` ='" + serverID + "'", function(error, results, fields) {})
            }
            callback()
        }
    });
}
client.on("ready", () => {
    console.log("Grumpbot Online!");
    client.user.setPresence({
        game: {
            name: "..help",
            type: 0
        }
    });
});




//~~~~~~~~~~Begin commands~~~~~~~~~~

client.on("message", message => {
    //Beep?
    if (message.author.bot) {
        return;
    }

    //Splits every word into args
    var args = message.content.split(/[ ]+/);
    var msg = message.content.toLowerCase();

    //Does is in DB?

    if (message.guild.id === "151760749918683137") {
        if (message.member.roles.has("343563117181272075")) {
            connection.query("SELECT * FROM `user` WHERE `User_ID` = " + message.author.id + "", function(err, res, fields) {
                if (res[0].welcomed === 0) {
                    connection.query("UPDATE `user` SET `welcomed` = 1 WHERE `User_ID` = " + message.author.id + "")
                    message.guild.channels.find("id", "343563865893765130").send(`<@${message.author.id}> Welcome to level 21 chat! Please read pins for the rules n shiz!`)
                }
            })

        }

    }

    //Adds XP
    checkUser(message.author.id, message.author.username, message.author.avatarURL, function() {
        connection.query("SELECT `xp`, `next`, `level` FROM `user` WHERE `User_ID` = '" + message.author.id + "'", function(err, res, fields) {
            connection.query("SELECT *,NOW()-INTERVAL 1 MINUTE > `xp_cool` AS xpAdd FROM `user` WHERE `User_ID` = '" + message.author.id + "'", function(err1, res1, fields1) {
                if (res1[0].xpAdd === 1) {
                    var xp_amount = ["10", '11', '12', '13', '14', '15']
                    var xP = xp_amount[Math.floor(Math.random() * xp_amount.length)]
                    connection.query("UPDATE `user` SET `xp_cool` =NOW(), `xp`=`xp` + '" + xP + "' WHERE `User_ID` = '" + message.author.id + "'")
                    if (res[0].xp > res[0].next) {
                        connection.query("SELECT * FROM `servers` WHERE `serverid` = " + message.guild.id + "", function(errS, results, feildsS) {
                            if (results[0].levels === 1) {
                                message.channel.send(`| :up: | <@${message.author.id}>! You just leveled up to level ${res[0].level + 1}!`)
                            }
                            connection.query("UPDATE `user` SET `next`=`next` + 100, `xp` = 0, `level`=`level`+1 WHERE `User_ID` = '" + message.author.id + "'")
                        })
                    }
                }
            })
        })

    })
    checkServer(message.guild.id, message.guild.name, message.guild.iconURL, function() {})




    //help
    if (msg.startsWith(prefix + "help")) {
        if (args.length === 1) {
            const embed = new Discord.RichEmbed()
                .setAuthor("---Help Menu---")
                .setTitle("Grumpbot Support")
                .setURL("https://discord.gg/WhV5NVE")
                .setFooter('Grumpbot © Skymi16 & Lilwiggy 2017')
                .setColor("#ff9900")
                .addField("Text Commands", "..help text")
                .addField("Voice Channel Commands", "..help vc")
                .addField("Profile Commands", "..help profile")
                .addField("Meme Commands", "..help memes")
                .addField("Admin Commands", "..help admin")
                .addField("Bot Information", "..stats")
            message.channel.send({
                embed
            })
        } else if (args[1] == "text") {
            const embed = new Discord.RichEmbed()
                .setAuthor("---Text Commands---")
                .setTitle("Grumpbot Support")
                .setURL("https://discord.gg/WhV5NVE")
                .setFooter('Grumpbot © Skymi16 & Lilwiggy 2017')
                .setColor("#ff9900")
                .addField("..hi", "Bot will say hello.")
                .addField("..invite", "A link to invite Grumpbot to your own server.")
                .addField("..stats", "View bot information and status.")
                .addField("..server", "View information about this server.")
                .addField("..topic", "Generate a random topic of conversation.")
                .addField("..hug", "EEEK THE HUGS! <3")
                .addField("..compliment", "That's a nice color on you...")
            message.channel.send({
                embed
            })
        } else if (args[1] == "vc") {
            const embed = new Discord.RichEmbed()
                .setAuthor("---VC Commands---")
                .setTitle("Grumpbot Support")
                .setURL("https://discord.gg/WhV5NVE")
                .setFooter('Grumpbot © Skymi16 & Lilwiggy 2017')
                .setColor("#ff9900")
                .addField("..pog", "What does pot of greed do?")
                .addField("..undertale", "Idk what this is Sky said to add it.")
                .addField("..thot", "BEGONE!!!")
                .addField("..bee", "There's a bee?")
            message.channel.send({
                embed
            })
        } else if (args[1] == "profile") {
            const embed = new Discord.RichEmbed()
                .setAuthor("---Profile Commands---")
                .setTitle("Grumpbot Support")
                .setURL("https://discord.gg/WhV5NVE")
                .setFooter('Grumpbot © Skymi16 & Lilwiggy 2017')
                .setColor("#ff9900")
                .addField("..profile", "View your own profile.")
                .addField("..profile {@user}", "View mentioned user's profile.")
                .addField("..wolfjob {@user}", "Give mentioned user a Wolfjob.")
            message.channel.send({
                embed
            })
        } else if (args[1] == "memes") {
            const embed = new Discord.RichEmbed()
                .setAuthor("---Meme Commands---")
                .setTitle("Grumpbot Support")
                .setURL("https://discord.gg/WhV5NVE")
                .setFooter('Grumpbot © Skymi16 & Lilwiggy 2017')
                .setColor("#ff9900")
                .addField("..goodluck", "You see chris...")
                .addField("..hacker1", "I'll get you banned kiddo...")
                .addField("..hacker2", "Guess you weren't listening kiddo...")
                .addField("..hacker3", "Sorry sweetie...")
                .addField("..hacker4", "STILL NOT DONE...")
            message.channel.send({
                embed
            })
        } else if (args[1] == "admin") {
            const embed = new Discord.RichEmbed()
                .setAuthor("---Admin Commands---")
                .setTitle("Grumpbot Support")
                .setURL("https://discord.gg/WhV5NVE")
                .setFooter('Grumpbot © Skymi16 & Lilwiggy 2017')
                .setColor("#ff9900")
                .addField("..ban {@user}", "Bans the mentioned user and leaves a present in their wake.")
                .addField("..togglewelcome", "enable/disable welcome messages in the server's default channel.")
                .addField("..togglelevels", "enable/disable level up messages.")
            message.channel.send({
                embed
            })
        }




    }

    //invite
    if (msg.startsWith(prefix + "invite")) {
        message.channel.send("Wanna add the power of the grumps to your server? \nHere's the link: https://discordapp.com/oauth2/authorize?client_id=342688498320539668&scope=bot&permissions=0");
    }

    //stats
    if (msg.startsWith(prefix + "stats")) {
        if (msg.startsWith(prefix + 'stats')) {
            const embed = new Discord.RichEmbed()
                .setTitle("GrumpBot support")
                .setAuthor('GrumpBot', client.user.avatarURL)
                .setColor("#ff9900")
                .setFooter('Grumpbot © Skymi16 & Lilwiggy 2017')
                .setURL('https://discord.gg/WhV5NVE ')
                .addField(`Stats`, `**Total servers:** ${client.guilds.size}\n**Ping:** ${Math.floor(client.ping)} ms\n**Total members:** ${client.users.size}\n**FrameWork:** Discord.js ${Discord.version}\n**Node.js version:** ${process.version.substr(1)}`, true)
            message.channel.send({
                embed

            });

        }


    }

    //hi
    if (msg.startsWith(prefix + "hi")) {
        var his = ["http://i.imgur.com/nj8E5H5.png",
            "https://cdn.discordapp.com/attachments/367503031190683648/370364147306856448/image.jpg",
            "https://i.giphy.com/media/KOVlHmbBA09XO/giphy.gif",
            "https://cdn.discordapp.com/attachments/346651380372602880/370366486587637761/YoshiHello.png",
            "https://cdn.discordapp.com/attachments/346651380372602880/370364813898940416/qtwave.jpg",
            "https://media.giphy.com/media/a1QLZUUtCcgyA/giphy.gif",
            "https://media.giphy.com/media/yyVph7ANKftIs/giphy.gif",
            "https://media.giphy.com/media/nF64geTGfVoNq/giphy.gif",
            "https://m.popkey.co/51ca23/gN3L_f-maxage-0_s-200x150.gif",
            "https://media.tenor.com/images/474fdcfc364b81ee00c1727b27564dd0/tenor.gif",
            "https://media.giphy.com/media/cy1lMcwRc2Fyg/giphy.gif",
            "http://49.media.tumblr.com/687b0fc5b406ee9851b932c5176ea74b/tumblr_o19n9s5UuQ1r3h5rdo1_400.gif",
            "http://data.whicdn.com/images/201202630/original.gif",
            "https://media.tenor.com/images/059ada68643e52ee8ea5b2f32908f957/tenor.gif"
        ]
        var hi = his[Math.floor(Math.random() * his.length)]
        message.channel.send({
            file: hi
        });
    }

    //server info
    if (msg.startsWith(prefix + "server")) {

        const embed = new Discord.RichEmbed()
            .setAuthor("---Server Information---")
            .setTitle(message.guild.name)
            .setFooter('Grumpbot © Skymi16 & Lilwiggy 2017')
            .setColor("#ff9900")
            .setThumbnail(message.guild.iconURL)
            .addField("Number of members", message.guild.memberCount)
            .addField("Server ID", message.guild.id)
            .addField("Server Birthday", message.guild.createdAt)
            .addField("Server Owner", message.guild.owner)
            .addField("Server Reigion", message.guild.region)
        message.channel.send({
            embed
        })
    }

    //topic generator
    if (msg.startsWith(prefix + "topic")) {

        var fs = require('fs')
        fs.readFile("starters.txt", "utf-8", function(err, data) {
            var topics = data.split(" | ");
            var topic = topics[Math.floor(Math.random() * topics.length)];
            message.channel.send(topic)
        })
    }


    //goodluck meme command
    if (msg.startsWith(prefix + "goodluck")) {
        if (message.mentions.users.first()) {
            var ji = "The thing about me, Chris, is I just shrugged off a ban in 2 seconds, where as you're probably treating it like a huge life achievment and talking all kinds of shit to your cancerous audience. If you honestly think me not being apart of that server is going to effect my life, you must be a real sad human being. I have two jobs and a group of people that hang out in person every single day for the last 13 years of my life, where as you probably only hang out with your mother and you are just sitting on a computer monitoring some pathetic server about a fairly poor youtube channel. Who looks more pathetic here? Thought so. It's all fun and games until somebody disables your PID too. Talk all that shit but you won't do nothing, especially when you fuck with the wrong person. And please, PLEASE try to act like tough shit. TRY to pretend like you don't care or that \"I cant do anything\". Because guess what, have you heard of the youtuber \"AngleWing20\"? He had over 7 million subscribers and a discord server with around 6 thousand members? Where are they? Oh that's right. I took his youtube account, deleted all his shit, deactivated it, and did the same to his discord. All you have to do is look at the proof. So goodluck Young Child (; (P.S Blocking immediately after sending message. Ill never see a single pathetic word you say so go ahead and waste your time writing a \"tough\" reply)"
            var msg = ji.replace("Chris", message.mentions.users.first().username)
            message.channel.send(msg)
        } else
            message.channel.send("The thing about me, Chris, is I just shrugged off a ban in 2 seconds, where as you're probably treating it like a huge life achievment and talking all kinds of shit to your cancerous audience. If you honestly think me not being apart of that server is going to effect my life, you must be a real sad human being. I have two jobs and a group of people that hang out in person every single day for the last 13 years of my life, where as you probably only hang out with your mother and you are just sitting on a computer monitoring some pathetic server about a fairly poor youtube channel. Who looks more pathetic here? Thought so. It's all fun and games until somebody disables your PID too. Talk all that shit but you won't do nothing, especially when you fuck with the wrong person. And please, PLEASE try to act like tough shit. TRY to pretend like you don't care or that \"I cant do anything\". Because guess what, have you heard of the youtuber \"AngleWing20\"? He had over 7 million subscribers and a discord server with around 6 thousand members? Where are they? Oh that's right. I took his youtube account, deleted all his shit, deactivated it, and did the same to his discord. All you have to do is look at the proof. So goodluck Young Child (; (P.S Blocking immediately after sending message. Ill never see a single pathetic word you say so go ahead and waste your time writing a \"tough\" reply)");
    }

    if (msg.startsWith(prefix + "hacker1")) {
        message.channel.send("you say these thing over the internet thinking as if they have no consequences, but you;re wrong. I'm a master hacker and I can easily hack you and the discord server to get you banned, kiddo. Telling me I'm gay to my face I mean I thought you were cool at first but now you are giving me no choice but to hack you on discord and shut down your account. I'm sorry but this is how it is, actions have consequences. Maybe next time you'll think twice before you try and call me gay again :heart:");
    }

    if (msg.startsWith(prefix + "hacker2")) {
        message.channel.send("well im sorry kiddo but apparently you weren't listening. I've been a memeber of lizard squad AND anonymous and I'm pretty big in the hacking community. You think after I've just told you the retribution i will take on your friend, you can get away with just calling me gay again??? and straight away??? don't even think of changing your password, you're getting hacked and your account is gonna be deleted, so have fun saying goodbye to all your discord friends. This time it's your fault, you were warned and you still came at me. You deserve all the hacks coming your way :heart:");
    }

    if (msg.startsWith(prefix + "hacker3")) {
        message.channel.send("And another small kid thinking he's cool has decided to try and face me. You think that it's gonna be hard for me to hack you, I laugh at this notion. Hacking you will be quick and easy and it's something i do every day so at this point its part of the routine. You think I'm kidding but you will learn that I'm actually capable of doing what i say I will. Well you're wrong. Lizard squad trained me and I've become powerful, I'm known for ruining careers and hacking discord servers, don't think you can hastle me. Sorry sweetie :heart:");
    }

    if (msg.startsWith(prefix + "hacker4")) {
        message.channel.send("WOW everyone, you people keep going at it, thinking my feelings are hurt, yet you dont realise what I can do, you dont realise how long i have trained. I'm the strongest hacker at the moment, I can hack any one at any time, and cause discord is new it's SUPER EASY TO HACK LOSERS. I'm no \"script kiddie\" i am the real deal. yeah i may use ivan ooze as my character because he represents true evil and being a good and powerful antagonist. You think you can insult ivan ooze? He's better than you'll ever be and so am I. Sorry for hacking you (oh wait, I'm not <3)");
    }


    //profile
    if (msg.startsWith(prefix + "profile")) {
        if (message.mentions.users.first()) {
            checkUser(message.mentions.users.first().id, message.mentions.users.first().username, message.mentions.users.first().avatarURL, function() {
                connection.query("SELECT `WJ`, `xp`, `next`, `level` FROM `user` WHERE `User_ID` = '" + message.mentions.users.first().id + "'", function(error, results, fields) {
                    const embed = new Discord.RichEmbed()
                        .setTitle("User Profile")
                        .setThumbnail(message.mentions.users.first().avatarURL)
                        .setFooter('Grumpbot © Skymi16 & Lilwiggy 2017')
                        .setColor("#ff9900")
                        .addField("Wolfjobs Recieved", results[0].WJ)
                        .addField("Level", results[0].level)
                        .addField("EXP", `${results[0].xp} / ${results[0].next}`)
                    message.channel.send({
                        embed
                    })
                })
            })
        } else {
            checkUser(message.author.id, message.author.username, message.author.avatarURL, function() {
                connection.query("SELECT `WJ`, `xp`, `next`, `level` FROM `user` WHERE `User_ID` = '" + message.author.id + "'", function(error, results, fields) {
                    const embed = new Discord.RichEmbed()
                        .setTitle("User Profile")
                        .setThumbnail(message.author.avatarURL)
                        .setFooter('Grumpbot © Skymi16 & Lilwiggy 2017')
                        .setColor("#ff9900")
                        .addField("Wolfjobs Recieved", results[0].WJ)
                        .addField("Level", results[0].level)
                        .addField("EXP", `${results[0].xp} / ${results[0].next}`)
                    message.channel.send({
                        embed
                    })
                })
            })
        }
    }


    //wolfjob
    if (msg.startsWith(prefix + "wolfjob")) {
        checkUser(message.author.id, message.author.username, message.author.avatarURL, function() {
            connection.query("SELECT *,NOW()-INTERVAL 12 HOUR > `DailyTime` AS canGetDaily,(TO_SECONDS(`DailyTime`)-TO_SECONDS(NOW() - INTERVAL 12 HOUR)) AS restTime, NOW()  FROM `user` WHERE `User_ID`='" + message.author.id + "'", function(error, results, fields) {
                if (results[0].canGetDaily === 1) {

                    if (message.mentions.users.first()) {
                        if (message.mentions.users.first().bot) {
                            message.channel.send("You can't give robots a wolfjob dummy!")
                        } else
                        if (message.mentions.users.first().id == message.author.id) {
                            message.channel.send("You can't give yourself a wolfjob. That's just weird.")
                        } else
                            checkUser(message.mentions.users.first().id, message.mentions.users.first().username, message.mentions.users.first().avatarURL, function() {
                                connection.query("UPDATE `user` SET `WJ` = `WJ` + 1 WHERE `User_ID` = '" + message.mentions.users.first().id + "'")
                                connection.query("UPDATE `user` SET `DailyTime`=NOW() WHERE `User_ID` = '" + message.author.id + "'", function() {
                                    var Jimp = require("jimp")
                                    Jimp.read(message.author.avatarURL, function(err, img) {
                                        if (err) throw err;
                                        Jimp.read(`WJ.jpg`, function(error, res) {
                                            Jimp.read(message.mentions.users.first().avatarURL, function(errorr, j) {
                                                img.resize(30, 30)
                                                    .quality(100)
                                                j.resize(30, 30)
                                                    .quality(100)

                                                res.composite(img, 60, 32)
                                                res.composite(j, 80, 5)



                                                    .write("w.png"); // save 
                                                message.channel.startTyping()
                                                setTimeout(function() {
                                                    message.channel.send(`<@${message.author.id}> just gave <@${message.mentions.users.first().id}> a wolfjob!`, {
                                                        file: "w.png"
                                                    })
                                                }, 3000)
                                                message.channel.stopTyping()
                                            })

                                            message.channel.stopTyping()



                                        })

                                    })

                                })

                            })
                    } else {
                        message.channel.send("Please mention a valid user.")
                    }
                } else {
                    let date = new Date(null);
                    date.setSeconds(results[0].restTime);
                    let hours = date.toISOString().substr(11, 2);
                    let minutes = date.toISOString().substr(14, 2);
                    let seconds = date.toISOString().substr(17, 2);

                    message.channel.send(`You can give someone a wolfjob in, ${hours} hours, ${minutes} minutes, and ${seconds} seconds.`)
                }
            })
        })

    }

    //VC commands lol those are at the bottom stupid




    //ADMIN COMMANDS

    //ban and post a meme
    if (msg.startsWith(prefix + "ban")) {
        /*if (!message.guild.member().hasPermission("BAN_MEMBERS")){
           message.channel.send("AW NUTS! I do not have permission to ban users. Please be sure that I have the \"Ban Members\" permission and that my highest role is above the desired user to be banned.");
        }
        else*/
        if (!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) {
            message.channel.send("AW NUTS! You don't have permission to ban users!");
        } else {
            if (!message.mentions.users.first()) {
                message.channel.send("<:woah:332985084145827840> You forgot to mention someone!")
            } else

            if (message.mentions.users.first().id === "342688498320539668") {
                message.channel.send(`I'm sorry, ${message.author.username}, I can't let you do that.`)
            } else {
                message.guild.member(message.mentions.users.first()).ban();
                var bans = [
                    "http://i.imgur.com/H98LML4.gif",
                    "http://i2.kym-cdn.com/photos/images/masonry/000/791/407/40c.gif",
                    "http://i.imgur.com/azCR8D1.gif",
                    "https://media.tenor.com/images/1b1c4076f6cdc343502d0fc899421946/tenor.gif",
                    "http://i.imgur.com/Nziie7u.gif",
                    "http://i.imgur.com/rUQHO5H.gif",
                    "https://uploads.disquscdn.com/images/9ddc223b561ae7d4f314049633bdf2aba66290bc09fb58be02318f608d5c9779.gif",
                    "https://img.ifcdn.com/images/7d8358425d233e926a6a78060990a415d56ac8497e98062f9fdb6356fa52af87_1.gif"
                ];
                var ban = bans[Math.floor(Math.random() * bans.length)];
                message.channel.send({
                    file: ban
                });
            }
        }
    }

    //toggle welcome messages on/off
    if (msg.startsWith(prefix + "togglewelcome")) {
        if (message.member.hasPermission("ADMINISTRATOR")) {
            connection.query("SELECT `welcome` FROM `servers` WHERE `serverid` = '" + message.guild.id + "'", function(err, res, fields) {
                if (res[0].welcome === 0) {
                    connection.query("UPDATE `servers` SET `welcome` = 1 WHERE `serverid` = '" + message.guild.id + "'")
                    message.channel.send("Welcome messages enabled.")
                } else {
                    connection.query("UPDATE `servers` SET `welcome` = 0 WHERE `serverid` = '" + message.guild.id + "'")
                    message.channel.send("Welcome messages disabled.")
                }
            })
        } else {
            message.channel.send("AW NUTS! You don't have permission to use this command.")
        }
    }

    //toggle level up messages on/off
    if (msg.startsWith(prefix + "togglelevels")) {
        if (message.member.hasPermission("ADMINISTRATOR")) {
            connection.query("SELECT `levels` FROM `servers` WHERE `serverid` = '" + message.guild.id + "'", function(err, res, fields) {
                if (res[0].levels === 0) {
                    connection.query("UPDATE `servers` SET `levels` = 1 WHERE `serverid` = '" + message.guild.id + "'")
                    message.channel.send("Level up messages enabled.")
                } else {
                    connection.query("UPDATE `servers` SET `levels` = 0 WHERE `serverid` = '" + message.guild.id + "'")
                    message.channel.send("Level up messages disabled.")
                }
            })
        } else {
            message.channel.send("AW NUTS! You don't have permission to use this command.")
        }
    }


    //Easter egg

    var memes = ["http://i.imgur.com/HdwbVA9.jpg",
        "http://i.imgur.com/nAjwnFQ.jpg",
        "http://i.imgur.com/fh6IqOe.jpg",
        "http://i.imgur.com/aeZSz5C.jpg",
        "http://i.imgur.com/uUDfWeZ.jpg",
        "http://i.imgur.com/quxBjiS.jpg",
        "http://i.imgur.com/dRoi2hf.jpg",
        "http://i.imgur.com/OEBFReP.jpg",
        "http://i.imgur.com/FT9ot5E.jpg",
        "http://i.imgur.com/0VxD026.jpg",
        "http://i.imgur.com/OqzK315.jpg",
        "http://i.imgur.com/c9VrMzD.jpg",
        "http://i.imgur.com/G50bzn3.jpg",
        "http://i.imgur.com/w7nQaTE.jpg",
        "http://i.imgur.com/fUaCONV.jpg",
        "http://i.imgur.com/3u2zeRU.jpg",
        "http://i.imgur.com/i1UKCZJ.png",
        "http://i.imgur.com/lQLjqWV.png",
        "https://cdn.discordapp.com/attachments/349619800147886081/349619829084389378/woggeronero.png"
    ]

    if (msg.startsWith(prefix + "wiggy")) {
        if (message.guild.id === "151760749918683137") {
            if (message.channel.id != "222209999676506112") {
                return;
            } else {
                var meme = memes[Math.floor(Math.random() * memes.length)];

                message.channel.send("Here's your Wiggy Meme™ ", {
                    file: meme
                })
            }
        } else {
            var meme = memes[Math.floor(Math.random() * memes.length)];

            message.channel.send("Here's your Wiggy Meme™ ", {
                file: meme
            })
        }



    }


    //Needs more hugs
    var hugs = ["https://media.tenor.com/images/efdd8f53689b1bb3437054d608156e95/tenor.gif",
        "http://vignette2.wikia.nocookie.net/degrassi/images/d/df/ATTACK_HUG.gif",
        "https://media.giphy.com/media/od5H3PmEG5EVq/giphy.gif",
        "http://gifimage.net/wp-content/uploads/2017/06/anime-hug-gif-16.gif",
        "https://media.giphy.com/media/xJlOdEYy0r7ZS/giphy.gif",
        "https://media.giphy.com/media/DjczAlIcyK1Co/giphy.gif",
        "https://myanimelist.cdn-dena.com/s/common/uploaded_files/1460993069-9ac8eaae8cd4149af4510d0fed0796bf.gif",
        "https://media.tenor.com/images/4441c1824642f363ed1a3fae53df3b43/tenor.gif",
        "https://s-media-cache-ak0.pinimg.com/originals/c5/85/27/c58527caa736f8d5ce4ab6ee6e3f736b.gif",
        "https://media.tenor.com/images/365f34c638f5fcc6564bb2ead561ff5c/tenor.gif",
        "http://media.tumblr.com/2e21664bfe2ca4ed1d2c264993fd157c/tumblr_inline_ne6ecxnYy21rid3d5.gif",
        "https://media.tenor.com/images/e07a54a316ea6581329a7ccba23aea2f/tenor.gif",
        "https://media.tenor.com/images/00b03042f404a35fe210982961387d13/tenor.gif",
        "http://cdn.smosh.com/sites/default/files/ftpuploads/bloguploads/0413/epic-hugs-friends-anime.gif",
        "https://media.giphy.com/media/f5hhE6f3h8Vkk/giphy.gif",
        "https://media.tenor.com/images/4e258f5d8b171c304d65cd5c4a05112e/tenor.gif",
        "https://media.tenor.com/images/caeb72a8cd1e5e0fb072df71db450de8/tenor.gif",
        "https://media.giphy.com/media/C4gbG94zAjyYE/giphy.gif",
        "https://media.tenor.com/images/e154dc53a688bb57898dbb6e8b156b23/tenor.gif",
        "https://media.giphy.com/media/g02bLnr5XD4k/giphy.gif",
        "https://media.tenor.com/images/c841c6a0263e5ed16f66d2e8a3e7ab8c/tenor.gif",
        "https://31.media.tumblr.com/5e86bb5906d5d5603351e9dbea007dea/tumblr_inline_n998n40b2q1sx8vac.gif",
        "http://31.media.tumblr.com/9204649fd84d3df7223feb6712a89444/tumblr_n8pc8badUs1sg0ygjo1_250.gif",
        "http://gifimage.net/wp-content/uploads/2017/01/Anime-hug-GIF-Image-Download-24.gif",
        "http://cdn.smosh.com/sites/default/files/ftpuploads/bloguploads/0413/epic-hugs-friends-pikachu.gif",
        "http://33.media.tumblr.com/tumblr_lny2x0I2111qkaujc.gif",
        "http://s8.favim.com/orig/151210/anime-boy-couple-gif-Favim.com-3742798.gif",
        "https://media.tenor.com/images/c00119443474a031024af2e299947cb8/tenor.gif",
        "https://s-media-cache-ak0.pinimg.com/originals/02/5f/22/025f22b43d49114402fc335eca3bd2dc.gif",
        "https://31.media.tumblr.com/a03b9436c5e7fffb5b36f6f45f19b927/tumblr_inline_n0vjbkk07r1qdlvae.gif",
        "https://media.tenor.com/images/11889c4c994c0634cfcedc8adba9dd6c/tenor.gif",
        "https://media.giphy.com/media/P47pxJVTwIoJW/giphy.gif",
        "https://gifimage.net/wp-content/uploads/2017/07/anime-tackle-hug-gif-3.gif"
    ]

    var hug = hugs[Math.floor(Math.random() * hugs.length)]

    //I just wanna hug pls...
    if (msg.startsWith(prefix + "hug")) {
        if (message.guild.id === "151760749918683137") {
            if (message.channel.id === "151760749918683137") {
                return;
            } else {
                if (message.mentions.users.first()) {
                    if (message.mentions.users.first().id === message.author.id) {
                        message.channel.send("You can't hug yourself! That's just a bit weird.")
                    } else if (message.mentions.users.first().bot) {
                        message.channel.send("Silly you! Bots don't have emotions!")
                    } else
                        message.channel.send(`<@${message.author.id}> just gave <@${message.mentions.users.first().id}> a hug!`, {
                            file: hug
                        })
                } else {
                    message.channel.send("Please mention a valid user.")
                }
            }
        } else {
            if (message.mentions.users.first()) {
                if (message.mentions.users.first().id === message.author.id) {
                    message.channel.send("You can't hug yourself! That's just a bit weird.")
                } else if (message.mentions.users.first().bot) {
                    message.channel.send("Silly you! Bots don't have emotions!")
                } else
                    message.channel.send(`<@${message.author.id}> just gave <@${message.mentions.users.first().id}> a hug!`, {
                        file: hug
                    })
            } else {
                message.channel.send("Please mention a valid user.")
            }
        }
    }

    //Add topics to the topics file. For My use only - Lilwiggy
    if (msg.startsWith(adminP + "start") && message.author.id === "232614905533038593") {
        if (args.length === 1) {
            message.channel.send("What am I adding? Fucking retard.")
        } else {
            var starter = args.join(" ").substring(8)
            var fs = require('fs')
            fs.readFile('starters.txt', 'utf8', function(err, data) {
                if (data.includes(starter)) {
                    message.channel.send("This is already in the starters")
                } else {
                    fs.appendFile('starters.txt', ` | ${starter}`, 'utf8', function(err) {
                        if (err) {
                            message.channel.send("Whoops something went wrong.")
                        } else {
                            message.channel.send("Added the starter to the file.")
                        }
                    })
                }
            })
        }

    }


    //Compliments tf did I put a capital S for?

    if (msg.startsWith(prefix + "compliment")) {
        function complimentS() {
            var fs = require('fs');
            var compliments = ["Your smile is contagious.", "You look great today.", "You're a smart cookie.",
                "I bet you make babies smile.", "You have impeccable manners.", "I like your style.", "You have the best laugh.", "I appreciate you.", "You are the most perfect you there is.",
                "You are enough.", "You're strong.", "Your perspective is refreshing.", "You're an awesome friend.", "You light up the room.", "You deserve a hug right now.", "You should be proud of yourself.", "You're more helpful than you realize.",
                "You have a great sense of humor.", "You've got all the right moves!", "Is that your picture next to \"charming\" in the dictionary?"
            ];
            var compliment = compliments[Math.floor(Math.random() * compliments.length)];
            fs.readFile('last.json', 'utf-8', (err, data1) => {
                let data = JSON.parse(data1);
                if (compliment === data.compliment) {
                    complimentS()
                } else {

                    message.channel.send(compliment);

                    var fileName = `./last.json`;
                    var file = require(fileName);


                    file.compliment = compliment


                    fs.writeFile(fileName, JSON.stringify(file), function(err) {
                        if (err) {
                            client.users.get("232614905533038593").send(`I'm sorry but this happened:\n${err}\n\nSorry...`)
                        }

                    });
                }
            })
        }
        complimentS()
    }

    //Add custom roles to GrumpCord (For mods only on Grumpcord)

    if (msg.startsWith(prefix + "ar") && message.member.hasPermission("MANAGE_ROLES") && message.guild.id === "151760749918683137") {
        if (args.length === 1) {
            message.channel.send("Usage: `..ar role name | @user`");
        } else if (!message.mentions.users.first()) {
            message.channel.send("Who would you like me to add the role to?");
        } else {
            let nm = message.content.split(" |");
            let role = message.guild.roles.find("name", `${nm[0].substring(prefix.length + 3)}`);
            if (role) {

                message.mentions.members.first().addRole(role)
                message.channel.send(`Added the role ${nm[0].substring(prefix.length + 3)} to ${message.mentions.users.first()}`)
            } else {
                message.channel.send("It seems I cannot find that role. Roles are CaSe SeNsItIvE");
            }
        }
    }

    //Honestly this should begone
    if (msg.startsWith(prefix + "thot")) {
        let voiceChannel = message.member.voiceChannel

        // Play streams using ytdl-core
        const ytdl = require('ytdl-core');
        const streamOptions = {
            seek: 0,
            volume: 1
        };
        if (!voiceChannel) {
            message.channel.send("Hey dumbass! Get in a VC!")
        } else
            voiceChannel.join().then(connection => {
                const stream = ytdl('https://www.youtube.com/watch?v=5FL_eXQb4C0', {
                    filter: 'audioonly'
                });
                const dispatcher = connection.playStream(stream, streamOptions);
                setTimeout(function() {
                    voiceChannel.leave()
                }, 6000);
            })
            .catch(console.error);
    }

    //I PLAYED THE....
    if (msg.startsWith(prefix + "pog")) {
        let voiceChannel = message.member.voiceChannel

        // Play streams using ytdl-core
        const ytdl = require('ytdl-core');
        const streamOptions = {
            seek: 0,
            volume: 1
        };
        if (!voiceChannel) {
            message.channel.send("Hey dumbass! Get in a VC!")
        } else
            voiceChannel.join().then(connection => {
                const stream = ytdl('https://youtu.be/QNSdL4bTyz8', {
                    filter: 'audioonly'
                });
                const dispatcher = connection.playStream(stream, streamOptions);
                setTimeout(function() {
                    voiceChannel.leave()
                }, 7000);
            })
            .catch(console.error);
    }

    //NOT THE BEES
    if (msg.startsWith(prefix + "bee")) {
        let voiceChannel = message.member.voiceChannel

        // Play streams using ytdl-core
        const ytdl = require('ytdl-core');
        const streamOptions = {
            seek: 0,
            volume: 1
        };
        if (!voiceChannel) {
            message.channel.send("Hey dumbass! Get in a VC!")
        } else
            voiceChannel.join().then(connection => {
                const stream = ytdl('https://www.youtube.com/watch?v=s5BSAIUSUc4', {
                    filter: 'audioonly'
                });
                const dispatcher = connection.playStream(stream, streamOptions);
                setTimeout(function() {
                    voiceChannel.leave()
                }, 8000);
            })
            .catch(console.error);
    }
    //Under what now?
    if (msg.startsWith(prefix + "undertale")) {
        let voiceChannel = message.member.voiceChannel

        // Play streams using ytdl-core
        const ytdl = require('ytdl-core');
        const streamOptions = {
            seek: 0,
            volume: 1
        };
        if (!voiceChannel) {
            message.channel.send("Hey dumbass! Get in a VC!")
        } else
            voiceChannel.join().then(connection => {
                const stream = ytdl('https://www.youtube.com/watch?v=1OFc6LZo91w', {
                    filter: 'audioonly'
                });
                const dispatcher = connection.playStream(stream, streamOptions);
                setTimeout(function() {
                    voiceChannel.leave()
                }, 5000);
            })
            .catch(console.error);
    }
}) //End of message event



client.on('guildMemberAdd', member => {
    let guild = member.guild
    connection.query("SELECT `welcome` FROM `servers` WHERE `serverid` = '" + guild.id + "'", function(err, res, fields) {
        if (res[0].welcome == 1)
            guild.defaultChannel.send(`Hey there, ${member}! Welcome to ${guild.name}! Please check out the rules before you make us grumpy!`);
    })

    if (guild.id === "303525154464727041") {
        let role = guild.roles.find('name', 'Users');
        member.addRole(role);
    }

})

client.on('guildMemberRemove', member => {
    let guild = member.guild
    connection.query("SELECT `welcome` FROM `servers` WHERE `serverid` = '" + guild.id + "'", function(err, res, fields) {
        if (res[0].welcome == 1) {
            guild.defaultChannel.send(`Ode to, ${member.user.username}. *(User left ${guild.name}.)*`);
        }
    })
})



//Invite Link: config.bot.invite
//Client ID: config.bot.id
client.login(config.bot.token);