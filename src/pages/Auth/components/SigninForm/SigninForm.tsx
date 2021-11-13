import { Formik, FormikHelpers } from 'formik';

import s from './SigninForm.module.scss';

import { Loader } from '../../../../shared/Form/Loader/Loader';
import { Input } from '../../../../shared/Form/Input/Input';
import { Button } from '../../../../shared/Form/Button/Button';
import { SigninData } from '../../../../store/ducks/user/contracts/state';
import { Link } from 'react-router-dom';

interface Props {
  onSubmit: (values: SigninData, options: FormikHelpers<SigninData>) => void;
  loader: boolean;
  validationSchema: any;
}

export const SigninForm = ({ onSubmit, loader, validationSchema }: Props) => {
  function isDisabled(isValid: boolean, dirty: boolean) {
    return (!isValid && !dirty) || loader;
  }
  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validateOnBlur
        onSubmit={(values: SigninData, options: FormikHelpers<SigninData>) =>
          onSubmit(values, options)
        }
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
            <h1 className={s.title}>Вход</h1>
            <h2 className={s.subtitle}>
              Пожалуйста, заполните информацию ниже:
            </h2>

            <div className={s.input__wrapper}>
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Email"
                name="email"
                value={values.email}
                type="email"
                options={{ touched, errors }}
              />
            </div>

            <div className={s.input__wrapper}>
              <Link
                to={`/forgot-password?email=${values.email}`}
                className={s.forgot}
              >
                Восстановить
              </Link>
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Пароль"
                name="password"
                value={values.password}
                type="password"
                options={{ touched, errors }}
              />
            </div>

            <Button
              disabled={isDisabled(isValid, dirty)}
              type="submit"
              onClick={() => handleSubmit()}
              options={{
                content: loader ? <Loader /> : 'Войти',
                setDisabledStyle: isDisabled(isValid, dirty),
                width: '100%',
                height: '50px',
              }}
            />

            <Link className={s.signin} to="/signup">
              Нет учетной записи? Создайте сейчас
            </Link>
          </div>
        )}
      </Formik>
    </>
  );
};
