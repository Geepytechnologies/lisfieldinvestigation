import React, { useState, useEffect } from "react";
import { TextInput, TextInputProps } from "react-native";

interface NumericInputProps
  extends Omit<TextInputProps, "value" | "onChangeText"> {
  value?: number | null | undefined;
  onValueChange: (value: number | null) => void;
}

const NumericInput: React.FC<NumericInputProps> = ({
  value,
  onValueChange,
  ...rest
}) => {
  const [internalValue, setInternalValue] = useState(value?.toString() ?? "");

  useEffect(() => {
    setInternalValue(value?.toString() ?? "");
  }, [value]);

  const handleTextChange = (text: string) => {
    setInternalValue(text);
    const num = Number(text);
    if (!isNaN(num)) {
      onValueChange(num);
    } else {
      onValueChange(null);
    }
  };

  const handleBlur = () => {
    const num = Number(internalValue);
    onValueChange(!isNaN(num) ? num : null);
  };

  return (
    <TextInput
      keyboardType="number-pad"
      value={internalValue}
      onChangeText={handleTextChange}
      onBlur={handleBlur}
      {...rest}
    />
  );
};

export default NumericInput;
