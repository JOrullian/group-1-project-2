const router = require('express').Router();
const { User, Event, Group } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const eventList = await Event.findAll();

    const events = eventList.map((event) => event.get({ plain: true }));
    res.status(200).json(events);

    console.log(events);

    // res.render('dashboard', { events });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/event/:id', async (req, res) => {
  try {
    const eventData = await Event.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const events = await eventData.get({ plain: true });

    res.json(events, )
    //     {
    //   logged_in: req.session.logged_in
    // });
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
