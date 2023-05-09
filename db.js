const {Sequelize} = require('sequelize')

module.exports = new Sequelize('postgresql://postgres:CpJ2xxUW9RW6TBq7L2ne@containers-us-west-180.railway.app:6132/railway')

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
