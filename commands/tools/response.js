const { SlashCommandBuilder } = require("discord.js")
const { setTimeout: wait } = require("node:timers/promises");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("response")
        .setDescription("Return command method response!"),
    async execute(interaction, client) {
        //Normal Reply
        // await interaction.reply({
        //     content: `This is a normal reply.`
        // })

        //Ephemeral Reply
        // await interaction.reply({
        //     content: `This is an ephemeral reply.`,
        //     ephemeral: true
        // })

        // Edited Reply
        // await interaction.reply({
        //     content: `This is a normal reply`
        // })
        // await wait(2000)
        // await interaction.editReply({
        //     content: `This is an edited reply.`
        // })

        // Deferred Reply
        // await interaction.deferReply({
        //     ephermeral: true
        // })

        // await wait(5000)
        // await interaction.editReply({
        //     content: `This is a deferred reply.`
        // })

        // Follow up Reply
        // await interaction.reply({
        //     content: `This is a normal reply.`
        // })

        // await wait(3000)
        // await interaction.followUp({
        //     content: `This is a follow up reply.`
        // })

        // Deferred Reply
        // await interaction.reply({
        //     content: `This is normal reply.`
        // })
        // await wait(3000)
        // await interaction.deleteReply()

        // Fetching Replies
        // await interaction.reply({
        //     content: 'This is a fetched reply.'
        // })
        // const message = await interaction.fetchReply()
        // console.log(message);

        // const message1 = await interaction.reply({
        //     content: `This is a fetched reply`,
        //     fetchReply: true
        // })
        // console.log(message1);

        const locales = {
            "en-US": "Hello there!",
            "pl": "Witaj Swieciel!",
            "de": "Hallo Welt!"
        }

        await interaction.reply({
            content: locales[interaction.locale] ?? "Hello World!"
        })
    }
}