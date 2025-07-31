const formatRupiah = require('../helpers/formatRupiah');
const {User, UserProfile} = require('../models/index');

class Controller {
    static async getProfile(req, res) {
        try {
            const {id} = req.params
            let profileData = await UserProfile.findByPk(id, {
                include: User
            })
            console.log(profileData);
            res.render('profile', {profileData, formatRupiah})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    static async postProfile(req, res) {
        try {
            const {id} = req.params
            res.redirect(`/profiles/${id}`)
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
}

module.exports = Controller