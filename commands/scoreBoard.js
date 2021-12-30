const DJS = require('discord.js');
const scoreBoardSchema = require('../models/HASScoreboard')
const { MessageEmbed, Message, Interaction } = require("discord.js")

module.exports = {
    category: 'Game',
    description: 'Display the Scoreboard of HideAndSeek game',
    slash: 'both',
    testOnly: true,

    callback: async ({ message, interaction, channel, client }) => {
        const data = await scoreBoardSchema
            .find({})
            .sort({
                _highScore: -1,
            })
            .limit(5)
        let usersArr = []
        let scoreArr = []
        let numPlaysArr = []
        const msgInp = message ? message : interaction
        if (!msgInp)
            return
        let counter = 0
        //await delay(4000)

        for (let i = 0; i < data.length; i++) {
            const user = await client.users.fetch(data[i]._id);
            await delay(1000)
            const userTag = `${user.username}`;
            usersArr.push(userTag)
            scoreArr.push(data[i]._highScore)
            numPlaysArr.push(data[i]._numberOfTimesPlayed)
        }

        const embed = new MessageEmbed()
            .setDescription(`HighScore for ${channel.guild.name}`)
            .setAuthor(`DiscordBot`)
            .setColor(0x51267)
            .addFields(
                {
                    name: 'Top 10',
                    value: usersArr.join('\n'),
                    inline: true
                },
                {
                    name: 'HighScore',
                    value: scoreArr.join('\n'),
                    inline: true
                },

                {
                    name: 'Number of Times played',
                    value: numPlaysArr.join('\n'),
                    inline: true
                }
            )
        return embed;
    }
}

const delay = ms => new Promise(res => setTimeout(res, ms));