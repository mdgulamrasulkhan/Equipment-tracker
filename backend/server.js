const express = require("express");
const cors = require("cors");
const equipmentRoutes = require("./routes/equipment.routes");

const app = express();

// ✅ ONLY ONE CORS CONFIG
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.use("/api/equipment", equipmentRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log("Server running on port 5000");
});
