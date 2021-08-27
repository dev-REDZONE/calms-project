const Discord = require("discord.js");
const ms = require("parse-ms");
const config = require("../../config.js");
const db = require("quick.db");
module.exports = {
  name: "stats",
  aliases: ["botstat", "stat", "botstats", "botinfo"],
  description: "",
  execute: async (client, message, args) => {
    

     var prefix =  db.fetch(`guildprefix_${message.guild.id}`);
    if(!prefix)
    {
      var prefix = ".";
    }

    let uptime = [];

    Object.entries(ms(client.uptime)).map((x, y) => {
      if (x[1] > 0 && y < 4) uptime.push(`**${x[1]} ${x[0]}**`);
    });

    const embed = new Discord.MessageEmbed()
      .setColor(`RANDOM`)
      .setTitle(`${client.user.username} stats`)
      .setThumbnail(client.user.displayAvatarURL())
      .addField(
        `Memory Usage:`,
        (process.memoryUsage().rss / 1024 / 1024).toFixed(2) + "MB",
        false
      )
      .setImage(``)
      .addField(`Servers:`, `${client.guilds.cache.size}`, false)
      .addField(`Users:`, `${client.users.cache.size}`, false)
      .addField(`Channels:`, `${client.channels.cache.size}`, false)
      .addField(`Made With:`, `Node.js V12 `, false)
      .addField(`Creators:`, `MrRobot#7265 | @famN e c h i R#3980 `, false)
      .addField(`Prefix: `, `${prefix}`, false)
      .addField(`Uptime:`, uptime.join(", "), false)
    message.channel.send(embed);
  }
};
module.exports.help = {
    name: "stats",
    description: "It will shows you the bot stats",
    usage: "stats",
    type: "General" 
}
