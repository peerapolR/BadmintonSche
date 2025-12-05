export default function HistoryList({ courts }) {
  return (
    <div className="p-4 bg-white rounded shadow mt-4">
      {courts.map((court) => (
        <div key={court.id} className="mb-3">
          <h3 className="font-extrabold text-2xl underline">
            Court {court.id}
          </h3>

          {court.history.length === 0 ? (
            <p className="text-gray-500">No matches yet.</p>
          ) : (
            <div className="grid md:grid-cols-2">
              {court.history.map((match, idx) => (
                <div
                  className="border rounded-lg m-3 px-6 pb-4 pt-2 font-extrabold"
                  key={idx}
                >
                  <div className="border-b-1 text-center mb-4">
                    Match : {idx + 1}
                  </div>

                  <div className="flex justify-between">
                    <p>Team A → {match.team1.join(" & ")}</p>
                  </div>

                  <div className="text-center my-2">vs</div>

                  <div className="flex justify-between">
                    <p>Team B → {match.team2.join(" & ")}</p>
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
