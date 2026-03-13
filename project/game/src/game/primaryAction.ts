import type Phaser from 'phaser';

export const shouldHandlePrimaryActionKey = (
  event?: Pick<KeyboardEvent, 'repeat'> | null,
): boolean => !event?.repeat;

export const hasFreshMovementInput = (
  movementInputActive: boolean,
  movementInputWasActive: boolean,
): boolean => movementInputActive && !movementInputWasActive;

export const shouldClearMovementReleaseRequirement = (
  movementInputActive: boolean,
): boolean => !movementInputActive;

export const shouldHandlePrimaryActionPointer = (
  pointer?: Pick<Phaser.Input.Pointer, 'button' | 'event' | 'wasTouch'> | null,
): boolean => {
  if (!pointer) {
    return true;
  }

  if (pointer.wasTouch) {
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
  pointer?: Pick<
    Phaser.Input.Pointer,
    'isDown' | 'button' | 'event' | 'wasTouch' | 'primaryDown'
  > | null,
  pointerWasCancelled = false,
): boolean => {
  if (pointerWasCancelled) {
    return false;
  }

  if (!pointer?.isDown) {
    return false;
  }

  if (pointer.wasTouch) {
    return pointer.primaryDown !== false;
  }

  const nativeEvent = pointer.event;

  if (
    nativeEvent &&
    'buttons' in nativeEvent &&
    typeof nativeEvent.buttons === 'number'
  ) {
    if (nativeEvent.buttons === 0) {
      return false;
    }

    return (nativeEvent.buttons & 1) === 1;
  }

  return shouldHandlePrimaryActionPointer(pointer);
};

export const shouldRequirePointerReleaseAfterPause = (
  pointer?: Pick<
    Phaser.Input.Pointer,
    'isDown' | 'button' | 'event' | 'wasTouch' | 'primaryDown'
  > | null,
  pointerWasCancelled = false,
): boolean => isPrimaryPointerDown(pointer, pointerWasCancelled);

export const shouldAllowPointerPrimaryActionPress = ({
  pointer,
  pointerWasCancelled = false,
  releaseRequired = false,
}: {
  pointer?: Pick<
    Phaser.Input.Pointer,
    'isDown' | 'button' | 'event' | 'wasTouch' | 'primaryDown'
  > | null;
  pointerWasCancelled?: boolean;
  releaseRequired?: boolean;
} = {}): boolean => {
  if (!shouldHandlePrimaryActionPointer(pointer)) {
    return false;
  }

  if (!releaseRequired) {
    return true;
  }

  return !isPrimaryPointerDown(pointer, pointerWasCancelled);
};

export const shouldClearPointerReleaseRequirement = (
  pointer?: Pick<
    Phaser.Input.Pointer,
    'isDown' | 'button' | 'event' | 'wasTouch' | 'primaryDown'
  > | null,
  pointerWasCancelled = false,
): boolean => !isPrimaryPointerDown(pointer, pointerWasCancelled);
