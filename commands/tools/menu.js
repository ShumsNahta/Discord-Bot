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
            .setPlaceholder("Select the project you want to visit buddy!")
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('Bank Management System')
                    .setValue('https://github.com/ShumsNahta/bank-management-system'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('NumberUno')
                    .setValue('https://github.com/ShumsNahta/NumberUno')
            );

        await interaction.reply({
            components: [new ActionRowBuilder().addComponents(menu)]
        });
    }
}
