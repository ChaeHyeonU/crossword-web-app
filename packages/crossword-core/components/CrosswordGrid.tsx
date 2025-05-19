import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { CrosswordCell } from "./CrosswordCell";

interface CrosswordGridProps {
  size: number;
  puzzle: any;
  selectedClue?: { number: string; direction: string };
  userInput: string[][];
  onInput?: (row: number, col: number, value: string) => void;
}

export const CrosswordGrid: React.FC<CrosswordGridProps> = ({
  size,
  puzzle,
  selectedClue,
  userInput,
  onInput,
}) => {
  const [focusedCell, setFocusedCell] = useState<{ row: number; col: number } | null>(null);
  const cellSize = 32;

  // 선택된 문제에 해당하는 셀 좌표 계산 (간단화)
  const getSelectedCells = () => {
    if (!selectedClue) return [];
    const key = selectedClue.direction === "down" ? `${selectedClue.number}-down` : selectedClue.number;
    const start = (puzzle.numbers as any)[selectedClue.number];
    const answer = (puzzle.answers as any)[key];
    if (!start || !answer) return [];
    const cells = [];
    let { x, y } = start;
    for (let i = 0; i < answer.length; i++) {
      cells.push({ x, y });
      if (selectedClue.direction === "across") x++;
      else y++;
    }
    return cells;
  };
  const selectedCells = getSelectedCells();

  return (
    <View style={styles.gridWrap}>
      {Array(size).fill(null).map((_, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {Array(size).fill(null).map((_, colIndex) => {
            const isBlocked = puzzle.grid[rowIndex][colIndex] === "#";
            const isSelected = selectedCells.some(cell => cell.x === colIndex && cell.y === rowIndex);
            const isFocused = focusedCell?.row === rowIndex && focusedCell?.col === colIndex;
            const number = Object.entries(puzzle.numbers).find(
              ([, pos]) => (pos as any).x === colIndex && (pos as any).y === rowIndex
            )?.[0];
            return (
              <CrosswordCell
                key={`${rowIndex}-${colIndex}`}
                cellSize={cellSize}
                isBlocked={isBlocked}
                isSelected={isSelected}
                isFocused={isFocused}
                number={number}
                value={userInput[rowIndex][colIndex]}
                onPress={() => setFocusedCell({ row: rowIndex, col: colIndex })}
                onInput={value => onInput?.(rowIndex, colIndex, value)}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  gridWrap: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
    marginVertical: 12,
  },
  row: {
    flexDirection: "row",
  },
});
