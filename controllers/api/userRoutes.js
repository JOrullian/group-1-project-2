const router = require("express").Router();
const { User } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", async (req, res) => {
  try{
    const allUsers = await User.findAll();
    res.json(allUsers);
  } catch (err) {
    res.status(400).json(err);
  }

});

// Create new user
router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json({ message: "Error creating user", error: err });
  }
});

// Log the user in
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    if (!userData) {
      return res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      return res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ message: "You are now logged in!" });
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Login failed due to server error", error: err });
  }
});

// Check login status
router.get("/check-login", (req, res) => {
  if (req.session.logged_in) {
    res.status(200).json({ logged_in: true });
  } else {
    res.status(401).json({ logged_in: false });
  }
});

// Set user's geolocation
router.post("/set-geolocation", (req, res) => {
  const { latitude, longitude } = req.body;

  if (req.session && req.session.logged_in) {
    req.session.geolocation = { latitude, longitude };
    res.status(200).json({ message: "Geolocation data set in session" });
  } else {
    res
      .status(401)
      .json({ message: "You need to be logged in to set geolocation" });
  }
});

// Get user's geolocation
router.get("/geolocation", (req, res) => {
  if (req.session && req.session.geolocation) {
    res.status(200).json(req.session.geolocation);
  } else {
    res.status(404).json({ message: "Geolocation not found in session" });
  }
});

// Log the user out
router.delete("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).send();
    });
  } else {
    res.status(404).json({ message: "No active session to log out from" });
  }
});

module.exports = router;
