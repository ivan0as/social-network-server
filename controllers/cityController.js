const { City } = require('../models/models')
const ApiError = require('../error/ApiError')
const status = require('../middleware/statusMiddleware')

class CityController {

    async getAll(req, res, next) {
        try {
            const city = await City.findAll()
            const response = status(city)
            return res.json(response)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params
            const city = await City.findOne({
                where: {id}
            })
            const response = status(city)
            return res.json(response)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new CityController()