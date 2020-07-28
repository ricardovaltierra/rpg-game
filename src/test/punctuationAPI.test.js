/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */

import { load, postPunctuation, getPunctuations } from '../api/punctuationAPI';

test('post a new game name and get message with Game ID`', () => {
  load().then(message => {
    expect(message.result).toMatch(/Game with ID: [a-z0-9]+ added./i);
  });
});

test('post a a new score and get success message`', () => {
  postPunctuation('JestTestUSer', 10).then(returnedObject => {
    returnedObject.map((result) => {
      expect(result[0].toString()).toMatch(/Leaderboard score created correctly./);
    });
  }).catch((error) => {
    expect(error[0].toString()).not.toMatch(/Leaderboard score created correctly./);
  });
});

test('get the JOSN object with the scores stored`', () => {
  getPunctuations().then(punctuations => {
    punctuations.map((user) => {
      expect(typeof user[0]).toBe('string');
      expect(typeof user[1]).toBe('string');
    });
  }).catch((error) => {
    expect(typeof error[0]).not.tobe('string');
  });
});
