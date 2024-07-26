let player1 = null;
let player2 = null;
let players = []

let turn = null;
let gameOver = true;
let board = []

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]


async function tictactoe(message) {
    if (message.content.startsWith('!tictactoe')) {
        addPlayer(message.author.username, message)
        if (players.length < 2) {
            message.channel.send("Required 2 different player names.")
        }
        else if (players.length === 2) {
            const p1 = players[0]
            const p2 = players[players.length - 1]

            if (gameOver) {
                board = [":white_large_square:", ":white_large_square:", ":white_large_square:", ":white_large_square:", ":white_large_square:", ":white_large_square:", ":white_large_square:", ":white_large_square:", ":white_large_square:"]
                turn = ""
                gameOver = false

                player1 = p1;
                player2 = p2;

                let line = ""
                for (let x = 0; x < board.length; x++) {
                    if (x === 2 || x === 5 || x === 8) {
                        line += " " + board[x]
                        await message.channel.send(line)
                        line = ""
                    } else {
                        line += " " + board[x]
                    }
                }

                const num = Math.floor(Math.random() * 2) + 1
                if (num === 1) {
                    turn = player1
                    message.channel.send(`It is ${player1}'s turn.`)
                } else {
                    turn = player2
                    message.channel.send(`It is ${player2}'s turn.`)
                }
            } else {
                message.channel.send("Game already in progress! Finish it before starting a new one.")
            }
        }

    } else if (message.content.startsWith("!place")) {
        const pos = parseInt(message.content.split(' ')[1], 10)
        if (!gameOver) {
            let mark = ""
            if (turn === message.author.username) {
                if (turn === player1) {
                    mark = ":regional_indicator_x:"
                } else if (turn === player2) {
                    mark = ":o2:"
                }
                if (pos > 0 && pos < 10 && board[pos - 1] === ":white_large_square:") {
                    board[pos - 1] = mark
                    let count = board.filter(s => s !== ":white_large_square:").length;

                    let line = ''
                    for (let x = 0; x < board.length; x++) {
                        if (x === 2 || x === 5 || x === 8) {
                            line += " " + board[x]
                            await message.channel.send(line)
                            line = ""
                        } else {
                            line += " " + board[x]
                        }
                    }

                    checkWinner(mark)

                    if (gameOver) {
                        message.channel.send(`${mark} wins!`)
                    } else if (count >= 9) {
                        gameOver = true
                        message.channel.send("It's a tie!")
                    }

                    turn = (turn === player1) ? player2 : player1
                } else {
                    message.channel.send("Choose an integer between 1 and 9 (inclusive) and an unmarked title.")
                }
            } else {
                message.channel.send("It is not your turn.")
            }
        } else {
            message.channel.send("Please start a new game using the !tictactoe command")
        }
    }
}

function addPlayer(playerName, message) {
    if (!players.includes(playerName)) {
        players.push(playerName);
    } else {
        message.channel.send("You are already in the game, please wait for the second player to join!")
    }
}

function checkWinner(mark) {
    for (const condition of winningConditions) {
        if (board[condition[0]] === mark && board[condition[1]] === mark && board[condition[2]] === mark) {
            gameOver = true
            break
        }
    }
}

module.exports = {
    tictactoe
}