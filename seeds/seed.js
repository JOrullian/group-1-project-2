const sequelize = require("../config/connection");
const { User, Event } = require("../models");

const userData = require("./userData.json");
const eventData = require("./eventData.json");

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, { returning: true });

    for (const event of eventData) {
      await Event.create({
        ...event,
        userId: users[Math.floor(Math.random() * users.length)].id, // Adjust based on your actual field names
      });
    }

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    process.exit(0);
  }
};

seedDatabase();
