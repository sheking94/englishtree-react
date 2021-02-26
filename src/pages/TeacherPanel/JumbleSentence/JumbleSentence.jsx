import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setData, setExcercise } from '../../../store/reducers/jumbleSentenceSlice';

import ExcerciseGenerator from '../../../components/ExcerciseGenerator/ExcerciseGenerator';
import Header from './subcomponents/Header/Header';
import AddSentence from './subcomponents/AddSentence/AddSentence';
import ShowExcercise from './subcomponents/ShowExcercise/ShowExcercise';

// simulate fetching data
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const getData = async () => {
  await sleep(500);
  const data = [
    {
      category: 'present simple',
      sentences: [
        'I am.',
        'He likes heavy metal music.',
        'My mother always complains about my appearance.',
      ],
    },
    {
      category: 'present continous',
      sentences: [
        'My son is doing his homework now.',
        'My cat is taking a crap right now in his litter box.',
      ],
    },
    {
      category: 'past simple',
      sentences: [
        'Adolf Hitler started the Second World War.',
        'Yesterday I had a conversation about pedophiles in polish church with my priest friend.',
      ],
    },
  ];
  return data;
};

const JumbleSentence = () => {
  const addExcerciseCount = useSelector(
    (state) => state.jumbleSentence.addExcerciseCount
  );

  const dispatch = useDispatch();

  // data fetch
  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await getData();
      dispatch(setData(fetchedData));
    };
    fetchData();
  }, [addExcerciseCount, dispatch]);

  return (
    <ExcerciseGenerator
      title="Random sentence"
      header={<Header />}
      addData={<AddSentence />}
      displayData={<ShowExcercise />}
    />
  );
};

export default JumbleSentence;
