import React, { useState, ChangeEvent, FormEvent } from 'react';
import {GenericButton} from '../../Button';

export interface Field {
  name: string;
  label: string;
  type: string;
  options?: { value: string; label: string }[];
}

interface Props {
  fields: Field[];
  onSubmit: (formValues: { [name: string]: string }) => void;
  keepValues: boolean;
}

const GenericForm: React.FC<Props> = ({ fields, onSubmit, keepValues }) => {
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
    keepValues ? null : setFormValues({});
  };

  // In parent field use this to handleSubmit:
//   const handleSubmit = (values: { [name: string]: string }) => {
//     console.log('Form values:', values);
//     // Perform form submission logic
//   };
return (
    <form onSubmit={handleSubmit} style={{ padding: '2rem 2rem 1rem 2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr)', gap: '10px', backgroundColor: '#CCCCCC', borderRadius: '8px', margin: '.5rem 0 .5rem 0', alignItems: 'center'}}>
      {fields.map((field, index) => (
        <div key={`${field.name}-${index}`}>
          <label htmlFor={field.name}>{field.label}</label>
          {field.type === 'dropdown' ? (
            <select
              id={field.name}
              name={field.name}
              value={formValues[field.name] || ''}
              onChange={handleChange}
              required
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
              required
            />
          )}
        </div>
      ))}
      <div style={{ fontSize: '12px', padding: '5px 10px', marginTop: '10px', display: 'flex', textAlign: 'center', alignItems: 'center' }}>
        <GenericButton type={'submit'} label={'Add'} color='green'/>
      </div>
      
    </form>
  );
};

export default GenericForm;
