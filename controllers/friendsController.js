const { Friends, User } = require('../models/models')
const ApiError = require('../error/ApiError')
const giveUserId = require('../middleware/giveUserIdMiddleware')
const { Op } = require("sequelize")
const status = require('../middleware/statusMiddleware')

class FriendsController {

    async getAll(req, res, next) {
        try {
            const userId = giveUserId(req)
            
            const friend = await Friends.findAll({
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

            const response = status(friend)
            return res.json(response)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async deleteFriend(req, res, next) {
        try {
            const { id } = req.params

            const userId = giveUserId(req)

            const friend = await Friends.findOne({
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
                where: {id}
            })

            if (!((userId === friend.user.id) || (userId === friend.user2.id))) {
                return next(ApiError.badRequest('Не правильный запрос'))
            }
            
            const deleteFriend = await Friends.destroy({
                where: {id}
            })
            const response = status(deleteFriend)
            return res.json(response)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new FriendsController()