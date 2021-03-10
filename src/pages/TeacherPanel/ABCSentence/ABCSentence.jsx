import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setData } from '../../../store/reducers/abcSentenceSlice';

import ExcerciseGenerator from '../../../components/ExcerciseGenerator/ExcerciseGenerator';
import AddABC from './subcomponents/AddABC/AddABC';
import Header from './subcomponents/Header/Header';
import ShowExcercise from './subcomponents/ShowExcercise/ShowExcercise';

// simulate fetching data
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const getData = async () => {
  await sleep(500);
  const data = [
    {
      category: 'present perfect',
      sentences: [
        {
          sentence: "Our dinner's ready. The table has already been _.",
          answers: ['lain', 'lied', 'laid', 'lay'],
          correct: 1,
        },
      ],
    },
    {
      category: 'past simple',
      sentences: [
        {
          sentence: 'Sara _ her best at the exam, but she failed it anyway.',
          answers: ['went', 'did', 'made', 'attempted'],
          correct: 1,
        },
      ],
    },
    {
      category: 'passive form',
      sentences: [
        {
          sentence:
            'The soldiers were _ to run with a complete field equipment for three hours',
          answers: ['bother', 'mess', 'prevent', 'occupy'],
          correct: 0,
        },
      ],
    },
  ];
  return data;
};

const ABCSentence = () => {
  const addExcerciseCount = useSelector(
    (state) => state.abcSentence.addExcerciseCount
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
      addData={<AddABC />}
      displayData={<ShowExcercise />}
    />
  );
};

export default ABCSentence;
