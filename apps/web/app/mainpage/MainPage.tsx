import React from 'react';

interface Puzzle {
  id: number;
  title: string;
  desc: string;
  level: string;
}

interface MainPageProps {
  puzzles: Puzzle[];
  onPuzzleSelect: (id: number) => void;
  userName?: string;
}

export const MainPage: React.FC<MainPageProps> = ({ puzzles, onPuzzleSelect, userName }) => {
  return (
    <div style={{ padding: 32, background: '#e0e7ff', minHeight: '100vh' }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <span style={{ fontSize: 40 }}>🌍</span>
        <h1 style={{ color: '#1e293b', fontWeight: 'bold' }}>지리 크로스워드</h1>
        {userName && <div style={{ color: '#64748b', margin: '4px 0' }}>{userName}님 환영합니다!</div>}
        <div style={{ color: '#64748b', margin: '4px 0 12px' }}>퍼즐을 선택해 도전해보세요!</div>
      </div>
      <div style={{ maxWidth: 500, margin: '0 auto' }}>
        {puzzles.map((puzzle) => (
          <div
            key={puzzle.id}
            style={{
              background: '#fff',
              borderRadius: 14,
              padding: 20,
              marginBottom: 16,
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              border: '1px solid #e2e8f0',
              cursor: 'pointer',
            }}
            onClick={() => onPuzzleSelect(puzzle.id)}
          >
            <div style={{ fontWeight: 'bold', fontSize: 18, color: '#1e293b', marginBottom: 6 }}>{puzzle.title}</div>
            <div style={{ fontSize: 14, color: '#64748b', marginBottom: 4 }}>{puzzle.desc}</div>
            <div style={{ fontSize: 13, color: '#60a5fa', fontWeight: 'bold', textAlign: 'right' }}>{puzzle.level}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
