const Router = require('express')
const router = new Router()
const confirmFriendController = require('../controllers/confirmFriendController')

router.get('/', confirmFriendController.getAll)
router.post('/request_friendship', confirmFriendController.request)
router.post('/acceptance/:id', confirmFriendController.acceptance)

module.exports = router