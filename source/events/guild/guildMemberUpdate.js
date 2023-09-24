const Discord = require('discord.js')
const serverdataschema = require('../../structures/schemas/data')

module.exports = async (client, member, newMember) => {

  if (member.permissions !== newMember.permissions) {

    if (!member.guild.members.me.permissions.has([Discord.PermissionsBitField.Flags.ViewAuditLog])) return
  
    const auditlogs = await member.guild.fetchAuditLogs({ limit: 1, type: Discord.AuditLogEvent.MemberRoleUpdate }).catch(() => { })
  
    if (!auditlogs) return
    
    const permslog = auditlogs?.entries.first()
    
    if (!permslog) return
    
    const { executor, target } = permslog
    
    if (executor.id == member.guild.ownerId || executor.id == client.user.id) return
    if (member.id !== target.id) return

    // NUKER

    const nuker = await member.guild.members.fetch(executor.id).catch(() => { })

    // VICTIM

    const victim = await member.guild.members.fetch(target.id).catch(() => { })

    // SERVER DATA

    const serverdata = await serverdataschema.findOne({ GuildID: member.guild.id })

    if (!serverdata) return

    // WHITELISTED USERS

    const whitelistedusers = serverdata.AntiNukeWhitelistedUsers
    if (whitelistedusers?.includes(executor.id)) return

    if (!member.permissions.has(Discord.PermissionsBitField.Flags.Administrator) && newMember.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) {

      if (serverdata.AntiNukePermissionGrants?.includes('administrator')) {

        client.stripuser(member.guild, nuker, Discord.PermissionsBitField.Flags.Administrator, '', serverdata.AntiNukeLogChannel, `${nuker.user.username} gave administrator to a member`, `A dangerous role was added in this server, **${nuker.user.username}** gave \`administrator\` to a member, but this action was reversed immediately preventing any potential nuke`)

        client.victimuser(victim, Discord.PermissionsBitField.Flags.Administrator, `${victim.user.username} was granted administrator from a member that is not whitelisted`, '')
      }
    
    } else if (member.permissions.has(Discord.PermissionsBitField.Flags.Administrator) && !newMember.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) {

      if (serverdata.AntiNukePermissionRemoves?.includes('administrator')) {

        client.stripuser(member.guild, nuker, Discord.PermissionsBitField.Flags.Administrator, '', serverdata.AntiNukeLogChannel, `${nuker.user.username} removed administrator from a member`, `A dangerous role was removed in this server, **${nuker.user.username}** removed \`administrator\` from a member, but this action was reversed immediately preventing any potential nuke`)

        client.victimuser2(victim, member, Discord.PermissionsBitField.Flags.Administrator, `${victim.user.username} was granted administrator from a member that is not whitelisted`)
      }

    } else if (!member.permissions.has(Discord.PermissionsBitField.Flags.ManageChannels) && newMember.permissions.has(Discord.PermissionsBitField.Flags.ManageChannels)) {

      if (serverdata.AntiNukePermissionGrants?.includes('manage_channels')) {

        client.stripuser(member.guild, nuker, Discord.PermissionsBitField.Flags.ManageChannels, Discord.PermissionsBitField.Flags.Administrator, serverdata.AntiNukeLogChannel, `${nuker.user.username} gave manage_channels to a member`, `A dangerous role was added in this server, **${nuker.user.username}** gave \`manage_channels\` to a member, but this action was reversed immediately preventing any potential nuke`)

        client.victimuser(victim, Discord.PermissionsBitField.Flags.ManageChannels, `${victim.user.username} was granted manage_channels from a member that is not whitelisted`, '')
      }

    } else if (member.permissions.has(Discord.PermissionsBitField.Flags.ManageChannels) && !newMember.permissions.has(Discord.PermissionsBitField.Flags.ManageChannels)) {

      if (serverdata.AntiNukePermissionRemoves?.includes('manage_channels')) {

        client.stripuser(member.guild, nuker, Discord.PermissionsBitField.Flags.ManageChannels, Discord.PermissionsBitField.Flags.Administrator, serverdata.AntiNukeLogChannel, `${nuker.user.username} removed manage_channels from a member`, `A dangerous role was removed in this server, **${nuker.user.username}** removed \`manage_channels\` from a member, but this action was reversed immediately preventing any potential nuke`)

        client.victimuser2(victim, member, Discord.PermissionsBitField.Flags.ManageChannels, `${victim.user.username} was granted manage_channels from a member that is not whitelisted`)
      }

    } else if (!member.permissions.has(Discord.PermissionsBitField.Flags.ManageRoles) && newMember.permissions.has(Discord.PermissionsBitField.Flags.ManageRoles)) {

      if (serverdata.AntiNukePermissionGrants?.includes('manage_roles')) {

        client.stripuser(member.guild, nuker, Discord.PermissionsBitField.Flags.ManageRoles, Discord.PermissionsBitField.Flags.Administrator, serverdata.AntiNukeLogChannel, `${nuker.user.username} gave manage_roles to a member`, `A dangerous role was added in this server, **${nuker.user.username}** gave \`manage_roles\` to a member, but this action was reversed immediately preventing any potential nuke`)

        client.victimuser(victim, Discord.PermissionsBitField.Flags.ManageRoles, `${victim.user.username} was granted manage_roles from a member that is not whitelisted`, '')
      }

    } else if (member.permissions.has(Discord.PermissionsBitField.Flags.ManageRoles) && !newMember.permissions.has(Discord.PermissionsBitField.Flags.ManageRoles)) {

      if (serverdata.AntiNukePermissionRemoves?.includes('manage_roles')) {

        client.stripuser(member.guild, nuker, Discord.PermissionsBitField.Flags.ManageRoles, Discord.PermissionsBitField.Flags.Administrator, serverdata.AntiNukeLogChannel, `${nuker.user.username} removed manage_roles from a member`, `A dangerous role was removed in this server, **${nuker.user.username}** removed \`manage_roles\` from a member, but this action was reversed immediately preventing any potential nuke`)

        client.victimuser2(victim, member, Discord.PermissionsBitField.Flags.ManageRoles, `${victim.user.username} was granted manage_roles from a member that is not whitelisted`)
      }

    } else if (!member.permissions.has(Discord.PermissionsBitField.Flags.ManageGuildExpressions) && newMember.permissions.has(Discord.PermissionsBitField.Flags.ManageGuildExpressions)) {

      if (serverdata.AntiNukePermissionGrants?.includes('manage_expressions')) {

        client.stripuser(member.guild, nuker, Discord.PermissionsBitField.Flags.ManageGuildExpressions, Discord.PermissionsBitField.Flags.Administrator, serverdata.AntiNukeLogChannel, `${nuker.user.username} gave manage_expressions to a member`, `A dangerous role was added in this server, **${nuker.user.username}** gave \`manage_expressions\` to a member, but this action was reversed immediately preventing any potential nuke`)

        client.victimuser(victim, Discord.PermissionsBitField.Flags.ManageGuildExpressions, `${victim.user.username} was granted manage_expressions from a member that is not whitelisted`, '')
      }

    } else if (member.permissions.has(Discord.PermissionsBitField.Flags.ManageGuildExpressions) && !newMember.permissions.has(Discord.PermissionsBitField.Flags.ManageGuildExpressions)) {

      if (serverdata.AntiNukePermissionRemoves?.includes('manage_expressions')) {

        client.stripuser(member.guild, nuker, Discord.PermissionsBitField.Flags.ManageGuildExpressions, Discord.PermissionsBitField.Flags.Administrator, serverdata.AntiNukeLogChannel, `${nuker.user.username} removed manage_expressions from a member`, `A dangerous role was removed in this server, **${nuker.user.username}** removed \`manage_expressions\` from a member, but this action was reversed immediately preventing any potential nuke`)

        client.victimuser2(victim, member, Discord.PermissionsBitField.Flags.ManageGuildExpressions, `${victim.user.username} was granted manage_expressions from a member that is not whitelisted`)
      }

    } else if (!member.permissions.has(Discord.PermissionsBitField.Flags.ManageWebhooks) && newMember.permissions.has(Discord.PermissionsBitField.Flags.ManageWebhooks)) {

      if (serverdata.AntiNukePermissionGrants?.includes('manage_webhooks')) {

        client.stripuser(member.guild, nuker, Discord.PermissionsBitField.Flags.ManageWebhooks, Discord.PermissionsBitField.Flags.Administrator, serverdata.AntiNukeLogChannel, `${nuker.user.username} gave manage_webhooks to a member`, `A dangerous role was added in this server, **${nuker.user.username}** gave \`manage_webhooks\` to a member, but this action was reversed immediately preventing any potential nuke`)

        client.victimuser(victim, Discord.PermissionsBitField.Flags.ManageWebhooks, `${victim.user.username} was granted manage_webhooks from a member that is not whitelisted`, '')
      }

    } else if (member.permissions.has(Discord.PermissionsBitField.Flags.ManageWebhooks) && !newMember.permissions.has(Discord.PermissionsBitField.Flags.ManageWebhooks)) {

      if (serverdata.AntiNukePermissionRemoves?.includes('manage_webhooks')) {

        client.stripuser(member.guild, nuker, Discord.PermissionsBitField.Flags.ManageWebhooks, Discord.PermissionsBitField.Flags.Administrator, serverdata.AntiNukeLogChannel, `${nuker.user.username} removed manage_webhooks from a member`, `A dangerous role was removed in this server, **${nuker.user.username}** removed \`manage_webhooks\` from a member, but this action was reversed immediately preventing any potential nuke`)

        client.victimuser2(victim, member, Discord.PermissionsBitField.Flags.ManageWebhooks, `${victim.user.username} was granted manage_webhooks from a member that is not whitelisted`)
      }

    } else if (!member.permissions.has(Discord.PermissionsBitField.Flags.ManageGuild) && newMember.permissions.has(Discord.PermissionsBitField.Flags.ManageGuild)) {

      if (serverdata.AntiNukePermissionGrants?.includes('manage_guild')) {

        client.stripuser(member.guild, nuker, Discord.PermissionsBitField.Flags.ManageGuild, Discord.PermissionsBitField.Flags.Administrator, serverdata.AntiNukeLogChannel, `${nuker.user.username} gave manage_guild to a member`, `A dangerous role was added in this server, **${nuker.user.username}** gave \`manage_guild\` to a member, but this action was reversed immediately preventing any potential nuke`)

        client.victimuser(victim, Discord.PermissionsBitField.Flags.ManageGuild, `${victim.user.username} was granted manage_guild from a member that is not whitelisted`, '')
      }

    } else if (member.permissions.has(Discord.PermissionsBitField.Flags.ManageGuild) && !newMember.permissions.has(Discord.PermissionsBitField.Flags.ManageGuild)) {

      if (serverdata.AntiNukePermissionRemoves?.includes('manage_guild')) {

        client.stripuser(member.guild, nuker, Discord.PermissionsBitField.Flags.ManageGuild, Discord.PermissionsBitField.Flags.Administrator, serverdata.AntiNukeLogChannel, `${nuker.user.username} removed manage_guild from a member`, `A dangerous role was removed in this server, **${nuker.user.username}** removed \`manage_guild\` from a member, but this action was reversed immediately preventing any potential nuke`)

        client.victimuser2(victim, member, Discord.PermissionsBitField.Flags.ManageGuild, `${victim.user.username} was granted manage_guild from a member that is not whitelisted`)
      }

    } else if (!member.permissions.has(Discord.PermissionsBitField.Flags.ManageNicknames) && newMember.permissions.has(Discord.PermissionsBitField.Flags.ManageNicknames)) {

      if (serverdata.AntiNukePermissionGrants?.includes('manage_nicknames')) {

        client.stripuser(member.guild, nuker, Discord.PermissionsBitField.Flags.ManageNicknames, Discord.PermissionsBitField.Flags.Administrator, serverdata.AntiNukeLogChannel, `${nuker.user.username} gave manage_nicknames to a member`, `A dangerous role was added in this server, **${nuker.user.username}** gave \`manage_nicknames\` to a member, but this action was reversed immediately preventing any potential nuke`)

        client.victimuser(victim, Discord.PermissionsBitField.Flags.ManageNicknames, `${victim.user.username} was granted manage_nicknames from a member that is not whitelisted`, '')
      }

    } else if (member.permissions.has(Discord.PermissionsBitField.Flags.ManageNicknames) && !newMember.permissions.has(Discord.PermissionsBitField.Flags.ManageNicknames)) {

      if (serverdata.AntiNukePermissionRemoves?.includes('manage_nicknames')) {

        client.stripuser(member.guild, nuker, Discord.PermissionsBitField.Flags.ManageNicknames, Discord.PermissionsBitField.Flags.Administrator, serverdata.AntiNukeLogChannel, `${nuker.user.username} removed manage_nicknames from a member`, `A dangerous role was removed in this server, **${nuker.user.username}** removed \`manage_nicknames\` from a member, but this action was reversed immediately preventing any potential nuke`)

        client.victimuser2(victim, member, Discord.PermissionsBitField.Flags.ManageNicknames, `${victim.user.username} was granted manage_nicknames from a member that is not whitelisted`)
      }

    } else if (!member.permissions.has(Discord.PermissionsBitField.Flags.KickMembers) && newMember.permissions.has(Discord.PermissionsBitField.Flags.KickMembers)) {

      if (serverdata.AntiNukePermissionGrants?.includes('kick_members')) {

        client.stripuser(member.guild, nuker, Discord.PermissionsBitField.Flags.KickMembers, Discord.PermissionsBitField.Flags.Administrator, serverdata.AntiNukeLogChannel, `${nuker.user.username} gave manage_nicknames to a member`, `A dangerous role was added in this server, **${nuker.user.username}** gave \`manage_nicknames\` to a member, but this action was reversed immediately preventing any potential nuke`)

        client.victimuser(victim, Discord.PermissionsBitField.Flags.KickMembers, `${victim.user.username} was granted manage_nicknames from a member that is not whitelisted`, '')
      }

    } else if (member.permissions.has(Discord.PermissionsBitField.Flags.KickMembers) && !newMember.permissions.has(Discord.PermissionsBitField.Flags.KickMembers)) {

      if (serverdata.AntiNukePermissionRemoves?.includes('kick_members')) {

        client.stripuser(member.guild, nuker, Discord.PermissionsBitField.Flags.KickMembers, Discord.PermissionsBitField.Flags.Administrator, serverdata.AntiNukeLogChannel, `${nuker.user.username} removed kick_members from a member`, `A dangerous role was removed in this server, **${nuker.user.username}** removed \`kick_members\` from a member, but this action was reversed immediately preventing any potential nuke`)

        client.victimuser2(victim, member, Discord.PermissionsBitField.Flags.KickMembers, `${victim.user.username} was granted kick_members from a member that is not whitelisted`)
      }

    } else if (!member.permissions.has(Discord.PermissionsBitField.Flags.BanMembers) && newMember.permissions.has(Discord.PermissionsBitField.Flags.BanMembers)) {

      if (serverdata.AntiNukePermissionGrants?.includes('ban_members')) {

        client.stripuser(member.guild, nuker, Discord.PermissionsBitField.Flags.BanMembers, Discord.PermissionsBitField.Flags.Administrator, serverdata.AntiNukeLogChannel, `${nuker.user.username} gave ban_members to a member`, `A dangerous role was added in this server, **${nuker.user.username}** gave \`ban_members\` to a member, but this action was reversed immediately preventing any potential nuke`)

        client.victimuser(victim, Discord.PermissionsBitField.Flags.BanMembers, `${victim.user.username} was granted ban_members from a member that is not whitelisted`, '')
      }

    } else if (member.permissions.has(Discord.PermissionsBitField.Flags.BanMembers) && !newMember.permissions.has(Discord.PermissionsBitField.Flags.BanMembers)) {

      if (serverdata.AntiNukePermissionRemoves?.includes('ban_members')) {

        client.stripuser(member.guild, nuker, Discord.PermissionsBitField.Flags.BanMembers, Discord.PermissionsBitField.Flags.Administrator, serverdata.AntiNukeLogChannel, `${nuker.user.username} removed ban_members from a member`, `A dangerous role was removed in this server, **${nuker.user.username}** removed \`ban_members\` from a member, but this action was reversed immediately preventing any potential nuke`)

        client.victimuser2(victim, member, Discord.PermissionsBitField.Flags.BanMembers, `${victim.user.username} was granted ban_members from a member that is not whitelisted`)
      }

    } else if (!member.permissions.has(Discord.PermissionsBitField.Flags.MentionEveryone) && newMember.permissions.has(Discord.PermissionsBitField.Flags.MentionEveryone)) {

      if (serverdata.AntiNukePermissionGrants?.includes('mention_everyone')) {

        client.stripuser(member.guild, nuker, Discord.PermissionsBitField.Flags.MentionEveryone, Discord.PermissionsBitField.Flags.Administrator, serverdata.AntiNukeLogChannel, `${nuker.user.username} gave mention_everyone to a member`, `A dangerous role was added in this server, **${nuker.user.username}** gave \`mention_everyone\` to a member, but this action was reversed immediately preventing any potential nuke`)

        client.victimuser(victim, Discord.PermissionsBitField.Flags.MentionEveryone, `${victim.user.username} was granted mention_everyone from a member that is not whitelisted`, '')
      }

    } else if (member.permissions.has(Discord.PermissionsBitField.Flags.MentionEveryone) && !newMember.permissions.has(Discord.PermissionsBitField.Flags.MentionEveryone)) {

      if (serverdata.AntiNukePermissionRemoves?.includes('mention_everyone')) {

        client.stripuser(member.guild, nuker, Discord.PermissionsBitField.Flags.MentionEveryone, Discord.PermissionsBitField.Flags.Administrator, serverdata.AntiNukeLogChannel, `${nuker.user.username} removed mention_everyone from a member`, `A dangerous role was removed in this server, **${nuker.user.username}** removed \`mention_everyone\` from a member, but this action was reversed immediately preventing any potential nuke`)

        client.victimuser2(victim, member, Discord.PermissionsBitField.Flags.MentionEveryone, `${victim.user.username} was granted mention_everyone from a member that is not whitelisted`)
      }

    } else if (!member.permissions.has(Discord.PermissionsBitField.Flags.ViewAuditLog) && newMember.permissions.has(Discord.PermissionsBitField.Flags.ViewAuditLog)) {

      if (serverdata.AntiNukePermissionGrants?.includes('view_audit_log')) {

        client.stripuser(member.guild, nuker, Discord.PermissionsBitField.Flags.ViewAuditLog, Discord.PermissionsBitField.Flags.Administrator, serverdata.AntiNukeLogChannel, `${nuker.user.username} gave view_audit_log to a member`, `A dangerous role was added in this server, **${nuker.user.username}** gave \`view_audit_log\` to a member, but this action was reversed immediately preventing any potential nuke`)

        client.victimuser(victim, Discord.PermissionsBitField.Flags.ViewAuditLog, `${victim.user.username} was granted view_audit_log from a member that is not whitelisted`, '')
      }

    } else if (member.permissions.has(Discord.PermissionsBitField.Flags.ViewAuditLog) && !newMember.permissions.has(Discord.PermissionsBitField.Flags.ViewAuditLog)) {

      if (serverdata.AntiNukePermissionRemoves?.includes('view_audit_log')) {

        client.stripuser(member.guild, nuker, Discord.PermissionsBitField.Flags.ViewAuditLog, Discord.PermissionsBitField.Flags.Administrator, serverdata.AntiNukeLogChannel, `${nuker.user.username} removed view_audit_log from a member`, `A dangerous role was removed in this server, **${nuker.user.username}** removed \`view_audit_log\` from a member, but this action was reversed immediately preventing any potential nuke`)

        client.victimuser2(victim, member, Discord.PermissionsBitField.Flags.ViewAuditLog, `${victim.user.username} was granted view_audit_log from a member that is not whitelisted`)
      }
    }
  }
}