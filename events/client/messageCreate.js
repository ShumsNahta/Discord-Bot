const { tictactoe } = require("../../utils/tic-tac-toe")
const { music } = require('../../utils/music')
module.exports = {
    name: "messageCreate",
    async execute(message) {
        if (message.author.bot) return
        if (message.content === '!tictactoe' || message.content === '!place') {
            await tictactoe(message)
        }
        else if (message.content.startsWith('!')) {
            music(message)
        }
    }
}