const router = require("express").Router();
const { User } = require("../../models");

router.post("/", async (req, res) => {
  // Create new user
  try {
    const userData = await User.create(req.body);

    // Log the user in
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  // Log the user in
  try {
    const userData = await User.findOne({ where: { email: req.body.username } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/check-login", (req, res) => {
  if (req.session.logged_in) {
    res.status(200).json({ logged_in: true });
  } else {
    res.status(200).json({ logged_in: false });
  }
});

router.post("/set-geolocation", (req, res) => {
  // Set users location
  const { latitude, longitude } = req.body;

  if (req.session) {
    req.session.geolocation = { latitude, longitude };
    res.status(200).json({ message: "Geolocation data set in session cookie" });
  } else {
    res.status(400).json({ message: "Session not available" });
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
