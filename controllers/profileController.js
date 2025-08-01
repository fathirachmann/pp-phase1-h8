const formatRupiah = require('../helpers/formatRupiah');
const QRCode = require('qrcode');
const {User, UserProfile} = require('../models/index');
const { validate } = require('./indexController');
const port = require('../app');

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
            const route = `https://localhost:${port}/profiles/${id}/topup`
            const qrImage = await QRCode.toDataURL(route)
            let profile = await UserProfile.findByPk(id)
            res.render('topup', {profile, req, qrImage})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    static async postTopUp(req, res) {
        try {
            const {id} = req.params
            const {balance} = req.body
            if (balance < 10000) {
                throw new Error('Top up minimum amount is Rp. 10.000,00')
            }
            let data = await UserProfile.findByPk(id)
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