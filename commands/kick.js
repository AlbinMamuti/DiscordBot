
function trim(inp) {
    return inp.substr(3, inp.length - 4);
}

module.exports = {
    category: 'Moderation',
    description: 'Kicks a member',

    expectedArgs: '<target> [reason]',
    expectedArgsTypes: ['USER', 'STRING'],
    minArgs: 1,

    permissions: ['ADMINISTRATOR'],
    guildOnly: true,

    testOnly: true,

    slash: 'both',

    callback: ({ interaction, message, args }) => {
        const target = message ? message.mentions.members.first()
            : interaction.guild.members.fetch(trim(args[0]))
                .then((members) => { return members });
        if (!target) {
            return 'Please tag someone on the server'
        }
        if (!target.kickable) {
            return {
                custom: true,
                content: 'Cannot kick that user.',
                ephermal: true,
            }
        }
        args.shift();
        const reason = args.join(' ')

        target.kick({
            reason,
            days: 5,
        })
        return {
            custom: true,
            content: `You kicked <@${target.id}>`,
            ephermal: true,
        }
    },

}