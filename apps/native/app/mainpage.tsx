import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import { AntDesign } from '@expo/vector-icons';
import { MainPage } from '@crossword-core/components/MainPage';

const puzzles = [
  { id: 1, title: "세계 수도 퍼즐", desc: "수도 이름을 맞혀보세요!", level: "초급" },
  { id: 2, title: "아시아 국가 퍼즐", desc: "아시아 국가를 맞혀보세요!", level: "중급" },
  { id: 3, title: "유럽 지형 퍼즐", desc: "유럽의 산, 강, 호수!", level: "고급" },
];

export default function MainPageWrapper() {
  const router = useRouter();
  const handlePuzzleSelect = (id: number) => {
    router.push(`/game/${id}`);
  };
  return <MainPage puzzles={puzzles} onPuzzleSelect={handlePuzzleSelect} userName={undefined} />;
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 48,
    paddingBottom: 32,
    paddingHorizontal: 16,
    backgroundColor: "#e0e7ff",
    minHeight: "100%",
    alignItems: "center",
  },
  headerWrap: {
    alignItems: "center",
    marginBottom: 32,
  },
  emoji: {
    fontSize: 40,
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e293b",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "#64748b",
    marginTop: 4,
    marginBottom: 12,
    textAlign: "center",
  },
  puzzleList: {
    width: "100%",
    gap: 16,
  },
  puzzleCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  puzzleTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
  },
  puzzleDesc: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 4,
  },
  puzzleLevel: {
    fontSize: 13,
    color: "#60a5fa",
    fontWeight: "bold",
    alignSelf: "flex-end",
  },
}); 