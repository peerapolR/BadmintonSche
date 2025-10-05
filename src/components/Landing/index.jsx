"use client";
import { useState, useEffect } from "react";
import PlayerForm from "@components/PlayerForm";
import CourtManager from "@components/CourtManager";
import HistoryList from "@components/HistoryList";

export default function Home() {
  const [players, setPlayers] = useState({ beginners: [], pros: [] });
  const [courts, setCourts] = useState([]);
  const [error, setError] = useState("");

  // โหลดจาก localStorage
  useEffect(() => {
    const savedPlayers = localStorage.getItem("players");
    const savedCourts = localStorage.getItem("courts");
    if (savedPlayers) setPlayers(JSON.parse(savedPlayers));
    if (savedCourts) setCourts(JSON.parse(savedCourts));
  }, []);

  // เซฟไป localStorage
  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);

  useEffect(() => {
    localStorage.setItem("courts", JSON.stringify(courts));
  }, [courts]);

  const handleAddPlayer = (name, type) => {
    const { beginners, pros } = players;

    if (beginners.includes(name) || pros.includes(name)) {
      setError("ชื่อผู้เล่นนี้มีอยู่แล้ว!");
      return;
    }

    setPlayers((prev) => ({
      ...prev,
      [type === "beginner" ? "beginners" : "pros"]: [
        ...prev[type === "beginner" ? "beginners" : "pros"],
        name,
      ],
    }));
    setError("");
  };

  const handleClearPlayers = () => {
    if (confirm("คุณแน่ใจหรือไม่ว่าต้องการล้างรายชื่อทั้งหมด?")) {
      setPlayers({ beginners: [], pros: [] });
      localStorage.removeItem("players");
    }
  };
  const handleClearCourts = () => {
    if (
      confirm("คุณแน่ใจหรือไม่ว่าต้องการล้างข้อมูลคอร์ดและการแข่งขันทั้งหมด?")
    ) {
      setCourts([]);
      localStorage.removeItem("courts");
    }
  };

  const handleResetAll = () => {
    if (confirm("รีเซ็ตระบบทั้งหมด (ผู้เล่น + การแข่งขัน)?")) {
      setPlayers({ beginners: [], pros: [] });
      setCourts([]);
      localStorage.clear();
    }
  };

  const handleRemoveCourt = (courtId) => {
    if (confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบ Court ${courtId} จากหน้าจอ?`)) {
      setCourts((prevCourts) => prevCourts.filter((c) => c.id !== courtId));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">🏸 Badminton Scheduler</h1>
        <button
          onClick={handleResetAll}
          className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800 mb-4"
        >
          🔄 Reset Everything
        </button>
      </div>

      <PlayerForm onAdd={handleAddPlayer} error={error} />

      <div className="mt-4 bg-white p-4 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">Players</h2>
          <button
            onClick={handleClearPlayers}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-800"
          >
            Clear All Players
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Beginners List */}
          <div>
            <h3 className="font-semibold mb-2 text-blue-600 flex items-center">
              🏸 Beginners
            </h3>
            {players.beginners.length === 0 ? (
              <p className="text-gray-400 italic">No beginners yet</p>
            ) : (
              <ul className="space-y-2">
                {players.beginners.map((name, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded px-3 py-1"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-blue-700">{name}</span>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                        Beginner
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        if (confirm(`ลบ "${name}" ออกจาก Beginners ใช่ไหม?`)) {
                          const updated = players.beginners.filter(
                            (_, i) => i !== idx
                          );
                          setPlayers((prev) => ({
                            ...prev,
                            beginners: updated,
                          }));
                        }
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      ❌
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Pros List */}
          <div>
            <h3 className="font-semibold mb-2 text-green-600 flex items-center">
              🏆 Pros
            </h3>
            {players.pros.length === 0 ? (
              <p className="text-gray-400 italic">No pros yet</p>
            ) : (
              <ul className="space-y-2">
                {players.pros.map((name, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between bg-green-50 border border-green-200 rounded px-3 py-1"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-green-700">{name}</span>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                        Pro
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        if (confirm(`ลบ "${name}" ออกจาก Pros ใช่ไหม?`)) {
                          const updated = players.pros.filter(
                            (_, i) => i !== idx
                          );
                          setPlayers((prev) => ({ ...prev, pros: updated }));
                        }
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      ❌
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-6 mb-2">
        <h2 className="font-semibold text-lg">Court Management</h2>
        <button
          onClick={handleClearCourts}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-800"
        >
          Clear All Courts & Matches
        </button>
      </div>

      <CourtManager
        courts={courts}
        setCourts={setCourts}
        players={players}
        onRemoveCourt={handleRemoveCourt}
      />
      <HistoryList courts={courts} />
    </div>
  );
}
