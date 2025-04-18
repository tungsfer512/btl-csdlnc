const Guest = require("../models/Guest");

exports.getGuests = async (req, res) => {
  try {
    const guests = await Guest.find();
    res.json(guests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createGuest = async (req, res) => {
  const guest = new Guest(req.body);
  try {
    const savedGuest = await guest.save();
    res.status(201).json(savedGuest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateGuest = async (req, res) => {
  try {
    const updatedGuest = await Guest.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedGuest) return res.status(404).json({ message: "Khách không tồn tại." });
    res.json(updatedGuest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteGuest = async (req, res) => {
  try {
    const deletedGuest = await Guest.findByIdAndDelete(req.params.id);
    if (!deletedGuest) return res.status(404).json({ message: "Khách không tồn tại." });
    res.json({ message: "Khách đã bị xóa." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
