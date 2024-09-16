const router = require("express").Router();
const { User, Event, Group } = require("../models");
const withAuth = require("../utils/auth");
const dotenv = require("dotenv");

dotenv.config();

// Serve Google API key for client-side use
router.get("/api-key", (req, res) => {
  res.json({ apiKey: process.env.GOOGLE_API_KEY });
});

// Dashboard route (withAuth middleware for protection)
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // Pull list of events for dashboard
    const eventList = await Event.findAll();
    const events = eventList.map((event) => event.get({ plain: true }));

    res.render("dashboard", { events, logged_in: req.session.logged_in });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Signup walkthrough route
router.get("/signup-walkthrough", async (req, res) => {
  try {
    res.render("signup-walkthrough");
  } catch (error) {
    res.status(500).json(error);
  }
});

// Explore route, protected by withAuth middleware
router.get("/explore", withAuth, async (req, res) => {
  try {
    res.render("explore", { logged_in: req.session.logged_in });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Profile route
router.get("/profile", withAuth, async (req, res) => {
  try {
    // Find the logged-in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    });

    const user = userData.get({ plain: true });

    res.render("profile", { ...user, logged_in: true });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Fetch and render a specific event by ID
router.get("/event/:id", async (req, res) => {
  try {
    const eventData = await Event.findByPk(req.params.id);

    if (!eventData) {
      return res.status(404).json({ message: "Event not found!" });
    }

    const event = eventData.get({ plain: true });
    res.render("event", { ...event, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render the 'createEvent' view (withAuth protection)
router.get("/createEvent", withAuth, (req, res) => {
  res.render("createEvent", { logged_in: req.session.logged_in });
});

// Login route
router.get("/login", (req, res) => {
  // If the user is already logged in, redirect them to the dashboard
  if (req.session.logged_in) {
    return res.redirect("/dashboard");
  }

  res.render("login");
});

module.exports = router;
