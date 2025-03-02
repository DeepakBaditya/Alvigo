"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

interface FormValues {
  firstInput: string;
  secondInput: string;
}

export default function FormComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [formData, setFormData] = useState<FormValues | null>(null);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setFormData(data);
    console.log("Form Submitted:", data);
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Simple Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">First Input</label>
          <input
            {...register("firstInput", { required: "This field is required" })}
            className="w-full p-2 border rounded"
            type="text"
          />
          {errors.firstInput && (
            <p className="text-red-500 text-sm">{errors.firstInput.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Second Input</label>
          <input
            {...register("secondInput", { required: "This field is required" })}
            className="w-full p-2 border rounded"
            type="text"
          />
          {errors.secondInput && (
            <p className="text-red-500 text-sm">{errors.secondInput.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Submit
        </button>
      </form>

      {formData && (
        <div className="mt-4 p-2 bg-gray-100 rounded">
          <h3 className="font-semibold">Form Data:</h3>
          <pre className="text-sm">{JSON.stringify(formData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
