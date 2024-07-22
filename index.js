require('dotenv').config()
const { token } = process.env
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const express = require("express")
const fs = require("fs");
const path = require('path');
const handleCommands = require('./functions/handlers/handleCommands');
const { log } = require('console');


const prefix = "!"
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
client.commands = new Collection();
client.commandArray = []

const functionFolders = fs.readdirSync("./functions")

    for (const folder of functionFolders) {
        const functionFiles = fs.readdirSync(`./functions/${folder}`).filter(file => file.endsWith('.js'))
        for(const file of functionFiles){
            require(`./functions/${folder}/${file}`)(client);
        }
    }
client.handleCommands()
client.handleEvents()
client.login(token)
