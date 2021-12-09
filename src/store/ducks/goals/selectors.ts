import { RootState } from '../../store';
import { GoalsState } from './contracts/state';

export const selectGoalsState = (state: RootState): GoalsState => state.goals;

export const selectGoalsData = (state: RootState): GoalsState['goals'] =>
  selectGoalsState(state).goals.filter(goal => !goal.completed);

export const selectGoalsResponse = (state: RootState): GoalsState['response'] =>
  selectGoalsState(state).response;

export const selectGoalsStatus = (state: RootState): GoalsState['status'] =>
  selectGoalsState(state).status;

export const selectGoalsLoadingStatus = (state: RootState): string =>
  selectGoalsState(state).status;
