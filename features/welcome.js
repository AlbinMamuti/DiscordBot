
const welcomeSchema = require('../models/welcome-shema');


const welcomeData = {

}

module.exports = (client) => {
    client.on('guildMemberAdd', async member => {
        const { guild, id } = member
        let data = welcomeData[guild.id]

        if (!data) {
            const results = await welcomeSchema.findById(guild.id)
            if (!results) {
                return
            }
            const { channelId, text } = results
            const channel = guild.channels.cache.get(channelId)
            data = welcomeData[guild.id] = [channel, text]
        }
        data[0].send({
            content: data[1].replace(/@/g, `<@${id}>`)
        })
    })
}

const config = {
    displayName: 'Welcome Channel',
    dbName: 'WELCOME_CHANNEL'
}
module.exports.config = config
