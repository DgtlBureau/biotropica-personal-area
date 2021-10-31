import { call, put, takeLatest } from 'redux-saga/effects';
import RecommendationService from '../../../services/RecommendationService';
import { LoadingStatus } from '../../types';
import {
  setRecommendationData,
  setRecommendationLoadingStatus,
  setRecommendationResponse,
} from './actionCreators';
import {
  UpdateRecommendationActionInterface,
  FetchRecommendationDataActionInterface,
  RecommendationActionsType,
  CreateRecommendationDataActionInterface,
  DeleteRecommendationActionInterface,
} from './contracts/actionTypes';

export function* fetchRecommendationDataRequest({
  payload,
}: FetchRecommendationDataActionInterface): any {
  yield put(setRecommendationLoadingStatus(LoadingStatus.LOADING));
  const { data, status } = yield call(RecommendationService.getOne, payload);
  if (status === 200) {
    yield put(setRecommendationData(data));
    yield put(setRecommendationLoadingStatus(LoadingStatus.SUCCESS));
  } else {
    yield put(
      setRecommendationResponse({ statusCode: status, message: data.message })
    );
    yield put(setRecommendationLoadingStatus(LoadingStatus.ERROR));
  }
}

export function* createRecommendationDataRequest({
  payload,
}: CreateRecommendationDataActionInterface): any {
  yield put(setRecommendationLoadingStatus(LoadingStatus.LOADING));
  const { data, status } = yield call(RecommendationService.create, payload);
  if (status === 201) {
    yield put(setRecommendationData(data));
    yield put(setRecommendationLoadingStatus(LoadingStatus.SUCCESS));
  } else {
    yield put(setRecommendationLoadingStatus(LoadingStatus.ERROR));
  }
}

export function* fetchUpdateRecommendationRequest({
  payload,
}: UpdateRecommendationActionInterface): any {
  yield put(setRecommendationLoadingStatus(LoadingStatus.LOADING));
  const { data, status } = yield call(RecommendationService.update, payload);
  if (status === 200) {
    yield put(setRecommendationData(data));
    yield put(
      setRecommendationResponse({
        statusCode: status,
        message: 'Данные обновлены',
      })
    );
    yield put(setRecommendationLoadingStatus(LoadingStatus.SUCCESS));
  } else {
    yield put(setRecommendationResponse(data));
    yield put(setRecommendationLoadingStatus(LoadingStatus.ERROR));
  }
}

export function* fetchDeleteRecommendationRequest({
  payload,
}: DeleteRecommendationActionInterface): any {
  yield put(setRecommendationLoadingStatus(LoadingStatus.LOADING));
  const { data, status } = yield call(RecommendationService.delete, payload);
  if (status === 200) {
    yield put(setRecommendationData(undefined));
    yield put(
      setRecommendationResponse({ statusCode: status, message: data.message })
    );
    yield put(setRecommendationLoadingStatus(LoadingStatus.SUCCESS));
  } else {
    yield put(setRecommendationResponse(data));
    yield put(setRecommendationLoadingStatus(LoadingStatus.ERROR));
  }
}

export function* recommendationSaga(): any {
  yield takeLatest(
    RecommendationActionsType.FETCH_RECOMMENDATION_DATA,
    fetchRecommendationDataRequest
  );
  yield takeLatest(
    RecommendationActionsType.FETCH_UPDATE_RECOMMENDATION,
    fetchUpdateRecommendationRequest
  );
  yield takeLatest(
    RecommendationActionsType.CREATE_RECOMMENDATION_DATA,
    createRecommendationDataRequest
  );
  yield takeLatest(
    RecommendationActionsType.FETCH_DELETE_RECOMMENDATION,
    fetchDeleteRecommendationRequest
  );
}
