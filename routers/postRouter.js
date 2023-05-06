const Router = require('express')
const router = new Router()
const postController = require('../controllers/postController')

router.post('/', postController.create)
router.get('/:id', postController.getOne)
router.get('/', postController.getAllPostFriends)

module.exports = router