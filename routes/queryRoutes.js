const express = require("express");
const router = express.Router();
const {
  getStudentCosts,
  getServicesByDate,
  getGuestVisits,
  getServicesCost
} = require("../controllers/queryController");

router.get("/1", getStudentCosts);

router.get("/2", getServicesByDate);

router.get("/3", getGuestVisits);

router.get("/4", getServicesCost);

module.exports = router;
