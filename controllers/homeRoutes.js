const router = require('express').Router();
const { User, Event, Group, EventListing } = require('../models');
const withAuth = require('../utils/auth');

// Pull list of events for dashboard
router.get('/', async (req, res) => {
  try {
    const eventList = await Event.findAll({
    });

    const events = eventList.map((event) => event.get({ plain: true }));

    res.status(200).json(events)

    //Will need to render to dashboard once the handlebars views are created

  } catch (err) {
    res.status(500).json(err);
  }
});

// Pull specific event that user selects
router.get('/event/:id', async (req, res) => {
  try {
    const eventData = await Event.findByPk(req.params.id);

    const events = await eventData.get({ plain: true });

    res.json(events)
    //     {
    //   logged_in: req.session.logged_in
    // });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
