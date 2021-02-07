export const normalizeWord = (str) => {
  // -- Remove unnecessary white spaces and change to lower case
  return str.trim().toLowerCase().replace(/\s\s+/g, ' ');
};

export const wordIsCorrect = (str, language = 'en', canBeSingleLetter = false) => {
  // -- STRING MUST BE NORMALIZED FIRST!!!

  // -- Returns TRUE if the word is correct and FALSE if not

  // -- Check if the word string...
  // -- ...is empty
  if (str === '') return false;

  // -- ...is not too short
  if (!canBeSingleLetter) {
    if (str.length < 2) return false;
  }

  // -- ...doesn't consist of only one and the same letter (e.g. 'aaaaa' cannot be shuffled and is not a correct word)
  if (!canBeSingleLetter)
    if (str.split('').every((val, _, arr) => val === arr[0])) return false;

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
  if (str.match(regex) !== null) return false;

  return true;
};
