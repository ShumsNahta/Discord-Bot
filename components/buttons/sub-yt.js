module.exports = {
    data:{
        name: 'sub-yt'
    },
    async execute(interaction,client){
        await interaction.reply({
            content: `https://www.youtube.com/channel/UCrbjv1UUR9NyabR2rVlyuIw`
        })
    }
}