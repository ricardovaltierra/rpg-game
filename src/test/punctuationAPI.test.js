/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */

import { load, postPunctuation, getPunctuations } from '../api/punctuationAPI';

describe('API POST game name', () => {
  
  test('it returns message with Game ID', () => {
    load().then(message => {
      expect(message.result).toMatch(/Game with ID: [a-z0-9]+ added./i);
    });
  });

  test('it returns message message error', () => {
    load().catch(message => {
      expect(message.result).not.toMatch(/Game with ID: [a-z0-9]+ added./i);
    });
  });

});

describe('API POST new score', () => {

  test('it returns success message', () => {
    postPunctuation('User', 10).then(returnedObject => {
      returnedObject.map((result) => {
        expect(result[0].toString()).toMatch(/Leaderboard score created correctly./);
      });
    });
  });

  test('it returns message error', () => {
    postPunctuation('User', 10).catch(message => {
      expect(message.result).not.toMatch(/Leaderboard score created correctly./);
    });
  });

});

describe('API GET JSON object', () => {
  
  test('it returns object with items containing string/number pairs', () => {
    getPunctuations().then(punctuations => {
      punctuations.map((user) => {
        expect(typeof user[0]).toBe('string');
        expect(typeof user[1]).toBe('number');
      });
    });
  });

  test('it returns message error', () => {
    getPunctuations().catch(message => {
      expect(typeof message.result[0]).toBe('string');
    });
  });
});