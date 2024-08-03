const Balance = require('../../Schemas/balance')
const { Types } = require("mongoose")
module.exports = (client) => {
    client.fetchBalance = async (userId, guildId) => {
        let storedBalance = await Balance.findOne({ userId: userId, guildId: guildId })
        if (!storedBalance) {
            storedBalance = new Balance({
                _id: new Types.ObjectId(),
                userId: userId,
                guildId: guildId
            })

            await storedBalance.save().then(async balance => {
                console.log(`[Balance Created]: UserId: ${balance.userId}, GuildId: ${balance.guildId}`);
            }).catch(console.error)
            return storedBalance
        } else return storedBalance
    }
}