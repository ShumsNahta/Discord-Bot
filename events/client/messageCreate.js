const { tictactoe } = require("../../utils/tic-tac-toe")
module.exports = {
    name: "messageCreate",
    async execute(message) {
        if (message.author.bot) return
        if (message.content === '!tictactoe') {
            await tictactoe(message)
        }
        else if(message.content.startsWith('!place')){
            await tictactoe(message)
        }
        else{
            message.reply(`Hey there ${message.author.username} !, wassup?`)
        }
    }
}