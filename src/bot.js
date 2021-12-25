require('dotenv').config();

const { Client, Intents } = require('discord.js');
const client = new Client({ fetchAllMembers: true, intents: [Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const PREFIX = "$";

/*
    This Discord Bot is solely for educational purposes 
    for myself studying NodeJs.
    It will get some pretty cool features like fetching Data 
    or Products from variouses sources on the internet. 
    But for now it will only be playfull in the Discord Chat
*/

/* Log everytime the Client/bot starts*/
client.on('ready', () => {
    console.log(`${client.user.tag} has logged in`);
});

/*Event Listener for when people write in all Chats*/
/*Mainly used for the Commands prefixed with $ */
client.on('messageCreate', (message) => {
    const CMD_IMPL = ['kick', 'ban', 'help'];
    /*Don't let the Bot recurse on it's on messages*/
    if (message.author.bot)
        return;
    /*check if the message starts with our prefix, for now ignore all other input*/
    if (message.content.startsWith(PREFIX)) {
        //Log the Command and the Arguments to it.
        const [CMD_NAME, ...args] = message.content
            .trim()
            .substring(1, message.content.length)
            .split(/\s+/);
        console.log(`${message.author.tag} has issued command ${CMD_NAME} with following args ${args}`);

        //Now check which command is typed in and process is
        if (CMD_NAME === 'kick') {
            if (!message.member.permissionsIn(message.channel).has("KICK_MEMBERS"))
                return message.reply('You dont have Permission to Kick other Members');
            if (!message.member.permissions.has('KICK_MEMBERS'))
                return message.reply('You dont have Permission to Kick other Members');

            if (args.length === 0)
                return message.reply('please specify either USERID or USERTAG, i.e. $kick USERID | USERTAG');
            var regex = /^[0-9]+$/;
            let copyArgs0 = args[0];
            //We check if we have a pure ID or a User Tag, we trim if needed
            if (!args[0].match(regex)) {
                let n = args[0].length;
                args[0] = args[0].substring(3, n - 1);
            }

            console.log(`searching for ${args[0]}`);
            //Now we search for the user, if found we kick him, otherwise 
            //we report back that this User is not a Member of the Discord
            message.guild.members.fetch(args[0]).then((members) => {
                members.kick()
                    .then((member) => {
                        message.channel.send(`${member} was kicked from HSPG`);
                        console.log(`${member} was kicked from HSPG`);
                    })
                    .catch((err) => {
                        message.channel.send(`I cannot kick this user ${member}:(`);
                        console.log(`there was an error, cannot kick this user ${member}`);
                    });
            })
                .catch((err) => { return message.reply(`This user ${copyArgs0} is not a member of HSPG`) });
        }
        //For Ban we do the same as in the Kick command, we just replace it with
        //the ban command.
        else if (CMD_NAME === 'ban') {
            if (!message.member.permissionsIn(message.channel).has("BAN_MEMBERS"))
                return message.reply('Din cock isch viel zchli für da');
            if (!message.member.permissions.has('BAN_MEMBERS'))
                return message.reply('Du häsch kei Rechte pessant');
            if (args.length === 0)
                return message.reply('Who tf should i kick master');
            //We check if we have a pure ID or a User Tag, we trim if needed
            console.log(`trimming input`);
            var regex = /^[0-9]+$/;
            let copyArgs0 = args[0];
            if (!args[0].match(regex))
                args[0] = args[0].substring(3, args[0].length - 1);
            console.log(`searching for ${args[0]}`);
            //Now we search for the user, if found we ban him, otherwise 
            //we report back that this User is not a Member of the Discord
            message.guild.members.fetch(args[0])
                .then((member) => {
                    member.ban()
                        .then((member) => {
                            message.channel.send(`${member} was banned from HSPG`);
                            console.log(`${member} was banned from HSPG`);
                        })
                        .catch((err) => {
                            message.channel.send(`You cant ban this member ${member}`);
                            console.log(`Permission denied to ban ${member}`);
                        })
                })
                .catch((err) => { return message.reply(`This user ${copyArgs0} is not a member of HSPH`) });
        }
        //Now this will be replaced soon :
        //TLDR: This should only function as a subsitute and is a little bit of Troll atm. Genereic help response with some swiss-german spice
        else if (CMD_NAME === 'help') {
            let response = "";
            response += `Küss dein auge, vallah endlich eine wo mich brucht.\nAlso Amigo, isch eig voll easy, es git nur die commands:\n`;
            CMD_IMPL.forEach((CMD_INSTR) => {
                let temp = `$${CMD_INSTR}\n`;
                response += temp;
            });
            response += `Amigo wenn immer no nöd drus chunsch denn häsch ihn gesse vallah billah`;
            message.reply(response);
        }
        //This command needs work on, check privelge so that only OWNER
        // is allowed to execute this 
        else if (CMD_NAME === 'kill')
            client.destroy();
        //Now this is where the troll really starts, but it will be removed once
        //the bot is more polished
        else {
            const botInfo = '(https://exit.ch/)';
            message.reply(`Brudi bitte mach kein Auge und schrieb $help, wenn das au nöd ane bechunsch, gang uf de link: ${botInfo}`);
        }
    }
});
client.login(process.env.DISCORDJS_BOT_TOKEN);
