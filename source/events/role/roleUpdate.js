const Discord = require('discord.js')
const serverdataschema = require('../../structures/schemas/data')

module.exports = async (client, role, newRole) => {

  if (role.permissions !== newRole.permissions) {

    if (!role.guild.members.me.permissions.has([Discord.PermissionsBitField.Flags.ViewAuditLog])) return
  
    const auditlogs = await role.guild.fetchAuditLogs({ limit: 1, type: Discord.AuditLogEvent.RoleUpdate }).catch(() => { })
  
    if (!auditlogs) return
    
    const rolelog = auditlogs?.entries.first()
    
    if (!rolelog) return

    const { executor } = rolelog

    // OWNER & CLIENT
  
    if (executor.id == role.guild.ownerId || executor.id == client.user.id) return

    // NUKER

    const nuker = await role.guild.members.fetch(executor.id).catch(() => { })

    // SERVER DATA

    const serverdata = await serverdataschema.findOne({ GuildID: role.guild.id })

    if (!serverdata) return

    // WHITELISTED USERS

    const whitelistedusers = serverdata.AntiNukeWhitelistedUsers
    if (whitelistedusers.includes(executor.id)) return

    if (!role.permissions.has(Discord.PermissionsBitField.Flags.Administrator) && newRole.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) {
        
      if (serverdata.AntiNukePermissionGrants?.includes('administrator')) {

        client.stripuser(role.guild, nuker, Discord.PermissionsBitField.Flags.Administrator, Discord.PermissionsBitField.Flags.Administrator, serverdata.AntiNukeLogChannel, `${nuker.user.username} granted administrator to a role`, `A dangerous permission was granted in this server, **${nuker.user.username}** granted \`administrator\` to a role, but this action was reversed immediately preventing any potential nuke`)

        if (newRole.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) {
          newRole.edit({ permissions: newRole.permissions.remove(Discord.PermissionsBitField.Flags.Administrator), reason: `antinuke: roles cannot be granted administrator permission` }).catch(() => { })
        }
      }

    } else if (role.permissions.has(Discord.PermissionsBitField.Flags.Administrator) && !newRole.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) {

      if (serverdata.AntiNukePermissionRemoves?.includes('administrator')) {

        client.stripuser(role.guild, nuker, Discord.PermissionsBitField.Flags.Administrator, Discord.PermissionsBitField.Flags.Administrator, serverdata.AntiNukeLogChannel, `${nuker.user.username} removed administrator from a role`, `A dangerous permission was removed in this server, **${nuker.user.username}** removed \`admnistrator\` from a role, but this action was reversed immediately preventing any potential nuke`)

        if (!newRole.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) {
          newRole.edit({ permissions: newRole.permissions.add(Discord.PermissionsBitField.Flags.Administrator), reason: `antinuke: roles cannot be removed administrator permission` }).catch(() => { })
        }
      }

    } else if (!role.permissions.has(Discord.PermissionsBitField.Flags.ManageChannels) && newRole.permissions.has(Discord.PermissionsBitField.Flags.ManageChannels)) {
       
      if (serverdata.AntiNukePermissionGrants?.includes('manage_channels')) {

        client.stripuser(role.guild, nuker, Discord.PermissionsBitField.Flags.ManageChannels, Discord.PermissionsBitField.Flags.Administrator, serverdata.AntiNukeLogChannel, `${nuker.user.username} granted manage_channels to a role`, `A dangerous permission was granted in this server, **${nuker.user.username}** granted \`manage_channels\` to a role, but this action was reversed immediately preventing any potential nuke`)

        if (newRole.permissions.has(Discord.PermissionsBitField.Flags.ManageChannels)) {
          newRole.edit({ permissions: newRole.permissions.remove(Discord.PermissionsBitField.Flags.ManageChannels), reason: `antinuke: roles cannot be granted manage_channels permission` }).catch(() => { })
        }
      }

    } else if (role.permissions.has(Discord.PermissionsBitField.Flags.ManageChannels) && !newRole.permissions.has(Discord.PermissionsBitField.Flags.ManageChannels)) {
    
      if (serverdata.AntiNukePermissionRemoves?.includes('manage_channels')) {

        client.stripuser(role.guild, nuker, Discord.PermissionsBitField.Flags.ManageRoles, Discord.PermissionsBitField.Flags.Administrator, serverdata.AntiNukeLogChannel, `${nuker.user.username} removed manage_roles from a role`, `A dangerous permission was removed in this server, **${nuker.user.username}** removed \`manage_roles\` from a role, but this action was reversed immediately preventing any potential nuke`)

        if (!newRole.permissions.has(Discord.PermissionsBitField.Flags.ManageRoles)) {
          newRole.edit({ permissions: newRole.permissions.add(Discord.PermissionsBitField.Flags.ManageRoles), reason: `antinuke: roles cannot be removed manage_roles permission` }).catch(() => { })
        }
      }

    } else if (!role.permissions.has(Discord.PermissionsBitField.Flags.ManageRoles) && newRole.permissions.has(Discord.PermissionsBitField.Flags.ManageRoles)) {
        
      if (serverdata.AntiNukePermissionGrants?.includes('manage_roles')) {

        client.stripuser(role.guild, nuker, Discord.PermissionsBitField.Flags.ManageRoles, Discord.PermissionsBitField.Flags.Administrator, serverdata.AntiNukeLogChannel, `${nuker.user.username} granted manage_roles to a role`, `A dangerous permission was granted in this server, **${nuker.user.username}** granted \`manage_roles\` to a role, but this action was reversed immediately preventing any potential nuke`)

        if (newRole.permissions.has(Discord.PermissionsBitField.Flags.ManageRoles)) {
          newRole.edit({ permissions: newRole.permissions.remove(Discord.PermissionsBitField.Flags.ManageRoles), reason: `antinuke: roles cannot be granted manage_roles permission` }).catch(() => { })
        }
      }

    } else if (role.permissions.has(Discord.PermissionsBitField.Flags.ManageRoles) && !newRole.permissions.has(Discord.PermissionsBitField.Flags.ManageRoles)) {

      if (serverdata.AntiNukePermissionRemoves?.includes('manage_roles')) {

        client.stripuser(role.guild, nuker, Discord.PermissionsBitField.Flags.ManageRoles, Discord.PermissionsBitField.Flags.Administrator, serverdata.AntiNukeLogChannel, `${nuker.user.username} removed manage_roles from a role`, `A dangerous permission was removed in this server, **${nuker.user.username}** removed \`manage_roles\` from a role, but this action was reversed immediately preventing any potential nuke`)

        if (!newRole.permissions.has(Discord.PermissionsBitField.Flags.ManageRoles)) {
          newRole.edit({ permissions: newRole.permissions.add(Discord.PermissionsBitField.Flags.ManageRoles), reason: `antinuke: roles cannot be removed manage_roles permission` }).catch(() => { })
        }
      }

    } else if (!role.permissions.has(Discord.PermissionsBitField.Flags.ManageGuildExpressions) && newRole.permissions.has(Discord.PermissionsBitField.Flags.ManageGuildExpressions)) {

      if (serverdata.AntiNukePermissionGrants?.includes('manage_expressions')) {

        client.stripuser(role.guild, nuker, Discord.PermissionsBitField.Flags.ManageGuildExpressions, Discord.PermissionsBitField.Flags.Administrator, serverdata.AntiNukeLogChannel, `${nuker.user.username} granted manage_expressions to a role`, `A dangerous permission was granted in this server, **${nuker.user.username}** granted \`manage_expressions\` to a role, but this action was reversed immediately preventing any potential nuke`)

        if (newRole.permissions.has(Discord.PermissionsBitField.Flags.ManageGuildExpressions)) {
          newRole.edit({ permissions: newRole.permissions.remove(Discord.PermissionsBitField.Flags.ManageGuildExpressions), reason: `antinuke: roles cannot be granted manage_expressions permission` }).catch(() => { })
        }
      }

    } else if (role.permissions.has(Discord.PermissionsBitField.Flags.ManageGuildExpressions) && !newRole.permissions.has(Discord.PermissionsBitField.Flags.ManageGuildExpressions)) {

      if (serverdata.AntiNukePermissionRemoves?.includes('manage_expressions')) {

        client.stripuser(role.guild, nuker, Discord.PermissionsBitField.Flags.ManageGuildExpressions, Discord.PermissionsBitField.Flags.Administrator, serverdata.AntiNukeLogChannel, `${nuker.user.username} removed manage_expressions from a role`, `A dangerous permission was removed in this server, **${nuker.user.username}** removed \`manage_expressions\` from a role, but this action was reversed immediately preventing any potential nuke`)

        if (!newRole.permissions.has(Discord.PermissionsBitField.Flags.ManageGuildExpressions)) {
          newRole.edit({ permissions: newRole.permissions.add(Discord.PermissionsBitField.Flags.ManageGuildExpressions), reason: `antinuke: roles cannot be removed manage_expressions permission` }).catch(() => { })
        }
      }

    } else if (!role.permissions.has(Discord.PermissionsBitField.Flags.ManageWebhooks) && newRole.permissions.has(Discord.PermissionsBitField.Flags.ManageWebhooks)) {

      if (serverdata.AntiNukePermissionGrants?.includes('manage_webhooks')) {

        client.stripuser(role.guild, nuker, Discord.PermissionsBitField.Flags.ManageWebhooks, Discord.PermissionsBitField.Flags.Administrator, serverdata.AntiNukeLogChannel, `${nuker.user.username} granted manage_webhooks to a role`, `A dangerous permission was granted in this server, **${nuker.user.username}** granted \`manage_webhooks\` to a role, but this action was reversed immediately preventing any potential nuke`)

        if (newRole.permissions.has(Discord.PermissionsBitField.Flags.ManageWebhooks)) {
          newRole.edit({ permissions: newRole.permissions.remove(Discord.PermissionsBitField.Flags.ManageWebhooks), reason: `antinuke: roles cannot be granted manage_webhooks permission` }).catch(() => { })
        }
      }

    } else if (role.permissions.has(Discord.PermissionsBitField.Flags.ManageWebhooks) && !newRole.permissions.has(Discord.PermissionsBitField.Flags.ManageWebhooks)) {

      if (serverdata.AntiNukePermissionRemoves?.includes('manage_webhooks')) {

        client.stripuser(role.guild, nuker, Discord.PermissionsBitField.Flags.ManageWebhooks, Discord.PermissionsBitField.Flags.Administrator, serverdata.AntiNukeLogChannel, `${nuker.user.username} removed manage_webhooks from a role`, `A dangerous permission was removed in this server, **${nuker.user.username}** removed \`manage_webhooks\` from a role, but this action was reversed immediately preventing any potential nuke`)

        if (!newRole.permissions.has(Discord.PermissionsBitField.Flags.ManageWebhooks)) {
          newRole.edit({ permissions: newRole.permissions.add(Discord.PermissionsBitField.Flags.ManageWebhooks), reason: `antinuke: roles cannot be removed manage_webhooks permission` }).catch(() => { })
        }
      }

    } else if (!role.permissions.has(Discord.PermissionsBitField.Flags.ManageGuild) && newRole.permissions.has(Discord.PermissionsBitField.Flags.ManageGuild)) {

      if (serverdata.AntiNukePermissionGrants?.includes('manage_guild')) {

        client.stripuser(role.guild, nuker, Discord.PermissionsBitField.Flags.ManageGuild, Discord.PermissionsBitField.Flags.Administrator, serverdata.AntiNukeLogChannel, `${nuker.user.username} granted manage_guild to a role`, `A dangerous permission was granted in this server, **${nuker.user.username}** granted \`manage_guild\` to a role, but this action was reversed immediately preventing any potential nuke`)

        if (newRole.permissions.has(Discord.PermissionsBitField.Flags.ManageGuild)) {
          newRole.edit({ permissions: newRole.permissions.remove(Discord.PermissionsBitField.Flags.ManageGuild), reason: `antinuke: roles cannot be granted manage_guild permission` }).catch(() => { })
        }
      }

    } else if (role.permissions.has(Discord.PermissionsBitField.Flags.ManageGuild) && !newRole.permissions.has(Discord.PermissionsBitField.Flags.ManageGuild)) {

      if (serverdata.AntiNukePermissionRemoves?.includes('manage_guild')) {

        client.stripuser(role.guild, nuker, Discord.PermissionsBitField.Flags.ManageGuild, Discord.PermissionsBitField.Flags.Administrator, serverdata.AntiNukeLogChannel, `${nuker.user.username} removed manage_guild from a role`, `A dangerous permission was removed in this server, **${nuker.user.username}** removed \`manage_guild\` from a role, but this action was reversed immediately preventing any potential nuke`)

        if (!newRole.permissions.has(Discord.PermissionsBitField.Flags.ManageGuild)) {
          newRole.edit({ permissions: newRole.permissions.add(Discord.PermissionsBitField.Flags.ManageGuild), reason: `antinuke: roles cannot be removed manage_guild permission` }).catch(() => { })
        }
      }

    } else if (!role.permissions.has(Discord.PermissionsBitField.Flags.ManageNicknames) && newRole.permissions.has(Discord.PermissionsBitField.Flags.ManageNicknames)) {

      if (serverdata.AntiNukePermissionGrants?.includes('manage_nicknames')) {

        client.stripuser(role.guild, nuker, Discord.PermissionsBitField.Flags.ManageNicknames, Discord.PermissionsBitField.Flags.Administrator, serverdata.AntiNukeLogChannel, `${nuker.user.username} granted manage_nicknames to a role`, `A dangerous permission was granted in this server, **${nuker.user.username}** granted \`manage_nicknames\` to a role, but this action was reversed immediately preventing any potential nuke`)

        if (newRole.permissions.has(Discord.PermissionsBitField.Flags.ManageNicknames)) {
          newRole.edit({ permissions: newRole.permissions.remove(Discord.PermissionsBitField.Flags.ManageNicknames), reason: `antinuke: roles cannot be granted manage_nicknames permission` }).catch(() => { })
        }
      }

    } else if (role.permissions.has(Discord.PermissionsBitField.Flags.ManageNicknames) && !newRole.permissions.has(Discord.PermissionsBitField.Flags.ManageNicknames)) {

      if (serverdata.AntiNukePermissionRemoves.includes('manage_nicknames')) {

        client.stripuser(role.guild, nuker, Discord.PermissionsBitField.Flags.ManageNicknames, Discord.PermissionsBitField.Flags.Administrator, serverdata.AntiNukeLogChannel, `${nuker.user.username} removed manage_nicknames from a role`, `A dangerous permission was removed in this server, **${nuker.user.username}** removed \`manage_nicknames\` from a role, but this action was reversed immediately preventing any potential nuke`)

        if (!newRole.permissions.has(Discord.PermissionsBitField.Flags.ManageNicknames)) {
          newRole.edit({ permissions: newRole.permissions.add(Discord.PermissionsBitField.Flags.ManageNicknames), reason: `antinuke: roles cannot be removed manage_nicknames permission` }).catch(() => { })
        }
      }

    } else if (!role.permissions.has(Discord.PermissionsBitField.Flags.KickMembers) && newRole.permissions.has(Discord.PermissionsBitField.Flags.KickMembers)) {

      if (serverdata.AntiNukePermissionGrants.includes('kick_members')) {

        client.stripuser(role.guild, nuker, Discord.PermissionsBitField.Flags.KickMembers, Discord.PermissionsBitField.Flags.Administrator, serverdata.AntiNukeLogChannel, `${nuker.user.username} granted kick_members to a role`, `A dangerous permission was granted in this server, **${nuker.user.username}** granted \`kick_members\` to a role, but this action was reversed immediately preventing any potential nuke`)

        if (newRole.permissions.has(Discord.PermissionsBitField.Flags.KickMembers)) {
          newRole.edit({ permissions: newRole.permissions.remove(Discord.PermissionsBitField.Flags.KickMembers), reason: `antinuke: roles cannot be granted kick_members permission` }).catch(() => { })
        }
      }

    } else if (role.permissions.has(Discord.PermissionsBitField.Flags.KickMembers) && !newRole.permissions.has(Discord.PermissionsBitField.Flags.KickMembers)) {

      if (serverdata.AntiNukePermissionRemoves.includes('kick_members')) {

        client.stripuser(role.guild, nuker, Discord.PermissionsBitField.Flags.KickMembers, Discord.PermissionsBitField.Flags.Administrator, serverdata.AntiNukeLogChannel, `${nuker.user.username} removed kick_members from a role`, `A dangerous permission was removed in this server, **${nuker.user.username}** removed \`kick_members\` from a role, but this action was reversed immediately preventing any potential nuke`)

        if (!newRole.permissions.has(Discord.PermissionsBitField.Flags.KickMembers)) {
          newRole.edit({ permissions: newRole.permissions.add(Discord.PermissionsBitField.Flags.KickMembers), reason: `antinuke: roles cannot be removed kick_members permission` }).catch(() => { })
        }
      }

    } else if (!role.permissions.has(Discord.PermissionsBitField.Flags.BanMembers) && newRole.permissions.has(Discord.PermissionsBitField.Flags.BanMembers)) {

      if (serverdata.AntiNukePermissionGrants.includes('ban_members')) {

        client.stripuser(role.guild, nuker, Discord.PermissionsBitField.Flags.BanMembers, Discord.PermissionsBitField.Flags.Administrator, serverdata.AntiNukeLogChannel, `${nuker.user.username} granted ban_members to a role`, `A dangerous permission was granted in this server, **${nuker.user.username}** granted \`ban_members\` to a role, but this action was reversed immediately preventing any potential nuke`)

        if (newRole.permissions.has(Discord.PermissionsBitField.Flags.BanMembers)) {
          newRole.edit({ permissions: newRole.permissions.remove(Discord.PermissionsBitField.Flags.BanMembers), reason: `antinuke: roles cannot be granted ban_members permission` }).catch(() => { })
        }
      }

    } else if (role.permissions.has(Discord.PermissionsBitField.Flags.BanMembers) && !newRole.permissions.has(Discord.PermissionsBitField.Flags.BanMembers)) {

      if (serverdata.AntiNukePermissionRemoves.includes('ban_members')) {

        client.stripuser(role.guild, nuker, Discord.PermissionsBitField.Flags.BanMembers, Discord.PermissionsBitField.Flags.Administrator, serverdata.AntiNukeLogChannel, `${nuker.user.username} removed ban_members from a role`, `A dangerous permission was removed in this server, **${nuker.user.username}** removed \`ban_members\` from a role, but this action was reversed immediately preventing any potential nuke`)

        if (!newRole.permissions.has(Discord.PermissionsBitField.Flags.BanMembers)) {
          newRole.edit({ permissions: newRole.permissions.add(Discord.PermissionsBitField.Flags.BanMembers), reason: `antinuke: roles cannot be removed ban_members permission` }).catch(() => { })
        }
      }

    } else if (!role.permissions.has(Discord.PermissionsBitField.Flags.MentionEveryone) && newRole.permissions.has(Discord.PermissionsBitField.Flags.MentionEveryone)) {

      if (serverdata.AntiNukePermissionGrants.includes('mention_everyone')) {

        client.stripuser(role.guild, nuker, Discord.PermissionsBitField.Flags.MentionEveryone, Discord.PermissionsBitField.Flags.Administrator, serverdata.AntiNukeLogChannel, `${nuker.user.username} granted mention_everyone to a role`, `A dangerous permission was granted in this server, **${nuker.user.username}** granted \`mention_everyone\` to a role, but this action was reversed immediately preventing any potential nuke`)

        if (newRole.permissions.has(Discord.PermissionsBitField.Flags.MentionEveryone)) {
          newRole.edit({ permissions: newRole.permissions.remove(Discord.PermissionsBitField.Flags.MentionEveryone), reason: `antinuke: roles cannot be granted mention_everyone permission` }).catch(() => { })
        }
      }

    } else if (role.permissions.has(Discord.PermissionsBitField.Flags.MentionEveryone) && !newRole.permissions.has(Discord.PermissionsBitField.Flags.MentionEveryone)) {

      if (serverdata.AntiNukePermissionRemoves.includes('mention_everyone')) {

        client.stripuser(role.guild, nuker, Discord.PermissionsBitField.Flags.MentionEveryone, Discord.PermissionsBitField.Flags.Administrator, serverdata.AntiNukeLogChannel, `${nuker.user.username} removed mention_everyone from a role`, `A dangerous permission was removed in this server, **${nuker.user.username}** removed \`mention_everyone\` from a role, but this action was reversed immediately preventing any potential nuke`)

        if (!newRole.permissions.has(Discord.PermissionsBitField.Flags.MentionEveryone)) {
          newRole.edit({ permissions: newRole.permissions.add(Discord.PermissionsBitField.Flags.MentionEveryone), reason: `antinuke: roles cannot be removed mention_everyone permission` }).catch(() => { })
        }
      }

    } else if (!role.permissions.has(Discord.PermissionsBitField.Flags.ViewAuditLog) && newRole.permissions.has(Discord.PermissionsBitField.Flags.ViewAuditLog)) {

      if (serverdata.AntiNukePermissionGrants.includes('view_audit_log')) {

        client.stripuser(role.guild, nuker, Discord.PermissionsBitField.Flags.ViewAuditLog, Discord.PermissionsBitField.Flags.Administrator, serverdata.AntiNukeLogChannel, `${nuker.user.username} granted view_audit_log to a role`, `A dangerous permission was granted in this server, **${nuker.user.username}** granted \`view_audit_log\` to a role, but this action was reversed immediately preventing any potential nuke`)

        if (newRole.permissions.has(Discord.PermissionsBitField.Flags.ViewAuditLog)) {
          newRole.edit({ permissions: newRole.permissions.remove(Discord.PermissionsBitField.Flags.ViewAuditLog), reason: `antinuke: roles cannot be granted view_audit_log permission` }).catch(() => { })
        }
      }

    } else if (role.permissions.has(Discord.PermissionsBitField.Flags.ViewAuditLog) && !newRole.permissions.has(Discord.PermissionsBitField.Flags.ViewAuditLog)) {

      if (serverdata.AntiNukePermissionRemoves.includes('view_audit_log')) {

        client.stripuser(role.guild, nuker, Discord.PermissionsBitField.Flags.ViewAuditLog, Discord.PermissionsBitField.Flags.Administrator, serverdata.AntiNukeLogChannel, `${nuker.user.username} removed view_audit_log from a role`, `A dangerous permission was removed in this server, **${nuker.user.username}** removed \`view_audit_log\` from a role, but this action was reversed immediately preventing any potential nuke`)

        if (!newRole.permissions.has(Discord.PermissionsBitField.Flags.ViewAuditLog)) {
          newRole.edit({ permissions: newRole.permissions.add(Discord.PermissionsBitField.Flags.ViewAuditLog), reason: `antinuke: roles cannot be removed view_audit_log permission` }).catch(() => { })
        }
      }
    }
  }
}