import { setPunctuation, getPunctuation, resetPunctuation } from '../api/punctuation.js';

test('receive a default punctuation of 0 on getPunctuation`', () => {
  expect(getPunctuation()).toEqual(0);
});

test('set a puncutation of 150 and return message `Punctuation 150`', () => {
  expect(setPunctuation(150)).toStrictEqual('Punctuation 150');
});

test('get the punctuation of between 149 and 151 (150)`', () => {
  expect(getPunctuation()).toBeGreaterThan(149);
  expect(getPunctuation()).toBeLessThan(151);
});

test('reset punctuation and get message `Punctuation 0`', () => {
  expect(resetPunctuation()).toStrictEqual('Punctuation 0');
});

test('should not return 10 since set to 0 on last test', () => {
  expect(getPunctuation()).not.toEqual(10);
});
