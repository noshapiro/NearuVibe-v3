export type Screen =
  | "live"
  | "offline"
  | "sessions"
  | "faq"
  | "settings";

export type SessionState =
  | "idle"
  | "listening"
  | "thinking"
  | "responding";

export type AnalysisStage = "upload" | "processing" | "results";

export type EmotionLabel =
  | "Happy"
  | "Calm"
  | "Neutral"
  | "Fearful"
  | "Angry"
  | "Surprised";

export interface EmotionData {
  voice: EmotionLabel;
  words: EmotionLabel;
  face: EmotionLabel;
  combined: EmotionLabel;
  voicePct: number;
  wordsPct: number;
  facePct: number;
  combinedPct: number;
  color: string;
}

export interface SessionRecord {
  id: number;
  type: "live" | "offline";
  icon: "target" | "video" | "chat" | "users" | "heart";
  title: string;
  date: string;
  duration: string;
  emotion: EmotionLabel;
  emotionPct: number;
  tone: EmotionLabel;
  tonePct: number;
  words: EmotionLabel;
  wordsPct: number;
  face: EmotionLabel;
  facePct: number;
}

export interface FaqItem {
  tag: string;
  question: string;
  answer: string;
}
