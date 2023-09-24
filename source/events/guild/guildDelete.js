const Discord = require('discord.js')
const serverdataschema = require('../../structures/schemas/data')

module.exports = async (client, guild) => {

  // DELETE SERVER DATA ON LEAVE

  const serverdata = await serverdataschema.findOne({ GuildID: guild.id })

  if (serverdata) {
    await serverdataschema.findOneAndRemove({ GuildID: guild.id })
  }
}