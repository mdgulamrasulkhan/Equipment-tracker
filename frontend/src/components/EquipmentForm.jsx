import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/equipment";

const initialState = {
  name: "",
  type: "Machine",
  status: "Active",
  lastCleaned: "",
};

function EquipmentForm({ fetchEquipment, editItem, setEditItem }) {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (editItem) setForm(editItem);
  }, [editItem]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ STEP 2.1: CONFIRM BUTTON CLICK
    console.log("Add / Update button clicked");

    if (!form.name || !form.lastCleaned) {
      alert("All fields are required");
      return;
    }

    // ✅ STEP 2.2: LOG DATA BEFORE SENDING
    console.log("Sending data to backend:", form);

    try {
      if (editItem) {
        await axios.put(`${API_URL}/${editItem.id}`, form);
        setEditItem(null);
      } else {
        await axios.post(API_URL, form);
      }

      // ✅ STEP 2.3: CONFIRM SUCCESS
      console.log("Request successful");

      setForm(initialState);
      fetchEquipment();
    } catch (error) {
      // ✅ STEP 2.4: CATCH REAL ERROR
      console.error("Axios error:", error);
      alert("Error while saving equipment. Check console.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Equipment Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <select
        value={form.type}
        onChange={(e) => setForm({ ...form, type: e.target.value })}
      >
        <option>Machine</option>
        <option>Vessel</option>
        <option>Tank</option>
        <option>Mixer</option>
      </select>

      <select
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
      >
        <option>Active</option>
        <option>Inactive</option>
        <option>Under Maintenance</option>
      </select>

      <input
        type="date"
        value={form.lastCleaned}
        onChange={(e) => setForm({ ...form, lastCleaned: e.target.value })}
      />

      <button type="submit">
        {editItem ? "Update Equipment" : "Add Equipment"}
      </button>
    </form>
  );
}

export default EquipmentForm;
