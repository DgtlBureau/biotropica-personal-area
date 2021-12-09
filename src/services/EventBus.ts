import { Notification } from '../components/GlobalNotifications/GlobalNotifications';

export enum EventTypes {
  routerPush = 'router.push',
  notification = 'notification',
}
type EventArguments = {
  [EventTypes.routerPush]: string;
  [EventTypes.notification]: Notification;
};
const listeners: Record<EventTypes, EventListenerCallback<EventTypes>[]> = {
  [EventTypes.routerPush]: [],
  [EventTypes.notification]: [],
};
type EventListenerCallback<T extends EventTypes> = (
  payload: EventArguments[T]
) => void;

class EventBus {
  listeners = listeners;
  emit<K extends EventTypes>(key: K, payload: EventArguments[K]) {
    this.listeners[key].forEach(callback => callback(payload));
  }
  on<K extends EventTypes>(key: K, callback: EventListenerCallback<K>) {
    this.listeners[key].push(callback as EventListenerCallback<EventTypes>);
  }
  off<K extends EventTypes>(key: K, callback: EventListenerCallback<K>) {
    const index = this.listeners[key].indexOf(
      callback as EventListenerCallback<EventTypes>
    );
    if (index === -1) {
      return;
    }

    this.listeners[key].splice(index, 1);
  }
}

export const eventBus = new EventBus();
