import { setPlayer, getPlayer }from '../api/player';

test('get player name from player class with default as `player`', () => {
  expect(getPlayer()).toBe('player');
});

test('set player with name UserTest and return string', () => {
  expect(setPlayer('UserTest')).toBe('Player set to: UserTest');
});

test('get player name from player class', () => {
  expect(getPlayer()).toBe('UserTest');
});

test('get player name saved into a variable', () => {
  expect(getPlayer()).not.toBe('User');
});