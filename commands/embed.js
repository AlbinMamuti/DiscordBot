const { MessageEmbed, Message, Interaction } = require("discord.js")

function isJsonString(str) {
    function IsJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
}

module.exports = {
    name: 'embed',
    aliases: ['em'],
    category: 'Testing',
    description: 'Send an embed',
    testOnly: true,
    expectedArgs: '<description> <color> <title> <author>',
    minArgs: 4,
    maxArgs: 4,

    //after tutorial make a clock
    callback: ({ interaction, message, text }) => { //make a couple of them, for each possibilty
        const args = text.split(' ');
        if (args.length != 4) {
            return
        }

        const embed = new MessageEmbed()
            .setDescription(args[0])
            .setColor(args[1].toUpperCase())
            .setTitle(args[2])
            .setAuthor(args[3])

        return embed;
    },

    error: ({ error, command, message, info }) => {

        const embed = new MessageEmbed()
            .setTitle('You caused an Error, please use this command as follows !embed kek')
            .setColor('RED')
        return embed;

    },
}