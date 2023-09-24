console.clear()
const client = new (require('./source/client.js'))()

client.database()
client.connect(client.token) // LOG IN TOKEN

process.on('unhandledRejection', (error, promise) => {

  console.log(promise)
  console.log(error.stack)
})

process.on('uncaughtException', (err, origin) => {

  console.log(origin)
  console.log(err.stack)
})

process.on('uncaughtExceptionMonitor', (err, origin) => {

  console.log(origin)
  console.log(err.stack)
})

module.exports = client.client