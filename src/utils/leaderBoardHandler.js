const createNewScore = async (playerName, playerScore, gameURL) => {
  const score = {
    user: playerName,
    score: playerScore,
  };

  const newScore = await fetch(gameURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(score),
  });
  return newScore.ok;
};

const getAllScores = async (gameURL) => {
  const scoresReq = await fetch(gameURL, { method: 'GET' });
  const response = await scoresReq.json();
  const allScores = response.result;
  return allScores;
};

export { createNewScore, getAllScores };