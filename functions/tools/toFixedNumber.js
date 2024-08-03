module.exports = (client) => {
    client.toFixedNumber = async (number, place = 2) => {
        console.log(number, place);
        const offset = Number(`1e${place}`)
        return Math.floor(number * offset) / offset
    }
}