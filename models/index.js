const User = require('./User');
const Event = require('./Project');
const EventListing = require('./EventListing')

User.belongsToMany(Event, {
  through: {
    model: EventListing,
  },
});

Event.belongsToMany(User, {
  through: {
    model: EventListing,
  },
});

module.exports = { User, Event };
