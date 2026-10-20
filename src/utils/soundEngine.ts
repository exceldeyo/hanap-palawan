// Web Audio API Synthesizer for Hanap Palawan Video Advertisement
// Provides uplifting tropical island background music (BGM) and UI tutorial sound effects (SFX)

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.65;
  private bgmInterval: number | null = null;
  private isPlayingBgm: boolean = false;
  private stepIndex: number = 0;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.stopBackgroundMusic(false);
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
  }

  public getVolume(): number {
    return this.volume;
  }

  // Play a marimba/acoustic-like warm note
  private playTone(freq: number, duration: number, startTimeOffset: number = 0, type: OscillatorType = 'sine', gainScale: number = 0.12) {
    if (this.isMuted || this.volume <= 0) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime + startTimeOffset;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    const peakGain = gainScale * this.volume;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(Math.max(0.0002, peakGain), now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  // Soft shaker/percussion tick for island rhythm
  private playSoftPercussion(startTimeOffset: number = 0, accent: boolean = false) {
    if (this.isMuted || this.volume <= 0) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime + startTimeOffset;
    const bufferSize = ctx.sampleRate * 0.04;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(accent ? 3200 : 4800, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime((accent ? 0.04 : 0.02) * this.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
  }

  // Start uplifting Palawan tropical acoustic / marimba background music loop
  public startBackgroundMusic() {
    this.isPlayingBgm = true;
    if (this.isMuted) return;
    this.getContext();

    if (this.bgmInterval !== null) {
      window.clearInterval(this.bgmInterval);
    }

    // Uplifting progression: Cmaj7 -> G6 -> Am7 -> Fmaj7 (in Hz)
    const chords = [
      // C Major warm island arpeggio (C4, E4, G4, C5, E5, G4, E4, G4)
      { bass: 130.81, notes: [261.63, 329.63, 392.00, 523.25, 659.25, 523.25, 392.00, 329.63] },
      // G Major (G3, B3, D4, G4, B4, D5, B4, G4)
      { bass: 98.00, notes: [196.00, 246.94, 293.66, 392.00, 493.88, 587.33, 493.88, 392.00] },
      // A Minor 7 (A3, C4, E4, G4, A4, C5, A4, E4)
      { bass: 110.00, notes: [220.00, 261.63, 329.63, 392.00, 440.00, 523.25, 440.00, 329.63] },
      // F Major 7 (F3, A3, C4, E4, F4, A4, C5, A4)
      { bass: 87.31, notes: [174.61, 220.00, 261.63, 329.63, 349.23, 440.00, 523.25, 440.00] }
    ];

    const playStep = () => {
      if (!this.isPlayingBgm || this.isMuted) return;
      const chordIdx = Math.floor(this.stepIndex / 8) % chords.length;
      const noteIdx = this.stepIndex % 8;
      const currentChord = chords[chordIdx];

      // Play warm bass note on beat 0 and beat 4
      if (noteIdx === 0 || noteIdx === 4) {
        this.playTone(currentChord.bass, 0.9, 0, 'triangle', 0.09);
      }

      // Play marimba melody note
      const noteFreq = currentChord.notes[noteIdx];
      this.playTone(noteFreq, 0.38, 0, 'sine', 0.085);
      // Subtle harmonic overtone
      if (noteIdx % 2 === 0) {
        this.playTone(noteFreq * 2, 0.18, 0, 'sine', 0.025);
      }

      // Gentle island shaker rhythm
      this.playSoftPercussion(0, noteIdx % 4 === 0);

      this.stepIndex++;
    };

    playStep();
    this.bgmInterval = window.setInterval(playStep, 240);
  }

  public stopBackgroundMusic(resetFlag: boolean = true) {
    if (resetFlag) {
      this.isPlayingBgm = false;
    }
    if (this.bgmInterval !== null) {
      window.clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }

  // SFX 1: Crisp UI button click / tap pop
  public playClickSfx() {
    if (this.isMuted) return;
    this.playTone(680, 0.06, 0, 'sine', 0.14);
    this.playTone(980, 0.08, 0.03, 'triangle', 0.12);
  }

  // SFX 2: Soft keyboard typing tick
  public playTypeSfx() {
    if (this.isMuted) return;
    const randomPitch = 480 + Math.random() * 140;
    this.playTone(randomPitch, 0.035, 0, 'triangle', 0.06);
  }

  // SFX 3: Smooth scene transition whoosh/chime
  public playTransitionSfx() {
    if (this.isMuted) return;
    this.playTone(330, 0.18, 0, 'sine', 0.08);
    this.playTone(440, 0.22, 0.06, 'sine', 0.09);
    this.playTone(659.25, 0.30, 0.12, 'sine', 0.10);
  }

  // SFX 4: Success / Verified Badge / Job Applied celebration chime
  public playSuccessSfx() {
    if (this.isMuted) return;
    this.playTone(523.25, 0.16, 0, 'triangle', 0.14);     // C5
    this.playTone(659.25, 0.16, 0.09, 'triangle', 0.14);  // E5
    this.playTone(783.99, 0.20, 0.18, 'triangle', 0.15);  // G5
    this.playTone(1046.50, 0.45, 0.27, 'sine', 0.18);     // C6
  }
}

export const soundEngine = new SoundEngine();
