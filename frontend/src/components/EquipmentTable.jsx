import axios from "axios";

const API_URL = "http://localhost:5000/api/equipment";

function EquipmentTable({ equipment, fetchEquipment, setEditItem }) {
  const deleteItem = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchEquipment();
  };

  return (
    <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Status</th>
          <th>Last Cleaned</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {equipment.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.type}</td>
            <td>{item.status}</td>
            <td>{item.lastCleaned}</td>
            <td>
              <button onClick={() => setEditItem(item)}>Edit</button>
              <button onClick={() => deleteItem(item.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default EquipmentTable;
