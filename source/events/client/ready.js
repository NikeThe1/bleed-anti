const Discord = require('discord.js')

module.exports = async (client) => {

  client.user.setActivity(client.support_server, { type: Discord.ActivityType.Competing })

  client.logger(`Logged in as ${client.user.tag}`)
}