const { SlashCommandBuilder, EmbedBuilder, Integration } = require("discord.js")
module.exports = {
    data: new SlashCommandBuilder()
        .setName("embed")
        .setDescription("Returns an embed!!"),
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
            .setTitle("Welcome Buddy !")
            .setDescription("Here you will get to know more about me.")
            .setColor(0x18e1ee)
            .setImage(client.user.displayAvatarURL())
            .setThumbnail(client.user.displayAvatarURL())
            .setAuthor({
                url: "https://shumsnahta.github.io/shumsportfolio/",
                iconURL: interaction.user.displayAvatarURL(),
                name: interaction.user.globalName
            })
            .setFooter({
                iconURL: client.user.displayAvatarURL(),
                text: client.user.tag
            })
            .setURL('https://www.youtube.com/shorts/hEDKPIcSzaA')
            .setTimestamp(Date.now())
            .addFields([
                {
                    name: `Field 1`,
                    value: `Field1 value`,
                    inline: true
                },
                {
                    name: `Field 2`,
                    value: `Field2 value`,
                    inline: true
                }
            ])
        await interaction.reply({
            embeds: [embed]
        })
    }
}