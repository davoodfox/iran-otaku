const router = require("express").Router();
const Entry = require("../models/Entry");
const verify = require("./verify-token");

// Fetch All Entries
router.get("/all", async (req, res) => {
  res.send(await Entry.find({}));
});

// Fetch Entry
router.get("/entry/:id", async (req, res) => {
  res.send(await Entry.findOne({ id: req.params.id }));
});

// Add Entry
router.post("/entry", verify, async (req, res) => {
  const entry = new Entry({
    enTitle: req.body.enTitle,
    faTitle: req.body.faTitle,
    id: req.body.id
  });
  try {
    await entry.save();
    res.send({ entry: entry._id });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Edit Entry
router.put("/entry", verify, async (req, res) => {
  try {
    let newEntry = await Entry.findOneAndUpdate(
      { id: req.body.id },
      { faTitle: req.body.updates.faTitle },
      { new: true }
    );
    res.send(newEntry);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
