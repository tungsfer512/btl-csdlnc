const express = require("express");
const router = express.Router();
const {
  getParkingEntries,
  createParkingEntry,
  updateParkingEntry,
  deleteParkingEntry,
} = require("../controllers/parkingController");

router.get("/", getParkingEntries);

router.post("/", createParkingEntry);

router.put("/:id", updateParkingEntry);

router.delete("/:id", deleteParkingEntry);

module.exports = router;
