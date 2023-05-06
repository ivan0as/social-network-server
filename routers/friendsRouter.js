const Router = require('express')
const router = new Router()
const friendsController = require('../controllers/friendsController')

router.get('/', friendsController.getAll)
router.delete('/:id', friendsController.deleteFriend)

module.exports = router