const {Sequelize} = require('sequelize')

module.exports = new Sequelize('postgres://fjaiixrp:9b4Jq-NTVu8S8306d7iWZU9AZIP0fvSu@lallah.db.elephantsql.com/fjaiixrp')

// module.exports = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASSWORD,
//     {
//         dialect: 'postgres',
//         host: process.env.DB_HOST,
//         port: process.env.DB_PORT,
//     }
// )
