import React, { useRef, useState } from "react";
import {
  Animated,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";

type Props = {
  label?: string;

  data: string[];
  selectedValue: string | null;
  onSelect: (value: string) => void;
  placeholder?: string;
};

const SelectDropdown = ({
  label,
  data,
  selectedValue,
  onSelect,
  placeholder = "Select an option",
}: Props) => {
  const [open, setOpen] = useState(false);
  const dropdownAnim = useRef(new Animated.Value(0)).current;

  const toggleDropdown = () => {
    if (open) {
      Animated.timing(dropdownAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => setOpen(false));
    } else {
      setOpen(true);
      Animated.timing(dropdownAnim, {
        toValue: data.length * 40,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleSelect = (value: string) => {
    onSelect(value);
    toggleDropdown();
  };

  return (
    <View style={styles.container}>
      {label && (
        <Text className="text-sm font-pop tracking-[0.035px]">{label}</Text>
      )}

      <TouchableOpacity
        className="border-[#808080] border bg-[#F0F0F0] rounded flex flex-row items-center py-3 px-2 justify-between"
        activeOpacity={0.8}
        onPress={toggleDropdown}
      >
        <Text className="text-xs text-[#808080] font-pop">
          {selectedValue || placeholder}
        </Text>
        <Feather
          name={open ? "chevron-up" : "chevron-down"}
          size={18}
          color="#555"
        />
      </TouchableOpacity>

      <Animated.View style={[styles.dropdown, { height: dropdownAnim }]}>
        {open && (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => handleSelect(item)}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </Animated.View>
    </View>
  );
};

export default SelectDropdown;
const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
  dropdown: {
    overflow: "hidden",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderTopWidth: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});
