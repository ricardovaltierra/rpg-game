import 'regenerator-runtime';

const nodeFetch = require('node-fetch');

export const load = async () => {
  const game = JSON.stringify({
    name: 'Little Red Riding Hood',
  });
  const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';
  const data = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: game,
  };

  const response = await nodeFetch(url, data);
  const result = await response.json();

  return result;
};

export const postPunctuation = async (name, score) => {
  const post = JSON.stringify({
    user: name,
    score,
  });
  const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/kCCR0rwutvlGQVl87bD3/scores/';
  const data = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: post,
  };

  const response = await nodeFetch(url, data);
  const result = await response.json();
  return result.result;
};

const sortResults = (data) => {
  const arr = [];

  for (let i = 0; i < data.length; i += 1) {
    arr.push([data[i].user, data[i].score]);
  }

  arr.sort((a, b) => b[1] - a[1]);

  return arr;
};

export const getPunctuations = async () => {
  const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/kCCR0rwutvlGQVl87bD3/scores/';
  const data = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const response = await nodeFetch(url, data);
  const result = await response.json();

  return sortResults(result.result);
};