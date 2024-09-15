const router = require("express").Router();
const { User } = require("../../models");
const withAuth = require("../../utils/auth");

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

// router.post("/profile", async (req, res) => {
//   // Create new user
//   try {
//     const userData = await User.create(req.body);

//     // Log the user in
//     req.session.save(() => {
//       req.session.user_id = userData.id;
//       req.session.logged_in = true;

//       res.status(200).json(userData);
//     });
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

router.post("/login", async (req, res) => {
  // Log the user in
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

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

      res.json({ message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed due to server error", error: err });
  }
});

router.get("/check-login", (req, res) => {
  if (req.session.logged_in === true) {
    res.status(200).json({ logged_in: true });
  } else {
    res.status(401).json({ logged_in: false });
  }
});

router.post("/set-geolocation", (req, res) => {
  // Set users location
  const { latitude, longitude } = req.body;

  if (req.session && req.session.logged_in) {
    req.session.geolocation = { latitude, longitude };
    res.status(200).json({ message: "Geolocation data set in session cookie" });
  } else {
    res.status(400).json({ message: "Session not available" });
  }
});

router.get("/geolocation", async (req, res) => {
  if (req.session && req.session.geolocation) {
    res.status(200).json(req.session.geolocation);
    console.log(req.session);
  } else {
    res.status(404).json({ message: "Geolocation not found in session" });
  }
});

router.delete("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {

      res.status(204).send();
    });
  } else {
    res.status(404).send();
  }
});

module.exports = router;
