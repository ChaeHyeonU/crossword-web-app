import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";

interface CluesProps {
  clues: Record<string, string>;
  onClueSelect?: (clue: { number: string; direction: string }) => void;
}

const DIRECTION_MAP = {
  across: "가로",
  down: "세로",
};

const processClues = (clues: Record<string, string>) => {
  return Object.entries(clues)
    .map(([key, clue]) => {
      const isDown = key.endsWith("-down");
      const number = isDown ? key.replace("-down", "") : key;
      return {
        number,
        clue,
        direction: isDown ? "down" : "across",
      };
    })
    .sort((a, b) => {
      const numA = parseInt(a.number);
      const numB = parseInt(b.number);
      return numA === numB ? (a.direction === "across" ? -1 : 1) : numA - numB;
    });
};

export const Clues: React.FC<CluesProps> = ({ clues, onClueSelect }) => {
  const processedClues = processClues(clues);
  return (
    <ScrollView style={styles.scroll}>
      {processedClues.map((clue) => (
        <TouchableOpacity
          key={`${clue.number}-${clue.direction}`}
          style={styles.clueItem}
          onPress={() => onClueSelect?.({ number: clue.number, direction: clue.direction })}
        >
          <Text style={styles.clueNumber}>
            {clue.number}.{DIRECTION_MAP[clue.direction as "across" | "down"]}
          </Text>
          <Text style={styles.clueText}>{clue.clue}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 8,
  },
  clueItem: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  clueNumber: {
    fontWeight: "bold",
    color: "#60a5fa",
    fontSize: 13,
  },
  clueText: {
    color: "#334155",
    fontSize: 14,
    marginTop: 2,
  },
}); 