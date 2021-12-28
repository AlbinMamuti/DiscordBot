const { MessageActionRow, MessageButton, ButtonInteraction } = require("discord.js")
const collector = require("./collector")

module.exports = {
    category: 'Game',
    description: 'play a fun game',
    slash: true,
    callback: async ({ interaction, channel }) => {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('play_yes')
                    .setEmoji('👍')
                    .setLabel('I want to play')
                    .setStyle('SUCCESS')
            )
            .addComponents(
                new MessageButton()
                    .setCustomId('play_no')
                    .setLabel('oh daddy my p*#!y hurts...')
                    .setStyle('DANGER')
                    .setEmoji('👎')
            )

        await interaction.reply({
            content: 'Are you sure?',
            components: [row],
            ephemeral: true,
        })
        const filter = (btnPush) => {
            return interaction.user.id === btnPush.user.id
        }
        const collectorPreStart = channel.createMessageComponentCollector({
            filter,
            max: 1,
            time: 5000,
        })
        let play_yes = false;
        await collectorPreStart.on('end', async (collection) => {
            if (collection.first().customId === 'play_yes') {
                play_yes = true;
                await interaction.editReply({
                    content: 'Ok ready...\n set... \n go...\n',
                    components: [],
                })

            }
            else {
                await interaction.editReply({
                    content: 'You chicken',
                    components: []
                })
                play_yes = false;
            }
        })
        await delay(6000);
        if (!play_yes)
            return;
        await interaction.editReply({
            content: 'The rules are simple, I will hope on some random channel and you have to press the GREEN button before i vanish again. We will play for some time, until you loose',
        })

        const listText = interaction.guild.channels.cache.filter(channel => channel.isText())
        //now this is interesting, its like a cpp map just with key: id value: channel, i cry
        const maxChannels = listText.size

        const playerID = interaction.user.id
        let stillPlaying = true
        let prevChannel = interaction.channel

        //store all messages and clean them up
        let messageToCleanUp = []
        let score = 0;
        for (let i = 0; i < 10; i++) {
            if (!stillPlaying)
                break
            //Pick a random room and notify player where we are
            const nextRoom = Math.floor(Math.random() * maxChannels);
            const nextTextChannel = listText.get(listText.keyAt(nextRoom));

            //tease the player where we are
            const msgTeaser = await prevChannel.send({
                content: `<@${playerID}>, I am probably in #${nextTextChannel.name}`,
                ephemeral: true,
            })
            prevChannel = nextTextChannel

            //send the random button, click the one which label is GREEN
            const msgGame = await nextTextChannel.send(trippyButton())
            cleanUp(messageToCleanUp)
            //store these messages
            messageToCleanUp.push(msgTeaser, msgGame)

            collectorNextTextChannel = nextTextChannel.createMessageComponentCollector({
                filter,
                max: 1,
                time: 6000 - (i * 1000 / 4),
            })
            //clean up all the old messages


            //now we check which button the player has pressed, if he pressed any
            //if he pressed the right one, he gets to the next round, else he gets elimanted
            await collectorNextTextChannel.on('end', async (collection) => {

                let compare
                if (collection.size !== 0)
                    compare = collection.first().customId

                if (collection.size === 0 || compare !== 'GREEN') {
                    stillPlaying = false;
                    await msgGame.edit({
                        content: `You lost and only achieved a Score of ${(i)}`,
                        components: []
                    })
                    await delay(10000)
                    cleanUp(messageToCleanUp)
                }
                else {
                    await msgGame.edit({
                        content: `You are granted to the next Level, Current Score: ${(i + 1)}`,
                        components: []
                    })
                }
            })
            //now the fun part is the timer decreases
            await delay((1000 * (11 - i)))
        }
        if (stillPlaying)
            await prevChannel.send(`@everyone THE PLAYER <@${playerID}> WON WITH A SCORE : 10/10`)
        else
            await interaction.editReply(`You suck`)

    }
}

/**
 * Delays execution of the programm
 * @param {Millisekunden} ms  
 * @returns nothing
 */
const delay = ms => new Promise(res => setTimeout(res, ms));
/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
/**
 * @param {}
 * @returns a Button with at least one GREEN Button
 */
const trippyButton = () => {
    const arr = [
        new MessageButton()
            .setCustomId('GREEN')
            .setLabel('GREEN')
            .setStyle('DANGER'),
        new MessageButton()
            .setCustomId('RED')
            .setLabel('RED')
            .setStyle('SUCCESS'),
        new MessageButton()
            .setCustomId('CRINGE')
            .setLabel('CRINGE')
            .setStyle('PRIMARY'),
        new MessageButton()
            .setCustomId('GREEN')
            .setLabel('GREEN')
            .setStyle('SUCCESS'),
        new MessageButton()
            .setCustomId('GREEN')
            .setLabel('GREEN')
            .setStyle('SECONDARY'),
    ]
    shuffle(arr)
    while (checkArr(arr))
        shuffle(arr)
    const row = new MessageActionRow()
        .addComponents(arr[0])
        .addComponents(arr[1])
        .addComponents(arr[2])
    return {
        content: 'Don\'t Panic 😛',
        components: [row]
    }
}

/**
 * Deletes the first two elements
 * @param {Array} a 
 * @returns {}
 */
function cleanUp(Array) {
    if (Array.length === 0)
        return
    if (Array[0] === 0) {
        Array.shift()
        Array[0].delete()
        Array.shift()
        return
    }

    Array[0].delete()
    Array.shift()
    Array[0].delete()
    Array.shift()
}

/**
 * Checks if only one green is in the group
 */
function checkArr(Array) {
    return (Array[0].customId === 'GREEN' && Array[1].customId === 'GREEN') ||
        (Array[0].customId === 'GREEN' && Array[2].customId === 'GREEN') ||
        (Array[1].customId === 'GREEN' && Array[2].customId === 'GREEN')
}