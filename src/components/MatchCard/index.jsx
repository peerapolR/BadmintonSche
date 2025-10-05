import { useState } from "react";

export default function MatchCard({
  court,
  onSaveScore,
  onNewMatch,
  onRemoveCourt,
}) {
  const [scoreA, setScoreA] = useState("");
  const [scoreB, setScoreB] = useState("");

  return (
    <div className="flex flex-col border p-4 rounded shadow bg-white">
      <div className="flex justify-between mb-5 border-b">
        <h2 className="font-bold text-lg">Court {court.id}</h2>
        <button
          onClick={() => onRemoveCourt(court.id)}
          className=" text-white px-3"
        >
          ❌
        </button>
      </div>
      {court.currentMatch ? (
        <>
          <div className="flex justify-between gap-4 font-extrabold">
            {/* <div className="border-2 p-2 rounded w-full">
              <p>Team A: {court.currentMatch.team1.join(" & ")}</p>
            </div> */}
            <div className="relative border-2 p-4 rounded w-full">
              <span className="absolute -top-2 left-2 bg-white px-1 text-sm">
                Team A
              </span>
              <p className="text-center text-xl">
                {court.currentMatch.team1.join(" & ")}
              </p>
            </div>
            <div className="relative border-2 p-4 rounded w-full">
              <span className="absolute -top-2 left-2 bg-white px-1 text-sm">
                Team B
              </span>
              <p className="text-center text-xl">
                {court.currentMatch.team2.join(" & ")}
              </p>
            </div>
          </div>

          {court.currentMatch.score ? (
            <p className="text-green-600 mt-2">
              Score: {court.currentMatch.score}
            </p>
          ) : (
            <>
              <div className="flex my-2 justify-between">
                <input
                  type="text"
                  placeholder="Score Team A"
                  className="border p-1 rounded"
                  value={scoreA}
                  onChange={(e) => setScoreA(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Score Team B"
                  className="border p-1 rounded"
                  value={scoreB}
                  onChange={(e) => setScoreB(e.target.value)}
                />
              </div>
              <button
                onClick={() => {
                  if (scoreA && scoreB)
                    onSaveScore(court.id, `${scoreA}-${scoreB}`);
                  setScoreA("");
                  setScoreB("");
                }}
                className="bg-blue-500 text-white px-3 rounded"
              >
                Save Score
              </button>
            </>
          )}

          <button
            onClick={() => onNewMatch(court.id)}
            className="mt-2 bg-gray-700 text-white px-3 rounded"
          >
            New Match
          </button>
        </>
      ) : (
        <button
          onClick={() => onNewMatch(court.id)}
          className="bg-purple-500 text-white px-3 py-1 rounded"
        >
          Start Match
        </button>
      )}
    </div>
  );
}
