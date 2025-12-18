import { useEffect, useState } from "react";
import axios from "axios";
import EquipmentForm from "./components/EquipmentForm";
import EquipmentTable from "./components/EquipmentTable";

const API_URL = "http://localhost:5000/api/equipment";

function App() {
  const [equipment, setEquipment] = useState([]);
  const [editItem, setEditItem] = useState(null);

  const fetchEquipment = async () => {
    const res = await axios.get(API_URL);
    setEquipment(res.data);
  };

  useEffect(() => {
    fetchEquipment();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Equipment Tracker</h2>

      <EquipmentForm
        fetchEquipment={fetchEquipment}
        editItem={editItem}
        setEditItem={setEditItem}
      />

      <EquipmentTable
        equipment={equipment}
        fetchEquipment={fetchEquipment}
        setEditItem={setEditItem}
      />
    </div>
  );
}

export default App;
