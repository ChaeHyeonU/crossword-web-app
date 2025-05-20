import React from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Platform } from "react-native";

interface CrosswordCellProps {
  cellSize: number;
  isBlocked: boolean;
  isSelected: boolean;
  isFocused: boolean;
  number?: string;
  value: string;
  onPress: () => void;
  onInput?: (value: string) => void;
}

export const CrosswordCell: React.FC<CrosswordCellProps> = ({
  cellSize,
  isBlocked,
  isSelected,
  isFocused,
  number,
  value,
  onPress,
  onInput,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={isBlocked ? 1 : 0.7}
      onPress={isBlocked ? undefined : onPress}
      style={{ width: cellSize, height: cellSize }}
    >
      <View
        style={[
          styles.cell,
          { width: cellSize, height: cellSize },
          isBlocked && styles.blocked,
          isSelected && styles.selected,
          isFocused && styles.focused,
        ]}
      >
        {number && !isBlocked && (
          <Text style={styles.number}>{number}</Text>
        )}
        {!isBlocked ? (
          <TextInput
            style={styles.input}
            value={value}
            maxLength={1}
            onChangeText={onInput}
            editable={!isBlocked}
            textAlign="center"
            autoCapitalize="none"
            autoCorrect={false}
            selectTextOnFocus
            keyboardType={Platform.OS === 'web' ? 'default' : 'visible-password'}
            {...(Platform.OS === 'web' ? {
              spellCheck: false,
              autoComplete: 'off'
            } : {})}
          />
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cell: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    borderRadius: 6,
  },
  blocked: {
    backgroundColor: "#1e293b",
    borderColor: "#1e293b",
  },
  selected: {
    borderColor: "#60a5fa",
    backgroundColor: "#dbeafe",
  },
  focused: {
    borderColor: "#22d3ee",
    backgroundColor: "#cffafe",
  },
  number: {
    position: "absolute",
    top: 2,
    left: 3,
    fontSize: 10,
    color: "#618DE5",
    fontWeight: "bold",
  },
  input: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
    width: "100%",
    height: "100%",
    textAlign: "center",
    padding: 0,
    margin: 0,
    backgroundColor: "transparent",
  },
});
