module.exports = {
  client: 'mysql',
  connection: {
    database: 'campfire',
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD
  }
}
