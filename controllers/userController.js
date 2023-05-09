const uuid = require('uuid')
const path = require('path')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { Op } = require('sequelize')
const { User, City, University } = require('../models/models')
const ApiError = require('../error/ApiError')
const status = require('../middleware/statusMiddleware')

const generateJwt = (id, login, name, age, cityId, universityId, img) => {
    return jwt.sign(
        {id, login, name, age, cityId, universityId, img}, 
        process.env.SECRET_KEY,
        {expiresIn:'24h'}
    )
}

const tokenUser = (token, user) => {
    return response = {
        token: token,
        user: user
    }
}

class UserController {

    async registration(req, res, next) {
        try {
            const {login, password, name, age, cityId, universityId} = req.body
            const {img} = req.files

            const candidate = await User.findOne({where: {login}})
            if (candidate) {
                return next(ApiError.badRequest('Пользователь с таким логином уже существует'))
            }

            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            
            const hashPassword = await bcrypt.hash(password, 5)
            const user = await User.create({ login, password: hashPassword, name, age, cityId, universityId, img: fileName })
            const token = generateJwt(user.id, user.login, user.name, user.name, user.age, user.cityId, user.universityId, user.img)
            const userData = tokenUser(token, user)
            const response = status(userData)
            return res.json(response)

        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async login(req, res, next) {
        try {
            const {login, password} = req.body
            const user = await User.findOne({where: {login}})
            if (!user) {
                return next(ApiError.internal('Пользователь не найден'))
            }
            let comparePassword = bcrypt.compareSync(password, user.password)
            if (!comparePassword) {
                return next(ApiError.internal('Указанный пароль не верен'))
            }
            const token = generateJwt(user.id, user.login)
            const userData = tokenUser(token, user)
            const response = status(userData)
            return res.json(response)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async check(req, res, next) {
        try {
            const token = generateJwt(req.user.id, req.user.login, req.user.name, req.user.name, req.user.age, req.user.cityId, req.user.universityId, req.user.img)
            const user = await User.findOne({
                where: {id: req.user.id}
            })
            const userData = tokenUser(token, user)
            const response = status(userData)
            return res.json(response)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            let { name } = req.query
            const arrAdditionalVariables = {
                name: { [Op.iLike]: `%${name}%` }
            }

            if (!name) {
                delete arrAdditionalVariables.name
            }

            let user

            if (arrAdditionalVariables) {
                user = await User.findAndCountAll({
                    include: [
                        {
                            model: City
                        },
                        {
                            model: University
                        },
                    ],
                    where:arrAdditionalVariables
                })
            }
    
            const response = status(user)
            return res.json(response)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params
            const user = await User.findOne({
                include: [
                    {
                        model: City
                    },
                    {
                        model: University
                    },
                ],
                where: {id}
            })
            const response = status(user)
            return res.json(response)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new UserController()
