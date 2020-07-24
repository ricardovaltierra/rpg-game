let punctuation = 0;

export const getPunctuation = () => punctuation;

export const setPunctuation = (value) => {
  punctuation += value;
  return `Punctuation ${ punctuation }`;
};

export const resetPunctuation = () => {
  punctuation = 0;
  return `Punctuation ${ punctuation }`;
};
