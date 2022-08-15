import { useState } from 'react';

export default function useForm(initValues) {
  const [values, setValues] = useState(initValues);
  const setNewValue = newValue => {
    console.log(newValue);
    if (newValue.target === undefined) {
      setValues({ ...values, ...newValue });
    } else {
      setValues({ ...values, [newValue.target.name]: newValue.target.value });
    }
  };
  return [values, setNewValue];
}
