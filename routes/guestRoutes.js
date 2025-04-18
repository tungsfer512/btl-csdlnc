const express = require("express");
const router = express.Router();
const {
    getGuests,
    createGuest,
    updateGuest,
    deleteGuest,
} = require("../controllers/guestController");
const Guest = require('../models/Guest');
const Student = require('../models/Student');

router.get("/", getGuests);

router.post("/", createGuest);

router.put("/:id", updateGuest);

router.delete("/:id", deleteGuest);

router.post('/visit', async (req, res) => {
    const { _id, guest_name, guest_identity_card, guest_birth_date, student_id, visit_dates } = req.body;

    const guest = {
        name: guest_name,
        identity_card: guest_identity_card,
        birth_date: new Date(guest_birth_date),
        visits: [{
            student_id: student_id,
        }]
    };

    try {
        const newGuest = await Guest.create(guest);
        res.status(201).json(newGuest);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
