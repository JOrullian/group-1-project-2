const User = require("./User");
const Event = require("./Event");
const EventListing = require("./EventListing");
const Group = require("./Group");
const GroupListing = require("./GroupListing");


User.belongsToMany(Event, {
  through: {
    model: EventListing,
    foreignKey: "userId",
  },
});

Event.belongsToMany(User, {
  through: {
    model: EventListing,
    foreignKey: "eventId",
  },
});

User.belongsToMany(Group, {
  through: {
    model: GroupListing,
    foreignKey: "userId",
  },
});

Group.belongsToMany(User, {
  through: GroupListing,
  foreignKey: "groupId",
});

module.exports = { User, Event, Group };
