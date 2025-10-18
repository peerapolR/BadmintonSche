export default function Summary({ courts }) {
  const allMatches = courts.flatMap((court) =>
    court.history.map((match) => ({
      ...match,
      courtId: court.id,
    }))
  );

  const totalMatches = allMatches.length;

  const matchPerCourt = courts.map((court) => ({
    id: court.id,
    count: court.history.length,
  }));

  const playerMatchCount = {};
  allMatches.forEach((match) => {
    const players = [...match.team1, ...match.team2];
    players.forEach((p) => {
      if (!playerMatchCount[p]) playerMatchCount[p] = 0;
      playerMatchCount[p] += 1;
    });
  });

  const sortedPlayers = Object.entries(playerMatchCount)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  return (
    <div className="bg-white p-4 rounded shadow mt-6">
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-2 text-blue-600">
          1️⃣ Overall Summary
        </h3>
        <p className="text-gray-700">
          🔢 Total Matches Played:{" "}
          <span className="font-bold text-blue-700">{totalMatches}</span>
        </p>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-2 text-green-600">
          2️⃣ Matches per Court
        </h3>
        {matchPerCourt.length === 0 ? (
          <p className="text-gray-400 italic">No courts available</p>
        ) : (
          <ul className="space-y-1">
            {matchPerCourt.map((court) => (
              <li key={court.id} className="text-gray-700">
                🏸 Court {court.id}:{" "}
                <span className="font-bold text-green-700">
                  {court.count} match{court.count !== 1 ? "es" : ""}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-2 text-purple-600">
          3️⃣ Player Participation
        </h3>
        {sortedPlayers.length === 0 ? (
          <p className="text-gray-400 italic">No player data yet</p>
        ) : (
          <ul className="space-y-1">
            {sortedPlayers.map((player, idx) => (
              <li
                key={player.name}
                className="flex justify-between items-center border-b py-1 text-gray-700"
              >
                <span>
                  {idx + 1}. {player.name}
                </span>
                <span className="font-semibold text-purple-700">
                  {player.count} match{player.count !== 1 ? "es" : ""}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
