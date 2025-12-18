const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const dataPath = path.join(__dirname, "../data/equipment.json");

const readData = () => {
  return JSON.parse(fs.readFileSync(dataPath, "utf-8"));
};

const writeData = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

const getAllEquipment = (req, res) => {
  res.json(readData());
};

const addEquipment = (req, res) => {
  console.log("Request body:", req.body);

  const equipment = readData();

  const newItem = {
    id: uuidv4(),
    name: req.body.name,
    type: req.body.type,
    status: req.body.status,
    lastCleaned: req.body.lastCleaned,
  };

  equipment.push(newItem);
  writeData(equipment);

  res.status(201).json(newItem);
};

const updateEquipment = (req, res) => {
  let equipment = readData();

  equipment = equipment.map((item) =>
    item.id === req.params.id ? { ...item, ...req.body } : item
  );

  writeData(equipment);
  res.json({ message: "Equipment updated" });
};

const deleteEquipment = (req, res) => {
  const equipment = readData().filter((item) => item.id !== req.params.id);

  writeData(equipment);
  res.json({ message: "Equipment deleted" });
};

module.exports = {
  getAllEquipment,
  addEquipment,
  updateEquipment,
  deleteEquipment,
};
