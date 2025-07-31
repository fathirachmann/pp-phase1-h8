const {User, UserProfiles} = require('../models/index');

class Controller {
    static async getProfile(req, res) {
        try {
            const {id} = req.params
            let profileData = await UserProfiles.findByPk(id, {
                include: User
            })
            res.render('profile', {profileData})
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