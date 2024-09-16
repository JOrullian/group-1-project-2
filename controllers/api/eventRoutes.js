const router = require("express").Router();
const geolib = require("geolib");

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
    const { location, latitude, longitude, time, name } = req.body;

    console.log(req.body)

    const newEvent = await Event.create({
      location,
      latitude,
      longitude,
      time,
      name,
      user_id: req.session.user_id,
    })

    res.status(200).json(newEvent)
  }
  catch (err) {
    res.status(400).json(err);
  }
});

router.post("/nearby", async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    // Get all events (in a real app, you'd optimize this to only return events in the user's area)
    const allEvents = await Event.findAll();

    // Filter events that are within a certain radius (e.g., 10 km)
    const nearbyEvents = allEvents.filter((event) => {
      const distance = geolib.getDistance(
        { latitude, longitude }, // user's location
        { latitude: event.latitude, longitude: event.longitude } // event location
      );
      return distance <= 10000; // 10 kilometers radius
    });

    res.json(nearbyEvents);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error finding nearby events", error: err });
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

router.put("/:id/join", async (req, res) => {
  try {
    // Find the event by ID
    const event = await Event.findByPk(req.params.id);

    if (!event) {
      res.status(404).json({ message: "Event not found!" });
      return;
    }

    if (!event.participants) {
      event.participants = [];
    }

    // Check if the user is already part of the event
    if (event.participants.includes(req.session.user_id)) {
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
