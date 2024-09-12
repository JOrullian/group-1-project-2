const router = require('express').Router();
const { User, Event, Group } = require('../models');
const withAuth = require('../utils/auth');
const dotenv = require('dotenv');

dotenv.config();

router.get('/api-key', (req, res) => {
  res.json({ apiKey: process.env.GOOGLE_API_KEY });
});

// Pull list of events for dashboard
router.get('/', async (req, res) => {
  try {
    const eventList = await Event.findAll();

    const events = eventList.map((event) => event.get({ plain: true }));

    // res.status(200).json(events);

    console.log(events);

    res.render('dashboard', { events, logged_in: req.session.logged_in });

  } catch (err) {
    res.status(500).json(err);
  }
});

// Pull specific event that user selects
router.get('/event/:id', async (req, res) => {
  try {
    const eventData = await Event.findByPk(req.params.id);

    if (!eventData) {
      res.status(404).json({ message: 'Event not found!' });
    }
    const event = await eventData.get({ plain: true });

    res.render('event', { ...event, logged_in: req.session.logged_in });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
})

module.exports = router;
