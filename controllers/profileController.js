const formatRupiah = require('../helpers/formatRupiah');
const {User, UserProfile} = require('../models/index');
const { validate } = require('./indexController');

class Controller {
    static async getProfile(req, res) {
        try {
            const {id} = req.params
            let profileData = await UserProfile.findByPk(id, {
                include: User
            })
            console.log(profileData);
            res.render('profile', {profileData, formatRupiah, req})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    static async postProfile(req, res) {
        try {
            const {id} = req.params
            const {username, name, email, password, address, imageProfile} = req.body
            await User.update({username, email, password}, {where: id, validate: false}, )
            await UserProfile.update({name, address, imageProfile}, {where: id})
            res.redirect(`/profiles/${id}`)
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    static async getTopUp(req, res) {
        try {
            const {id} = req.params
            res.render('topup', req)
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    static async postTopUp(req, res) {
        try {
            const {id} = req.params
            const {balance} = req.body
            data = await UserProfile.findByPk(id)
            await data.increment({
                balance: balance
            })
            res.redirect(`/profiles/${id}`)
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
}

module.exports = Controller