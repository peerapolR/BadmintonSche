// export function generateTeams(beginners, pros, history) {
//   if (beginners.length === 0 || pros.length === 0) return null;

//   let possiblePairs = [];
//   beginners.forEach((b) => {
//     pros.forEach((p) => {
//       possiblePairs.push([b, p]);
//     });
//   });

//   const playedTeams = history.flatMap((match) => [
//     match.team1.join(","),
//     match.team2.join(","),
//   ]);

//   let filtered = possiblePairs.filter(
//     (pair) => !playedTeams.includes(pair.join(","))
//   );

//   if (filtered.length < 2) return null;

//   filtered = filtered.sort(() => Math.random() - 0.5);

//   for (let i = 0; i < filtered.length; i++) {
//     for (let j = i + 1; j < filtered.length; j++) {
//       const team1 = filtered[i];
//       const team2 = filtered[j];

//       const playersSet = new Set([...team1, ...team2]);
//       if (playersSet.size === team1.length + team2.length) {
//         return [team1, team2];
//       }
//     }
//   }

//   return null;
// }

export function generateTeams(beginners, pros, history) {
  if (beginners.length === 0 || pros.length === 0) return null;

  // ✅ 1. นับจำนวนครั้งที่ผู้เล่นแต่ละคนลงเล่น
  const playCount = {};
  history.forEach((match) => {
    [...match.team1, ...match.team2].forEach((player) => {
      playCount[player] = (playCount[player] || 0) + 1;
    });
  });

  // ✅ 2. หาแมตช์ล่าสุดเพื่อกันผู้เล่นที่เพิ่งเล่น (ลดโอกาสซ้ำทันที)
  const lastMatch = history[history.length - 1];
  const recentPlayers = lastMatch
    ? [...lastMatch.team1, ...lastMatch.team2]
    : [];

  // ✅ 3. กันผู้เล่นที่เพิ่งเล่นออกจาก pool (ชั่วคราว)
  const availableBeginners = beginners.filter(
    (b) => !recentPlayers.includes(b)
  );
  const availablePros = pros.filter((p) => !recentPlayers.includes(p));

  // ✅ 4. fallback ถ้าผู้เล่นไม่พอ (หลังจากกัน recent ออก)
  const finalBeginners =
    availableBeginners.length >= 2 ? availableBeginners : beginners;
  const finalPros = availablePros.length >= 2 ? availablePros : pros;

  // ✅ 5. หาค่าจำนวนการเล่นที่น้อยสุดในแต่ละกลุ่ม
  const minBeginnerCount = Math.min(
    ...finalBeginners.map((b) => playCount[b] || 0)
  );
  const minProCount = Math.min(...finalPros.map((p) => playCount[p] || 0));

  // ✅ 6. เลือกเฉพาะคนที่มีจำนวนการเล่น = น้อยสุด (โอกาสเล่นน้อยสุด)
  const filteredBeginners = finalBeginners.filter(
    (b) => (playCount[b] || 0) === minBeginnerCount
  );
  const filteredPros = finalPros.filter(
    (p) => (playCount[p] || 0) === minProCount
  );

  // ✅ 7. ถ้าคนไม่พอ (เช่นมีคนที่น้อยสุดน้อยกว่า 2) ให้รวมกลุ่มข้างเคียง
  const poolBeginners =
    filteredBeginners.length >= 2 ? filteredBeginners : finalBeginners;
  const poolPros = filteredPros.length >= 2 ? filteredPros : finalPros;

  // ✅ 8. สร้างคู่ Beginner + Pro
  let possiblePairs = [];
  poolBeginners.forEach((b) => {
    poolPros.forEach((p) => {
      possiblePairs.push([b, p]);
    });
  });

  // ✅ 9. list ทีมที่เคยเล่นแล้ว
  const playedTeams = history.flatMap((match) => [
    match.team1.join(","),
    match.team2.join(","),
  ]);

  // ✅ 10. filter กันทีมที่เคยเล่นคู่กันมาแล้ว
  let filteredPairs = possiblePairs.filter(
    (pair) => !playedTeams.includes(pair.join(","))
  );

  if (filteredPairs.length < 2) return null;

  // ✅ 11. สุ่มลำดับทีม
  filteredPairs = filteredPairs.sort(() => Math.random() - 0.5);

  // ✅ 12. หาคู่สองทีมที่ไม่มีผู้เล่นซ้ำ
  for (let i = 0; i < filteredPairs.length; i++) {
    for (let j = i + 1; j < filteredPairs.length; j++) {
      const team1 = filteredPairs[i];
      const team2 = filteredPairs[j];

      const playersSet = new Set([...team1, ...team2]);
      if (playersSet.size === team1.length + team2.length) {
        return [team1, team2];
      }
    }
  }

  return null; // ไม่มีคู่ที่คนไม่ซ้ำ
}
