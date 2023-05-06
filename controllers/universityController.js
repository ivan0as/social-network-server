const { University } = require('../models/models')
const ApiError = require('../error/ApiError')
const status = require('../middleware/statusMiddleware')

class UniversityController {

    async getAll(req, res, next) {
        try {
            const university = await University.findAll()
            const response = status(university)
            return res.json(response)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params
            const university = await University.findOne({
                where: {id}
            })
            const response = status(university)
            return res.json(response)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new UniversityController()