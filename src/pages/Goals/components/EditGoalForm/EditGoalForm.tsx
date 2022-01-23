import React, { useEffect, useRef, useState } from 'react';
import { Formik, FormikHelpers } from 'formik';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../../shared/Form/Button/Button';
import { Input } from '../../../../shared/Form/Input/Input';
import { Loader } from '../../../../shared/Form/Loader/Loader';
import { Goal, UpdateGoalData } from '../../../../store/ducks/goal/contracts/state';
import {
  fetchGoalData,
  setGoalData,
  setGoalResponse,
  updateGoalData,
} from '../../../../store/ducks/goal/actionCreators';
import {
  selectGoalData,
  selectGoalLoadingStatus,
} from '../../../../store/ducks/goal/selectors';
import { LoadingStatus } from '../../../../store/types';

import s from './EditGoalForm.module.scss';
import { validationSchema } from './validationSchema';
import { Textarea } from '../../../../shared/Form/Textarea/Textarea';

import { selectGoalsData } from '../../../../store/ducks/goals/selectors';
import { setGoalsData } from '../../../../store/ducks/goals/actionCreators';
import { eventBus, EventTypes } from '../../../../services/EventBus';
import { NotificationType } from '../../../../components/GlobalNotifications/GlobalNotifications';

const EditGoalForm = () => {
  const dispatch = useDispatch();
  const loadingStatus = useSelector(selectGoalLoadingStatus);
  const history = useHistory();
  const location = useLocation();

  const goal: Goal | undefined = useSelector(selectGoalData);
  const goals: Goal[] | undefined = useSelector(selectGoalsData);

  const [name, setName] = useState<string>('');

  const [loader, setLoader] = useState<boolean>(false);
  const refResetForm = useRef<(() => void) | null>(null);

  useEffect(() => {
    dispatch(setGoalData(undefined));
    const id = location.pathname.split('/')[3];
    dispatch(fetchGoalData(parseInt(id)));
  }, [location.pathname]);

  useEffect(() => {
    if (!goal && loadingStatus === LoadingStatus.ERROR) {
      history.push('/goals');
    }
  }, [goal, loadingStatus]);

  useEffect(() => {
    if (loadingStatus === LoadingStatus.LOADING) {
      setLoader(true);
    }

    if (
      loadingStatus === LoadingStatus.SUCCESS ||
      loadingStatus === LoadingStatus.ERROR
    ) {
      setLoader(false);
    }
    if (loadingStatus === LoadingStatus.SUCCESS && refResetForm.current) {
      eventBus.emit(EventTypes.notification, {
        title: `Цель «${name}» успешно обновлена!`,
        message: 'Не забывайте регулярно отмечать свой прогресс в достижении цели',
        type: NotificationType.INFO,
        dismiss: {
          onScreen: true,
          duration: 5000,
          pauseOnHover: true,
        },
      });
      dispatch(setGoalResponse(undefined));
      if (goal && goals) {
        dispatch(
          setGoalsData([...goals.filter(fGoal => fGoal.id !== goal.id), goal]),
        );
      }
      refResetForm.current();
      history.push(`/goals/${goal?.id}`);
    }
  }, [loadingStatus]);

  async function onSubmit(
    values: UpdateGoalData,
    options: FormikHelpers<UpdateGoalData>,
  ) {
    refResetForm.current = options.resetForm;
    setName(values?.name || '');
    dispatch(updateGoalData(values));
  }

  function isDisabled(isValid: boolean, dirty: boolean) {
    return (!isValid && !dirty) || loader;
  }

  return (
    <div className={s.add__goals__form}>
      <div className={s.add__goals__form__wrapper}>
        <h2 className={s.form__title}>
          Введите заголовок, описание <br /> и параметры цели
        </h2>
        {goal && (
          <Formik
            initialValues={{
              ...goal,
            }}
            validateOnBlur
            onSubmit={(values: UpdateGoalData, options) => onSubmit(values, options)}
            validationSchema={validationSchema}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              isValid,
              handleSubmit,
              dirty,
            }) => (
              <div className={s.form}>
                <div className={s.input__wrapper}>
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Название задачи"
                    name="name"
                    value={values.name}
                    type="text"
                    options={{ touched, errors }}
                  />
                </div>

                <div className={s.input__wrapper}>
                  <Textarea
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Описание"
                    name="description"
                    value={values.description}
                    type="text"
                    options={{ touched, errors }}
                  />
                </div>

                <div className={s.input__wrapper}>
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Желаемый результат"
                    name="endResult"
                    value={values.endResult}
                    type="text"
                    options={{
                      touched,
                      errors,
                    }}
                  />
                </div>

                <div className={s.buttons}>
                  <Link to={`/goals/${goal.id}`}>
                    <Button
                      options={{
                        width: '100px',
                        height: '30px',
                        classes: { discard: true },
                        content: 'Назад',
                      }}
                    />
                  </Link>

                  <Button
                    disabled={isDisabled(isValid, dirty)}
                    type="submit"
                    onClick={() => handleSubmit()}
                    options={{
                      content: loader
                        ? <Loader />
                        : 'Сохранить',
                      setDisabledStyle: isDisabled(isValid, dirty),
                      width: '100px',
                      height: '30px',
                    }}
                  />
                </div>
              </div>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default EditGoalForm;
