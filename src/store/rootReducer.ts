import { combineReducers } from 'redux';
import authApi from '../api/auth';
import avatarApi from '../api/avatar';
import { recommendationApi } from '../api/recommendations';
import usersApi from '../api/roles';
import { specializationApi } from '../api/specializations';
import tariffsApi from '../api/tariffs';
import { taskApi } from '../api/tasks';
import userApi from '../api/user';
import userEventsApi from '../api/user-events';
import authSlice from './slices/authSlice';
import tasksPageSlice from './slices/tasksPageSlice';
import userReducer from './slices/user';
import usersReducer from './slices/users';
import avatarReducer from './slices/avatar';
import analyzesApi from '../api/analyzes';
import analyzeAnswersApi from '../api/analyze-answers';
import progressApi from '../api/progress';

export const rootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [userEventsApi.reducerPath]: userEventsApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [avatarApi.reducerPath]: avatarApi.reducer,
  [taskApi.reducerPath]: taskApi.reducer,
  [tariffsApi.reducerPath]: tariffsApi.reducer,
  [specializationApi.reducerPath]: specializationApi.reducer,
  [recommendationApi.reducerPath]: recommendationApi.reducer,
  [analyzesApi.reducerPath]: analyzesApi.reducer,
  [analyzeAnswersApi.reducerPath]: analyzeAnswersApi.reducer,
  [progressApi.reducerPath]: progressApi.reducer,
  authSlice: authSlice,
  tasksPageSlice: tasksPageSlice,
  user: userReducer,
  users: usersReducer,
  avatar: avatarReducer,
});
