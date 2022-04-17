import s from './UsersTableHeader.module.scss';
import React from 'react';
import SearchInput from '../../../../components/SearchInput/SearchInput';

type UsersTableHeaderProps = {
    userLength: number;
    onFilterBtnClick: () => void;
    filterOpened: boolean;
    query: string;
    onSearch: (q: string) => void;
    onCreateUserBtnClick: () => void;
}

export function UsersTableHeader(props: UsersTableHeaderProps) {
  return <div className={s.titleLine}>
    <div className={s.title}>
      <h3>Все пользователи</h3>
      <div className={s.counter}>
        <p>{props.userLength}</p>
      </div>
    </div>
    <div className={s.options}>
      <SearchInput
        value={undefined as unknown as string}
        onChange={val => {
          return props.onSearch(val);
        }
        } placeholder="Поиск пользователей"/>
      <div className={s.panelBtns}>
        <button
          className={`${s.button} ${s.filterBtn}`}
          onClick={props.onFilterBtnClick}
        >
          <div className={s.btnText}>
            {props.filterOpened ? 'Скрыть фильтры' : 'Показать фильтры'}
          </div>
          <div className={s.btnIcon}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.87774 6.37856C8.87774 8.24523 7.33886 9.75821 5.43887 9.75821C3.53999 9.75821 2 8.24523 2 6.37856C2 4.51298 3.53999 3 5.43887 3C7.33886 3 8.87774 4.51298 8.87774 6.37856ZM20.4933 4.89833C21.3244 4.89833 22 5.56203 22 6.37856C22 7.19618 21.3244 7.85989 20.4933 7.85989H13.9178C13.0856 7.85989 12.4101 7.19618 12.4101 6.37856C12.4101 5.56203 13.0856 4.89833 13.9178 4.89833H20.4933ZM3.50777 15.958H10.0833C10.9155 15.958 11.5911 16.6217 11.5911 17.4393C11.5911 18.2558 10.9155 18.9206 10.0833 18.9206H3.50777C2.67555 18.9206 2 18.2558 2 17.4393C2 16.6217 2.67555 15.958 3.50777 15.958ZM18.5611 20.7778C20.4611 20.7778 22 19.2648 22 17.3992C22 15.5325 20.4611 14.0196 18.5611 14.0196C16.6623 14.0196 15.1223 15.5325 15.1223 17.3992C15.1223 19.2648 16.6623 20.7778 18.5611 20.7778Z"
                fill="#736F8B"
              />
            </svg>
          </div>
        </button>
        {/* TODO: реализовать метод формирования XLSX таблицы */}
        {/* <a */}
        {/*    className={`${s.button} ${s.buttonPrimary} ${s.xlsxBtn}`} */}
        {/*    href={process.env.REACT_APP_BACKEND_URL + '/users/xlsx'} */}
        {/*    download */}
        {/*    target="_blank" */}
        {/* > */}
        {/*    Выгрузить xlsx */}
        {/* </a> */}
        <button
          className={`${s.button} ${s.buttonPrimary} ${s.createBtn}`}
          onClick={props.onCreateUserBtnClick}
        >
                    Создать аккаунт
        </button>
      </div>
    </div>
  </div>;
}
