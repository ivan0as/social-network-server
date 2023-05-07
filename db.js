const {Sequelize} = require('sequelize')

module.exports = new Sequelize('postgresql://postgres:4PdiVExhHd9z2fpy5rKG@containers-us-west-45.railway.app:6091/railway')

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
