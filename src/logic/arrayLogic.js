export const shuffleArray = (array) => {
  // ------ Fisher–Yates shuffle algorithm ------
  let m = array.length,
    t,
    i;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = ~~(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
};

export const removeFromArray = (array, element) =>
  array.filter((el) => el !== element);
