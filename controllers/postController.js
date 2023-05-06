const uuid = require('uuid')
const path = require('path')
const { Post, Friends, User } = require('../models/models')
const ApiError = require('../error/ApiError')
const giveUserId = require('../middleware/giveUserIdMiddleware')
const { Op } = require("sequelize")
const status = require('../middleware/statusMiddleware')

class PostController {

    async create(req, res, next) {
        try {

            const userId = giveUserId(req)
            const { text } = req.body
            let img
            let fileName = null
            if (req.files) {
                img = req.files.img
                fileName = uuid.v4() + ".jpg"
                img.mv(path.resolve(__dirname, '..', 'static', fileName))
            }

            const post = await Post.create({ text, userId, img: fileName })

            const response = status(post)
            return res.json(response)

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params
            const post = await Post.findAll({
                where: {userId: id}
            })
            const response = status(post)
            return res.json(response)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAllPostFriends(req, res, next) {
        try {
            const userId = giveUserId(req)
            
            const friends = await Friends.findAll({
                include: [
                    {
                        model: User,
                        as: 'user'
                    },
                    {
                        model: User,
                        as: 'user2'
                    },
                ],
                where: {
                    [Op.or]: [
                      { userId },
                      { user2Id: userId }
                    ]
                }
            })

            const idFriends = []

            friends.map(friend => {
                if (userId !== friend.user.id) {
                    idFriends.push(friend.user.id)
                } else {
                    idFriends.push(friend.user2.id)
                }
            })

            const post = await Post.findAll({
                where: {userId: idFriends}
            })

            const response = status(post)
            return res.json(response)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new PostController()