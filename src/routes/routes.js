import ABCSentence from '../pages/Excercises/ABCSentence/ABCSentence';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import JumbleWord from '../pages/Excercises/JumbleWord/JumbleWord';
import JumbleSentence from '../pages/Excercises/JumbleSentence/JumbleSentence';
import LandingPage from '../pages/LandingPage/LandingPage';
import TeacherPanel from '../pages/Excercises/TeacherPanel';

const routes = [
  {
    path: '/',
    component: LandingPage,
  },
  {
    path: '/teacher/abcsentence',
    component: ABCSentence,
  },
  {
    path: '/teacher/jumbleword',
    component: JumbleWord,
  },
  {
    path: '/teacher/jumblesentence',
    component: JumbleSentence,
  },
  {
    path: '/teacher/jumbletext',
    component: TeacherPanel,
  },
  {
    path: '',
    component: ErrorPage,
  },
];

export default routes;
