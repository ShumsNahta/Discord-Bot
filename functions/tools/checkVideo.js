const { EmbedBuilder } = require('discord.js')
const Parser = require('rss-parser')
const parser = new Parser()
const fs = require('fs')

module.exports = (client) => {
    client.checkVideo = async () => {
        const data = await parser.parseURL(`https://youtube.com/feeds/videos.xml?channel_id=UCrbjv1UUR9NyabR2rVlyuIw`).catch(console.error)

        const rawData = fs.readFileSync(`${__dirname}/../../Json/video.json`)
        const jsonData = JSON.parse(rawData)

        if (jsonData.id !== data.items[0].id) {
            fs.writeFileSync(`${__dirname}/../../Json/video.json`,
                JSON.stringify({ id: data.items[0].id }))

            const guild = await client.guilds.fetch("1263088806110957608").catch(console.error)
            const channel = await guild.channels.fetch('1268862016148471832').catch(console.error)

            const { title, link, id, author } = data.items[0];
            const embed = new EmbedBuilder({
                title: title,
                url: link,
                timestamp: Date.now(),
                image: {
                    url: `https://img.youtube.com/vi/${id.slice(9)}/maxresdefault.jpg`
                },
                author: {
                    name: author,
                    iconURL: "https://www.youtube.com/shorts/hEDKPIcSzaA",
                    url: `https://www.youtube.com/channel/UCrbjv1UUR9NyabR2rVlyuIw`
                },
                footer: {
                    text: client.user.tag,
                    iconURL: client.user.displayAvatarURL()
                }
            })
            await channel.send({ embeds: [embed], content: "Hey everyone checkout the new video!" }).catch(console.error)
        }
    }
}