module.exports = {
    category: 'Moderation',
    description: 'Bans a member',

    expectedArgs: '<target> [reason]',
    minArgs: 1,

    permissions: ['ADMINISTRATOR'],

    guildOnly: true,

    testOnly: true,

    slash: 'both',

    callback: ({ interaction, message, args }) => {
        const target = message ? message.mentions.member.first()
            : interaction.guild.members.fetch();

        if (!target) {
            return 'Please tag someone on the server'
        }
        if (!target.bannable) {
            return 'I dont have permission to do so'
        }
        args.shift();
        const reason = args.join(' ')
        target.ban({
            reason,
            days: 5,
        })
        channel.send({
            content: `Banned ${target}`,
        })
    },

}