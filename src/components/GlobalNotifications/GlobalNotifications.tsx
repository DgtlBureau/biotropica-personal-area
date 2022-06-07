import React, { ReactElement, ReactNode, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import { notification } from '../../config/notification/notificationForm';
import { useQuery } from '../../hooks/useQuery';
import { eventBus, EventTypes } from '../../services/EventBus';
import {
  iNotification,
  iNotificationDismiss,
  Store,
} from 'react-notifications-component';
import { selectIsAuthorized } from '../../store/slices/authSlice';
import { useAppSelector } from '../../store/storeHooks';
import { useGetNotificationsQuery } from '../../api/notifications';

export enum NotificationType {
  DANGER = 'danger',
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  DEFAULT = 'default',
}
export interface Notification extends Partial<iNotification> {
  type: NotificationType;
  message: string | ReactNode;
  title?: string;
  dismiss?: iNotificationDismiss;
}

const GlobalNotifications = (): ReactElement => {
  const query = useQuery();
  const history = useHistory();
  const location = useLocation();
  const isAuth = useAppSelector(selectIsAuthorized);
  const { data: notifications = [] } = useGetNotificationsQuery();

  useEffect(() => {
    const message = query.get('message');
    if (message) {
      Store.addNotification({
        ...notification,
        title: 'Внимание!',
        message: decodeURI(message),
        type: NotificationType.INFO,
      });
      query.delete('message');
      history.push(location.pathname + '?' + query.toString());
    }
  }, [location.search, query, history, location.pathname]);

  useEffect(() => {
    Store.removeNotification('delete-notification');
  }, [location.pathname]);

  useEffect(() => {
    const getNotificationTitle = (type: NotificationType) => {
      switch (type) {
        case NotificationType.DANGER:
          return 'Произошла ошибка!';
        case NotificationType.SUCCESS:
          return 'Успешно!';
        case NotificationType.DEFAULT:
        case NotificationType.INFO:
        case NotificationType.WARNING:
          return 'Внимание!';
        default:
          break;
      }
    };
    eventBus.on(EventTypes.notification, res => {
      Store.addNotification({
        ...notification,
        ...res,
        title: res.title ? res.title : getNotificationTitle(res.type),
        message: res?.message || 'Нет сообщения',
        type: res.type,
      });
    });

    eventBus.on(EventTypes.removeNotification, (id: string) => {
      Store.removeNotification(id);
    });
  }, []);

  useEffect(() => {
    if (!isAuth) {
      return;
    }
    notifications.forEach(notification => {
      eventBus.emit(EventTypes.notification, {
        container: 'top-right',
        message: (
          <div>
            {notification.message}
            <button
              style={{ marginLeft: '10px' }}
              onClick={() => history.push(notification.link)}
            >
              перейти
            </button>
          </div>
        ),
        type: NotificationType.DEFAULT,
      });
    });
  }, [history, isAuth]);

  return <></>;
};

export default GlobalNotifications;
