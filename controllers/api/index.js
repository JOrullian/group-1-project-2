const router = require('express').Router();

const userRoutes = require('./userRoutes');
const eventRoutes = require('./eventRoutes');
const groupRoutes = require('./groupRoutes');

router.use('/users', userRoutes);
router.use('/events', eventRoutes);
router.use('/groups', groupRoutes);

module.exports = router;
