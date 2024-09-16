const User = require("./User");
const Event = require("./Event");
const EventListing = require("./EventListing");
const Group = require("./Group");
const GroupListing = require("./GroupListing");

// Define associations
User.belongsToMany(Event, {
  through: {
    model: EventListing,
    foreignKey: "user_id",
  },
});

Event.belongsToMany(User, {
  through: {
    model: EventListing,
    foreignKey: "event_id",
  },
});

User.belongsToMany(Group, {
  through: {
    model: GroupListing,
    foreignKey: "user_id",
  },
});

Group.belongsToMany(User, {
  through: GroupListing,
  foreignKey: "group_id",
});

// Export models
module.exports = { User, Event, EventListing, Group, GroupListing };
