const fetch = require('node-fetch');
const { MessageEmbed, Message } = require("discord.js")

function getQuote() {
    return fetch("https://zenquotes.io/api/random")
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            return data[0]["q"] + " -" + data[0]["a"] + "<3";
        })
}

module.exports = {
    category: 'Quotes',
    description: 'Replies a Quote from zenquotes.io',
    slash: 'both',
    aliases: ['q'],
    testOnly: true,

    cooldown: '15s',
    callback: async ({ }) => {
        const quote = await getQuote();
        return quote;
    }
}