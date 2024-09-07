const router = require('express').Router();

const { Group } = require('../../models');

router.post('/', async (req, res) => {
    // Create a new group
  try {
    const groupData = await Group.create(req.body, {
      user_id: req.session.user_id,}
    );
    res.status(200).json(groupData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
    // Update group name
    try {
        const groupData = await Group.update(
            {
                name: req.body.name,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    // Delete group
  try {
    const groupData = await Group.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!eventData) {
      res.status(404).json({ message: 'No group found with that ID!' });
      return;
    }
    res.status(200).json(groupData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
