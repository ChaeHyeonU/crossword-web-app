import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

type Puzzle = {
  id: number;
  title: string;
  desc: string;
  level: string;
};

interface MainPageProps {
  puzzles?: Puzzle[];
  onPuzzleSelect?: (id: number) => void;
  userName?: string;
}

const defaultPuzzles = [
  { id: 1, title: '세계 수도 퍼즐', desc: '수도 이름을 맞혀보세요!', level: '초급' },
  { id: 2, title: '아시아 국가 퍼즐', desc: '아시아 국가를 맞혀보세요!', level: '중급' },
  { id: 3, title: '유럽 지형 퍼즐', desc: '유럽의 산, 강, 호수!', level: '고급' },
];

const MainPage: React.FC<MainPageProps> = (props) => {
  const puzzles = props?.puzzles ?? defaultPuzzles;
  const onPuzzleSelect = props?.onPuzzleSelect ?? (() => {});
  const userName = props?.userName;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerWrap}>
        <Text style={styles.emoji}>🌍</Text>
        <Text style={styles.title}>지리 크로스워드</Text>
        {userName && <Text style={styles.userName}>{userName}님 환영합니다!</Text>}
        <Text style={styles.subtitle}>퍼즐을 선택해 도전해보세요!</Text>
      </View>
      <View style={styles.puzzleList}>
        {puzzles.map((puzzle) => (
          <TouchableOpacity
            key={puzzle.id}
            style={styles.puzzleCard}
            onPress={() => onPuzzleSelect(puzzle.id)}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.puzzleTitle}>{puzzle.title}</Text>
            </View>
            <Text style={styles.puzzleDesc}>{puzzle.desc}</Text>
            <Text style={styles.puzzleLevel}>{puzzle.level}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default MainPage;

const styles = StyleSheet.create({
  container: {
    paddingTop: 48,
    paddingBottom: 32,
    paddingHorizontal: 16,
    backgroundColor: '#e0e7ff',
    minHeight: '100%',
    alignItems: 'center',
  },
  headerWrap: {
    alignItems: 'center',
    marginBottom: 32,
  },
  emoji: {
    fontSize: 40,
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
  },
  userName: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 4,
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#64748b',
    marginTop: 4,
    marginBottom: 12,
    textAlign: 'center',
  },
  puzzleList: {
    width: '100%',
    gap: 16,
  },
  puzzleCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  puzzleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  puzzleDesc: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  puzzleLevel: {
    fontSize: 13,
    color: '#60a5fa',
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },
});
