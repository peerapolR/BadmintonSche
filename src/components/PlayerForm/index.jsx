import { useState } from "react";

export default function PlayerForm({ onAdd, error }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("beginner");

  const handleAdd = () => {
    if (!name) return;
    onAdd(name, type);
    setName("");
  };

  return (
    <div className="p-4 border rounded bg-white shadow">
      <h2 className="font-bold mb-2">Add Player</h2>
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Player name"
          className="border p-2 rounded flex-2/4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          className="border p-2 rounded flex-1/4"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="beginner">Beginner</option>
          <option value="pro">Pro</option>
        </select>
        <button
          className="bg-blue-500 text-white px-3 rounded flex-1/4"
          onClick={handleAdd}
        >
          Add
        </button>
      </div>
      {error && <p className="text-red-500 mt-1 text-sm">{error}</p>}
    </div>
  );
}
