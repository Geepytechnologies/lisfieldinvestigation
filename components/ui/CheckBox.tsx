import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface CustomCheckboxProps {
  label: string;
  isSelected: boolean;
  onToggle: () => void;
}

const Checkbox: React.FC<CustomCheckboxProps> = ({
  label,
  isSelected,
  onToggle,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onToggle}>
      <Text>{label}</Text>
      <View
        style={[
          styles.checkbox,
          {
            backgroundColor: isSelected ? "#1E83F0" : "transparent",
            borderColor: "#1E83F0",
          },
        ]}
      >
        {isSelected && <Text style={styles.checkmark}>✓</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 10,
    borderRadius: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  checkmark: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Checkbox;
