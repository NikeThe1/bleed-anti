const Discord = require('discord.js')
const serverdataschema = require('../../structures/schemas/data')

module.exports = {
  name: 'antinuke',
  aliases: ['an'],
  run: async (client, message, args) => {

    const serverdata = await serverdataschema.findOne({ GuildID: message.guild.id })

    if (!serverdata) return

    if (args[0] === 'role') {

      if (!serverdata.AntiNukeWhitelistedAdmins.includes(message.author.id) && message.author.id !== message.guild.ownerId) {

        return new client.embed(
          message, `You must be an **antinuke admin** to run this command.`, 'warn'
        )
      }

      if (!args[1]) {

        return new client.help(
          message, 
          {
            command: 'antinuke role',
            description: 'Prevent mass role delete',
            syntax: `Syntax: ${serverdata.Prefix}antinuke role (on or off) --params`,
            example: `Example: ${serverdata.Prefix}antinuke role on --do ban --threshold 3`
          }
        )

      } else if (args[1] === 'on') {

        if (!args[2]) {

          if (serverdata.AntiNukeToggleRole) {

            return new client.embed(
              message, `**Role** antinuke has been **enabled** already`, 'warn'
            )
  
          } else {
  
            serverdata.AntiNukeToggleRole = true
  
            await serverdata.save()
  
            return new client.embed(
              message, `Enabled **role** antinuke module`, 'approve'
            )
          }

        } else if (args[2] === '--do' || args[2] === '—do') {

          if (!args[4]) {

            const punishment = args[3]

            if (!punishment) {

              return new client.embed(
                message, `Missing a **punishment** to configure for role`, 'warn'
              )
            }

            const punishments = ['ban', 'kick', 'stripstaff']

            if (!punishments.includes(punishment)) {

              return new client.embed(
                message, `You passed an **invalid punishment**, it must be either **ban**, **kick**, or **stripstaff**`, 'warn'
              )
            }

            if (serverdata.AntiNukeToggleRole) {

              serverdata.AntiNukeToggleRole = true
              serverdata.AntiNukeRolePunishment = punishment

              await serverdata.save()

              let punishment_toggle

              if (punishment === 'ban') {
                punishment_toggle = `Punishment is set to **ban**`
              } else if (punishment === 'kick') {
                punishment_toggle = `Punishment is set to **kick**`
              } else if (punishment === 'stripstaff') {
                punishment_toggle = `Punishment is set to **stripstaff**`
              }
  
              return new client.embed(
                message, `Updated **role** antinuke module. ${punishment_toggle}`, 'approve'
              )

            } else {

              serverdata.AntiNukeToggleRole = true
              serverdata.AntiNukeRolePunishment = punishment

              await serverdata.save()

              let punishment_toggle

              if (punishment === 'ban') {
                punishment_toggle = `Punishment is set to **ban**`
              } else if (punishment === 'kick') {
                punishment_toggle = `Punishment is set to **kick**`
              } else if (punishment === 'stripstaff') {
                punishment_toggle = `Punishment is set to **stripstaff**`
              }
  
              return new client.embed(
                message, `Enabled **role** antinuke module. ${punishment_toggle}`, 'approve'
              )
            }

          } else if (args[4] === '--threshold' || args[4] === '—threshold') {

            if (!args[6]) {

              const threshold = args[5]

              if (!threshold) {

                return new client.embed(
                  message, `Missing a **threshold** to configure for role`, 'warn'
                )
              }

              if(isNaN(threshold)) {

                return new client.embed(
                  message, `You can only pass **numbers** for the threshold`, 'warn'
                )
              }

              if (threshold > 6 || threshold < 1) {

                return new client.embed(
                  message, `You passed an **invalid threshold**, it must be between **1** and **6**`, 'warn'
                )
              }

              const punishments = ['ban', 'kick', 'stripstaff']

              if (!punishments.includes(args[3])) {

                return new client.embed(
                  message, `You passed an **invalid punishment**, it must be either **ban**, **kick**, or **stripstaff**`, 'warn'
                )
              }

              if (args[3] === 'ban') {

                if (serverdata.AntiNukeToggleRole) {

                  serverdata.AntiNukeToggleRole = true
                  serverdata.AntiNukeRolePunishment = 'ban'
                  serverdata.AntiNukeRoleThreshold = threshold

                  await serverdata.save()

                  return new client.embed(
                    message, `Updated **role** antinuke module. Punishment is set to **ban** and threshold is set to **${threshold}**`, 'approve'
                  )

                } else {

                  serverdata.AntiNukeToggleRole = true
                  serverdata.AntiNukeRolePunishment = 'ban'
                  serverdata.AntiNukeRoleThreshold = threshold

                  await serverdata.save()

                  return new client.embed(
                    message, `Enabled **role** antinuke module. Punishment is set to **ban** and threshold is set to **${threshold}**`, 'approve'
                  )
                }

              } else if (args[3] === 'kick') {

                if (serverdata.AntiNukeToggleRole) {

                  serverdata.AntiNukeToggleRole = true
                  serverdata.AntiNukeRolePunishment = 'kick'
                  serverdata.AntiNukeRoleThreshold = threshold

                  await serverdata.save()

                  return new client.embed(
                    message, `Updated **role** antinuke module. Punishment is set to **kick** and threshold is set to **${threshold}**`, 'approve'
                  )

                } else {

                  serverdata.AntiNukeToggleRole = true
                  serverdata.AntiNukeRolePunishment = 'kick'
                  serverdata.AntiNukeRoleThreshold = threshold

                  await serverdata.save()

                  return new client.embed(
                    message, `Enabled **role** antinuke module. Punishment is set to **kick** and threshold is set to **${threshold}**`, 'approve'
                  )
                }

              } else if (args[3] === 'stripstaff') {

                if (serverdata.AntiNukeToggleRole) {

                  serverdata.AntiNukeToggleRole = true
                  serverdata.AntiNukeRolePunishment = 'stripstaff'
                  serverdata.AntiNukeRoleThreshold = threshold

                  await serverdata.save()

                  return new client.embed(
                    message, `Updated **role** antinuke module. Punishment is set to **stripstaff** and threshold is set to **${threshold}**`, 'approve'
                  )

                } else {

                  serverdata.AntiNukeToggleRole = true
                  serverdata.AntiNukeRolePunishment = 'stripstaff'
                  serverdata.AntiNukeRoleThreshold = threshold

                  await serverdata.save()

                  return new client.embed(
                    message, `Enabled **role** antinuke module. Punishment is set to **stripstaff** and threshold is set to **${threshold}**`, 'approve'
                  )
                }
              }
            }

          } else {

            return new client.embed(
              message, `**Incorrect usage** of command. Check syntax and try again`, 'warn'
            )
          }

        } else {

          return new client.embed(
            message, `**Incorrect usage** of command. Check syntax and try again`, 'warn'
          )
        }

      } else if (args[1] === 'off') {

        if (serverdata.AntiNukeToggleRole) {

          serverdata.AntiNukeToggleRole = null

          await serverdata.save()

          return new client.embed(
            message, `Disabled **role** antinuke module`, 'approve'
          )

        } else {

          return new client.embed(
            message, `**Role** antinuke has been **disabled** already`, 'warn'
          )
        }

      } else {

        return new client.embed(
          message, `**Incorrect usage** of command. Check syntax and try again`, 'warn'
        )
      }

    } else if (args[0] === 'webhook') {

      if (!serverdata.AntiNukeWhitelistedAdmins.includes(message.author.id) && message.author.id !== message.guild.ownerId) {

        return new client.embed(
          message, `You must be an **antinuke admin** to run this command.`, 'warn'
        )
      }

      if (!args[1]) {

        return new client.help(
          message, 
          {
            command: 'antinuke webhook',
            description: 'Prevent mass webhook creation',
            syntax: `Syntax: ${serverdata.Prefix}antinuke webhook (on or off) --params`,
            example: `Example: ${serverdata.Prefix}antinuke webhook on --do ban --threshold 3`
          }
        )
    
      } else if (args[1] === 'on') {
    
        if (!args[2]) {
    
          if (serverdata.AntiNukeToggleWebhook) {
    
            return new client.embed(
              message, `**Webhook** antinuke has been **enabled** already`, 'warn'
            )
    
          } else {
    
            serverdata.AntiNukeToggleWebhook = true
    
            await serverdata.save()
    
            return new client.embed(
              message, `Enabled **webhook** antinuke module`, 'approve'
            )
          }
    
        } else if (args[2] === '--do' || args[2] === '—do') {
    
          if (!args[4]) {
    
            const punishment = args[3]
    
            if (!punishment) {
    
              return new client.embed(
                message, `Missing a **punishment** to configure for webhook`, 'warn'
              )
            }
    
            const punishments = ['ban', 'kick', 'stripstaff']
    
            if (!punishments.includes(punishment)) {
    
              return new client.embed(
                message, `You passed an **invalid punishment**, it must be either **ban**, **kick**, or **stripstaff**`, 'warn'
              )
            }
    
            if (serverdata.AntiNukeToggleWebhook) {
    
              serverdata.AntiNukeToggleWebhook = true
              serverdata.AntiNukeWebhookPunishment = punishment
    
              await serverdata.save()
    
              let punishment_toggle
    
              if (punishment === 'ban') {
                punishment_toggle = `Punishment is set to **ban**`
              } else if (punishment === 'kick') {
                punishment_toggle = `Punishment is set to **kick**`
              } else if (punishment === 'stripstaff') {
                punishment_toggle = `Punishment is set to **stripstaff**`
              }
    
              return new client.embed(
                message, `Updated **webhook** antinuke module. ${punishment_toggle}`, 'approve'
              )
    
            } else {
    
              serverdata.AntiNukeToggleWebhook = true
              serverdata.AntiNukeWebhookPunishment = punishment
    
              await serverdata.save()
    
              let punishment_toggle
    
              if (punishment === 'ban') {
                punishment_toggle = `Punishment is set to **ban**`
              } else if (punishment === 'kick') {
                punishment_toggle = `Punishment is set to **kick**`
              } else if (punishment === 'stripstaff') {
                punishment_toggle = `Punishment is set to **stripstaff**`
              }
    
              return new client.embed(
                message, `Enabled **webhook** antinuke module. ${punishment_toggle}`, 'approve'
              )
            }
    
          } else if (args[4] === '--threshold' || args[4] === '—threshold') {
    
            if (!args[6]) {
    
              const threshold = args[5]
    
              if (!threshold) {
    
                return new client.embed(
                  message, `Missing a **threshold** to configure for webhook`, 'warn'
                )
              }
    
              if(isNaN(threshold)) {
    
                return new client.embed(
                  message, `You can only pass **numbers** for the threshold`, 'warn'
                )
              }
    
              if (threshold > 6 || threshold < 1) {
    
                return new client.embed(
                  message, `You passed an **invalid threshold**, it must be between **1** and **6**`, 'warn'
                )
              }
    
              const punishments = ['ban', 'kick', 'stripstaff']
    
              if (!punishments.includes(args[3])) {
    
                return new client.embed(
                  message, `You passed an **invalid punishment**, it must be either **ban**, **kick**, or **stripstaff**`, 'warn'
                )
              }
    
              if (args[3] === 'ban') {
    
                if (serverdata.AntiNukeToggleWebhook) {
    
                  serverdata.AntiNukeToggleWebhook = true
                  serverdata.AntiNukeWebhookPunishment = 'ban'
                  serverdata.AntiNukeWebhookThreshold = threshold
    
                  await serverdata.save()
    
                  return new client.embed(
                    message, `Updated **webhook** antinuke module. Punishment is set to **ban** and threshold is set to **${threshold}**`, 'approve'
                  )
    
                } else {
    
                  serverdata.AntiNukeToggleWebhook = true
                  serverdata.AntiNukeWebhookPunishment = 'ban'
                  serverdata.AntiNukeWebhookThreshold = threshold
    
                  await serverdata.save()
    
                  return new client.embed(
                    message, `Enabled **webhook** antinuke module. Punishment is set to **ban** and threshold is set to **${threshold}**`, 'approve'
                  )
                }
    
              } else if (args[3] === 'kick') {
    
                if (serverdata.AntiNukeToggleWebhook) {
    
                  serverdata.AntiNukeToggleWebhook = true
                  serverdata.AntiNukeWebhookPunishment = 'kick'
                  serverdata.AntiNukeWebhookThreshold = threshold
    
                  await serverdata.save()
    
                  return new client.embed(
                    message, `Updated **webhook** antinuke module. Punishment is set to **kick** and threshold is set to **${threshold}**`, 'approve'
                  )
    
                } else {
    
                  serverdata.AntiNukeToggleWebhook = true
                  serverdata.AntiNukeWebhookPunishment = 'kick'
                  serverdata.AntiNukeWebhookThreshold = threshold
    
                  await serverdata.save()
    
                  return new client.embed(
                    message, `Enabled **webhook** antinuke module. Punishment is set to **kick** and threshold is set to **${threshold}**`, 'approve'
                  )
                }
    
              } else if (args[3] === 'stripstaff') {
    
                if (serverdata.AntiNukeToggleWebhook) {
    
                  serverdata.AntiNukeToggleWebhook = true
                  serverdata.AntiNukeWebhookPunishment = 'stripstaff'
                  serverdata.AntiNukeWebhookThreshold = threshold
    
                  await serverdata.save()
    
                  return new client.embed(
                    message, `Updated **webhook** antinuke module. Punishment is set to **stripstaff** and threshold is set to **${threshold}**`, 'approve'
                  )
    
                } else {
    
                  serverdata.AntiNukeToggleWebhook = true
                  serverdata.AntiNukeWebhookPunishment = 'stripstaff'
                  serverdata.AntiNukeWebhookThreshold = threshold
    
                  await serverdata.save()
    
                  return new client.embed(
                    message, `Enabled **webhook** antinuke module. Punishment is set to **stripstaff** and threshold is set to **${threshold}**`, 'approve'
                  )
                }
              }
            }
    
          } else {
    
            return new client.embed(
              message, `**Incorrect usage** of command. Check syntax and try again`, 'warn'
            )
          }
    
        } else {
    
          return new client.embed(
            message, `**Incorrect usage** of command. Check syntax and try again`, 'warn'
          )
        }
    
      } else if (args[1] === 'off') {
    
        if (serverdata.AntiNukeToggleWebhook) {
    
          serverdata.AntiNukeToggleWebhook = null
    
          await serverdata.save()
    
          return new client.embed(
            message, `Disabled **webhook** antinuke module`, 'approve'
          )
    
        } else {
    
          return new client.embed(
            message, `**Webhook** antinuke has been **disabled** already`, 'warn'
          )
        }
    
      } else {
    
        return new client.embed(
          message, `**Incorrect usage** of command. Check syntax and try again`, 'warn'
        )
      }

    } else if (args[0] === 'ban') {

      if (!serverdata.AntiNukeWhitelistedAdmins.includes(message.author.id) && message.author.id !== message.guild.ownerId) {

        return new client.embed(
          message, `You must be an **antinuke admin** to run this command.`, 'warn'
        )
      }

      if (!args[1]) {

        return new client.help(
          message, 
          {
            command: 'antinuke ban',
            description: 'Prevent mass member ban',
            syntax: `Syntax: ${serverdata.Prefix}antinuke ban (on or off) --params`,
            example: `Example: ${serverdata.Prefix}antinuke ban on --do ban --threshold 3`
          }
        )
    
      } else if (args[1] === 'on') {
    
        if (!args[2]) {
    
          if (serverdata.AntiNukeToggleBan) {
    
            return new client.embed(
              message, `**Ban** antinuke has been **enabled** already`, 'warn'
            )
    
          } else {
    
            serverdata.AntiNukeToggleBan = true
    
            await serverdata.save()
    
            return new client.embed(
              message, `Enabled **ban** antinuke module`, 'approve'
            )
          }
    
        } else if (args[2] === '--do' || args[2] === '—do') {
    
          if (!args[4]) {
    
            const punishment = args[3]
    
            if (!punishment) {
    
              return new client.embed(
                message, `Missing a **punishment** to configure for ban`, 'warn'
              )
            }
    
            const punishments = ['ban', 'kick', 'stripstaff']
    
            if (!punishments.includes(punishment)) {
    
              return new client.embed(
                message, `You passed an **invalid punishment**, it must be either **ban**, **kick**, or **stripstaff**`, 'warn'
              )
            }
    
            if (serverdata.AntiNukeToggleBan) {
    
              serverdata.AntiNukeToggleBan = true
              serverdata.AntiNukeBanPunishment = punishment
    
              await serverdata.save()
    
              let punishment_toggle
    
              if (punishment === 'ban') {
                punishment_toggle = `Punishment is set to **ban**`
              } else if (punishment === 'kick') {
                punishment_toggle = `Punishment is set to **kick**`
              } else if (punishment === 'stripstaff') {
                punishment_toggle = `Punishment is set to **stripstaff**`
              }
    
              return new client.embed(
                message, `Updated **ban** antinuke module. ${punishment_toggle}`, 'approve'
              )
    
            } else {
    
              serverdata.AntiNukeToggleBan = true
              serverdata.AntiNukeBanPunishment = punishment
    
              await serverdata.save()
    
              let punishment_toggle
    
              if (punishment === 'ban') {
                punishment_toggle = `Punishment is set to **ban**`
              } else if (punishment === 'kick') {
                punishment_toggle = `Punishment is set to **kick**`
              } else if (punishment === 'stripstaff') {
                punishment_toggle = `Punishment is set to **stripstaff**`
              }
    
              return new client.embed(
                message, `Enabled **ban** antinuke module. ${punishment_toggle}`, 'approve'
              )
            }
    
          } else if (args[4] === '--threshold' || args[4] === '—threshold') {
    
            if (!args[6]) {
    
              const threshold = args[5]
    
              if (!threshold) {
    
                return new client.embed(
                  message, `Missing a **threshold** to configure for ban`, 'warn'
                )
              }
    
              if(isNaN(threshold)) {
    
                return new client.embed(
                  message, `You can only pass **numbers** for the threshold`, 'warn'
                )
              }
    
              if (threshold > 6 || threshold < 1) {
    
                return new client.embed(
                  message, `You passed an **invalid threshold**, it must be between **1** and **6**`, 'warn'
                )
              }
    
              const punishments = ['ban', 'kick', 'stripstaff']
    
              if (!punishments.includes(args[3])) {
    
                return new client.embed(
                  message, `You passed an **invalid punishment**, it must be either **ban**, **kick**, or **stripstaff**`, 'warn'
                )
              }
    
              if (args[3] === 'ban') {
    
                if (serverdata.AntiNukeToggleBan) {
    
                  serverdata.AntiNukeToggleBan = true
                  serverdata.AntiNukeBanPunishment = 'ban'
                  serverdata.AntiNukeBanThreshold = threshold
    
                  await serverdata.save()
    
                  return new client.embed(
                    message, `Updated **ban** antinuke module. Punishment is set to **ban** and threshold is set to **${threshold}**`, 'approve'
                  )
    
                } else {
    
                  serverdata.AntiNukeToggleBan = true
                  serverdata.AntiNukeBanPunishment = 'ban'
                  serverdata.AntiNukeBanThreshold = threshold
    
                  await serverdata.save()
    
                  return new client.embed(
                    message, `Enabled **ban** antinuke module. Punishment is set to **ban** and threshold is set to **${threshold}**`, 'approve'
                  )
                }
    
              } else if (args[3] === 'kick') {
    
                if (serverdata.AntiNukeToggleBan) {
    
                  serverdata.AntiNukeToggleBan = true
                  serverdata.AntiNukeBanPunishment = 'kick'
                  serverdata.AntiNukeBanThreshold = threshold
    
                  await serverdata.save()
    
                  return new client.embed(
                    message, `Updated **ban** antinuke module. Punishment is set to **kick** and threshold is set to **${threshold}**`, 'approve'
                  )
    
                } else {
    
                  serverdata.AntiNukeToggleBan = true
                  serverdata.AntiNukeBanPunishment = 'kick'
                  serverdata.AntiNukeBanThreshold = threshold
    
                  await serverdata.save()
    
                  return new client.embed(
                    message, `Enabled **ban** antinuke module. Punishment is set to **kick** and threshold is set to **${threshold}**`, 'approve'
                  )
                }
    
              } else if (args[3] === 'stripstaff') {
    
                if (serverdata.AntiNukeToggleBan) {
    
                  serverdata.AntiNukeToggleBan = true
                  serverdata.AntiNukeBanPunishment = 'stripstaff'
                  serverdata.AntiNukeBanThreshold = threshold
    
                  await serverdata.save()
    
                  return new client.embed(
                    message, `Updated **ban** antinuke module. Punishment is set to **stripstaff** and threshold is set to **${threshold}**`, 'approve'
                  )
    
                } else {
    
                  serverdata.AntiNukeToggleBan = true
                  serverdata.AntiNukeBanPunishment = 'stripstaff'
                  serverdata.AntiNukeBanThreshold = threshold
    
                  await serverdata.save()
    
                  return new client.embed(
                    message, `Enabled **ban** antinuke module. Punishment is set to **stripstaff** and threshold is set to **${threshold}**`, 'approve'
                  )
                }
              }
            }
    
          } else {
    
            return new client.embed(
              message, `**Incorrect usage** of command. Check syntax and try again`, 'warn'
            )
          }
    
        } else {
    
          return new client.embed(
            message, `**Incorrect usage** of command. Check syntax and try again`, 'warn'
          )
        }
    
      } else if (args[1] === 'off') {
    
        if (serverdata.AntiNukeToggleBan) {
    
          serverdata.AntiNukeToggleBan = null
    
          await serverdata.save()
    
          return new client.embed(
            message, `Disabled **ban** antinuke module`, 'approve'
          )
    
        } else {
    
          return new client.embed(
            message, `**Ban** antinuke has been **disabled** already`, 'warn'
          )
        }
    
      } else {
    
        return new client.embed(
          message, `**Incorrect usage** of command. Check syntax and try again`, 'warn'
        )
      }

    } else if (args[0] === 'channel') {

      if (!serverdata.AntiNukeWhitelistedAdmins.includes(message.author.id) && message.author.id !== message.guild.ownerId) {

        return new client.embed(
          message, `You must be an **antinuke admin** to run this command.`, 'warn'
        )
      }

      if (!args[1]) {

        return new client.help(
          message, 
          {
            command: 'antinuke channel',
            description: 'Prevent mass channel create and delete',
            syntax: `Syntax: ${serverdata.Prefix}antinuke channel (on or off) --params`,
            example: `Example: ${serverdata.Prefix}antinuke channel on --do ban --threshold 3`
          }
        )
    
      } else if (args[1] === 'on') {
    
        if (!args[2]) {
    
          if (serverdata.AntiNukeToggleChannel) {
    
            return new client.embed(
              message, `**Channel** antinuke has been **enabled** already`, 'warn'
            )
    
          } else {
    
            serverdata.AntiNukeToggleChannel = true
    
            await serverdata.save()
    
            return new client.embed(
              message, `Enabled **channel** antinuke module`, 'approve'
            )
          }
    
        } else if (args[2] === '--do' || args[2] === '—do') {
    
          if (!args[4]) {
    
            const punishment = args[3]
    
            if (!punishment) {
    
              return new client.embed(
                message, `Missing a **punishment** to configure for channel`, 'warn'
              )
            }
    
            const punishments = ['ban', 'kick', 'stripstaff']
    
            if (!punishments.includes(punishment)) {
    
              return new client.embed(
                message, `You passed an **invalid punishment**, it must be either **ban**, **kick**, or **stripstaff**`, 'warn'
              )
            }
    
            if (serverdata.AntiNukeToggleChannel) {
    
              serverdata.AntiNukeToggleChannel = true
              serverdata.AntiNukeChannelPunishment = punishment
    
              await serverdata.save()
    
              let punishment_toggle
    
              if (punishment === 'ban') {
                punishment_toggle = `Punishment is set to **ban**`
              } else if (punishment === 'kick') {
                punishment_toggle = `Punishment is set to **kick**`
              } else if (punishment === 'stripstaff') {
                punishment_toggle = `Punishment is set to **stripstaff**`
              }
    
              return new client.embed(
                message, `Updated **channel** antinuke module. ${punishment_toggle}`, 'approve'
              )
    
            } else {
    
              serverdata.AntiNukeToggleChannel = true
              serverdata.AntiNukeChannelPunishment = punishment
    
              await serverdata.save()
    
              let punishment_toggle
    
              if (punishment === 'ban') {
                punishment_toggle = `Punishment is set to **ban**`
              } else if (punishment === 'kick') {
                punishment_toggle = `Punishment is set to **kick**`
              } else if (punishment === 'stripstaff') {
                punishment_toggle = `Punishment is set to **stripstaff**`
              }
    
              return new client.embed(
                message, `Enabled **channel** antinuke module. ${punishment_toggle}`, 'approve'
              )
            }
    
          } else if (args[4] === '--threshold' || args[4] === '—threshold') {
    
            if (!args[6]) {
    
              const threshold = args[5]
    
              if (!threshold) {
    
                return new client.embed(
                  message, `Missing a **threshold** to configure for channel`, 'warn'
                )
              }
    
              if(isNaN(threshold)) {
    
                return new client.embed(
                  message, `You can only pass **numbers** for the threshold`, 'warn'
                )
              }
    
              if (threshold > 6 || threshold < 1) {
    
                return new client.embed(
                  message, `You passed an **invalid threshold**, it must be between **1** and **6**`, 'warn'
                )
              }
    
              const punishments = ['ban', 'kick', 'stripstaff']
    
              if (!punishments.includes(args[3])) {
    
                return new client.embed(
                  message, `You passed an **invalid punishment**, it must be either **ban**, **kick**, or **stripstaff**`, 'warn'
                )
              }
    
              if (args[3] === 'ban') {
    
                if (serverdata.AntiNukeToggleChannel) {
    
                  serverdata.AntiNukeToggleChannel = true
                  serverdata.AntiNukeChannelPunishment = 'ban'
                  serverdata.AntiNukeChannelThreshold = threshold
    
                  await serverdata.save()
    
                  return new client.embed(
                    message, `Updated **channel** antinuke module. Punishment is set to **ban** and threshold is set to **${threshold}**`, 'approve'
                  )
    
                } else {
    
                  serverdata.AntiNukeToggleChannel = true
                  serverdata.AntiNukeChannelPunishment = 'ban'
                  serverdata.AntiNukeChannelThreshold = threshold
    
                  await serverdata.save()
    
                  return new client.embed(
                    message, `Enabled **channel** antinuke module. Punishment is set to **ban** and threshold is set to **${threshold}**`, 'approve'
                  )
                }
    
              } else if (args[3] === 'kick') {
    
                if (serverdata.AntiNukeToggleChannel) {
    
                  serverdata.AntiNukeToggleChannel = true
                  serverdata.AntiNukeChannelPunishment = 'kick'
                  serverdata.AntiNukeChannelThreshold = threshold
    
                  await serverdata.save()
    
                  return new client.embed(
                    message, `Updated **channel** antinuke module. Punishment is set to **kick** and threshold is set to **${threshold}**`, 'approve'
                  )
    
                } else {
    
                  serverdata.AntiNukeToggleChannel = true
                  serverdata.AntiNukeChannelPunishment = 'kick'
                  serverdata.AntiNukeChannelThreshold = threshold
    
                  await serverdata.save()
    
                  return new client.embed(
                    message, `Enabled **channel** antinuke module. Punishment is set to **kick** and threshold is set to **${threshold}**`, 'approve'
                  )
                }
    
              } else if (args[3] === 'stripstaff') {
    
                if (serverdata.AntiNukeToggleChannel) {
    
                  serverdata.AntiNukeToggleChannel = true
                  serverdata.AntiNukeChannelPunishment = 'stripstaff'
                  serverdata.AntiNukeChannelThreshold = threshold
    
                  await serverdata.save()
    
                  return new client.embed(
                    message, `Updated **channel** antinuke module. Punishment is set to **stripstaff** and threshold is set to **${threshold}**`, 'approve'
                  )
    
                } else {
    
                  serverdata.AntiNukeToggleChannel = true
                  serverdata.AntiNukeChannelPunishment = 'stripstaff'
                  serverdata.AntiNukeChannelThreshold = threshold
    
                  await serverdata.save()
    
                  return new client.embed(
                    message, `Enabled **channel** antinuke module. Punishment is set to **stripstaff** and threshold is set to **${threshold}**`, 'approve'
                  )
                }
              }
            }
    
          } else {
    
            return new client.embed(
              message, `**Incorrect usage** of command. Check syntax and try again`, 'warn'
            )
          }
    
        } else {
    
          return new client.embed(
            message, `**Incorrect usage** of command. Check syntax and try again`, 'warn'
          )
        }
    
      } else if (args[1] === 'off') {
    
        if (serverdata.AntiNukeToggleChannel) {
    
          serverdata.AntiNukeToggleChannel = null
    
          await serverdata.save()
    
          return new client.embed(
            message, `Disabled **channel** antinuke module`, 'approve'
          )
    
        } else {
    
          return new client.embed(
            message, `**Channel** antinuke has been **disabled** already`, 'warn'
          )
        }
    
      } else {
    
        return new client.embed(
          message, `**Incorrect usage** of command. Check syntax and try again`, 'warn'
        )
      }

    } else if (args[0] === 'kick') {

      if (!serverdata.AntiNukeWhitelistedAdmins.includes(message.author.id) && message.author.id !== message.guild.ownerId) {

        return new client.embed(
          message, `You must be an **antinuke admin** to run this command.`, 'warn'
        )
      }

      if (!args[1]) {

        return new client.help(
          message, 
          {
            command: 'antinuke kick',
            description: 'Prevent mass member kick',
            syntax: `Syntax: ${serverdata.Prefix}antinuke kick (on or off) --params`,
            example: `Example: ${serverdata.Prefix}antinuke kick on --do ban --threshold 3`
          }
        )
    
      } else if (args[1] === 'on') {
    
        if (!args[2]) {
    
          if (serverdata.AntiNukeToggleKick) {
    
            return new client.embed(
              message, `**Kick** antinuke has been **enabled** already`, 'warn'
            )
    
          } else {
    
            serverdata.AntiNukeToggleKick = true
    
            await serverdata.save()
    
            return new client.embed(
              message, `Enabled **kick** antinuke module`, 'approve'
            )
          }
    
        } else if (args[2] === '--do' || args[2] === '—do') {
    
          if (!args[4]) {
    
            const punishment = args[3]
    
            if (!punishment) {
    
              return new client.embed(
                message, `Missing a **punishment** to configure for kick`, 'warn'
              )
            }
    
            const punishments = ['ban', 'kick', 'stripstaff']
    
            if (!punishments.includes(punishment)) {
    
              return new client.embed(
                message, `You passed an **invalid punishment**, it must be either **ban**, **kick**, or **stripstaff**`, 'warn'
              )
            }
    
            if (serverdata.AntiNukeToggleKick) {
    
              serverdata.AntiNukeToggleKick = true
              serverdata.AntiNukeKickPunishment = punishment
    
              await serverdata.save()
    
              let punishment_toggle
    
              if (punishment === 'ban') {
                punishment_toggle = `Punishment is set to **ban**`
              } else if (punishment === 'kick') {
                punishment_toggle = `Punishment is set to **kick**`
              } else if (punishment === 'stripstaff') {
                punishment_toggle = `Punishment is set to **stripstaff**`
              }
    
              return new client.embed(
                message, `Updated **kick** antinuke module. ${punishment_toggle}`, 'approve'
              )
    
            } else {
    
              serverdata.AntiNukeToggleKick = true
              serverdata.AntiNukeKickPunishment = punishment
    
              await serverdata.save()
    
              let punishment_toggle
    
              if (punishment === 'ban') {
                punishment_toggle = `Punishment is set to **ban**`
              } else if (punishment === 'kick') {
                punishment_toggle = `Punishment is set to **kick**`
              } else if (punishment === 'stripstaff') {
                punishment_toggle = `Punishment is set to **stripstaff**`
              }
    
              return new client.embed(
                message, `Enabled **kick** antinuke module. ${punishment_toggle}`, 'approve'
              )
            }
    
          } else if (args[4] === '--threshold' || args[4] === '—threshold') {
    
            if (!args[6]) {
    
              const threshold = args[5]
    
              if (!threshold) {
    
                return new client.embed(
                  message, `Missing a **threshold** to configure for kick`, 'warn'
                )
              }
    
              if(isNaN(threshold)) {
    
                return new client.embed(
                  message, `You can only pass **numbers** for the threshold`, 'warn'
                )
              }
    
              if (threshold > 6 || threshold < 1) {
    
                return new client.embed(
                  message, `You passed an **invalid threshold**, it must be between **1** and **6**`, 'warn'
                )
              }
    
              const punishments = ['ban', 'kick', 'stripstaff']
    
              if (!punishments.includes(args[3])) {
    
                return new client.embed(
                  message, `You passed an **invalid punishment**, it must be either **ban**, **kick**, or **stripstaff**`, 'warn'
                )
              }
    
              if (args[3] === 'ban') {
    
                if (serverdata.AntiNukeToggleKick) {
    
                  serverdata.AntiNukeToggleKick = true
                  serverdata.AntiNukeKickPunishment = 'ban'
                  serverdata.AntiNukeKickThreshold = threshold
    
                  await serverdata.save()
    
                  return new client.embed(
                    message, `Updated **kick** antinuke module. Punishment is set to **ban** and threshold is set to **${threshold}**`, 'approve'
                  )
    
                } else {
    
                  serverdata.AntiNukeToggleKick = true
                  serverdata.AntiNukeKickPunishment = 'ban'
                  serverdata.AntiNukeKickThreshold = threshold
    
                  await serverdata.save()
    
                  return new client.embed(
                    message, `Enabled **kick** antinuke module. Punishment is set to **ban** and threshold is set to **${threshold}**`, 'approve'
                  )
                }
    
              } else if (args[3] === 'kick') {
    
                if (serverdata.AntiNukeToggleKick) {
    
                  serverdata.AntiNukeToggleKick = true
                  serverdata.AntiNukeKickPunishment = 'kick'
                  serverdata.AntiNukeKickThreshold = threshold
    
                  await serverdata.save()
    
                  return new client.embed(
                    message, `Updated **kick** antinuke module. Punishment is set to **kick** and threshold is set to **${threshold}**`, 'approve'
                  )
    
                } else {
    
                  serverdata.AntiNukeToggleKick = true
                  serverdata.AntiNukeKickPunishment = 'kick'
                  serverdata.AntiNukeKickThreshold = threshold
    
                  await serverdata.save()
    
                  return new client.embed(
                    message, `Enabled **kick** antinuke module. Punishment is set to **kick** and threshold is set to **${threshold}**`, 'approve'
                  )
                }
    
              } else if (args[3] === 'stripstaff') {
    
                if (serverdata.AntiNukeToggleKick) {
    
                  serverdata.AntiNukeToggleKick = true
                  serverdata.AntiNukeKickPunishment = 'stripstaff'
                  serverdata.AntiNukeKickThreshold = threshold
    
                  await serverdata.save()
    
                  return new client.embed(
                    message, `Updated **kick** antinuke module. Punishment is set to **stripstaff** and threshold is set to **${threshold}**`, 'approve'
                  )
    
                } else {
    
                  serverdata.AntiNukeToggleKick = true
                  serverdata.AntiNukeKickPunishment = 'stripstaff'
                  serverdata.AntiNukeKickThreshold = threshold
    
                  await serverdata.save()
    
                  return new client.embed(
                    message, `Enabled **kick** antinuke module. Punishment is set to **stripstaff** and threshold is set to **${threshold}**`, 'approve'
                  )
                }
              }
            }
    
          } else {
    
            return new client.embed(
              message, `**Incorrect usage** of command. Check syntax and try again`, 'warn'
            )
          }
    
        } else {
    
          return new client.embed(
            message, `**Incorrect usage** of command. Check syntax and try again`, 'warn'
          )
        }
    
      } else if (args[1] === 'off') {
    
        if (serverdata.AntiNukeToggleKick) {
    
          serverdata.AntiNukeToggleKick = null
    
          await serverdata.save()
    
          return new client.embed(
            message, `Disabled **kick** antinuke module`, 'approve'
          )
    
        } else {
    
          return new client.embed(
            message, `**Kick** antinuke has been **disabled** already`, 'warn'
          )
        }
    
      } else {
    
        return new client.embed(
          message, `**Incorrect usage** of command. Check syntax and try again`, 'warn'
        )
      }

    } else if (args[0] === 'emoji') {

      if (!serverdata.AntiNukeWhitelistedAdmins.includes(message.author.id) && message.author.id !== message.guild.ownerId) {

        return new client.embed(
          message, `You must be an **antinuke admin** to run this command.`, 'warn'
        )
      }

      if (!args[1]) {

        return new client.help(
          message, 
          {
            command: 'antinuke emoji',
            description: 'Prevent mass emoji delete Warning: This module may be unstable due to Discords rate limit',
            syntax: `Syntax: ${serverdata.Prefix}antinuke emoji (on or off) --params`,
            example: `Example: ${serverdata.Prefix}antinuke emoji on --do ban --threshold 3`
          }
        )
    
      } else if (args[1] === 'on') {
    
        if (!args[2]) {
    
          if (serverdata.AntiNukeToggleEmoji) {
    
            return new client.embed(
              message, `**Emoji** antinuke has been **enabled** already`, 'warn'
            )
    
          } else {
    
            serverdata.AntiNukeToggleEmoji = true
    
            await serverdata.save()
    
            return new client.embed(
              message, `Enabled **emoji** antinuke module`, 'approve'
            )
          }
    
        } else if (args[2] === '--do' || args[2] === '—do') {
    
          if (!args[4]) {
    
            const punishment = args[3]
    
            if (!punishment) {
    
              return new client.embed(
                message, `Missing a **punishment** to configure for emoji`, 'warn'
              )
            }
    
            const punishments = ['ban', 'kick', 'stripstaff']
    
            if (!punishments.includes(punishment)) {
    
              return new client.embed(
                message, `You passed an **invalid punishment**, it must be either **ban**, **kick**, or **stripstaff**`, 'warn'
              )
            }
    
            if (serverdata.AntiNukeToggleEmoji) {
    
              serverdata.AntiNukeToggleEmoji = true
              serverdata.AntiNukeEmojiPunishment = punishment
    
              await serverdata.save()
    
              let punishment_toggle
    
              if (punishment === 'ban') {
                punishment_toggle = `Punishment is set to **ban**`
              } else if (punishment === 'kick') {
                punishment_toggle = `Punishment is set to **kick**`
              } else if (punishment === 'stripstaff') {
                punishment_toggle = `Punishment is set to **stripstaff**`
              }
    
              return new client.embed(
                message, `Updated **emoji** antinuke module. ${punishment_toggle}`, 'approve'
              )
    
            } else {
    
              serverdata.AntiNukeToggleEmoji = true
              serverdata.AntiNukeEmojiPunishment = punishment
    
              await serverdata.save()
    
              let punishment_toggle
    
              if (punishment === 'ban') {
                punishment_toggle = `Punishment is set to **ban**`
              } else if (punishment === 'kick') {
                punishment_toggle = `Punishment is set to **kick**`
              } else if (punishment === 'stripstaff') {
                punishment_toggle = `Punishment is set to **stripstaff**`
              }
    
              return new client.embed(
                message, `Enabled **emoji** antinuke module. ${punishment_toggle}`, 'approve'
              )
            }
    
          } else if (args[4] === '--threshold' || args[4] === '—threshold') {
    
            if (!args[6]) {
    
              const threshold = args[5]
    
              if (!threshold) {
    
                return new client.embed(
                  message, `Missing a **threshold** to configure for emoji`, 'warn'
                )
              }
    
              if(isNaN(threshold)) {
    
                return new client.embed(
                  message, `You can only pass **numbers** for the threshold`, 'warn'
                )
              }
    
              if (threshold > 6 || threshold < 1) {
    
                return new client.embed(
                  message, `You passed an **invalid threshold**, it must be between **1** and **6**`, 'warn'
                )
              }
    
              const punishments = ['ban', 'kick', 'stripstaff']
    
              if (!punishments.includes(args[3])) {
    
                return new client.embed(
                  message, `You passed an **invalid punishment**, it must be either **ban**, **kick**, or **stripstaff**`, 'warn'
                )
              }
    
              if (args[3] === 'ban') {
    
                if (serverdata.AntiNukeToggleEmoji) {
    
                  serverdata.AntiNukeToggleEmoji = true
                  serverdata.AntiNukeEmojiPunishment = 'ban'
                  serverdata.AntiNukeEmojiThreshold = threshold
    
                  await serverdata.save()
    
                  return new client.embed(
                    message, `Updated **emoji** antinuke module. Punishment is set to **ban** and threshold is set to **${threshold}**`, 'approve'
                  )
    
                } else {
    
                  serverdata.AntiNukeToggleEmoji = true
                  serverdata.AntiNukeEmojiPunishment = 'ban'
                  serverdata.AntiNukeEmojiThreshold = threshold
    
                  await serverdata.save()
    
                  return new client.embed(
                    message, `Enabled **emoji** antinuke module. Punishment is set to **ban** and threshold is set to **${threshold}**`, 'approve'
                  )
                }
    
              } else if (args[3] === 'kick') {
    
                if (serverdata.AntiNukeToggleEmoji) {
    
                  serverdata.AntiNukeToggleEmoji = true
                  serverdata.AntiNukeEmojiPunishment = 'kick'
                  serverdata.AntiNukeEmojiThreshold = threshold
    
                  await serverdata.save()
    
                  return new client.embed(
                    message, `Updated **emoji** antinuke module. Punishment is set to **kick** and threshold is set to **${threshold}**`, 'approve'
                  )
    
                } else {
    
                  serverdata.AntiNukeToggleEmoji = true
                  serverdata.AntiNukeEmojiPunishment = 'kick'
                  serverdata.AntiNukeEmojiThreshold = threshold
    
                  await serverdata.save()
    
                  return new client.embed(
                    message, `Enabled **emoji** antinuke module. Punishment is set to **kick** and threshold is set to **${threshold}**`, 'approve'
                  )
                }
    
              } else if (args[3] === 'stripstaff') {
    
                if (serverdata.AntiNukeToggleEmoji) {
    
                  serverdata.AntiNukeToggleEmoji = true
                  serverdata.AntiNukeEmojiPunishment = 'stripstaff'
                  serverdata.AntiNukeEmojiThreshold = threshold
    
                  await serverdata.save()
    
                  return new client.embed(
                    message, `Updated **emoji** antinuke module. Punishment is set to **stripstaff** and threshold is set to **${threshold}**`, 'approve'
                  )
    
                } else {
    
                  serverdata.AntiNukeToggleEmoji = true
                  serverdata.AntiNukeEmojiPunishment = 'stripstaff'
                  serverdata.AntiNukeEmojiThreshold = threshold
    
                  await serverdata.save()
    
                  return new client.embed(
                    message, `Enabled **emoji** antinuke module. Punishment is set to **stripstaff** and threshold is set to **${threshold}**`, 'approve'
                  )
                }
              }
            }
    
          } else {
    
            return new client.embed(
              message, `**Incorrect usage** of command. Check syntax and try again`, 'warn'
            )
          }
    
        } else {
    
          return new client.embed(
            message, `**Incorrect usage** of command. Check syntax and try again`, 'warn'
          )
        }
    
      } else if (args[1] === 'off') {
    
        if (serverdata.AntiNukeToggleEmoji) {
    
          serverdata.AntiNukeToggleEmoji = null
    
          await serverdata.save()
    
          return new client.embed(
            message, `Disabled **emoji** antinuke module`, 'approve'
          )
    
        } else {
    
          return new client.embed(
            message, `**Emoji** antinuke has been **disabled** already`, 'warn'
          )
        }
    
      } else {
    
        return new client.embed(
          message, `**Incorrect usage** of command. Check syntax and try again`, 'warn'
        )
      }

    } else if (args[0] === 'vanity' || args[0] === 'vanityurl') {

      if (!serverdata.AntiNukeWhitelistedAdmins.includes(message.author.id) && message.author.id !== message.guild.ownerId) {

        return new client.embed(
          message, `You must be an **antinuke admin** to run this command.`, 'warn'
        )
      }

      if (!args[1]) {

        return new client.help(
          message, 
          {
            command: 'antinuke vanity',
            description: 'Prevent server vanity URL change',
            syntax: `Syntax: ${serverdata.Prefix}antinuke vanity (on or off) --params`,
            example: `Example: ${serverdata.Prefix}antinuke vanity on --do ban`
          }
        )

      } else if (args[1] === 'on') {

        if (!args[2]) {

          if (serverdata.AntiNukeToggleVanity) {

            return new client.embed(
              message, `**Vanity** antinuke has been **enabled** already`, 'warn'
            )
  
          } else {
  
            serverdata.AntiNukeToggleVanity = true
  
            await serverdata.save()
  
            return new client.embed(
              message, `Enabled **vanity** antinuke module`, 'approve'
            )
          }

        } else if (args[2] === '--do' || args[2] === '—do') {

          if (!args[4]) {

            const punishment = args[3]

            if (!punishment) {

              return new client.embed(
                message, `Missing a **punishment** to configure for vanity`, 'warn'
              )
            }

            const punishments = ['ban', 'kick', 'stripstaff']

            if (!punishments.includes(punishment)) {

              return new client.embed(
                message, `You passed an **invalid punishment**, it must be either **ban**, **kick**, or **stripstaff**`, 'warn'
              )
            }

            if (serverdata.AntiNukeToggleVanity) {

              serverdata.AntiNukeToggleVanity = true
              serverdata.AntiNukeVanityPunishment = punishment

              await serverdata.save()

              let punishment_toggle

              if (punishment === 'ban') {
                punishment_toggle = `Punishment is set to **ban**`
              } else if (punishment === 'kick') {
                punishment_toggle = `Punishment is set to **kick**`
              } else if (punishment === 'stripstaff') {
                punishment_toggle = `Punishment is set to **stripstaff**`
              }
  
              return new client.embed(
                message, `Updated **vanity** antinuke module. ${punishment_toggle}`, 'approve'
              )

            } else {

              serverdata.AntiNukeToggleVanity = true
              serverdata.AntiNukeVanityPunishment = punishment

              await serverdata.save()

              let punishment_toggle

              if (punishment === 'ban') {
                punishment_toggle = `Punishment is set to **ban**`
              } else if (punishment === 'kick') {
                punishment_toggle = `Punishment is set to **kick**`
              } else if (punishment === 'stripstaff') {
                punishment_toggle = `Punishment is set to **stripstaff**`
              }
  
              return new client.embed(
                message, `Enabled **vanity** antinuke module. ${punishment_toggle}`, 'approve'
              )
            }
          }

        } else {

          return new client.embed(
            message, `**Incorrect usage** of command. Check syntax and try again`, 'warn'
          )
        }

      } else if (args[1] === 'off') {

        if (serverdata.AntiNukeToggleVanity) {

          serverdata.AntiNukeToggleVanity = null

          await serverdata.save()

          return new client.embed(
            message, `Disabled **Vanity** antinuke module`, 'approve'
          )

        } else {

          return new client.embed(
            message, `**Vanity** antinuke has been **disabled** already`, 'warn'
          )
        }

      } else {

        return new client.embed(
          message, `**Incorrect usage** of command. Check syntax and try again`, 'warn'
        )
      }

    } else if (args[0] === 'botadd' || args[0] === 'bot') {

      if (!serverdata.AntiNukeWhitelistedAdmins.includes(message.author.id) && message.author.id !== message.guild.ownerId) {

        return new client.embed(
          message, `You must be an **antinuke admin** to run this command.`, 'warn'
        )
      }

      if (!args[1]) {

        return new client.help(
          message, 
          {
            command: 'antinuke botadd',
            description: 'Prevent new bot additions',
            syntax: `Syntax: ${serverdata.Prefix}antinuke botadd (on or off) --params`,
            example: `Example: ${serverdata.Prefix}antinuke botadd on --do ban`
          }
        )

      } else if (args[1] === 'on') {

        if (!args[2]) {

          if (serverdata.AntiNukeToggleBot) {

            return new client.embed(
              message, `**Botadd** antinuke has been **enabled** already`, 'warn'
            )
  
          } else {
  
            serverdata.AntiNukeToggleBot = true
  
            await serverdata.save()
  
            return new client.embed(
              message, `Enabled **botadd** antinuke module`, 'approve'
            )
          }

        } else if (args[2] === '--do' || args[2] === '—do') {

          if (!args[4]) {

            const punishment = args[3]

            if (!punishment) {

              return new client.embed(
                message, `Missing a **punishment** to configure for botadd`, 'warn'
              )
            }

            const punishments = ['ban', 'kick', 'stripstaff']

            if (!punishments.includes(punishment)) {

              return new client.embed(
                message, `You passed an **invalid punishment**, it must be either **ban**, **kick**, or **stripstaff**`, 'warn'
              )
            }

            if (serverdata.AntiNukeToggleBot) {

              serverdata.AntiNukeToggleBot = true
              serverdata.AntiNukeBotPunishment = punishment

              await serverdata.save()

              let punishment_toggle

              if (punishment === 'ban') {
                punishment_toggle = `Punishment is set to **ban**`
              } else if (punishment === 'kick') {
                punishment_toggle = `Punishment is set to **kick**`
              } else if (punishment === 'stripstaff') {
                punishment_toggle = `Punishment is set to **stripstaff**`
              }
  
              return new client.embed(
                message, `Updated **botadd** antinuke module. ${punishment_toggle}`, 'approve'
              )

            } else {

              serverdata.AntiNukeToggleBot = true
              serverdata.AntiNukeBotPunishment = punishment

              await serverdata.save()

              let punishment_toggle

              if (punishment === 'ban') {
                punishment_toggle = `Punishment is set to **ban**`
              } else if (punishment === 'kick') {
                punishment_toggle = `Punishment is set to **kick**`
              } else if (punishment === 'stripstaff') {
                punishment_toggle = `Punishment is set to **stripstaff**`
              }
  
              return new client.embed(
                message, `Enabled **botadd** antinuke module. ${punishment_toggle}`, 'approve'
              )
            }
          }

        } else {

          return new client.embed(
            message, `**Incorrect usage** of command. Check syntax and try again`, 'warn'
          )
        }

      } else if (args[1] === 'off') {

        if (serverdata.AntiNukeToggleBot) {

          serverdata.AntiNukeToggleBot = null

          await serverdata.save()

          return new client.embed(
            message, `Disabled **botadd** antinuke module`, 'approve'
          )

        } else {

          return new client.embed(
            message, `**Botadd** antinuke has been **disabled** already`, 'warn'
          )
        }

      } else {

        return new client.embed(
          message, `**Incorrect usage** of command. Check syntax and try again`, 'warn'
        )
      }

    } else if (args[0] === 'permissions' || args[0] === 'perms') {

      if (!serverdata.AntiNukeWhitelistedAdmins.includes(message.author.id) && message.author.id !== message.guild.ownerId) {

        return new client.embed(
          message, `You must be an **antinuke admin** to run this command.`, 'warn'
        )
      }

      if (!args[1]) {

        return new client.help(
          message, 
          {
            command: 'antinuke permissions',
            description: 'Watch dangerous permissions being granted or removed',
            syntax: `Syntax: ${serverdata.Prefix}antinuke permissions (grant or remove) (permission name)`,
            example: `Example: ${serverdata.Prefix}antinuke permissions grant administrator`
          }
        )
        
      }else if (args[1] === 'grant') {

        const permission = args[2]

        if (!permission) {

          return new client.embed(
            message, `Missing a **permission** to configure for antinuke`, 'warn'
          )
        }

        const permissions = ['administrator', 'manage_channels', 'manage_roles', 'manage_expressions', 'manage_webhooks', 'manage_guild', 'manage_nicknames', 'kick_members', 'ban_members', 'mention_everyone', 'view_audit_log']

        if (!permissions.includes(permission)) {

          return new client.embed(
            message, `You passed an **invalid permission name**, please visit the documentation [here](https://docs.bleed.bot/help/commands/antinuke/antinuke-permissions)`, 'warn'
          )
        }

        if (serverdata?.AntiNukePermissionGrants.includes(permission)) {

          let i = serverdata.AntiNukePermissionGrants.indexOf(permission)
          serverdata.AntiNukePermissionGrants.splice(i, 1)
          serverdata.save()

          return new client.embed(
            message, `No longer monitoring **granting of** permission \`${permission}\``, 'approve'
          )

        } else {

          serverdata.AntiNukePermissionGrants.push(permission)
          serverdata.save()

          return new client.embed(
            message, `Now monitoring **granting of** permission \`${permission}\`. Members **manually** giving out roles to others will be punished with \`stripstaff\``, 'approve'
          )
        }

      } else if (args[1] === 'remove') {

        const permission = args[2]

        if (!permission) {

          return new client.embed(
            message, `Missing a **permission** to configure for antinuke`, 'warn'
          )
        }

        const permissions = ['administrator', 'manage_channels', 'manage_roles', 'manage_expressions', 'manage_webhooks', 'manage_guild', 'manage_nicknames', 'kick_members', 'ban_members', 'mention_everyone', 'view_audit_log']

        if (!permissions.includes(permission)) {

          return new client.embed(
            message, `You passed an **invalid permission name**, please visit the documentation [here](https://docs.bleed.bot/help/commands/antinuke/antinuke-permissions)`, 'warn'
          )
        }

        if (serverdata?.AntiNukePermissionRemoves.includes(permission)) {

          let i = serverdata.AntiNukePermissionRemoves.indexOf(permission)
          serverdata.AntiNukePermissionRemoves.splice(i, 1)
          serverdata.save()

          return new client.embed(
            message, `No longer monitoring **removal of** permission \`${permission}\``, 'approve'
          )

        } else {

          serverdata.AntiNukePermissionRemoves.push(permission)
          serverdata.save()

          return new client.embed(
            message, `Now monitoring **removal of** permission \`${permission}\`. Members **manually** giving out roles to others will be punished with \`stripstaff\``, 'approve'
          )
        }

      } else if (args[1] === 'list') {

        if (serverdata?.AntiNukePermissionGrants.length > 0 || serverdata?.AntiNukePermissionRemoves.length > 0) {

          const array = []

          if (serverdata?.AntiNukePermissionGrants.includes('administrator')) {
            array.push(`watching **grants** for \`administrator\` (do: stripstaff)`)
          } else if (serverdata?.AntiNukePermissionGrants.includes('manage_channels')) {
            array.push(`watching **grants** for \`manage_channels\` (do: stripstaff)`)
          } else if (serverdata?.AntiNukePermissionGrants.includes('manage_roles')) {
            array.push(`watching **grants** for \`manage_roles\` (do: stripstaff)`)
          } else if (serverdata?.AntiNukePermissionGrants.includes('manage_expressions')) {
            array.push(`watching **grants** for \`manage_expressions\` (do: stripstaff)`)
          } else if (serverdata?.AntiNukePermissionGrants.includes('manage_webhooks')) {
            array.push(`watching **grants** for \`manage_webhooks\` (do: stripstaff)`)
          } else if (serverdata?.AntiNukePermissionGrants.includes('manage_guild')) {
            array.push(`watching **grants** for \`manage_guild\` (do: stripstaff)`)
          } else if (serverdata?.AntiNukePermissionGrants.includes('manage_nicknames')) {
            array.push(`watching **grants** for \`manage_nicknames\` (do: stripstaff)`)
          } else if (serverdata?.AntiNukePermissionGrants.includes('kick_members')) {
            array.push(`watching **grants** for \`kick_members\` (do: stripstaff)`)
          } else if (serverdata?.AntiNukePermissionGrants.includes('ban_members')) {
            array.push(`watching **grants** for \`ban_members\` (do: stripstaff)`)
          } else if (serverdata?.AntiNukePermissionGrants.includes('mention_everyone')) {
            array.push(`watching **grants** for \`mention_everyone\` (do: stripstaff)`)
          } else if (serverdata?.AntiNukePermissionGrants.includes('view_audit_log')) {
            array.push(`watching **grants** for \`view_audit_log\` (do: stripstaff)`)
          }

          if (serverdata?.AntiNukePermissionRemoves.includes('administrator')) {
            array.push(`watching **removals** for \`administrator\` (do: stripstaff)`)
          } else if (serverdata?.AntiNukePermissionRemoves.includes('manage_channels')) {
            array.push(`watching **removals** for \`manage_channels\` (do: stripstaff)`)
          } else if (serverdata?.AntiNukePermissionRemoves.includes('manage_roles')) {
            array.push(`watching **removals** for \`manage_roles\` (do: stripstaff)`)
          } else if (serverdata?.AntiNukePermissionRemoves.includes('manage_expressions')) {
            array.push(`watching **removals** for \`manage_expressions\` (do: stripstaff)`)
          } else if (serverdata?.AntiNukePermissionRemoves.includes('manage_webhooks')) {
            array.push(`watching **removals** for \`manage_webhooks\` (do: stripstaff)`)
          } else if (serverdata?.AntiNukePermissionRemoves.includes('manage_guild')) {
            array.push(`watching **removals** for \`manage_guild\` (do: stripstaff)`)
          } else if (serverdata?.AntiNukePermissionRemoves.includes('manage_nicknames')) {
            array.push(`watching **removals** for \`manage_nicknames\` (do: stripstaff)`)
          } else if (serverdata?.AntiNukePermissionRemoves.includes('kick_members')) {
            array.push(`watching **removals** for \`kick_members\` (do: stripstaff)`)
          } else if (serverdata?.AntiNukePermissionRemoves.includes('ban_members')) {
            array.push(`watching **removals** for \`ban_members\` (do: stripstaff)`)
          } else if (serverdata?.AntiNukePermissionRemoves.includes('mention_everyone')) {
            array.push(`watching **removals** for \`mention_everyone\` (do: stripstaff)`)
          } else if (serverdata?.AntiNukePermissionRemoves.includes('view_audit_log')) {
            array.push(`watching **removals** for \`view_audit_log\` (do: stripstaff)`)
          }

          const embeds = []
          const permissionsarray = array.paginate(10)
          var index = 0

          for (const entry of permissionsarray) {

            const antinuke_permissions = entry.map((item) => {
              return `\`${++index}\` ${item}`
            }).join('\n')

            const embed = new Discord.EmbedBuilder()

            .setColor(client.colors.maincolor)
            .setAuthor({ name: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL({ dynamic: true })}`})
            .setTitle('Antinuke permissions')
            .setDescription(antinuke_permissions)
            .setFooter({ text: `Page 1/1 (${array.length} ${array.length === 1 ? 'entry' : 'entries'})`})

            embeds.push(embed)
          }

          if (embeds.length > 1) {

            await client.pagination(message, embeds, embeds.length, `${array.length} ${array.length === 1 ? 'entry' : 'entries'}`)

          } else {

            return message.channel.send({ embeds: [embeds[0]] })
          }

        } else {

          return new client.embed(
            message, `No results found for **antinuke permissions**`, 'neutral'
          )
        }

      } else {

        return new client.embed(
          message, `Action type must be either **grant or remove**`, 'warn'
        )
      }

    } else if (args[0] === 'whitelist') {

      if (!serverdata.AntiNukeWhitelistedAdmins.includes(message.author.id) && message.author.id !== message.guild.ownerId) {

        return new client.embed(
          message, `You must be an **antinuke admin** to run this command.`, 'warn'
        )
      }

      if (!args[1]) {

        return new client.help(
          message, 
          {
            command: 'antinuke whitelist',
            description: 'Whitelist a member from triggering antinuke or a bot to join',
            syntax: `Syntax: ${serverdata.Prefix}antinuke whitelist (member or bot id)`,
            example: `Example: ${serverdata.Prefix}antinuke whitelist ${client.user.id}`
          }
        )
      }

      const user = await message.mentions.members.first() || message.guild.members.cache.get(args[1]) || message.guild.members.cache.find(m => String(m.user.username).toLowerCase().includes(String(args.slice(1).join(' ')).toLowerCase()) || String(m.displayName).toLowerCase().includes(String(args.slice(1).join(' ')).toLowerCase()) || String(m.user.tag).toLowerCase().includes(String(args.slice(1).join(' ').toLowerCase()))) || args[1]

      const member = await client.users.fetch(client.users.resolveId(user)).catch(() => { })

      if (!member) {

        return new client.embed(
          message, `I was unable to find that **member** or the **ID** is invalid`, 'warn'
        )
      }

      if (serverdata?.AntiNukeWhitelistedUsers.includes(member.id)) {

        // IF MEMBER IS IN SERVER CHECK

        await message.guild.members.fetch(member.id).then(async yo => {

          let i = serverdata.AntiNukeWhitelistedUsers.indexOf(`${member.id}`)
          serverdata.AntiNukeWhitelistedUsers.splice(i, 1)
          serverdata.save()

          return new client.embed(
            message, `**${member.tag}** is no longer whitelisted`, 'approve'
          )

        }).catch(async gz => {

          if (member.bot) {

            let i = serverdata.AntiNukeWhitelistedUsers.indexOf(`${member.id}`)
            serverdata.AntiNukeWhitelistedUsers.splice(i, 1)
            serverdata.save()

            return new client.embed(
              message, `**${member.tag}** is no longer whitelisted to join`, 'approve'
            )

          } else if (!member.bot) {

            let i = serverdata.AntiNukeWhitelistedUsers.indexOf(`${member.id}`)
            serverdata.AntiNukeWhitelistedUsers.splice(i, 1)
            serverdata.save()

            return new client.embed(
              message, `**${member.tag}** is now whitelisted and will not trigger **antinuke**`, 'approve'
            )
          }
        })

      } else {

        // IF MEMBER IS IN SERVER CHECK

        await message.guild.members.fetch(member.id).then(async yo => {

          serverdata.AntiNukeWhitelistedUsers.push(member.id)
          serverdata.save()

          return new client.embed(
            message, `**${member.tag}** is now whitelisted and will not trigger **antinuke**`, 'approve'
          )

        }).catch(async gz => {

          if (member.bot) {

            serverdata.AntiNukeWhitelistedUsers.push(member.id)
            serverdata.save()

            return new client.embed(
              message, `**${member.tag}** is now whitelisted and can join`, 'approve'
            )

          } else if (!member.bot) {

            serverdata.AntiNukeWhitelistedUsers.push(member.id)
            serverdata.save()

            return new client.embed(
              message, `**${member.tag}** is now whitelisted and will not trigger **antinuke**`, 'approve'
            )
          }
        })
      }

    } else if (args[0] === 'admin') {

      if (message.author.id !== message.guild.ownerId) {

        return new client.embed(
          message, `You must be the **server owner** to run this command.`, 'warn'
        )
      }

      if (!args[1]) {

        return new client.help(
          message, 
          {
            command: 'antinuke admin',
            description: 'Give a user permissions to edit antinuke settings',
            syntax: `Syntax: ${serverdata.Prefix}antinuke admin (user)`,
            example: ``
          }
        )
      }

      const user = message.mentions.members.first() || message.guild.members.cache.get(args[1]) || message.guild.members.cache.find(mem => String(mem.user.username).toLowerCase().includes(String(args.slice(1).join(' ')).toLowerCase()) || String(mem.displayName).toLowerCase().includes(String(args.slice(1).join(' ')).toLowerCase()) || String(mem.user.tag).toLowerCase().includes(String(args.slice(1).join(' ').toLowerCase())))

      if (!user) {

        return new client.embed(
          message, `I was unable to find a member with the name: **${args.slice(1).join(' ')}**`, 'warn'
        )
      }

      if (serverdata?.AntiNukeWhitelistedAdmins.includes(user.user.id)) {

        let i = serverdata.AntiNukeWhitelistedAdmins.indexOf(`${user.user.id}`)
        serverdata.AntiNukeWhitelistedAdmins.splice(i, 1)
        serverdata.save()

        return new client.embed(
          message, `**${user.user.tag}** is no longer an **antinuke admin** and can no longer edit **antinuke settings**`, 'approve'
        )

      } else {

        serverdata.AntiNukeWhitelistedAdmins.push(user.user.id)
        serverdata.save()

        return new client.embed(
          message, `**${user.user.tag}** is now an **antinuke admin** and can edit **antinuke settings**`, 'approve'
        )
      }

    } else if (args[0] === 'setvanity' || args[0] === 'setvanityurl') {

      if (!serverdata.AntiNukeWhitelistedAdmins.includes(message.author.id) && message.author.id !== message.guild.ownerId) {

        return new client.embed(
          message, `You must be an **antinuke admin** to run this command.`, 'warn'
        )
      }

      return new client.embed(
        message, `As of **December 2022**, bots no longer have the ability to change **vanities** making this command obsolete. The vanity feature will still listen for vanity changes and punish any bad actors but cannot revert your vanity.`, 'warn'
      )

    } else if (args[0] === 'admins') {

      if(!message.member.permissions.has(Discord.PermissionsBitField.Flags.ManageGuild)) {

        return new client.embed(
          message, `You're missing permission: \`manage_guild\``, 'warn'
        )
      }

      const antinukeadmins = serverdata?.AntiNukeWhitelistedAdmins

      if (antinukeadmins.length > 0) {

        const embeds = []
        const array = antinukeadmins.paginate(10)
        var index = 0

        for (const entry of array) {

          const antinuke_admins = entry.reverse().map((item) => {
            return `\`${++index}\` <@${item}>`
          }).join('\n')

          const embed = new Discord.EmbedBuilder()

          .setColor(client.colors.maincolor)
          .setAuthor({ name: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL({ dynamic: true })}`})
          .setTitle('Antinuke admins')
          .setDescription(antinuke_admins)
          .setFooter({ text: `Page 1/1 (${antinukeadmins.length} ${antinukeadmins.length === 1 ? 'entry' : 'entries'})`})

          embeds.push(embed)
        }

        if (embeds.length > 1) {

          await client.pagination(message, embeds, embeds.length, `${antinukeadmins.length} ${antinukeadmins.length === 1 ? 'entry' : 'entries'}`)

        } else {

          return message.channel.send({ embeds: [embeds[0]] })
        }

      } else {

        return new client.embed(
          message, `No **antinuke admins** were found`, 'neutral'
        )
      }

    } else if (args[0] === 'logchannel' || args[0] === 'logs') {

      if (!serverdata.AntiNukeWhitelistedAdmins.includes(message.author.id) && message.author.id !== message.guild.ownerId) {

        return new client.embed(
          message, `You must be an **antinuke admin** to run this command.`, 'warn'
        )
      }

      if (!args[1]) {

        if (serverdata.AntiNukeLogChannel) {

          serverdata.AntiNukeLogChannel = null

          await serverdata.save()

          return new client.embed(
            message, `Removed the **log channel**`, 'approve'
          )

        } else {

          return new client.embed(
            message, `I couldn't find a configured **log channel**`, 'warn'
          )
        }

      } else {

        const logchannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]) || message.guild.channels.cache.find(c => String(c.name.includes(String(args.slice(1).join(' ')))))

        if (!logchannel || logchannel.type !== Discord.ChannelType.GuildText && logchannel.type !== Discord.ChannelType.GuildAnnouncement) {

          return new client.embed(
            message, `I was unable to find a channel with the name: **${args.slice(1).join(' ')}**`, 'warn'
          )
        }

        if (serverdata.AntiNukeLogChannel) {

          serverdata.AntiNukeLogChannel = logchannel.id

          await serverdata.save()

          return message.react('✅')

        } else {

          serverdata.AntiNukeLogChannel = logchannel.id

          await serverdata.save()

          return message.react('✅')
        }
      }

    } else if (args[0] === 'configuration' || args[0] === 'settings' || args[0] === 'config') {

      if(!message.member.permissions.has(Discord.PermissionsBitField.Flags.ManageGuild)) {

        return new client.embed(
          message, `You're missing permission: \`manage_guild\``, 'warn'
        )
      }

      // ANTINUKE TOGGLE

      let antinuketoggle;

      if (serverdata.AntiNukeToggleRole || serverdata.AntiNukeToggleWebhook || serverdata.AntiNukeToggleWebhook || serverdata.AntiNukeToggleBan || serverdata.AntiNukeToggleChannel || serverdata.AntiNukeToggleKick || serverdata.AntiNukeToggleEmoji || serverdata.AntiNukeToggleVanity || serverdata.AntiNukeToggleBot) {
        antinuketoggle = `Antinuke is **enabled** in this server`
      } else {
        antinuketoggle = `Antinuke is **disabled** in this server`
      }

      let logtoggle;

      if (serverdata.AntiNukeLogChannel && client.channels.cache.get(serverdata.AntiNukeLogChannel)) {
        logtoggle = `\n**Configured Log Channel:** <#${serverdata.AntiNukeLogChannel}>`
      } else {
        logtoggle = ``
      }

      // ROLE MODULE

      let antinukeroletoggle;

      if (serverdata.AntiNukeToggleRole) {
        antinukeroletoggle = client.emotes.approve
      } else {
        antinukeroletoggle = client.emotes.deny
      }

      // WEBHOOK MODULE

      let antinukewebhooktoggle;

      if (serverdata.AntiNukeToggleWebhook) {
        antinukewebhooktoggle = client.emotes.approve
      } else {
        antinukewebhooktoggle = client.emotes.deny
      }

      // BAN MODULE

      let antinukebantoggle;

      if (serverdata.AntiNukeToggleBan) {
        antinukebantoggle = client.emotes.approve
      } else {
        antinukebantoggle = client.emotes.deny
      }

      // CHANNEL MODULE

      let antinukechanneltoggle;

      if (serverdata.AntiNukeToggleChannel) {
        antinukechanneltoggle = client.emotes.approve
      } else {
        antinukechanneltoggle = client.emotes.deny
      }

      // KICK MODULE

      let antinukekicktoggle;

      if (serverdata.AntiNukeToggleKick) {
        antinukekicktoggle = client.emotes.approve
      } else {
        antinukekicktoggle = client.emotes.deny
      }

      // EMOJI MODULE

      let antinukeemojitoggle;

      if (serverdata.AntiNukeToggleEmoji) {
        antinukeemojitoggle = client.emotes.approve
      } else {
        antinukeemojitoggle = client.emotes.deny
      }

      // VANITY MODULE

      let antinukevanitytoggle;

      if (serverdata.AntiNukeToggleVanity) {
        antinukevanitytoggle = client.emotes.approve
      } else {
        antinukevanitytoggle = client.emotes.deny
      }

      // BOT MODULE

      let antinukebottoggle;

      if (serverdata.AntiNukeToggleBot) {
        antinukebottoggle = client.emotes.approve
      } else {
        antinukebottoggle = client.emotes.deny
      }

      let array = [serverdata.AntiNukeToggleRole, serverdata.AntiNukeToggleWebhook, serverdata.AntiNukeToggleBan, serverdata.AntiNukeToggleChannel, serverdata.AntiNukeToggleKick, serverdata.AntiNukeToggleEmoji, serverdata.AntiNukeToggleVanity, serverdata.AntiNukeToggleBot]

      let array1 = array.filter((x) => x !== null)

      let array2 = []

      for (const member of serverdata.AntiNukeWhitelistedUsers) {
        
        const mem = await client.users.fetch(client.users.resolveId(member)).catch(() => { })

        if (!mem.bot) {
          array2.push(mem)
        }
      }

      let array3 = []

      for (const member of serverdata.AntiNukeWhitelistedUsers) {
        
        const mem = await client.users.fetch(client.users.resolveId(member)).catch(() => { })

        if (mem.bot) {
          array3.push(mem)
        }
      }

      const embed = new Discord.EmbedBuilder()

      .setColor(client.colors.neutral)
      .setAuthor({ name: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL({ dynamic: true })}` })
      .setTitle('Settings')
      .setDescription(`${antinuketoggle}${logtoggle}`)
      .addFields(
      { name: '**Modules**', value: `**Role Deletion:** ${antinukeroletoggle}\n**Emoji Deletion:** ${antinukeemojitoggle}\n**Mass Member Ban:** ${antinukebantoggle}\n**Mass Member Kick:** ${antinukekicktoggle}\n**Webhook Creation:** ${antinukewebhooktoggle}\n**Channel Creation/Deletion:** ${antinukechanneltoggle}\n**Vanity Protection:** ${antinukevanitytoggle}`, inline: true },
      { name: '**General**', value: `**Super Admins:** ${serverdata.AntiNukeWhitelistedAdmins.length}\n**Whitelisted Bots:** ${array3.length}\n**Whitelisted Members:** ${array2.length}\n**Protection Modules:** ${array1.length} enabled\n**Watch Permission Grant:** ${serverdata.AntiNukePermissionGrants.length}/11 perms\n**Watch Permission Remove:** ${serverdata.AntiNukePermissionRemoves.length}/11 perms\n**Deny Bot Joins (botadd):** ${antinukebottoggle}`, inline: true } 
      )

      return message.channel.send({ embeds: [embed] })

    } else if (args[0] === 'list') {

      if (!serverdata.AntiNukeWhitelistedAdmins.includes(message.author.id) && message.author.id !== message.guild.ownerId) {

        return new client.embed(
          message, `You must be an **antinuke admin** to run this command.`, 'warn'
        )
      }

      if (serverdata.AntiNukeToggleRole || serverdata.AntiNukeToggleWebhook || serverdata.AntiNukeToggleWebhook || serverdata.AntiNukeToggleBan || serverdata.AntiNukeToggleChannel || serverdata.AntiNukeToggleKick || serverdata.AntiNukeToggleEmoji || serverdata.AntiNukeToggleVanity || serverdata.AntiNukeToggleBot || serverdata.AntiNukeWhitelistedUsers.length > 0 || serverdata.AntiNukeWhitelistedAdmins.length > 0) {

        const array = []

        // BAN

        if (serverdata.AntiNukeToggleBan) {
          array.push(`**ban** (do: ${serverdata.AntiNukeBanPunishment}, threshold: ${serverdata.AntiNukeBanThreshold})`)
        }

        // KICK

        if (serverdata.AntiNukeToggleKick) {
          array.push(`**kick** (do: ${serverdata.AntiNukeKickPunishment}, threshold: ${serverdata.AntiNukeKickThreshold})`)
        }

        // ROLE

        if (serverdata.AntiNukeToggleRole) {
          array.push(`**role** (do: ${serverdata.AntiNukeRolePunishment}, threshold: ${serverdata.AntiNukeRoleThreshold})`)
        }

        // CHANNEL

        if (serverdata.AntiNukeToggleChannel) {
          array.push(`**channel** (do: ${serverdata.AntiNukeChannelPunishment}, threshold: ${serverdata.AntiNukeChannelThreshold})`)
        }

        // EMOJI

        if (serverdata.AntiNukeToggleEmoji) {
          array.push(`**emoji** (do: ${serverdata.AntiNukeEmojiPunishment}, threshold: ${serverdata.AntiNukeEmojiThreshold})`)
        }

        // WEBHOOK

        if (serverdata.AntiNukeToggleWebhook) {
          array.push(`**webhook** (do: ${serverdata.AntiNukeWebhookPunishment}, threshold: ${serverdata.AntiNukeWebhookThreshold})`)
        }

        // VANITY

        if (serverdata.AntiNukeToggleVanity) {
          array.push(`**vanity** (do: ${serverdata.AntiNukeVanityPunishment})`)
        }

        // BOT

        if (serverdata.AntiNukeToggleBot) {
          array.push(`**botadd** (do: ${serverdata.AntiNukeBotPunishment})`)
        }

        let status;

        for (const member of serverdata.AntiNukeWhitelistedUsers) {

          const mem = await client.users.fetch(client.users.resolveId(member)).catch(() => { })

          if (mem.bot) {
            status = 'BOT'
          } else {
            status = 'MEMBER'
          }
          
          array.push(`**${mem.tag ? mem.tag : 'Unknown User'}** whitelisted (\`${mem.id}\`) [\`${status}\`]`)
        }

        const embeds = []
        const listarray = array.paginate(10)
        var index = 0

        for (const entry of listarray) {

          const antinukemodules_whitelist = entry.map((item) => {
            return `\`${++index}\` ${item}`
          }).join('\n')

          const embed = new Discord.EmbedBuilder()

          .setColor(client.colors.maincolor)
          .setAuthor({ name: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL({ dynamic: true })}` })
          .setTitle('Antinuke modules & whitelist')
          .setDescription(antinukemodules_whitelist)
          .setFooter({ text: `Page 1/1 (${array.length} ${array.length === 1 ? 'entry' : 'entries'})` })

          embeds.push(embed)
        }

        if (embeds.length > 1) {

          await client.pagination(message, embeds, embeds.length, `${array.length} ${array.length === 1 ? 'entry' : 'entries'}`)

        } else {

          return message.channel.send({ embeds: [embeds[0]] })
        }

      } else {

        return new client.embed(
          message, `No **antinuke modules** or **whitelisted members & bots** were found`, 'neutral'
        )
      }

    } else {

      if (!serverdata.AntiNukeWhitelistedAdmins.includes(message.author.id) && message.author.id !== message.guild.ownerId) {

        return new client.embed(
          message, `You must be an **antinuke admin** to run this command.`, 'warn'
        )
      }

      return new client.help(
        message, 
          {
          command: 'antinuke',
          description: 'Antinuke to protect your server',
          syntax: `Syntax: ${serverdata.Prefix}antinuke (subcommand) <args>`,
          example: `Example: ${serverdata.Prefix}antinuke ban on --do ban`
        }
      )
    }
  }
}