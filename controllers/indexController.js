const { User } = require("../models/index");
const bcryptjs = require("bcryptjs");

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
      const { err } = req.query
      res.render("login", { err} );
    } catch (err) {
      console.log(err, "from login indexController");
      res.send(err);
    }
  }

  static async postLogin(req, res) {
    try {
      const { email, password } = req.body;

      let user = await User.findOne({ where: { email } });
      // console.log("User result:", user);

      if (user) {
        const isValidPassword = bcryptjs.compareSync(password, user.password);

        // if pwd is correct to login page
        if (isValidPassword) {
          //adding req.session to leave the trace
          // set in controller login > where to check ? in router after login, global MW
          // userId is the name we can create
          req.session.userId = user.id
          req.session.role = user.role
          console.log(req.session, "req session fr controller");
          return res.redirect("/products"); 
          // if userpwd is incorrect redirect to login
        } else {
          const err = "Your email / password is invalid.";
          return res.redirect(`/login?err=${err}`);
        }
        // if useremail not in DB
      } else {
        const err = "Your email / password is invalid.";
        return res.redirect(`/login?err=${err}`);
      }
    } catch (err) {
      console.log(err, "from postLogin indexController");
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

  // role admin is not allowed on the form by default, role is defaulted to user using hooks in models/user
  static async validate(req, res) {
    try {
      const { username, email, password, role } = req.body;
      // const { username, email, password} = req.body;
      let newUser = await User.create({ username, email, password, role });

      res.redirect("/login");
    } catch (err) {
      console.log(err, "from validate indexController");
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
