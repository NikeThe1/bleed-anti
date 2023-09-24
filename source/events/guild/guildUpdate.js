const phin = require('phin')
const Discord = require('discord.js')
const serverdataschema = require('../../structures/schemas/data')

module.exports = async (client, guild, newGuild) => {

  if (guild.vanityURLCode !== newGuild.vanityURLCode) {

    if (!guild.members.me.permissions.has([Discord.PermissionsBitField.Flags.ViewAuditLog])) return

    const serverdata = await serverdataschema.findOne({ GuildID: guild.id })

    if (!serverdata) return

    // IF MODULE IS NOT ENABLED THEN RETURN

    if (serverdata.AntiNukeToggleVanity !== 'true') return

    const auditlogs = await guild.fetchAuditLogs({ limit: 1, type: Discord.AuditLogEvent.GuildUpdate }).catch(() => { })
  
    if (!auditlogs) return

    const serverlog = auditlogs?.entries.first()
  
    if (!serverlog) return
  
    const { executor } = serverlog

    // OWNER & CLIENT

    if (executor.id == guild.ownerId || executor.id == client.user.id) return

    // NUKER

    const nuker = await guild.members.fetch(executor.id).catch(() => { })

    // WHITELISTED USERS

    const whitelistedusers = serverdata.AntiNukeWhitelistedUsers
    if (whitelistedusers.includes(executor.id)) return

    // PUNISHMENT

    const antinukevanitypunishment = serverdata.AntiNukeVanityPunishment

    if (antinukevanitypunishment === 'ban') {

      if (nuker.bannable) {

        client.banuser(guild, executor.id, serverdata.AntiNukeLogChannel, `${nuker.user.username} changed the vanity url`, `A potential nuke has been detected in this server, **${nuker.user.username}** changed the vanity url from \`${guild.vanityURLCode}\` to \`${newGuild.vanityURLCode}\` and was removed of power`)
      }

    } else if (antinukevanitypunishment === 'kick') {

      if (nuker.kickable) {

        client.kickuser(guild, executor.id, serverdata.AntiNukeLogChannel, `${nuker.user.username} changed the vanity url`, `A potential nuke has been detected in this server, **${nuker.user.username}** changed the vanity url from \`${guild.vanityURLCode}\` to \`${newGuild.vanityURLCode}\` and was removed of power`)
      }

    } else if (antinukevanitypunishment === 'stripstaff') {

      client.stripuser(guild, nuker, Discord.PermissionsBitField.Flags.ManageGuild, Discord.PermissionsBitField.Flags.Administrator, serverdata.AntiNukeLogChannel, `${nuker.user.username} changed the vanity url`, `A potential nuke has been detected in this server, **${nuker.user.username}** changed the vanity url from \`${guild.vanityURLCode}\` to \`${newGuild.vanityURLCode}\` and was removed of power`)
    }
  } 

  if (!guild.features.includes('COMMUNITY') && newGuild.features.includes('COMMUNITY')) {

    if (!guild.members.me.permissions.has([Discord.PermissionsBitField.Flags.ViewAuditLog])) return

    const auditlogs = await guild.fetchAuditLogs({ limit: 1, type: Discord.AuditLogEvent.GuildUpdate }).catch(() => { })

    if (!auditlogs) return
  
    const guildlog = auditlogs?.entries.first()
  
    if (!guildlog) return
  
    const { executor } = guildlog

    // OWNER & CLIENT
  
    if (executor.id == guild.ownerId || executor.id == client.user.id) return

    // NUKER

    const nuker = await guild.members.fetch(executor.id).catch(() => { })

    // SERVER DATA

    const serverdata = await serverdataschema.findOne({ GuildID: guild.id })

    if (!serverdata) return

    // WHITELISTED USERS

    const whitelistedusers = serverdata.AntiNukeWhitelistedUsers
    if (whitelistedusers.includes(executor.id)) return

    if (nuker.bannable) {

      client.banuser(guild, executor.id, serverdata.AntiNukeLogChannel, `${nuker.user.username} changed community settings`, `A potential nuke has been detected in this server, **${nuker.user.username}** changed the community settings, but this action was reversed immediately preventing any potential nuke`)
    }

    await phin({
      url: `https://discord.com/api/v10/guilds/${newGuild.id}`,
      method: 'PATCH',
      parse: 'json',
      headers: { 'Authorization': `Bot ${client.token}` },
      data: { features: ['NEWS'], preferred_locale: 'en-US', rules_channel_id: null, public_updates_channel_id: null }
    }).then(async (results) => {

      if ([200, 201, 403].includes(results.statusCode)) return

    }).catch(() => { })

    await phin({
      url: `https://discord.com/api/v10/guilds/${newGuild.id}/channels`,
      method: 'GET',
      parse: 'json',
      headers: { 'Authorization': `Bot ${client.token}` }
    }).then(async (results) => {

      for (const channel of results.body) {

        if (['rules', 'moderator-only'].includes(channel.name)) {

          await phin({
            url: `https://discord.com/api/v10/channels/${channel.id}`,
            method: 'DELETE',
            parse: 'json',
            headers: { 'Authorization': `Bot ${client.token}` }
          }).then(async (results) => {

            if ([200, 201].includes(results.statusCode)) return

          }).catch(() => { })
        }
      }
    }).catch(() => { })
  }
}