type AudioContextCtor = typeof AudioContext;

type AudioContextWindow = {
  AudioContext?: AudioContextCtor;
  webkitAudioContext?: AudioContextCtor;
};

export const getFeedbackAudioContextCtor = (
  audioWindow: AudioContextWindow,
): AudioContextCtor | null => audioWindow.AudioContext ?? audioWindow.webkitAudioContext ?? null;
