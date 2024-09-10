const router = require('express').Router();

const { Event } = require('../../models');

router.post('/', async (req, res) => {
    // Create a new event
  try {
    const eventData = await Event.create(req.body, {
      user_id: req.session.user_id,}
    );
    res.status(200).json(eventData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
    // Update event location, time and/or name
    try {
        const eventData = await Event.update(
            {
                location: req.body.location,
                time: req.body.time,
                name: req.body.name,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put("/:id/join", async (req, res) => {
  try {
    // Find the event by ID
    const event = await Event.findByPk(req.params.id);

    if (!event) {
      res.status(404).json({ message: "Event not found!" });
      return;
    }

    // Check if the user is already part of the event
    if (event.participants.includes(req.sessionStore.user_id)) {
      res.status(400).json({ message: "You have already joined this event!" });
      return;
    }

    // Add the user to the participants list
    event.participants.push(req.session.user_id);
    await event.save();

    res
      .status(200)
      .json({ message: "You have successfully joined the event!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // Delete event

  try {
    const eventData = await Event.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!eventData) {
      res.status(404).json({ message: 'No events found!' });
      return;
    }
    res.status(200).json(eventData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
