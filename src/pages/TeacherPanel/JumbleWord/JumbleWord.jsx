import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setData, setExcercise } from '../../../store/reducers/jumbleWordSlice';

import ExcerciseGenerator from '../../../components/ExcerciseGenerator/ExcerciseGenerator';
import Header from './subcomponents/Header/Header';
import ShowExcercise from './subcomponents/ShowExcercise/ShowExcercise';
import AddWord from './subcomponents/AddWord/AddWord';

// simulate fetching data
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const getData = async () => {
  await sleep(500);
  const data = [
    {
      category: 'sport',
      words: ['football', 'tennis', 'cricket', 'swimming'],
    },
    {
      category: 'family',
      words: ['mother', 'father', 'son', 'daughter'],
    },
    {
      category: 'animals',
      words: [],
    },
    {
      category: 'food',
      words: ['hamburger', 'pizza', 'sandwich'],
    },
  ];
  return data;
};

const JumbleWord = () => {
  const addExcerciseCount = useSelector(
    (state) => state.jumbleWord.addExcerciseCount
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
      title="Random word"
      header={<Header />}
      addData={<AddWord />}
      displayData={<ShowExcercise />}
    />
  );
};

export default JumbleWord;
