import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
} from "react-native";
import { Feather } from "@expo/vector-icons";

type Props = {
  label?: string;
  data: string[];
  onSelect: (value: string) => void;
  selectedValue: string | null;
  placeholder?: string;
};

const ModalDropdown = ({
  label,
  data,
  onSelect,
  selectedValue,
  placeholder = "Select an option",
}: Props) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSelect = (value: string) => {
    onSelect(value);
    setShowDropdown(false);
  };

  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}

      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setShowDropdown((prev) => !prev)}
        activeOpacity={0.8}
      >
        <Text style={styles.selectedText}>{selectedValue || placeholder}</Text>
        <Feather
          name={showDropdown ? "chevron-up" : "chevron-down"}
          size={20}
          color="#333"
        />
      </TouchableOpacity>

      <Modal visible={showDropdown} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowDropdown(false)}
        >
          <View style={styles.dropdown}>
            <FlatList
              data={data}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default ModalDropdown;

const styles = StyleSheet.create({
  label: {
    marginBottom: 6,
    fontSize: 14,
    color: "#555",
  },
  dropdownButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
  },
  selectedText: {
    fontSize: 16,
    color: "#333",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 8,
    maxHeight: 300,
  },
  option: {
    padding: 12,
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
});
