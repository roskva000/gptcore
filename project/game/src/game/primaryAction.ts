export const shouldHandlePrimaryActionKey = (
  event?: Pick<KeyboardEvent, 'repeat'> | null,
): boolean => !event?.repeat;
