export function generateTeams(beginners, pros, history) {
  if (beginners.length < 2 || pros.length < 2) return null;

  const playCount = {};
  const partnerCount = {};

  history.forEach((match) => {
    const players = [...match.team1, ...match.team2];

    players.forEach((p) => {
      playCount[p] = (playCount[p] || 0) + 1;
    });

    const p1 = match.team1.join("-");
    const p2 = match.team2.join("-");
    partnerCount[p1] = (partnerCount[p1] || 0) + 1;
    partnerCount[p2] = (partnerCount[p2] || 0) + 1;
  });

  const getMinPlayers = (arr) => {
    const min = Math.min(...arr.map((x) => playCount[x] || 0));
    const filtered = arr.filter((x) => (playCount[x] || 0) === min);
    return filtered.length >= 2 ? filtered : arr;
  };

  const candBeg = getMinPlayers(beginners);
  const candPro = getMinPlayers(pros);

  let pairs = [];

  candBeg.forEach((b) => {
    candPro.forEach((p) => {
      const key = `${b}-${p}`;
      const score =
        (playCount[b] || 0) +
        (playCount[p] || 0) +
        (partnerCount[key] || 0) * 4 +
        Math.random() * 0.2;

      pairs.push({ team: [b, p], score });
    });
  });

  pairs.sort((a, b) => a.score - b.score);

  const team1 = pairs[0].team;
  const used = new Set(team1);

  const team2 = pairs.find(
    (pair) => !used.has(pair.team[0]) && !used.has(pair.team[1])
  )?.team;

  return team2 ? [team1, team2] : null;
}

export function generateAllCourtsTeams(beginners, pros, courtsCount, history) {
  if (beginners.length < courtsCount * 2) return null;
  if (pros.length < courtsCount * 2) return null;

  const playCount = {};
  const partnerCount = {};

  history.forEach((match) => {
    const players = [...match.team1, ...match.team2];
    players.forEach((p) => {
      playCount[p] = (playCount[p] || 0) + 1;
    });

    const k1 = match.team1.join("-");
    const k2 = match.team2.join("-");
    partnerCount[k1] = (partnerCount[k1] || 0) + 1;
    partnerCount[k2] = (partnerCount[k2] || 0) + 1;
  });

  let remBeg = [...beginners];
  let remPro = [...pros];

  const courts = [];

  const selectMinPlayers = (arr, count = 2) => {
    return [...arr]
      .sort((a, b) => (playCount[a] || 0) - (playCount[b] || 0))
      .slice(0, count);
  };

  for (let c = 0; c < courtsCount; c++) {
    const [b1, b2] = selectMinPlayers(remBeg, 2);
    const [p1, p2] = selectMinPlayers(remPro, 2);

    const teams = [
      { team1: [b1, p1], team2: [b2, p2] },
      { team1: [b1, p2], team2: [b2, p1] },
    ];

    const scored = teams.map((t) => {
      const k1 = t.team1.join("-");
      const k2 = t.team2.join("-");

      const score =
        (playCount[b1] || 0) +
        (playCount[b2] || 0) +
        (playCount[p1] || 0) +
        (playCount[p2] || 0) +
        (partnerCount[k1] || 0) * 5 +
        (partnerCount[k2] || 0) * 5 +
        Math.random() * 0.1;

      return { ...t, score };
    });

    scored.sort((a, b) => a.score - b.score);

    const picked = scored[0];
    courts.push(picked);

    [...picked.team1, ...picked.team2].forEach((p) => {
      playCount[p] = (playCount[p] || 0) + 1;
    });

    remBeg = remBeg.filter(
      (x) => !picked.team1.includes(x) && !picked.team2.includes(x)
    );
    remPro = remPro.filter(
      (x) => !picked.team1.includes(x) && !picked.team2.includes(x)
    );
  }

  return courts;
}
