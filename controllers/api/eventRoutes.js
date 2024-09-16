const router = require("express").Router();
const geolib = require("geolib");
const { format_date } = require("../../utils/helpers");

const { Event } = require("../../models");

router.get("/", async (req, res) => {
    const allEvents = await Event.findAll();
    res.json(allEvents);
});

router.post("/", async (req, res) => {
  if (!req.session.user_id) {
    return res
      .status(401)
      .json({ message: "Please log in to create an event." });
  }

  // Create a new event
  try {
    const { location, latitude, longitude, time, name, sportType } = req.body;

    console.log(req.body);

    const newEvent = await Event.create({
      location,
      latitude,
      longitude,
      time,
      name,
      user_id: req.session.user_id,
      sportType,
    });

    res.status(200).json(newEvent);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/nearby", async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    if (typeof latitude !== 'number' || typeof longitude !== 'number') {
      return res.status(400).json({ message: "Invalid coordinates" });
    }

    const allEvents = await Event.findAll();

    // Check if events are being retrieved
    if (!allEvents.length) {
      return res.status(404).json({ message: "No events found" });
    }

    // Filter events that are within a certain radius (e.g., 10 km)
    const nearbyEvents = allEvents.filter((event) => {
      const distance = geolib.getDistance(
        { latitude, longitude }, // user's location
        { latitude: event.latitude, longitude: event.longitude } // event location
      );
      return distance <= 10000; // 10 kilometers radius
    });

    // Check if nearbyEvents has been correctly filtered
    if (!nearbyEvents.length) {
      return res.status(404).json({ message: "No nearby events found" });
    }

    // Format event dates and times before sending the response
    const formattedEvents = nearbyEvents.map((event) => ({
      ...event.dataValues,
      time: format_date(new Date(event.time)), // Ensure event.time is a Date object
    }));

    res.json(formattedEvents);
  } catch (err) {
    console.error("Error finding nearby events", err);
    res.status(500).json({ message: "Error finding nearby events", error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  // Update event location, time and/or name
  try {
    const eventData = await Event.update(req.body, {
      where: { id: req.params.id, user_id: req.session.user_id },
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT route to add user to event participants
router.put('/:id/join', async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Add the current user's ID to the participants array if not already added
    const participants = event.participants || [];
    if (!participants.includes(req.session.user_id)) {
      participants.push(req.session.user_id);
    } else {
      return res.status(400).json({ message: 'You have already joined this event' });
    }

    // Update the event's participants
    await event.update({ participants });

    res.status(200).json({ message: 'Successfully joined the event' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error joining the event', error });
  }
});

router.delete("/:id", async (req, res) => {
  if (!req.session.user_id) {
    return res
      .status(401)
      .json({ message: "Please log in to create an event." });
  }

  // Delete event
  try {
    const eventData = await Event.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!eventData) {
      res.status(404).json({ message: "No events found!" });
      return;
    }
    res.status(200).json(eventData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
