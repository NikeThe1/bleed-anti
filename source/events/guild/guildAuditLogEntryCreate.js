const Discord = require('discord.js')
const serverdataschema = require('../../structures/schemas/data')

module.exports = async (client, entry, guild) => {

  if (entry.action === Discord.AuditLogEvent.RoleDelete) {

    if (!guild.members.me.permissions.has([Discord.PermissionsBitField.Flags.ViewAuditLog])) return

    // SERVER DATA

    const serverdata = await serverdataschema.findOne({ GuildID: guild.id })

    if (!serverdata) return

    // IF MODULE IS NOT ENABLED THEN RETURN

    if (serverdata.AntiNukeToggleRole !== 'true') return

    // OWNER & CLIENT

    if (entry.executorId == guild.ownerId || entry.executorId == client.user.id) return

    // NUKER

    const nuker = await guild.members.fetch(entry.executorId).catch(() => { })

    // WHITELISTED USERS

    const whitelistedusers = serverdata.AntiNukeWhitelistedUsers
    if (whitelistedusers.includes(entry.executorId)) return

    // PUNISHMENT

    const antinukerolepunishment = serverdata.AntiNukeRolePunishment

    let entryrole = client.roledeletethreshold.get(entry.executorId)
    if (!entryrole) {
      client.roledeletethreshold.set(entry.executorId, 1);
    } else {
      client.roledeletethreshold.set(entry.executorId, entryrole + 1);
    }

    const rolethreshold = client.roledeletethreshold.get(entry.executorId)

    if (rolethreshold >= serverdata.AntiNukeRoleThreshold) {

      if (antinukerolepunishment === 'ban') {

        if (nuker.bannable) {

          client.banuser(guild, entry.executorId, serverdata.AntiNukeLogChannel, `${nuker.user.username} deleted a role`, `A potential nuke has been detected in this server, **${nuker.user.username}** deleted a role and was removed of power`)
      
          client.roledeletethreshold.delete(entry.executorId)
        }

      } else if (antinukerolepunishment === 'kick') {

        if (nuker.kickable) {

          client.kickuser(guild, entry.executorId, serverdata.AntiNukeLogChannel, `${nuker.user.username} deleted a role`, `A potential nuke has been detected in this server, **${nuker.user.username}** deleted a role and was removed of power`)
      
          client.roledeletethreshold.delete(entry.executorId)
        }

      } else if (antinukerolepunishment === 'stripstaff') {

        client.stripuser(guild, nuker, Discord.PermissionsBitField.Flags.ManageRoles, Discord.PermissionsBitField.Flags.Administrator, serverdata.AntiNukeLogChannel, `${nuker.user.username} deleted a role`, `A potential nuke has been detected in this server, **${nuker.user.username}** deleted a role and was removed of power`)
    
        client.roledeletethreshold.delete(entry.executorId)
      }
    }

    setTimeout(() => {
      client.roledeletethreshold.delete(entry.executorId)
    }, 60000)

  } else if (entry.action === Discord.AuditLogEvent.MemberBanAdd) {

    if (!guild.members.me.permissions.has([Discord.PermissionsBitField.Flags.ViewAuditLog])) return

    // SERVER DATA

    const serverdata = await serverdataschema.findOne({ GuildID: guild.id })

    if (!serverdata) return

    // IF MODULE IS NOT ENABLED THEN RETURN

    if (serverdata.AntiNukeToggleBan !== 'true') return

    // OWNER & CLIENT

    if (entry.executorId == guild.ownerId || entry.executorId == client.user.id) return

    // NUKER

    const nuker = await guild.members.fetch(entry.executorId).catch(() => { })

    // WHITELISTED USERS

    const whitelistedusers = serverdata.AntiNukeWhitelistedUsers
    if (whitelistedusers.includes(entry.executorId)) return

    // PUNISHMENT

    const antinukebanpunishment = serverdata.AntiNukeBanPunishment

    let entryban = client.banthreshold.get(entry.executorId)
    if (!entryban) {
      client.banthreshold.set(entry.executorId, 1);
    } else {
      client.banthreshold.set(entry.executorId, entryban + 1);
    }

    const banthreshold = client.banthreshold.get(entry.executorId)

    if (banthreshold >= serverdata.AntiNukeBanThreshold) {

      if (antinukebanpunishment === 'ban') {

        if (nuker.bannable) {

          client.banuser(guild, entry.executorId, serverdata.AntiNukeLogChannel, `${nuker.user.username} banned a member`, `A potential nuke has been detected in this server, **${nuker.user.username}** banned a member and was removed of power`)
      
          client.banthreshold.delete(entry.executorId)
        }

      } else if (antinukebanpunishment === 'kick') {

        if (nuker.kickable) {

          client.kickuser(guild, entry.executorId, serverdata.AntiNukeLogChannel, `${nuker.user.username} banned a member`, `A potential nuke has been detected in this server, **${nuker.user.username}** banned a member and was removed of power`)
      
          client.banthreshold.delete(entry.executorId)
        }

      } else if (antinukebanpunishment === 'stripstaff') {

        client.stripuser(guild, nuker, Discord.PermissionsBitField.Flags.BanMembers, Discord.PermissionsBitField.Flags.Administrator, serverdata.AntiNukeLogChannel, `${nuker.user.username} banned a member`, `A potential nuke has been detected in this server, **${nuker.user.username}** banned a member and was removed of power`)
    
        client.banthreshold.delete(entry.executorId)
      }
    }

    setTimeout(() => {
      client.banthreshold.delete(entry.executorId)
    }, 60000)

  } else if (entry.action === Discord.AuditLogEvent.ChannelCreate) {

    if (!guild.members.me.permissions.has([Discord.PermissionsBitField.Flags.ViewAuditLog])) return

    // SERVER DATA

    const serverdata = await serverdataschema.findOne({ GuildID: guild.id })

    if (!serverdata) return

    // IF MODULE IS NOT ENABLED THEN RETURN

    if (serverdata.AntiNukeToggleChannel !== 'true') return

    // OWNER & CLIENT

    if (entry.executorId == guild.ownerId || entry.executorId == client.user.id) return

    // NUKER

    const nuker = await guild.members.fetch(entry.executorId).catch(() => { })

    // WHITELISTED USERS

    const whitelistedusers = serverdata.AntiNukeWhitelistedUsers
    if (whitelistedusers.includes(entry.executorId)) return

    // PUNISHMENT

    const antinukechannelpunishment = serverdata.AntiNukeChannelPunishment

    let entrychannel = client.channelthreshold.get(entry.executorId)
    if (!entrychannel) {
      client.channelthreshold.set(entry.executorId, 1);
    } else {
      client.channelthreshold.set(entry.executorId, entrychannel + 1);
    }

    const channelthreshold = client.channelthreshold.get(entry.executorId)

    if (channelthreshold >= serverdata.AntiNukeChannelThreshold) {

      if (antinukechannelpunishment === 'ban') {

        if (nuker.bannable) {

          client.banuser(guild, entry.executorId, serverdata.AntiNukeLogChannel, `${nuker.user.username} created a channel`, `A potential nuke has been detected in this server, **${nuker.user.username}** created a channel and was removed of power`)
      
          client.channelthreshold.delete(entry.executorId)
        }

      } else if (antinukechannelpunishment === 'kick') {

        if (nuker.kickable) {

          client.kickuser(guild, entry.executorId, serverdata.AntiNukeLogChannel, `${nuker.user.username} created a channel`, `A potential nuke has been detected in this server, **${nuker.user.username}** created a channel and was removed of power`)
      
          client.channelthreshold.delete(entry.executorId)
        }

      } else if (antinukechannelpunishment === 'stripstaff') {

        client.stripuser(guild, nuker, Discord.PermissionsBitField.Flags.ManageChannels, Discord.PermissionsBitField.Flags.Administrator, serverdata.AntiNukeLogChannel, `${nuker.user.username} created a channel`, `A potential nuke has been detected in this server, **${nuker.user.username}** created a channel and was removed of power`)
    
        client.channelthreshold.delete(entry.executorId)
      }
    }

    setTimeout(() => {
      client.channelthreshold.delete(entry.executorId)
    }, 60000)

  } else if (entry.action === Discord.AuditLogEvent.ChannelDelete) {

    if (!guild.members.me.permissions.has([Discord.PermissionsBitField.Flags.ViewAuditLog])) return

    // SERVER DATA

    const serverdata = await serverdataschema.findOne({ GuildID: guild.id })

    if (!serverdata) return

    // IF MODULE IS NOT ENABLED THEN RETURN

    if (serverdata.AntiNukeToggleChannel !== 'true') return

    // OWNER & CLIENT

    if (entry.executorId == guild.ownerId || entry.executorId == client.user.id) return

    // NUKER

    const nuker = await guild.members.fetch(entry.executorId).catch(() => { })

    // WHITELISTED USERS

    const whitelistedusers = serverdata.AntiNukeWhitelistedUsers
    if (whitelistedusers.includes(entry.executorId)) return

    // PUNISHMENT

    const antinukechannelpunishment = serverdata.AntiNukeChannelPunishment

    let entrychannel = client.channelthreshold.get(entry.executorId)
    if (!entrychannel) {
      client.channelthreshold.set(entry.executorId, 1);
    } else {
      client.channelthreshold.set(entry.executorId, entrychannel + 1);
    }

    const channelthreshold = client.channelthreshold.get(entry.executorId)

    if (channelthreshold >= serverdata.AntiNukeChannelThreshold) {

      if (antinukechannelpunishment === 'ban') {

        if (nuker.bannable) {

          client.banuser(guild, entry.executorId, serverdata.AntiNukeLogChannel, `${nuker.user.username} deleted a channel`, `A potential nuke has been detected in this server, **${nuker.user.username}** deleted a channel and was removed of power`)
      
          client.channelthreshold.delete(entry.executorId)
        }

      } else if (antinukechannelpunishment === 'kick') {

        if (nuker.kickable) {

          client.kickuser(guild, entry.executorId, serverdata.AntiNukeLogChannel, `${nuker.user.username} deleted a channel`, `A potential nuke has been detected in this server, **${nuker.user.username}** deleted a channel and was removed of power`)
      
          client.channelthreshold.delete(entry.executorId)
        }

      } else if (antinukechannelpunishment === 'stripstaff') {

        client.stripuser(guild, nuker, Discord.PermissionsBitField.Flags.ManageChannels, Discord.PermissionsBitField.Flags.Administrator, serverdata.AntiNukeLogChannel, `${nuker.user.username} deleted a channel`, `A potential nuke has been detected in this server, **${nuker.user.username}** deleted a channel and was removed of power`)
    
        client.channelthreshold.delete(entry.executorId)
      }
    }

    setTimeout(() => {
      client.channelthreshold.delete(entry.executorId)
    }, 60000)

  } else if (entry.action === Discord.AuditLogEvent.MemberKick) {

    if (!guild.members.me.permissions.has([Discord.PermissionsBitField.Flags.ViewAuditLog])) return

    // SERVER DATA

    const serverdata = await serverdataschema.findOne({ GuildID: guild.id })

    if (!serverdata) return

    // IF MODULE IS NOT ENABLED THEN RETURN

    if (serverdata.AntiNukeToggleKick !== 'true') return

    // OWNER & CLIENT

    if (entry.executorId == guild.ownerId || entry.executorId == client.user.id) return

    // NUKER

    const nuker = await guild.members.fetch(entry.executorId).catch(() => { })

    // WHITELISTED USERS

    const whitelistedusers = serverdata.AntiNukeWhitelistedUsers
    if (whitelistedusers.includes(entry.executorId)) return

    // PUNISHMENT

    const antinukekickpunishment = serverdata.AntiNukeKickPunishment

    let entryban = client.kickthreshold.get(entry.executorId)
    if (!entryban) {
      client.kickthreshold.set(entry.executorId, 1);
    } else {
      client.kickthreshold.set(entry.executorId, entryban + 1);
    }

    const kickthreshold = client.kickthreshold.get(entry.executorId)

    if (kickthreshold >= serverdata.AntiNukeKickThreshold) {

      if (antinukekickpunishment === 'ban') {

        if (nuker.bannable) {

          client.banuser(guild, entry.executorId, serverdata.AntiNukeLogChannel, `${nuker.user.username} kicked a member`, `A potential nuke has been detected in this server, **${nuker.user.username}** kicked a member and was removed of power`)
      
          client.kickthreshold.delete(entry.executorId)
        }

      } else if (antinukekickpunishment === 'kick') {

        if (nuker.kickable) {

          client.kickuser(guild, entry.executorId, serverdata.AntiNukeLogChannel, `${nuker.user.username} kicked a member`, `A potential nuke has been detected in this server, **${nuker.user.username}** kicked a member and was removed of power`)
      
          client.kickthreshold.delete(entry.executorId)
        }

      } else if (antinukekickpunishment === 'stripstaff') {

        client.stripuser(guild, nuker, Discord.PermissionsBitField.Flags.KickMembers, Discord.PermissionsBitField.Flags.Administrator, serverdata.AntiNukeLogChannel, `${nuker.user.username} kicked a member`, `A potential nuke has been detected in this server, **${nuker.user.username}** kicked a member and was removed of power`)
    
        client.kickthreshold.delete(entry.executorId)
      }
    }

    setTimeout(() => {
      client.kickthreshold.delete(entry.executorId)
    }, 60000)

  } else if (entry.action === Discord.AuditLogEvent.EmojiDelete) {

    if (!guild.members.me.permissions.has([Discord.PermissionsBitField.Flags.ViewAuditLog])) return

    // SERVER DATA

    const serverdata = await serverdataschema.findOne({ GuildID: guild.id })

    if (!serverdata) return

    // IF MODULE IS NOT ENABLED THEN RETURN

    if (serverdata.AntiNukeToggleEmoji !== 'true') return

    // OWNER & CLIENT

    if (entry.executorId == guild.ownerId || entry.executorId == client.user.id) return

    // NUKER

    const nuker = await guild.members.fetch(entry.executorId).catch(() => { })

    // WHITELISTED USERS

    const whitelistedusers = serverdata.AntiNukeWhitelistedUsers
    if (whitelistedusers.includes(entry.executorId)) return

    // PUNISHMENT

    const antinukeemojipunishment = serverdata.AntiNukeEmojiPunishment

    let entrychannel = client.emojideletethreshold.get(entry.executorId)
    if (!entrychannel) {
      client.emojideletethreshold.set(entry.executorId, 1);
    } else {
      client.emojideletethreshold.set(entry.executorId, entrychannel + 1);
    }

    const emojithreshold = client.emojideletethreshold.get(entry.executorId)

    if (emojithreshold >= serverdata.AntiNukeEmojiThreshold) {

      if (antinukeemojipunishment === 'ban') {

        if (nuker.bannable) {

          client.banuser(guild, entry.executorId, serverdata.AntiNukeLogChannel, `${nuker.user.username} deleted an emoji`, `A potential nuke has been detected in this server, **${nuker.user.username}** deleted an emoji and was removed of power`)
      
          client.emojideletethreshold.delete(entry.executorId)
        }

      } else if (antinukeemojipunishment === 'kick') {

        if (nuker.kickable) {

          client.kickuser(guild, entry.executorId, serverdata.AntiNukeLogChannel, `${nuker.user.username} deleted an emoji`, `A potential nuke has been detected in this server, **${nuker.user.username}** deleted an emoji and was removed of power`)
      
          client.emojideletethreshold.delete(entry.executorId)
        }

      } else if (antinukeemojipunishment === 'stripstaff') {

        client.stripuser(guild, nuker, Discord.PermissionsBitField.Flags.ManageGuildExpressions, Discord.PermissionsBitField.Flags.Administrator, serverdata.AntiNukeLogChannel, `${nuker.user.username} deleted an emoji`, `A potential nuke has been detected in this server, **${nuker.user.username}** deleted an emoji and was removed of power`)
    
        client.emojideletethreshold.delete(entry.executorId)
      }
    }

    setTimeout(() => {
      client.emojideletethreshold.delete(entry.executorId)
    }, 60000)

  } else if (entry.action === Discord.AuditLogEvent.BotAdd) {

    if (!guild.members.me.permissions.has([Discord.PermissionsBitField.Flags.ViewAuditLog])) return

    // SERVER DATA

    const serverdata = await serverdataschema.findOne({ GuildID: guild.id })

    if (!serverdata) return

    // IF MODULE IS NOT ENABLED THEN RETURN

    if (serverdata.AntiNukeToggleBot !== 'true') return

    // THE BOT WAS ADDED TO THE SERVER, THEREFORE IN THE CACHE SO -> KICK THEM

    const target = guild.members.cache.get(entry.target.id)

    if (!target) return

    if (target.user.bot) {

      const whitelistedusers = serverdata.AntiNukeWhitelistedUsers
      if (whitelistedusers.includes(entry.target.id)) return
      
      target.kick('antinuke: bot not authorized to join - whitelist the bot before inviting!').catch(() => { })
    }

    // OWNER & CLIENT

    if (entry.executorId == guild.ownerId || entry.executorId == client.user.id) return

    // NUKER

    const nuker = await guild.members.fetch(entry.executorId).catch(() => { })

    // WHITELISTED USERS

    const whitelistedusers = serverdata.AntiNukeWhitelistedUsers
    if (whitelistedusers.includes(entry.executorId)) return

    // PUNISHMENT

    const antinukebotpunishment = serverdata.AntiNukeBotPunishment

    if (antinukebotpunishment === 'ban') {

      if (nuker.bannable) {

        client.banuser(guild, entry.executorId, serverdata.AntiNukeLogChannel, `${nuker.user.username} added a bot`, `A potential nuke has been detected, **${nuker.user.username}** added a bot but it was kicked, and they were removed of power`)
      }

    } else if (antinukebotpunishment === 'kick') {

      if (nuker.kickable) {

        client.kickuser(guild, entry.executorId, serverdata.AntiNukeLogChannel, `${nuker.user.username} added a bot`, `A potential nuke has been detected, **${nuker.user.username}** added a bot but it was kicked, and they were removed of power`)
      }

    } else if (antinukebotpunishment === 'stripstaff') {

      client.stripuser(guild, nuker, Discord.PermissionsBitField.Flags.ManageGuild, Discord.PermissionsBitField.Flags.Administrator, serverdata.AntiNukeLogChannel, `${nuker.user.username} added a bot`, `A potential nuke has been detected, **${nuker.user.username}** added a bot but it was kicked, and they were removed of power`)
    }
  }
}