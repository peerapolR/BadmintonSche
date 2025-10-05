export default function HistoryList({ courts }) {
  return (
    <div className="p-4 bg-white rounded shadow mt-4">
      <h2 className="font-bold text-lg mb-2">Match History</h2>
      {courts.map((court) => (
        <div key={court.id} className="mb-3">
          <h3 className="font-semibold">Court {court.id}</h3>
          {court.history.length === 0 ? (
            <p className="text-gray-500">No matches yet.</p>
          ) : (
            // <ul className="list-disc ml-6">
            //   {court.history.map((match, idx) => (
            //     <li key={idx}>
            //       {match.team1.join(" + ")} vs {match.team2.join(" + ")} →{" "}
            //       {match.score}
            //     </li>
            //   ))}
            // </ul>
            <div className="grid grid-cols-2">
              {court.history.map((match, idx) => (
                <div
                  className="border rounded-lg m-3 px-6 pb-4 pt-2 font-extrabold"
                  key={idx}
                >
                  <div className="border-b-1 text-center">
                    Match : {idx + 1}
                  </div>
                  <div className="flex justify-between mt-4">
                    <p>Team A → {match.team1.join(" & ")} </p>
                    <p
                      className={
                        Number(match.score.split("-")[0]) >
                        Number(match.score.split("-")[1])
                          ? "text-green-500"
                          : Number(match.score.split("-")[0]) <
                            Number(match.score.split("-")[1])
                          ? "text-red-500"
                          : "text-gray-500" // กรณีเสมอ
                      }
                    >
                      Score : {match.score.split("-")[0]}
                    </p>
                  </div>
                  vs
                  <div className="flex justify-between">
                    <p>Team B → {match.team2.join(" & ")} </p>
                    <p
                      className={
                        Number(match.score.split("-")[1]) >
                        Number(match.score.split("-")[0])
                          ? "text-green-500"
                          : Number(match.score.split("-")[1]) <
                            Number(match.score.split("-")[0])
                          ? "text-red-500"
                          : "text-gray-500"
                      }
                    >
                      Score : {match.score.split("-")[1]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
