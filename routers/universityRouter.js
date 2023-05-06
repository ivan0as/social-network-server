const Router = require('express')
const router = new Router()
const universityController = require('../controllers/universityController')

router.get('/', universityController.getAll)
router.get('/:id', universityController.getOne)

module.exports = router