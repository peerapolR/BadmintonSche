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
    let newId = 1;
    const existingIds = courts.map((c) => c.id);
    while (existingIds.includes(newId)) newId += 1;

    const newCourt = {
      id: newId,
      currentMatch: null,
      history: [],
    };

    setCourts([...courts, newCourt]);
  };

  const handleNewMatch = (courtId) => {
    setCourts((prevCourts) => {
      const activePlayers = prevCourts
        .filter((c) => c.id !== courtId && c.currentMatch)
        .flatMap((c) => [...c.currentMatch.team1, ...c.currentMatch.team2]);

      return prevCourts.map((court) => {
        if (court.id !== courtId) return court;

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
          alert("จัดทีมไม่ได้ เนื่องจากผู้เล่นไม่พอหรือเจอกันหมดแล้ว!");
          return court;
        }

        const newMatch = {
          team1: teams[0],
          team2: teams[1],
        };

        return {
          ...court,
          currentMatch: newMatch,
          history: [...court.history, newMatch],
        };
      });
    });
  };

  const handleGenerateAllCourts = () => {
    setCourts((prevCourts) => {
      let usedPlayers = [];

      const updatedCourts = prevCourts.map((court) => {
        const availableBeginners = players.beginners.filter(
          (b) => !usedPlayers.includes(b)
        );
        const availablePros = players.pros.filter(
          (p) => !usedPlayers.includes(p)
        );

        const teams = generateTeams(
          availableBeginners,
          availablePros,
          court.history
        );

        if (!teams) {
          console.warn(`Court ${court.id}: ไม่สามารถจัดทีมได้`);
          return court;
        }

        usedPlayers = [...usedPlayers, ...teams[0], ...teams[1]];

        const newMatch = {
          team1: teams[0],
          team2: teams[1],
        };

        return {
          ...court,
          currentMatch: newMatch,
          history: [...court.history, newMatch],
        };
      });

      return updatedCourts;
    });
  };

  const handleClearCourt = (courtId) => {
    setCourts((prev) =>
      prev.map((c) => (c.id === courtId ? { ...c, currentMatch: null } : c))
    );
  };

  return (
    <div className="p-4">
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 mr-5"
        onClick={handleAddCourt}
      >
        Add Court
      </button>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
        onClick={handleGenerateAllCourts}
      >
        Generate All Courts
      </button>

      <div className="grid md:grid-cols-2 gap-4">
        {courts
          .slice()
          .sort((a, b) => a.id - b.id)
          .map((court) => (
            <MatchCard
              key={court.id}
              court={court}
              onNewMatch={handleNewMatch}
              onRemoveCourt={onRemoveCourt}
              onClearCourt={handleClearCourt}
            />
          ))}
      </div>
    </div>
  );
}
