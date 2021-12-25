require('dotenv').config();

const { Client, Intents } = require('discord.js');
const client = new Client({ fetchAllMembers: true, intents: [Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const PREFIX = "$";
client.on('ready', () => {
    console.log(`${client.user.tag} has logged in`);
});
client.on('messageCreate', (message) => {
    const CMD_IMPL = ['kick', 'ban', 'help'];
    if (message.author.bot)
        return;
    if (message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content
            .trim()
            .substring(1, message.content.length)
            .split(/\s+/);
        console.log(`${message.author.tag} has issued command ${CMD_NAME} with following args ${args}`);
        if (CMD_NAME === 'kick') {
            if (!message.member.permissionsIn(message.channel).has("KICK_MEMBERS"))
                return message.reply('Din cock isch zchli für das');
            if (!message.member.permissions.has('KICK_MEMBERS'))
                return message.reply('Du häsch kei Rechte pessant');
            if (args.length === 0)
                return message.reply('Who tf should i kick master, please specify with $kick USER');
            var regex = /^[0-9]+$/;
            message.channel.send('As you say mylord');
            let copyArgs0 = args[0];
            if (!args[0].match(regex)) {
                let n = args[0].length;
                args[0] = args[0].substring(3, n - 1);
            }
            console.log(`searching for ${args[0]}`);
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
        else if (CMD_NAME === 'ban') {
            if (!message.member.permissionsIn(message.channel).has("BAN_MEMBERS"))
                return message.reply('Din cock isch viel zchli für da');
            if (!message.member.permissions.has('BAN_MEMBERS'))
                return message.reply('Du häsch kei Rechte pessant');
            if (args.length === 0)
                return message.reply('Who tf should i kick master');
            message.channel.send('u naughty naugthy, but as you say mylord');
            console.log(`trimming input`);
            var regex = /^[0-9]+$/;
            let copyArgs0 = args[0];
            if (!args[0].match(regex))
                args[0] = args[0].substring(3, args[0].length - 1);
            console.log(`searching for ${args[0]}`);
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
        else if (CMD_NAME === 'kill')
            client.destroy();
        else {
            const botInfo = '(https://exit.ch/)';
            message.reply(`Brudi bitte mach kein Auge und schrieb $help, wenn das au nöd ane bechunsch, gang uf de link: ${botInfo}`);
        }
    }
});
client.login(process.env.DISCORDJS_BOT_TOKEN);
