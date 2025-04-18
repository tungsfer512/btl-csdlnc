const Parking = require("../models/Parking");

exports.getParkingEntries = async (req, res) => {
  try {
    const parkingEntries = await Parking.find();
    res.json(parkingEntries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createParkingEntry = async (req, res) => {
  const parkingEntry = new Parking(req.body);
  try {
    const savedParking = await parkingEntry.save();
    res.status(201).json(savedParking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateParkingEntry = async (req, res) => {
  try {
    const updatedParking = await Parking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedParking) return res.status(404).json({ message: "Bãi đỗ xe không tồn tại." });
    res.json(updatedParking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteParkingEntry = async (req, res) => {
  try {
    const deletedParking = await Parking.findByIdAndDelete(req.params.id);
    if (!deletedParking) return res.status(404).json({ message: "Bãi đỗ xe không tồn tại." });
    res.json({ message: "Bãi đỗ xe đã bị xóa." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
