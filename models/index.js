const User = require('./User');
const Event = require('./Project');

User.belongsToMany(Event, {
    through: 'eventListing'
});

Event.belongsToMany(User, {
  through: 'eventListing'
});

module.exports = { User, Event };
