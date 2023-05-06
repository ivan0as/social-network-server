const { ConfirmFriend, User, Friends } = require('../models/models')
const ApiError = require('../error/ApiError')
const giveUserId = require('../middleware/giveUserIdMiddleware')
const status = require('../middleware/statusMiddleware')

class ConfirmFriendController {

    async getAll(req, res, next) {
        try {

            const user2Id = giveUserId(req)

            const confirmFriend = await ConfirmFriend.findAll({
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
                where:{user2Id}
            })
            
            const response = status(confirmFriend)
            return res.json(response)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async request(req, res, next) {
        try {

            const { user2Id } = req.body

            const userId = giveUserId(req)

            const application1 = await ConfirmFriend.findOne({where: {
                userId,
                user2Id
            }})

            const application2 = await ConfirmFriend.findOne({where: {
                userId: user2Id,
                user2Id: userId
            }})

            if (application1 || application2) {
                return next(ApiError.badRequest('Заявка уже есть'))
            }

            const friend1 = await Friends.findOne({where: {
                userId,
                user2Id
            }})

            const friend2 = await Friends.findOne({where: {
                userId: user2Id,
                user2Id: userId
            }})

            if (friend1 || friend2) {
                return next(ApiError.badRequest('Вы уже друзья'))
            }
            
            const confirmFriend = await ConfirmFriend.create({userId, user2Id})

            const {id} = confirmFriend

            const confirmFriendResult = await ConfirmFriend.findOne({
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
                where:{id}
            })

            const response = status(confirmFriendResult)
            return res.json(response)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async acceptance(req, res, next) {
        try {

            const { id } = req.params

            const userId = giveUserId(req)

            const application = await ConfirmFriend.findOne({where: {id}})
            
            if (!(userId === application.userId || userId === application.user2Id)) {
                return next(ApiError.badRequest('Не имеете доступа'))
            }

            if (!userId === application.user2Id) {
                return next(ApiError.badRequest('Не имеете доступа'))
            }

            const friend1 = await Friends.findOne({where: {
                userId,
                user2Id: application.user2Id
            }})

            const friend2 = await Friends.findOne({where: {
                userId: application.user2Id,
                user2Id: userId
            }})

            if (friend1 || friend2) {
                return next(ApiError.badRequest('Вы уже друзья'))
            }

            const friend = await Friends.create({userId: application.userId, user2Id: userId})

            const friendId = friend.id

            const friendResult = await Friends.findOne({
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
                where:{id: friendId}
            })
            

            const deleteFriend = await ConfirmFriend.destroy({
                where: {id}
            })

            const response = status(friendResult)
            return res.json(response)
            
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new ConfirmFriendController()