const router = require("express").Router();

const { Group } = require("../../models");

router.post("/", async (req, res) => {
  if (!req.session.user_id) {
    return res
      .status(401)
      .json({ message: "Please log in to create a group." });
  }

  // Create a new group
  try {
    const groupData = await Group.create({ ...req.body });
    res.status(200).json(groupData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  if (!req.session.user_id) {
    return res
      .status(401)
      .json({ message: "Please log in to update a group." });
  }

  try {
    // Find the group to ensure the user is the owner
    const groupData = await Group.findByPk(req.params.id);

    if (!groupData) {
      return res.status(404).json({ message: "No group found with this ID!" });
    }

    // Check if the logged-in user is the owner of the group
    if (groupData.user_id !== req.session.user_id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this group." });
    }

    // Update the group name
    await Group.update(
      { name: req.body.name },
      { where: { id: req.params.id } }
    );

    res.status(200).json({ message: "Group name updated successfully!" });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  if (!req.session.user_id) {
    return res
      .status(401)
      .json({ message: "Please log in to delete a group." });
  }

  try {
    // Find the group to ensure the user is the owner
    const groupData = await Group.findByPk(req.params.id);

    if (!groupData) {
      return res.status(404).json({ message: "No group found with this ID!" });
    }

    // Check if the logged-in user is the owner of the group
    if (groupData.user_id !== req.session.user_id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this group." });
    }

    // Delete the group
    await Group.destroy({
      where: { id: req.params.id },
    });

    res.status(200).json({ message: "Group deleted successfully!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
