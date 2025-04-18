const express = require("express");
const connectDB = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");
const guestRoutes = require("./routes/guestRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const roomRoutes = require("./routes/roomRoutes");
const parkingRoutes = require("./routes/parkingRoutes");
const queryRoutes = require("./routes/queryRoutes");

const app = express();
const cors = require("cors");

connectDB();

app.use(cors());

app.use("/api/students", studentRoutes);
app.use("/api/guests", guestRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/parking", parkingRoutes);
app.use("/api/queries", queryRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
