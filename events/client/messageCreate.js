const Balance = require('../../Schemas/balance')
const { tictactoe } = require("../../utils/tic-tac-toe")
const { music } = require('../../utils/music')
module.exports = {
    name: "messageCreate",
    async execute(message, client) {
        if (message.author.bot) return
        if (message.content === '!tictactoe' || message.content.startsWith('!place')) {
            await tictactoe(message)
        }
        else if (message.content.startsWith('!')) {
            music(message)
        }
        const randomAmount = Math.random() * (0.7 - 0.3) + 0.3
        const storedBalance = await client.fetchBalance(message.author.id, message.guild.id)

        await Balance.findOneAndUpdate({ _id: storedBalance._id }, {
            balance: await client.toFixedNumber(storedBalance.balance + randomAmount)
        })
    }
}