import { nanoid } from 'nanoid';

export const generateEventId = () => {
  return `event-${nanoid(10)}`;
};
