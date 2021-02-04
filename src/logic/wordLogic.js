export const normalizeWord = (str) => {
  // -- Remove unnecessary white spaces and change to lower case
  return str.trim().toLowerCase().replace(/\s\s+/g, ' ');
};

export const wordIsCorrect = (str, language = 'en', canBeSingleLetter = false) => {
  // -- String must be normalized first

  // -- Returns TRUE if the word is correct and FALSE if not

  // -- Check if the word string...
  // -- ...is empty
  if (str === '') throw new Error('Enter a word!');

  // -- ...is not too short
  if (!canBeSingleLetter) {
    if (str.length < 2) throw new Error('Word is too short!');
  }

  // -- ...doesn't consist of only one and the same letter (e.g. 'aaaaa' cannot be shuffled and is not a correct word)
  if (!canBeSingleLetter)
    if (str.split('').every((val, _, arr) => val === arr[0]))
      throw new Error('Word is not correct!');

  // -- ...has only letters (and language-specific characters)
  let regex;
  switch (language) {
    case 'en':
      regex = /[^a-z ]/i;
      break;
    case 'pl':
      regex = /[^a-ząćęłńóśźż ]/i;
      break;
    default:
      console.error('Choose a correct language!');
      break;
  }
  if (str.match(regex) !== null)
    throw new Error('Special characters are not allowed!');

  return true;
};
