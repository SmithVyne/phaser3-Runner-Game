import gameDefaults from '../config/gameDefaults';

const { gameWidth, gameHeight } = gameDefaults;

describe('Contains default game configurations', () => {
  test('Contains width and is equal to 800', () => {
    expect(gameWidth).toBe(800);
  });

  test('Contains height and is equal to 600', () => {
    expect(gameHeight).toBe(600);
  });
});