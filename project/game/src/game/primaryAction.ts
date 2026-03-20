import type Phaser from 'phaser';

const isPrimaryTouchPointer = (
  pointer?:
    | Pick<Phaser.Input.Pointer, 'event' | 'wasTouch'>
    | Pick<Phaser.Input.Pointer, 'event' | 'primaryDown' | 'wasTouch'>
    | null,
): boolean => {
  if (!pointer?.wasTouch) {
    return false;
  }

  const nativeEvent = pointer.event;

  if (
    nativeEvent &&
    'isPrimary' in nativeEvent &&
    typeof nativeEvent.isPrimary === 'boolean'
  ) {
    return nativeEvent.isPrimary;
  }

  return !('primaryDown' in pointer) || pointer.primaryDown !== false;
};

export const shouldHandlePrimaryActionKey = (
  event?: Pick<KeyboardEvent, 'repeat'> | null,
): boolean => !event?.repeat;

export const shouldAllowPrimaryActionKeyPress = ({
  event,
  pointerReleaseRequired = false,
}: {
  event?: Pick<KeyboardEvent, 'repeat'> | null;
  pointerReleaseRequired?: boolean;
} = {}): boolean => shouldHandlePrimaryActionKey(event) && !pointerReleaseRequired;

export const hasFreshMovementInput = (
  movementInputState: number,
  previousMovementInputState: number,
): boolean => movementInputState !== 0 && movementInputState !== previousMovementInputState;

export const shouldAllowFreshMovementPrimaryAction = ({
  hasFreshMovementInput,
  releaseRequired = false,
}: {
  hasFreshMovementInput: boolean;
  releaseRequired?: boolean;
}): boolean => hasFreshMovementInput && !releaseRequired;

export const shouldClearMovementReleaseRequirement = (
  movementInputActive: boolean,
): boolean => !movementInputActive;

export const shouldHandlePrimaryActionPointer = (
  pointer?: Pick<Phaser.Input.Pointer, 'button' | 'event' | 'wasTouch'> | null,
): boolean => {
  if (!pointer) {
    return true;
  }

  const nativeEvent = pointer.event;

  if (pointer.wasTouch) {
    return isPrimaryTouchPointer(pointer);
  }

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
    return isPrimaryTouchPointer(pointer);
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

export const shouldDelayPointerSteeringAfterPrimaryAction = ({
  source,
  phaseBeforeActivation,
}: {
  source: 'primary-key' | 'movement-fresh' | 'movement-held' | 'pointer-press' | 'pointer-held';
  phaseBeforeActivation: 'waiting' | 'paused' | 'gameOver';
}): boolean => source === 'pointer-press' && phaseBeforeActivation !== 'waiting';

export const getLaunchActionPromptText = (): string =>
  'Space, Enter, tap/click, or press/hold a move input';

export const getRetryActionPromptText = (): string =>
  'Space, Enter, tap/click, or move';

export const getResumeActionPromptText = (): string =>
  'Space, Enter, tap/click again, or press/hold your move input again';
