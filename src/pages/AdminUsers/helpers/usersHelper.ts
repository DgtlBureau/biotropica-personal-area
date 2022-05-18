import { FilterConfig } from '../components/UserFilter/UsersFilter';
import { User, TARIFF } from '../../../store/rtk/types/user';
import { ROLE } from '../../../store/@types/User';

export const usersFilters: FilterConfig[] = [
  {
    name: 'Роль',
    key: 'roles',
    filters: [
      {
        value: undefined,
        label: 'Все',
      },
      {
        value: ROLE.CLIENT,
        label: 'Пользователь',
      },
      {
        value: ROLE.SPECIALIST,
        label: 'Специалист',
      },
      {
        value: ROLE.ADMIN,
        label: 'Администратор',
      },
    ],
  },
  {
    name: 'Тип тарифа',
    key: 'tariff',
    filters: [
      {
        value: undefined,
        label: 'Все',
      },
      {
        value: TARIFF.BASE,
        label: 'Базовый пакет',
      },
      {
        value: TARIFF.EXTENDED,
        label: 'Расширенный пакет',
      },
      {
        value: TARIFF.INDIVIDUAL,
        label: 'Индивидуальный пакет',
      },
    ],
  },
  {
    name: 'Анкета',
    key: 'questionnaire',
    filters: [
      {
        value: undefined,
        label: 'Все',
      },
      {
        value: true,
        label: 'Заполнена',
      },
      {
        value: false,
        label: 'Не заполнена',
      },
    ],
  },
];

export function filterUsersByRoles(users: User[], roles: (ROLE | undefined)[]) {
  if (roles.length === 1 && !roles[0]) {
    return users;
  }

  return users.filter(user => {
    const userRoles = user.roles.map(it => it.name);
    for (const userRole of userRoles) {
      if (roles.includes(userRole)) {
        return true;
      }
    }
    return false;
  });
}

export function filterUsersByQuestionnaire(users: User[], value: boolean) {
  return users.filter(user => {
    if (value) {
      return user.questionHash === 'FINISHED';
    } else {
      return user.questionHash === null;
    }
  });
}

export function filterUsersByTariffs(
  users: User[],
  tariffs: (TARIFF | undefined)[],
) {
  if (tariffs.length === 1 && !tariffs[0]) {
    return users;
  }

  return users.filter(user => {
    const userTariff = user.tariff;
    return tariffs.includes(userTariff);
  });
}

export function filterUsersByQuery(users: User[], q: string) {
  const query = q.toLowerCase().trim();
  return users.filter(user => {
    return (
      user.name?.toLowerCase().includes(query) ||
      user.lastname?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query)
    );
  });
}
