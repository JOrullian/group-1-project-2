const router = require("express").Router();
const geolib = require("geolib");
const { format_date } = require("../../utils/helpers");
const { Op } = require("sequelize");

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
    const {
      location,
      latitude,
      longitude,
      time,
      name,
      sportType,
      numberOfPlayers,
    } = req.body;

    // Use req.session.user_id to associate the event with the logged-in user
    const newEvent = await Event.create({
      location,
      latitude,
      longitude,
      time,
      name,
      sportType,
      numberOfPlayers,
      created_by: req.session.user_id, // Set the user id from the session
    });

    res.status(200).json(newEvent);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/nearby", async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    if (typeof latitude !== "number" || typeof longitude !== "number") {
      return res.status(400).json({ message: "Invalid coordinates" });
    }

    // Retrieve all events except those created by the logged-in user
    const allEvents = await Event.findAll({
      // where: {
      //   created_by: {
      //     [Op.ne]: req.session.user_id, // Exclude events created by the logged-in user
      //   },
      // },
    });

    console.log("Here are all events:", allEvents);

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
    res
      .status(500)
      .json({ message: "Error finding nearby events", error: err.message });
  }
});

router.post("/yourEvents", async (req, res) => {
  try {
    const userEvents = await Event.findAll({
      where: { created_by: req.session.user_id },
    });

    if (!userEvents.length) {
      return res
        .status(404)
        .json({ message: "No events found for this user." });
    }

    res.status(200).json(userEvents);
  } catch (err) {
    res.status(500).json(err);
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
    console.log(event);

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
    const currentParticipants = event.participants;
    event.set({ participants: [...currentParticipants, req.session.user_id] });
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
