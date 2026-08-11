type ToneKind =
  | "purchase"
  | "place"
  | "merge"
  | "attack"
  | "defeat"
  | "damage"
  | "wave"
  | "win"
  | "lose";

let audioCtx: AudioContext | null = null;

function getContext() {
  if (typeof window === "undefined") return null;
  const AudioCtx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return null;
  if (!audioCtx) audioCtx = new AudioCtx();
  return audioCtx;
}

function playTone(
  frequency: number,
  durationMs: number,
  type: OscillatorType = "sine",
  gainValue = 0.04,
) {
  const ctx = getContext();
  if (!ctx) return;

  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  oscillator.type = type;
  oscillator.frequency.value = frequency;
  gain.gain.value = gainValue;
  oscillator.connect(gain);
  gain.connect(ctx.destination);

  const now = ctx.currentTime;
  gain.gain.setValueAtTime(gainValue, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + durationMs / 1000);
  oscillator.start(now);
  oscillator.stop(now + durationMs / 1000);
}

export async function resumeAudio() {
  const ctx = getContext();
  if (ctx && ctx.state === "suspended") {
    await ctx.resume();
  }
}

export function playGameSound(kind: ToneKind, muted: boolean) {
  if (muted || typeof window === "undefined") return;
  void resumeAudio();

  switch (kind) {
    case "purchase":
      playTone(520, 90, "triangle", 0.045);
      break;
    case "place":
      playTone(380, 70, "sine", 0.035);
      break;
    case "merge":
      playTone(440, 80, "triangle", 0.04);
      setTimeout(() => playTone(660, 100, "triangle", 0.04), 70);
      break;
    case "attack":
      playTone(760, 40, "square", 0.018);
      break;
    case "defeat":
      playTone(300, 70, "sawtooth", 0.03);
      break;
    case "damage":
      playTone(160, 140, "sawtooth", 0.05);
      break;
    case "wave":
      playTone(500, 90, "sine", 0.04);
      setTimeout(() => playTone(640, 110, "sine", 0.04), 90);
      break;
    case "win":
      playTone(523, 120, "triangle", 0.05);
      setTimeout(() => playTone(659, 120, "triangle", 0.05), 110);
      setTimeout(() => playTone(784, 180, "triangle", 0.05), 220);
      break;
    case "lose":
      playTone(220, 180, "sawtooth", 0.045);
      setTimeout(() => playTone(160, 220, "sawtooth", 0.045), 140);
      break;
    default:
      break;
  }
}
