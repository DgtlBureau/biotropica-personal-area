import Consultations from '../pages/Consultations/containers/Consultations';
import ErrorPage from '../pages/ErrorPage/containers/ErrorPage';
import AddGoal from '../pages/Goals/components/AddGoal/AddGoal';
import EditGoalForm from '../pages/Goals/components/EditGoalForm/EditGoalForm';
import Goals from '../pages/Goals/containers/Goals';
import Home from '../pages/Home/containers/Home';
import Policy from '../pages/Policy/containers/Policy';
import Edit from '../pages/Profile/containers/Edit';
import { ProfileLayout } from '../layouts/ProfileLayout';
import Questionnaire from '../pages/Questionnaire/containers/Questionnaire';
import Tariffs from '../pages/Tariffs/containers/Tariffs';
import { Specialist } from '../pages/Specialist/Specialist';
import { ConsultationsList } from '../pages/Consultations/containers/ConsultationsList';
import { ConsultationPage } from '../pages/Consultation/Consultation';

const routes = [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: 'consultations',
    component: Consultations,
    exact: true,
  },
  {
    path: 'consultations/list',
    component: ConsultationsList,
    exact: true,
  },
  {
    path: 'consultations/list/:id',
    component: ConsultationPage,
    exact: true,
  },
  {
    path: 'profile',
    component: ProfileLayout,
    exact: true,
  },
  {
    path: 'profile/edit/:active',
    component: Edit,
    exact: true,
  },
  {
    path: 'profile/edit',
    component: Edit,
    exact: true,
  },
  {
    path: 'profile/tabs/:active',
    component: ProfileLayout,
    exact: true,
  },
  {
    path: 'specialists/:id',
    component: Specialist,
  },

  {
    path: 'tariffs',
    component: Tariffs,
    exact: true,
  },
  {
    path: 'goals/add',
    component: AddGoal,
    exact: true,
  },
  {
    path: 'goals',
    component: Goals,
    exact: true,
  },
  {
    path: 'goals/:id',
    component: Goals,
    exact: true,
  },
  {
    path: 'goals/edit/:id',
    component: EditGoalForm,
    exact: true,
  },
  {
    path: 'policy',
    component: Policy,
    exact: true,
  },
  {
    path: 'questionnaire',
    component: Questionnaire,
    exact: true,
  },

  {
    path: '*',
    component: ErrorPage,
    exact: true,
  },
];

export default routes;
