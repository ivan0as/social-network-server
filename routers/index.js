const Router = require('express')
const router = new Router()
const cityRouter = require('./cityRouter')
const confirmFriendRouter = require('./confirmFriendRouter')
const dialogsRouter = require('./dialogsRouter')
const friendsRouter = require('./friendsRouter')
const likesRouter = require('./likesRouter')
const messagesRouter = require('./messagesRouter')
const postRouter = require('./postRouter')
const universityRouter = require('./universityRouter')
const userRouter = require('./userRouter')

router.use('/city', cityRouter)
router.use('/confirmFriend', confirmFriendRouter)
router.use('/dialogs', dialogsRouter)
router.use('/friends', friendsRouter)
router.use('/likes', likesRouter)
router.use('/messages', messagesRouter)
router.use('/post', postRouter)
router.use('/university', universityRouter)
router.use('/user', userRouter)

module.exports = router








