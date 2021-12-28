module.exports = {
    category: 'Collector',
    description: 'needs Work',

    callback: ({ message, channel }) => {
        message.reply('Please confirm this action')
        message.react('👍')
        /*         const filter = (m) => {
                    return m.author.id === message.author.id
                }
                const collector = channel.createMessageCollector({
                    filter,
                    max: 1,
                    time: 1000 * 5,
                }) */
        const filter = (reaction, user) => {
            return user.id === message.author.id
        }
        const collector = message.createReactionCollector({
            filter,
            max: 1,
            time: 1000 * 5,
        })
        collector.on('collect', reaction => {
            console.log(reaction.emoji)
        })
        collector.on('end', collected => {
            if (collected.size === 0) {
                message.reply('You did not react in time.')
                return
            }
            let text = 'Collected:\n\n'
            collected.forEach((message) => {
                text += `${message.emoji.name} \n`
            });
            message.reply(text);
        })
    }
}