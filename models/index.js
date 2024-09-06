const User = require('./User');
const Event = require('./Project');
const 

User.belongsToMany(Event, {
    through: 'Event_Listing'
});

Event.belongsToMany(User, {
  through: 'Event_Listing'
});


module.exports = { User, Event };
