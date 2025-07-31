const { User } = require("../models/index");

class indexController {
  static async home(req, res) {
    try {
      res.render("homePage");
    } catch (err) {
      console.log(err, "from homePage indexController");
      res.send(err);
    }
  }

  static async login(req, res) {
    try {
      res.render("login");
    } catch (err) {
      console.log(err, "from login indexController");
      res.send(err);
    }
  }

  static async validate(req, res) {
    try {
      res.render("login");
    } catch (err) {
      console.log(err, "from validate indexController");
      res.send(err);
    }
  }

  static async signup(req, res) {
    try {
      res.render("signup");
    } catch (err) {
      console.log(err, "from signup indexController");
      res.send(err);
    }
  }

  static async logout(req, res) {
    try {
      req.session.destroy();
      res.render("/");
    } catch (err) {
      console.log(err, "from logout indexController");
      res.send(err);
    }
  }
}

module.exports = indexController;
