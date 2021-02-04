export const normalizeSentence = (str) => {
  // -- Remove white space at start and end
  // -- Remove extra white spaces
  // -- Normalize spaces before and after special marks
  // -- Remove extra white spaces created by normalizing special marks
  // -- Trim again to remove space after last sentence's ending mark
  // -- Return the string
  return str
    .trim()
    .replace(/\s\s+/g, ' ')
    .replace(/( ,)/g, ',')
    .replace(/( \.)/g, '.')
    .replace(/( !)/g, '!')
    .replace(/( \?)/g, '?')
    .replace(/,/g, ', ')
    .replace(/\s\s+/g, ' ');
};

export const normalizeSentenceToArray = (str) => {
  // -- Remove white space at start and end
  // -- Replace commas and sentence end marks for easy splitting into an array
  // -- Remove unnecessary whitespaces
  return str
    .trim()
    .replace(/,/g, ' , ')
    .replace(/\./g, ' .')
    .replace(/!/g, ' !')
    .replace(/\?/g, ' ?')
    .replace(/\s\s+/g, ' ');
};

export const sentenceToArray = (str) => {
  // -- Split into an array
  // -- Return the array
  return str.split(' ');
};

export const arrayToSentence = (arr) => {
  // -- Join sentence array into one string sentence
  // -- Join with one space
  // -- Remove spaces before special marks
  return arr
    .join(' ')
    .replace(/( ,)/g, ',')
    .replace(/( \.)/g, '.')
    .replace(/( !)/g, '!')
    .replace(/( \?)/g, '?');
};

export const sentenceIsCorrect = (str, language = 'en', withBlank = false) => {
  // -- Normalize before use!

  // -- Returns TRUE if the sentence is correct and FALSE if not

  // -- Check if the sentence string...
  // -- ...is empty
  if (str === '') throw new Error('Enter a sentence!');

  // -- ...is not too short (shortest sentence: 'I am.' - 5 characters)
  if (str.length < 5) throw new Error('Sentence is too short!');

  // -- ...has at least 2 words
  if (str.split(' ').length < 2)
    throw new Error('Sentence must have at least 2 words!');

  // -- ...has the first letter upper case
  if (!withBlank)
    if (str[0].match(/[A-Z]/) === null)
      throw new Error('First letter must be uppercase!');

  // -- ...has an ending mark (.!?)
  if (str[str.length - 1].match(/[.!?]/) === null)
    throw new Error('Sentence must have an ending mark!');

  // -- ...has only letters, spaces and special marks (,.!?)
  let regex;
  switch (language) {
    case 'en':
      regex = /[^a-z,.!?:\-_@'"`$%& ]/i;
      break;
    case 'pl':
      regex = /[^a-ząćęłńóśźż,.!?:\-_@'"`$%& ]/i;
      break;
    default:
      console.error('Choose a correct language!');
      break;
  }
  if (str.match(regex) !== null)
    throw new Error('Special characters are not allowed!');

  return true;
};
