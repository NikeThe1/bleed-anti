const Discord = require('discord.js')
const serverdataschema = require('../../structures/schemas/data')

module.exports = async (client, message) => {

  if (!message.guild || message.author.bot || message.channel.type === Discord.ChannelType.DM) return

  if (!message.guild.members.me.permissions.has([Discord.PermissionsBitField.Flags.SendMessages, Discord.PermissionsBitField.Flags.EmbedLinks])) return

  const serverdata = await serverdataschema.findOne({ GuildID: message.guild.id })

  if (!serverdata) return

  const guildprefix = serverdata.Prefix

  let guildprefix1

  let mentionregex = message.content.match(new RegExp(`^<@!?(${client.user.id})>`, 'gi'))
  if (mentionregex) {
    guildprefix1 = `${mentionregex[0]} `
  } else {
    guildprefix1 = guildprefix
  }

  if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {

    const embed = new Discord.EmbedBuilder()

    .setColor(client.colors.neutral)
    .setDescription(`${message.author}: Guild prefix: \`${guildprefix}\``)

    return message.channel.send({ embeds: [embed] }).then((msg) => {
      setTimeout(() => msg.delete(), 3000)
    })
  }

  if(!message.content.startsWith(guildprefix1)) return

  const args = message.content.slice(guildprefix1.length).trim().split(/ +/g)
  const cmd = args.shift().toLowerCase()
  if(cmd.length == 0) return
      
  let command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd))
  if(!command) return

  if(command) command.run(client, message, args)
}