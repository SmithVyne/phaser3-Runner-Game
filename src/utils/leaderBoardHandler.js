import gameDefaults from '../config/gameDefaults';

// const createGameURL = (response) => {
//   const gameId = response.split(' ')[3];
//   const gameURL = `${baseUrl}/games/${gameId}/scores`;
//   return gameURL;
// };

// const baseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';

// const createAGame = async (gameData) => {
//   const newGame = await fetch( `${baseUrl}/games/`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(gameData)
//   });

//   const response = await newGame.json();
//   gameDefaults.gameURL = createGameURL(response['result']);
// };

const createNewScore = async (playerName, playerScore, gameURL) => {
  const score = { 
    "user": playerName,
    "score": playerScore
  };
  
  const newScore = await fetch( gameURL , {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(score)
  });
  return newScore.ok;
};

const getAllScores =  async (gameURL) => {
  const scoresReq = await fetch(gameURL, {method: 'GET'});
  const response = await scoresReq.json();
  const allScores = response['result'];
  // console.log(allScores[0]);
  return allScores;
};

export {createNewScore, getAllScores};