const Discord = require('discord.js')

module.exports = {
  name: 'uptime',
  aliases: [],
  run: async (client, message, args) => {

    const days = Math.floor(client.uptime / 86400000)
    const hours = Math.floor(client.uptime / 3600000) % 24
    const minutes = Math.floor(client.uptime / 60000) % 60
    const seconds = Math.floor(client.uptime / 1000) % 60

    const embed = new Discord.EmbedBuilder()

    .setColor(client.colors.maincolor)
    .setDescription(`⏰ **${client.user.username}** has been up for: ${days ? `${days} ${days === 1 ? 'day' : 'days'}, ${hours} ${hours === 1 ? 'hour' : 'hours'} and ${minutes} ${minutes === 1 ? 'minute' : 'minutes'}` : hours ? `${hours} ${hours === 1 ? 'hour' : 'hours'}, ${minutes} ${minutes === 1 ? 'minute' : 'minutes'} and ${seconds} ${seconds === 1 ? 'second' : 'seconds'}` : minutes ? `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} and ${seconds} ${seconds === 1 ? 'second' : 'seconds'}` : `${seconds} ${seconds === 1 ? 'second' : 'seconds'}`}`)

    return message.channel.send({ embeds: [embed] })
  }
}