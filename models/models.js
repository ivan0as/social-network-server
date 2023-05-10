const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define ('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    name: {type: DataTypes.STRING, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
    age: {type: DataTypes.INTEGER, allowNull: false},
})

const City = sequelize.define('city', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const University = sequelize.define('university', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Post = sequelize.define('post', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text: {type: DataTypes.TEXT, allowNull: false},
    img: {type: DataTypes.STRING},
})

const Likes = sequelize.define('likes', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Friends = sequelize.define('friends', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const ConfirmFriend = sequelize.define('confirm_friend', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Dialogs = sequelize.define('dialogs', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Messages = sequelize.define('messages', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text: {type: DataTypes.STRING, allowNull: false},
})

City.hasMany(User)
User.belongsTo(City)

University.hasMany(User)
User.belongsTo(University)

User.hasMany(Post)
Post.belongsTo(User)

Post.hasMany(Likes)
Likes.belongsTo(Post)

User.hasMany(Likes)
Likes.belongsTo(User)

User.hasMany(Friends)
Friends.belongsTo(User, {as: 'user'})

User.hasMany(Friends)
Friends.belongsTo(User, {as: 'user2'})

User.hasMany(ConfirmFriend)
ConfirmFriend.belongsTo(User, {as: 'user'})

User.hasMany(ConfirmFriend)
ConfirmFriend.belongsTo(User, {as: 'user2'})

User.hasMany(Dialogs)
Dialogs.belongsTo(User, {as: 'user'})

User.hasMany(Dialogs)
Dialogs.belongsTo(User, {as: 'user2'})

User.hasMany(Messages)
Messages.belongsTo(User)

Dialogs.hasMany(Messages)
Messages.belongsTo(Dialogs)

module.exports = {
    User,
    City,
    University,
    Post,
    Likes,
    Friends,
    ConfirmFriend,
    Dialogs,
    Messages,
}
