const Router = require('express')
const router = new Router()
const likesController = require('../controllers/likesController')

router.post('/:postId', likesController.create)
router.get('/:postId', likesController.getOne)
router.delete('/:postId', likesController.delete)

module.exports = router