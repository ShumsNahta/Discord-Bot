const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })
const { youtubeApiKey } = process.env
const ytdl = require('ytdl-core')
const { createAudioPlayer, createAudioResource, joinVoiceChannel, AudioPlayerStatus, VoiceConnectionStatus } = require('@discordjs/voice')
const search = require('youtube-search');

let queue = []
let connection = null
const player = createAudioPlayer();

async function music(message) {
    if (message.author.bot) return
    const prefix = '!';
    if (!message.content.startsWith(prefix)) return;
    const userEnteredText = message.content.slice(prefix.length).split(' ')
    const command = userEnteredText.shift().toLowerCase();
    const voiceChannel = message.member.voice.channel;

    switch (command) {
        case 'connect':
            if (!voiceChannel) {
                return message.channel.send('You must be in a voice channel to use this command!')
            }
            connection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: voiceChannel.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator,
            });

            connection.on(VoiceConnectionStatus.Disconnected, () => {
                connection = null;
                queue = [];
                player.stop();
            });
            connection.subscribe(player);
            message.channel.send('Connected to the voice channel!');
            break;

        case 'disconnect':
            if (!connection) return message.channel.send("I am not connected to any voice channel!")
            player.stop();
            connection.destroy();
            connection = null;
            message.channel.send('Disconnected from the voice channel!');
            break;

        case 'play':
            if (!voiceChannel) {
                return message.channel.send('You must be in a voice channel to use this command!');
            }
            if (!connection) {
                connection = joinVoiceChannel({
                    channelId: voiceChannel.id,
                    guildId: voiceChannel.guild.id,
                    adapterCreator: message.guild.voiceAdapterCreator,
                });
                connection.subscribe(player);
            }
            const query = userEnteredText.join(" ")

            if (!query) {
                return message.channel.send("Please provide a valid URL or search term to play!");
            }
            const validation = ytdl.validateURL(query)
            let url;
            if (ytdl.validateURL(query)) {
                url = query;
            } else {
                url = await getYoutubeURL(query);
                if (!url) {
                    return message.channel.send("No results found for your search");
                }
            }
            queue.push(url);

            if (player.state.status !== AudioPlayerStatus.Playing) {
                playSong(message.channel);
            }
            break;

        case 'stop':
            if (!connection) {
                return message.channel.send("I am not connected to any voice channel!")
            }

            player.stop();
            queue = [];
            message.channel.send("Playback stopped and queue cleared.");
            break;

        case 'pause':
            if (!connection) return message.channel.send("I am not connected to any voice channel!");
            // console.log("Shums",player.state.status);
            if (player.state.status !== AudioPlayerStatus.Playing) {
                return message.channel.send('The music is not playing!');
            }
            player.pause();
            message.channel.send('Paused the music ⏸️');
            break;

        case 'resume':
            if (!connection) {
                return message.channel.send('I am not connected to any voice channel!');
            }
            if (player.state.status !== AudioPlayerStatus.Paused) {
                return message.channel.send('The music is not paused!');
            }
            player.unpause();
            message.channel.send('Resumed the music ⏯️');
            break;

        default:
            break;
    }
}

async function getYoutubeURL(query) {
    const opts = {
        maxResults: 1,
        key: youtubeApiKey,
        type: 'video'
    }
    try {
        const results = await search(query, opts);
        if (results && results.results && results.results[0]) {
            return results.results[0].link;
        }
    } catch (error) {
        console.error(error);
    }
    return null;
}

async function playSong(channel) {
    if (!queue.length) {
        channel.send("Queue is empty! Please add some songs.");
        return;
    }

    const url = queue.shift();
    const stream = ytdl(url, { filter: 'audioonly', format: 'best' });
    const resource = createAudioResource(stream);

    if (!connection) {
        channel.send("Bot is not connected to a voice channel.");
        return;
    }

    connection.subscribe(player);
    player.play(resource);

    player.on(AudioPlayerStatus.Idle, () => {
        if (queue.length > 0) {
            playSong(channel);
        } else {
            channel.send("Queue ended.");
        }
    });

    player.on('error', (error) => {
        console.error(error);
        channel.send("There was an error playing this song!");
    });
}

module.exports = {
    music
}
