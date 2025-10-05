export function generateTeams(beginners, pros, history) {
  console.log(beginners, pros, history);

  if (beginners.length === 0 || pros.length === 0) return null;

  // สร้างคู่ Beginner + Pro
  let possiblePairs = [];
  beginners.forEach((b) => {
    pros.forEach((p) => {
      possiblePairs.push([b, p]);
    });
  });

  // list ทีมที่เคยเล่นแล้ว
  const playedTeams = history.flatMap((match) => [
    match.team1.join(","),
    match.team2.join(","),
  ]);

  // filter กันทีมที่เคยเล่นแล้ว
  let filtered = possiblePairs.filter(
    (pair) => !playedTeams.includes(pair.join(","))
  );

  if (filtered.length < 2) return null;

  // สุ่มลำดับทีม
  filtered = filtered.sort(() => Math.random() - 0.5);

  // หาคู่สองทีมที่ไม่มีผู้เล่นซ้ำ
  for (let i = 0; i < filtered.length; i++) {
    for (let j = i + 1; j < filtered.length; j++) {
      const team1 = filtered[i];
      const team2 = filtered[j];

      const playersSet = new Set([...team1, ...team2]);
      if (playersSet.size === team1.length + team2.length) {
        return [team1, team2]; // เจอแล้ว return เลย
      }
    }
  }

  return null; // ไม่มีคู่ที่คนไม่ซ้ำ
}
