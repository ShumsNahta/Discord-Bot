const { SlashCommandBuilder, PermissionFlagsBits, PermissionsBitField } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('permission')
        .setDescription("This command requires permission.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction, client) {
        try {
            const { roles } = interaction.member;
            const role = await interaction.guild.roles
                .fetch('1266753611866705990')
                .catch(console.error);

            if (!role) {
                await interaction.reply({
                    content: "The specified role was not found.",
                    ephemeral: true
                });
                return;
            }

            const testRole = await interaction.guild.roles.create({
                name: 'Test',
                permissions: [PermissionsBitField.Flags.KickMembers]
            }).catch(console.error);

            if (roles.cache.has("1266753611866705990")) {
                await interaction.deferReply({ fetchReply: true });
                await roles.remove(role).catch(console.error);
                await interaction.editReply({
                    content: `Removed: ${role.name} role from you.`
                });
            } else {
                await interaction.reply({
                    content: `You do not have the ${role.name} role.`,
                    ephemeral: true
                });
            }

            await roles.add(testRole).catch(console.error);
            await testRole.setPermissions([PermissionsBitField.Flags.BanMembers])
                .catch(console.error);

            const channel = await interaction.guild.channels.create({
                name: 'test',
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        deny: [PermissionsBitField.Flags.ViewChannel]
                    },
                    {
                        id: testRole.id,
                        allow: [PermissionsBitField.Flags.ViewChannel]
                    }
                ]
            }).catch(console.error);

            await channel.permissionOverwrites.edit(testRole.id, { [PermissionsBitField.Flags.SendMessages]: false })
                .catch(console.error);
        } catch (error) {
            console.error(error);
            await interaction.reply({
                content: 'An error occurred while executing the command.',
                ephemeral: true
            });
        }
    }
}
