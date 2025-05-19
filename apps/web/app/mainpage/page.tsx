'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { MainPage } from '@crossword-core/components/MainPage';

const puzzles = [
  { id: 1, title: '세계 수도 퍼즐', desc: '수도 이름을 맞혀보세요!', level: '초급' },
  { id: 2, title: '아시아 국가 퍼즐', desc: '아시아 국가를 맞혀보세요!', level: '중급' },
  { id: 3, title: '유럽 지형 퍼즐', desc: '유럽의 산, 강, 호수!', level: '고급' },
];

export default function MainPageWrapper() {
  const router = useRouter();
  const handlePuzzleSelect = (id: number) => {
    router.push(`/game/${id}`);
  };
  return <MainPage puzzles={puzzles} onPuzzleSelect={handlePuzzleSelect} userName={undefined} />;
} 