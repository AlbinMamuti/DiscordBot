const DJS = require('discord.js');
const welcomeSchmema = require('../models/welcome-shema')

module.exports = {
    category: 'Configuration',
    description: 'Sets the welcome channel',

    permissions: ['ADMINISTRATOR'],

    minArgs: 2,
    expectedArgs: '<channel> <text>',

    slash: 'both',
    testOnly: true,

    options: [
        {
            name: 'channel',
            description: 'The target channel',
            required: true,
            type: DJS.Constants.ApplicationCommandOptionTypes.CHANNEL,
        },
        {
            name: 'text',
            description: 'The welcome message.',
            requied: true,
            type: DJS.Constants.ApplicationCommandOptionTypes.STRING
        }
    ],

    callback: async ({ guild, message, interaction, args }) => {
        if (!guild)
            return 'Please use this command within a server'

        const targetChannel = message ? message.mentions.channels.first() : interaction.options.getChannel('channel')
        if (!targetChannel || targetChannel.type !== 'GUILD_TEXT') {
            return 'Please tag a text channel.'
        }

        let text = interaction?.options.getString('text')
        if (message) { //create welcome Message
            args.shift()
            text = args.join(' ')
        }

        await welcomeSchmema.findOneAndUpdate({
            _id: guild.id,
        }, {
            _id: guild.id,
            text,
            channelId: targetChannel.id
        }, {
            upsert: true
        })

        return 'Welcome Channel set!'
    }
}