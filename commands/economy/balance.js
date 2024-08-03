const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('balance')
        .setDescription("Returns the balance of a user mentioned.")
        .addUserOption((option) => {
            return option.setName("target")
                .setDescription("The user you'd like to view the balance of.")
                .setRequired(true)
        }),
    async execute(interaction, client) {
        const selectedUser = interaction.options.getUser('target') || interaction.user;
        const storedBalance = await client.getBalance(selectedUser.id, interaction.guild.id)

        if (!storedBalance) return await interaction.reply({
            content: `${selectedUser.tag}, does not have any balance`,
            ephemeral: true
        })
        else {
            const embed = new EmbedBuilder()
                .setTitle(`${selectedUser.username}'s Balance:`)
                .setTimestamp()
                .addFields([{
                    name: `Rs${storedBalance.balance}`,
                    value: `\u200b`
                }])
                .setFooter({
                    text: client.user.tag,
                    iconURL: client.user.displayAvatarURL()
                })
            await interaction.reply({
                embeds: [embed],
                ephemeral: true
            })
        }
    }
}