const router = require('express').Router();
const { User, Event, Group } = require('../models');
const withAuth = require('../utils/auth');

// Pull list of events for dashboard
router.get('/', withAuth, async (req, res) => {
  try {
    const eventList = await Event.findAll();

    const events = eventList.map((event) => event.get({ plain: true }));

    res.status(200).json(events);

    console.log(events);

    // res.render('dashboard', { events, logged_in: req.session.logged_in });

  } catch (err) {
    res.status(500).json(err);
  }
});

// Pull specific event that user selects
router.get('/event/:id', withAuth, async (req, res) => {
  try {
    const eventData = await Event.findByPk(req.params.id);

    if (!eventData) {
      res.status(404).json({ message: 'Event not found!' });
    }
    const event = await eventData.get({ plain: true });

    // res.render('event', { event, logged_in: req.session.logged_in });

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
