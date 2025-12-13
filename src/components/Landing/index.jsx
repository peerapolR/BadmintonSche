"use client";
import { useState, useEffect } from "react";
import PlayerForm from "@components/PlayerForm";
import CourtManager from "@components/CourtManager";
import HistoryList from "@components/HistoryList";
import Summary from "@components/Summary";

export default function Home() {
  const [players, setPlayers] = useState({ beginners: [], pros: [] });
  const [courts, setCourts] = useState([]);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("players");

  const mockPlayers = {
    beginners: [
      "พี่เอ๋",
      "พิม",
      "กิ๊ฟ",
      "แจ็คกี้",
      "เจ",
      "พี่กุล",
      "เล็ก",
      "พี่หมี",
      "พี่ปลา",
      "พี่ส้ม",
      "พี่เอี๊ยง",
      "บุ๊ค",
      "พี่ใหม่",
      "พี่กิ๊ฟ",
    ],
    pros: [
      "เซฟ",
      "เท็น",
      "มี่",
      "ฮัซวา",
      "ทาม",
      "พี",
      "แปง",
      "แป๊ก",
      "หนึ่ง",
      "บีม",
      "พี่ไฟต์",
      "พี่ทัช",
      "เนท",
      "จูเนียส",
    ],
  };

  useEffect(() => {
    const savedPlayers = localStorage.getItem("players");
    const savedCourts = localStorage.getItem("courts");
    if (savedPlayers) setPlayers(JSON.parse(savedPlayers));
    if (savedCourts) setCourts(JSON.parse(savedCourts));
  }, []);

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

  const insertMockPlayer = () => {
    if (
      confirm("คุณแน่ใจหรือไม่ว่าต้องการนำรายชื่อ ณ วันที่ 14 Dec มาใส่ในระบบ")
    ) {
      setPlayers(mockPlayers);
    }
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
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">🏸 Badminton Scheduler</h1>
        <button
          onClick={handleResetAll}
          className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800"
        >
          🔄 Reset Everything
        </button>
        <button
          onClick={insertMockPlayer}
          className="bg-amber-600 text-white px-3 py-1 rounded hover:bg-amber-800"
        >
          Players (14 Dec)
        </button>
      </div>

      <div className="flex space-x-2 border-b mb-4 overflow-auto">
        {[
          { key: "players", label: "🧍 Players" },
          { key: "courts", label: "🏸 Court Management" },
          { key: "history", label: "📜 Match History" },
          { key: "summary", label: "📊 Summary" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-t-lg font-medium ${
              activeTab === tab.key
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "players" && (
        <div>
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
              <div>
                <h3 className="font-semibold mb-2 text-blue-600 flex items-center">
                  🏸 Beginners ({players.beginners.length} Players)
                </h3>
                {players.beginners.length === 0 ? (
                  <p className="text-gray-400 italic">No beginners yet</p>
                ) : (
                  <ul className="space-y-2">
                    {players.beginners.sort().map((name, idx) => (
                      <li
                        key={idx}
                        className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded px-3 py-1"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-blue-700">
                            {name}
                          </span>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                            Beginner
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            if (
                              confirm(`ลบ "${name}" ออกจาก Beginners ใช่ไหม?`)
                            ) {
                              const updated = players.beginners.filter(
                                (n) => n !== name
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

              <div>
                <h3 className="font-semibold mb-2 text-green-600 flex items-center">
                  🏆 Pros ({players.pros.length} Players)
                </h3>
                {players.pros.length === 0 ? (
                  <p className="text-gray-400 italic">No pros yet</p>
                ) : (
                  <ul className="space-y-2">
                    {players.pros.sort().map((name, idx) => (
                      <li
                        key={idx}
                        className="flex items-center justify-between bg-green-50 border border-green-200 rounded px-3 py-1"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-green-700">
                            {name}
                          </span>
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                            Pro
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            if (confirm(`ลบ "${name}" ออกจาก Pros ใช่ไหม?`)) {
                              const updated = players.pros.filter(
                                (n) => n !== name
                              );
                              setPlayers((prev) => ({
                                ...prev,
                                pros: updated,
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
            </div>
          </div>
        </div>
      )}

      {activeTab === "courts" && (
        <div>
          <div className="flex justify-between items-center mb-4">
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
        </div>
      )}

      {activeTab === "history" && (
        <div>
          <h2 className="font-semibold text-lg mb-2">Match History</h2>
          <HistoryList courts={courts} />
        </div>
      )}

      {activeTab === "summary" && (
        <div>
          <h2 className="font-semibold text-lg mb-2">Summary</h2>
          <Summary courts={courts} />
        </div>
      )}
    </div>
  );
}
