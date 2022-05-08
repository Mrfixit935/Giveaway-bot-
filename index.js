const { Client, Collection, MessageEmbed } = require("discord.js");
const fs = require('fs');
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
require("./handler")(client);
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






client.on('guildMemberRemove', (member) => {
  member.guild.channels.cache.get("958478336521285692").send(`${member.user} has left the server!`);

})





client.on('guildMemberAdd', (member) => {
  		// member.guild.channels.cache.get("849283385808912384").send(`${member.user} has joined the server!`);
      //console.log(member.user);

      const newMemberEmbed = new Discord.MessageEmbed()
        .setColor("#d81e5b")
        .setTitle("New Member!")
        .setDescription(`${member.user} has joined the server! We hope you enjoy your stay! ID ${member.user.id}`)
        .setThumbnail(member.user.displayAvatarURL())
        .setTimestamp();
      
  
  
        member.guild.channels.cache.get("958478336521285692").send({
          embeds: [newMemberEmbed] 
        })
  

      
        
    })

   
    
client.login(client.config.token);


