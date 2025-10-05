"use client";
import MatchCard from "@components/MatchCard";
import { generateTeams } from "@functions/teamGenerator";

export default function CourtManager({
  courts,
  setCourts,
  players,
  onRemoveCourt,
}) {
  const handleAddCourt = () => {
    // หา id ที่เล็กที่สุดที่ยังไม่ใช้
    let newId = 1;
    const existingIds = courts.map((c) => c.id);
    while (existingIds.includes(newId)) {
      newId += 1;
    }

    const newCourt = {
      id: newId,
      currentMatch: null,
      history: [],
    };

    setCourts([...courts, newCourt]);
  };

  const handleNewMatch = (courtId) => {
    // รวมรายชื่อผู้เล่นที่กำลังเล่นอยู่ทุกคอร์ด (ยกเว้นคอร์ดที่เรากำลังจะ generate)
    const activePlayers = courts
      .filter((c) => c.id !== courtId && c.currentMatch)
      .flatMap((c) => [...c.currentMatch.team1, ...c.currentMatch.team2]);

    setCourts(
      courts.map((court) => {
        if (court.id === courtId) {
          // กรองผู้เล่นออกจาก beginners/pros ที่กำลังเล่นอยู่
          const availableBeginners = players.beginners.filter(
            (b) => !activePlayers.includes(b)
          );
          const availablePros = players.pros.filter(
            (p) => !activePlayers.includes(p)
          );

          const teams = generateTeams(
            availableBeginners,
            availablePros,
            court.history
          );

          if (!teams) {
            alert(
              "จัดทีมไม่ได้เนื่องจากเจอกันครบหมดแล้วหรือมีผู้เล่นไม่เพียงพอ!"
            );
            return court;
          }

          return {
            ...court,
            currentMatch: { team1: teams[0], team2: teams[1], score: null },
          };
        }
        return court;
      })
    );
  };

  const handleSaveScore = (courtId, score) => {
    setCourts(
      courts.map((court) => {
        if (court.id === courtId && court.currentMatch) {
          const updatedMatch = { ...court.currentMatch, score };
          return {
            ...court,
            currentMatch: updatedMatch,
            history: [...court.history, updatedMatch],
          };
        }
        return court;
      })
    );
  };

  return (
    <div className="p-4">
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        onClick={handleAddCourt}
      >
        Add Court
      </button>
      <div className="grid md:grid-cols-2 gap-4">
        {courts
          .slice()
          .sort((a, b) => a.id - b.id)
          .map((court) => (
            <MatchCard
              key={court.id}
              court={court}
              onSaveScore={handleSaveScore}
              onNewMatch={handleNewMatch}
              onRemoveCourt={onRemoveCourt}
            />
          ))}
      </div>
    </div>
  );
}
