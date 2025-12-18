const express = require("express");
const router = express.Router();

const {
  getAllEquipment,
  addEquipment,
  updateEquipment,
  deleteEquipment,
} = require("../controllers/equipment.controller");

router.get("/", getAllEquipment);
router.post("/", addEquipment);
router.put("/:id", updateEquipment);
router.delete("/:id", deleteEquipment);

module.exports = router;
