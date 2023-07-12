import React, { useState, ChangeEvent, FormEvent } from 'react';

export interface Field {
  name: string;
  label: string;
  type: string;
  options?: { value: string; label: string }[];
}

interface Props {
  fields: Field[];
  onSubmit: (formValues: { [name: string]: string }) => void;
}

const GenericForm: React.FC<Props> = ({ fields, onSubmit }) => {
  const [formValues, setFormValues] = useState<{ [name: string]: string }>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
  
    if (e.target.tagName === 'SELECT') {
      setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    } else {
      setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    }
  };
  

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  // In parent field use this to handleSubmit:
//   const handleSubmit = (values: { [name: string]: string }) => {
//     console.log('Form values:', values);
//     // Perform form submission logic
//   };
return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name}>
          <label htmlFor={field.name}>{field.label}</label>
          {field.type === 'dropdown' ? (
            <select
              id={field.name}
              name={field.name}
              value={formValues[field.name] || ''}
              onChange={handleChange}
            >
              <option value="">Select an option</option>
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={formValues[field.name] || ''}
              onChange={handleChange}
            />
          )}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default GenericForm;
