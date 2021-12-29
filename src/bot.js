require('dotenv').config();

const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
const WOKCommands = require('wokcommands');
const path = require('path');
const mongoose = require('mongoose');
const testSchema = require('./test-schema');
//const legacyCMD = require('~/legacyCommands/legacyCMD');

const client = new Client({
    fetchAllMembers: true,
    intents: [
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
    disableEveryone: false
});
const PREFIX = "$";

/*
    This Discord Bot is solely for educational purposes 
    for myself studying NodeJs.
    It will get some pretty cool features like fetching Data 
    or Products from variouses sources on the internet. 
    But for now it will only be playfull in the Discord Chat
*/

/* Log everytime the Client/bot starts*/
client.on('ready', async () => {
    /*     await mongoose.connect(
            process.env.MONGO_DB_ADRESS,
            {
                keepAlive: true,
            }
        ) */
    console.log(`${client.user.tag} has logged in`);
    new WOKCommands(client, {
        commandsDir: path.join(__dirname, '../commands'),
        featuresDir: path.join(__dirname, '../features'),
        testServers: ['924639148659331103', '833052793866551316'],
        botOwners: ['272691075959750656'],
        mongoUri: process.env.MONGO_DB_ADRESS,
    })

    /*     setTimeout(async () => {
            await new testSchema({
                message: 'hello world!',
            }).save()
        }, 1000) */
});



/*Event Listener for when people write in all Chats*/
/*Mainly used for the Commands prefixed with $ */
client.on('messageCreate', (message) => {
    const CMD_IMPL = ['kick', 'ban', 'help', 'quote'];
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
        //Now this will be replaced soon :
        //TLDR: This should only function as a subsitute and is a little bit of Troll atm. Genereic help response with some swiss-german spice
        if (CMD_NAME === 'help') {
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
        else if (CMD_NAME === 'kill') {
            //console.log(message.member.roles.highest.name);
            if (message.member.roles.highest.name === 'Most Racist anti-Indian') {
                message.reply(`Was a great time serving for you Sir, DiscordBot is out`)
                    .then(msg => {
                        setTimeout(() => client.destroy(), 5000)
                    })
                    .catch(console.error);
            }
            else
                message.reply(`Funktion vor Rang mf`);
        }
        //return a inspirational quote from quote.js
        //Now this is where the troll really starts, but it will be removed once
        //the bot is more polished
        else {
            const botInfo = '(https://exit.ch/)';
            message.reply(`Brudi bitte mach kein Auge und schrieb $help, wenn das au nöd ane bechunsch, gang uf de link: ${botInfo}`);
        }
    }
});
client.login(process.env.DISCORDJS_BOT_TOKEN);
