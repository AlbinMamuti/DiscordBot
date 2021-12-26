const { MessageEmbed, Message } = require("discord.js")

module.exports = {
    category: 'Testing',
    description: 'Tells the Time',
    slash: 'both',
    testOnly: true,
    //after tutorial make a clock
    callback: async ({ }) => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        var time = String(today.getHours()).padStart(2, '0') + ':' +
            String(today.getMinutes()).padStart(2, '0') + ':' +
            String(today.getSeconds());
        today = mm + '/' + dd + '/' + yyyy;
        const embed = new MessageEmbed()
            .setAuthor(`${time} \n ${today}`)
            .setFooter(`DiscordBot`)
            .setColor('AQUA')
            .setTimestamp();
        return embed;
    },
}