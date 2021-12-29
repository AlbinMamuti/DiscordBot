function trim(inp) {
    return inp.substr(3, inp.length - 4);
}

module.exports = {
    category: 'Moderation',
    description: 'Bans a member',

    expectedArgs: '<target> [reason]',
    minArgs: 1,

    requireRoles: true,
    //permissions: ['ADMINISTRATOR'],

    guildOnly: true,

    testOnly: true,

    slash: 'both',

    callback: async ({ interaction, message, args }) => {
        const target = await (message ? message.mentions.member.first()
            : interaction.guild.members.fetch(trim(args[0]))
                .then((members) => { return members }))

        if (!target) {
            return 'Please tag someone on the server'
        }
        if (!target.bannable) {
            return {
                custom: true,
                content: 'Cannot ban that user.',
                ephermal: true,
            }
        }
        args.shift();
        const reason = args.join(' ')
        target.ban({
            reason,
            days: 5,
        })
        return {
            custom: true,
            content: `You banned <@${target.id}>`,
            ephermal: true,
        }
    },

}