const { Client, Collection, MessageEmbed } = require("discord.js");
const config = require("./config.json");
const Discord = require("discord.js")


const client = new Client({
    intents: 32767,
});
module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();

client.config = require("./config.json");
const prefix = require("./config.json");



// Initializing the project
require('./Systems/GiveawaySys')(client);








const { Database } = require("./config.json");
const mongoose = require("mongoose");


 
client.on('ready', () => {
    console.log(`The ${client.user.tag} is now ready!`);
    client.user.setActivity("GameCylinder", { type: "WATCHING" });
     //client.user.setStatus("idle");

    if(!Database) return;
    mongoose.connect(Database, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(() => {
      console.log("The client is now connected to the database!")
    }).catch((err) => {
      console.log(err);
    });
  },
);


const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token } = require('./config.json');
const fs = require('node:fs');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Place your client and guild ids here
const clientId = '967922987900739616';
const guildId = '859095770236846120';

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();


   
    
client.login(client.config.token);


