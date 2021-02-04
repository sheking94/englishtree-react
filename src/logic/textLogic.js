export const normalizeParagraph = (str) => {
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
    .replace(/\./g, '. ')
    .replace(/!/g, '! ')
    .replace(/\?/g, '? ')
    .replace(/\s\s+/g, ' ')
    .trim();
};

export const splitTextByNewLine = (str) => {
  // -- Remove extra line separators and split text by a line separator
  return str.replace(/\n\n+/g, '\n').split(/\n/g);
};

export const paragraphIsCorrect = (str) => {
  // -- Returns TRUE if the paragraph is correct and FALSE if not
  // -- Input paragraph must be normalized with normalizeParagraph before using this method

  // -- Check if the sentence string...
  // -- ...is empty
  if (str === '') throw new Error('Enter a paragraph!');

  // -- ...is not too short (shortest sentence: 'I am.' - 5 characters)
  if (str.length < 5) throw new Error('Paragraph is too short!');

  // -- ...has at least 2 words
  if (str.split(' ').length < 2)
    throw new Error('Paragraph must have at least 2 words!');

  // -- ...has the first letter upper case
  if (str[0].match(/[A-Z]/) === null)
    throw new Error('First letter must be uppercase!');

  // -- ...has an ending mark (.!?)
  if (str[str.length - 1].match(/[.!?]/) === null)
    throw new Error('Paragraph must have an ending mark!');

  // -- ...has only letters, spaces and special marks (,.!?)
  if (str.match(/[^a-z,.!?:\-_@'"`$%& ]/i) !== null)
    throw new Error('Special characters are not allowed!');

  return true;
};
