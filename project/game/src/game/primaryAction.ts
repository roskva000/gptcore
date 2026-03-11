import type Phaser from 'phaser';

export const shouldHandlePrimaryActionKey = (
  event?: Pick<KeyboardEvent, 'repeat'> | null,
): boolean => !event?.repeat;

export const shouldHandlePrimaryActionPointer = (
  pointer?: Pick<Phaser.Input.Pointer, 'button' | 'event'> | null,
): boolean => {
  if (!pointer) {
    return true;
  }

  const nativeEvent = pointer.event;

  if (
    nativeEvent &&
    'button' in nativeEvent &&
    typeof nativeEvent.button === 'number'
  ) {
    return nativeEvent.button === 0;
  }

  return pointer.button === 0;
};
