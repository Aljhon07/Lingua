import { useState } from "react";

export function useInputChange(initialVal) {
  const [value, setValue] = useState(initialVal);

  const handleInputChange = (field, value) => {
    setValue((prev) => ({ ...prev, [field]: value }));
  };

  return [value, handleInputChange];
}
