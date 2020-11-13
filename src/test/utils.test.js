import capitalize from '../utils/capitalizeString';
import { createNewScore, getAllScores } from '../utils/leaderBoardHandler';
import '@babel/polyfill';

it('Capitalizes a string', () => {
  expect(capitalize('hello')).toBe('Hello');
});

const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/4scKCdwS4rXhTTO4S9JU/scores';
const player = {
  user: 'John Does',
  score: 34,
};

describe('Creates a new player and receives an array of players\' scores', () => {
  test('It creates a new player', async () => {
    await expect(createNewScore(player.user, player.score, url)).toBeTruthy();
  });

  test('It receives all scores', async () => {
    const a = await expect(getAllScores(url));
    expect(a).toBeInstanceOf(Object);
  });
})