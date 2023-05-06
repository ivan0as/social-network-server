const { Likes, Post } = require('../models/models')
const ApiError = require('../error/ApiError')
const giveUserId = require('../middleware/giveUserIdMiddleware')
const status = require('../middleware/statusMiddleware')

class LikesController {

    async create(req, res, next) {
        try {
            const userId = giveUserId(req)
            const { postId } = req.params

            const likes = await Likes.findOne({
                where: {userId, postId}
            })

            if (likes) {
                return next(ApiError.badRequest('Вы уже поставили лайк'))
            }

            const likeCreate = await Likes.create({ postId, userId })

            const response = status(likeCreate)
            return res.json(response)

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const userId = giveUserId(req)

            const likes = await Likes.findAndCountAll({
                where: {postId: req.params.postId}
            })

            if (likes.rows.find(item => item.userId === userId)) {
                likes.likeCheck = true
            } else {
                likes.likeCheck = false
            }

            const response = status(likes)
            return res.json(response)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const userId = giveUserId(req)
            const { postId } = req.params

            const likes = await Likes.findOne({
                where: {userId, postId}
            })

            if (!likes) {
                return next(ApiError.badRequest('Лайк не найден'))
            }

            const deleteLike = await Likes.destroy({
                where: {userId, postId}
            })
            const response = status(deleteLike)
            return res.json(response)

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

}

module.exports = new LikesController()