const { MessageActionRow, MessageButton, ButtonInteraction } = require("discord.js")

module.exports = {
    category: 'Button',
    description: 'creates a simple button',

    slash: true,
    testOnly: true,

    callback: async ({ interaction, channel }) => {
        const msgInt = interaction;
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('ban_yes')
                    .setEmoji('🔨')
                    .setLabel('Confirm')
                    .setStyle('SUCCESS')
            )
            .addComponents(
                new MessageButton()
                    .setCustomId('ban_no')
                    .setLabel('Cancel')
                    .setStyle('DANGER')
                    .setEmoji('🅱')
            )
        const linkrow = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setURL('https://wornoffkey.com')
                    .setLabel('Visit WOK')
                    .setStyle('LINK')
            )

        await msgInt.reply({
            content: 'Are you sure?',
            components: [row, linkrow],
            ephemeral: true,
        })
        const filter = (btnInt) => {
            return msgInt.user.id === btnInt.user.id
        }
        const collector = channel.createMessageComponentCollector({
            filter,
            max: 2,
            time: 15000,
        })
        collector.on('collect', (i) => {
            i.reply({
                content: 'You clicked this button',
                ephemeral: true
            })
        })
        collector.on('end', async (collection) => {
            collection.forEach((click) => {
                console.log(click.user.id, click.customId)
            })
            await msgInt.editReply({
                content: 'An action has already been taken.',
                components: []
            })
        })
    },
}