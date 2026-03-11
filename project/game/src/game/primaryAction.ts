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

export const isPrimaryPointerDown = (
  pointer?: Pick<Phaser.Input.Pointer, 'isDown' | 'button' | 'event'> | null,
): boolean => {
  if (!pointer?.isDown) {
    return false;
  }

  const nativeEvent = pointer.event;

  if (
    nativeEvent &&
    'buttons' in nativeEvent &&
    typeof nativeEvent.buttons === 'number'
  ) {
    if (nativeEvent.buttons === 0) {
      return shouldHandlePrimaryActionPointer(pointer);
    }

    return (nativeEvent.buttons & 1) === 1;
  }

  return shouldHandlePrimaryActionPointer(pointer);
};
