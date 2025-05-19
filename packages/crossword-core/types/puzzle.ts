// 크로스워드 퍼즐 타입 정의 (웹/앱 공통)

export interface PuzzleClue {
  number: string;
  direction: 'across' | 'down';
}

export interface PuzzleData {
  size: number;
  grid: string[][];
  numbers: Record<string, { x: number; y: number }>;
  clues: Record<string, PuzzleClue>;
  answers: Record<string, { answer: string; direction: string; length: number }>;
}
