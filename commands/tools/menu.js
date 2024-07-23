const { SlashCommandBuilder, StringSelectMenuBuilder, ActionRowBuilder, StringSelectMenuOptionBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("menu")
        .setDescription('Returns a select menu.'),
    async execute(interaction, client) {
        const menu = new StringSelectMenuBuilder()
            .setCustomId('sub-menu')
            .setMinValues(1)
            .setMaxValues(1)
            .setPlaceholder("Select, buddy!")
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('Option #1')
                    .setValue('https://github.com/ShumsNahta/bank-management-system'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Option #2')
                    .setValue('https://github.com/ShumsNahta/NumberUno')
            );

        await interaction.reply({
            components: [new ActionRowBuilder().addComponents(menu)]
        });
    }
}
