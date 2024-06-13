const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

// Middleware to authenticate user
const authenticateUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      // req.flash("error_msg", "Incorrect username or password");
      return res.redirect("/users/login");
    }

    // if (!bcrypt.compareSync(password, user.password)) {
    //   req.flash("error_msg", "Incorrect username or password");
    //   return res.redirect("/users/login");
    // }
    // req.session.user = user;
    // req.flash("success_msg", "Logged in successfully");

    bcrypt.compare(user.password, password, (err, data) => {
      //if error than throw error
      if (err) throw err;
      console.log(data);

      //if both match than you can do anything
      if (data) {
        req.session.user = user;
        // req.user = user;
        // req.flash("success_msg", "Logged in successfully");
        // return res.status(200).json({ msg: "Login success" });
        next();
      } else {
        return res.status(401).json({ msg: "Invalid credencial" });
        // req.flash("error_msg", "Incorrect username or password");
        // return res.redirect("/users/login");
      }
    });

    // const isMatch = await bcrypt.compare(password, user.password);
    // if (isMatch) {
    //   req.flash("error_msg", "Incorrect username or password");
    //   return res.redirect("/users/login");
    // }
    // req.session.user = user;
    // req.flash("success_msg", "Logged in successfully");
    // Call next middleware or route handler
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

// Route to render registration form
router.get("/register", (req, res) => {
  res.render("register");
});

// Route to handle registration form submission
router.post("/register", async (req, res) => {
  const { username, password, password2 } = req.body;
  let errors = [];

  if (!username || !password || !password2) {
    errors.push({ msg: "Please fill in all fields" });
  }
  if (password !== password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  if (password.length < 6) {
    errors.push({ msg: "Password should be at least 6 characters" });
  }

  if (errors.length > 0) {
    res.render("register", { errors, username, password, password2 });
  } else {
    try {
      const user = await User.findOne({ username: username });
      if (user) {
        errors.push({ msg: "Username already exists" });
        res.render("register", { errors, username, password, password2 });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        req.flash("success_msg", "You are now registered and can log in");
        res.redirect("/users/login");
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }
});

// Route to render login form
router.get("/login", (req, res) => {
  res.render("login");
});

// Route to handle login form submission
router.post("/login", authenticateUser, (req, res) => {
  // res.send(req.session.user);
  res.redirect("/portal");
});

// Route to handle logout
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      req.flash("success_msg", "You are logged out");
      res.redirect("/users/login");
    }
  });
});

module.exports = router;
