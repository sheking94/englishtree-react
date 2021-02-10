import React from 'react';

const ShowExcercise = ({ data }) => {
  console.log(data);
  const categories = data.length
    ? data.map(({ category, words }) => {
        const wordsEl = words.length
          ? words.map(({ word, shuffled }) => (
              <div key={word}>
                <p>{word}</p>
                <p>{shuffled}</p>
              </div>
            ))
          : `No words in ${category}.`;

        return (
          <div key={category}>
            <h2>{category}</h2>
            {wordsEl}
          </div>
        );
      })
    : 'Nothing to show.';

  return <div>{categories}</div>;
};

export default ShowExcercise;
