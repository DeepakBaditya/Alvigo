"use client";

import { useState } from "react";
import { useDataStore } from "@/store/useDataStore";

interface NumberArrayInputProps {
  label?: string;
  onSubmit?: (values: number[]) => void;
}

const NumberArrayInput: React.FC<NumberArrayInputProps> = ({
  label,
  onSubmit,
}) => {
  const [values, setValues] = useState<number[]>([]);
  const setData = useDataStore((state) => state.setData);

  const handleChange = (index: number, newValue: string) => {
    if (!/^\d*$/.test(newValue)) return; // Allow only numbers

    const updatedValues = [...values];
    updatedValues[index] = newValue === "" ? NaN : Number(newValue);
    setValues(updatedValues);
  };

  const addField = () => setValues([...values, NaN]);
  const removeField = (index: number) => {
    const updatedValues = values.filter((_, i) => i !== index);
    setValues(updatedValues);
  };

  const handleSubmit = () => {
    const finalValues = values.filter((num) => !isNaN(num)); // Remove NaN values
    if (onSubmit) onSubmit(finalValues);
    setData(finalValues);
  };

  return (
    <div className="w-full p-4 border rounded-lg shadow-md">
      {label && (
        <label className="block text-lg font-semibold mb-2">{label}</label>
      )}

      <div className="flex flex-wrap gap-2">
        {values.map((value, index) => {
          const displayValue = isNaN(value) ? "" : value.toString();
          const inputWidth = Math.max(displayValue.length * 12, 40); // Auto-resizing width

          return (
            <div key={index} className="flex items-center gap-1">
              <input
                type="text"
                value={displayValue}
                onChange={(e) => handleChange(index, e.target.value)}
                className="p-2 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-400 text-center"
                style={{ width: `${inputWidth}px`, minWidth: "40px" }} // Auto-resizing with min-width
                placeholder="0"
              />
              <button
                onClick={() => removeField(index)}
                className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>

      <div className="flex gap-2 mt-3">
        <button
          onClick={addField}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Add Number
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default NumberArrayInput;
