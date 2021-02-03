import ErrorPage from '../pages/ErrorPage/ErrorPage';
import JumbleWord from '../pages/TeacherPanel/JumbleWord/JumbleWord';
import LandingPage from '../pages/LandingPage/LandingPage';
import StudentPanel from '../pages/StudentPanel/StudentPanel';
import TeacherPanel from '../pages/TeacherPanel/TeacherPanel';

const routes = [
  {
    path: '/',
    component: LandingPage,
  },
  {
    path: '/student/1',
    component: StudentPanel,
  },
  {
    path: '/student/2',
    component: StudentPanel,
  },
  {
    path: '/student/3',
    component: StudentPanel,
  },
  {
    path: '/teacher/jumbleword',
    component: JumbleWord,
  },
  {
    path: '/teacher/jumblesentence',
    component: TeacherPanel,
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
