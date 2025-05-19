import React, { useState } from "react";
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { samplePuzzle } from "../data/samplePuzzle";
import { sampleClues } from "../data/sampleClues";
import { CrosswordGrid } from "../components/CrosswordGrid";
import { Clues } from "../components/Clues";

const GRID_SIZE = samplePuzzle.size;
const createEmptyGrid = (size: number) => Array(size).fill('').map(() => Array(size).fill(''));

export default function GamePage() {
  const { topicId } = useLocalSearchParams();
  // 실제로는 topicId별 데이터 분기 필요, 여기선 1개만 사용

  const [selectedClue, setSelectedClue] = useState<{ number: string; direction: string } | null>(null);
  const [userInput, setUserInput] = useState<string[][]>(createEmptyGrid(GRID_SIZE));
  const [answerInput, setAnswerInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 문제 클릭 시
  const handleClueSelect = (clue: { number: string; direction: string }) => {
    setSelectedClue(clue);
    setIsModalOpen(true);
    setAnswerInput("");
  };

  // 정답 입력 후 확인
  const handleAnswerConfirm = () => {
    if (!selectedClue) return;
    const key = selectedClue.direction === "down" ? `${selectedClue.number}-down` : selectedClue.number;
    const start = (samplePuzzle.numbers as any)[selectedClue.number];
    if (!start) return;
    const newInput = userInput.map(row => [...row]);
    let { x, y } = start;
    for (let i = 0; i < answerInput.length; i++) {
      newInput[y][x] = answerInput[i];
      if (selectedClue.direction === "across") x++;
      else y++;
    }
    setUserInput(newInput);
    setIsModalOpen(false);
    setSelectedClue(null);
  };

  // 셀 직접 입력
  const handleInput = (row: number, col: number, value: string) => {
    setUserInput(prev => prev.map((r, i) => i === row ? r.map((c, j) => j === col ? value : c) : r));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🌍 지리 크로스워드</Text>
      <ScrollView contentContainerStyle={styles.scrollWrap}>
        <CrosswordGrid
          size={GRID_SIZE}
          puzzle={samplePuzzle}
          selectedClue={selectedClue ?? undefined}
          userInput={userInput}
          onInput={handleInput}
        />
        <Clues clues={sampleClues} onClueSelect={handleClueSelect} />
      </ScrollView>
      {/* 정답 입력 모달 */}
      <Modal visible={isModalOpen} transparent animationType="slide">
        <View style={styles.modalBg}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>정답 입력</Text>
            <Text style={styles.modalClue}>
              {selectedClue ? (sampleClues as any)[selectedClue.direction === "down" ? `${selectedClue.number}-down` : selectedClue.number] : ''}
            </Text>
            <TextInput
              style={styles.modalInput}
              value={answerInput}
              onChangeText={setAnswerInput}
              maxLength={selectedClue ? (samplePuzzle.answers as any)[selectedClue.direction === "down" ? `${selectedClue.number}-down` : selectedClue.number]?.length ?? 10 : 10}
              autoFocus
            />
            <View style={styles.modalBtnRow}>
              <TouchableOpacity style={styles.modalBtn} onPress={() => setIsModalOpen(false)}>
                <Text style={styles.modalBtnText}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalBtn} onPress={handleAnswerConfirm}>
                <Text style={styles.modalBtnText}>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0e7ff",
    paddingTop: 36,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1e293b",
    textAlign: "center",
    marginBottom: 8,
  },
  scrollWrap: {
    alignItems: "center",
    paddingBottom: 32,
  },
  modalBg: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
    width: 320,
    maxWidth: "90%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#1e293b",
  },
  modalClue: {
    fontSize: 15,
    color: "#334155",
    marginBottom: 12,
    textAlign: "center",
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#60a5fa",
    borderRadius: 8,
    padding: 8,
    fontSize: 18,
    width: 180,
    marginBottom: 16,
    textAlign: "center",
  },
  modalBtnRow: {
    flexDirection: "row",
    gap: 16,
  },
  modalBtn: {
    backgroundColor: "#60a5fa",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 18,
    marginHorizontal: 8,
  },
  modalBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
}); 