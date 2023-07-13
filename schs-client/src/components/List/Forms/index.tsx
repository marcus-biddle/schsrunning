import React, { useState } from 'react';
import GenericForm, { Field } from '../../Form';

interface FormData {
  [name: string]: string;
}

const ListOfForms = () => {
  const initialFormFields: Field[] = [
    { name: 'firstName', label: 'First Name', type: 'text' },
    { name: 'lastName', label: 'Last Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
  ];

  const [formDataList, setFormDataList] = useState<FormData[]>([]);

  const handleFormSubmit = (formValues: FormData) => {
    setFormDataList((prevFormDataList) => [...prevFormDataList, formValues]);
  };

  const handleAddForm = () => {
    setFormDataList((prevFormDataList) => [...prevFormDataList, {}]);
  };

  return (
    <div>
      {formDataList.map((formData, index) => (
        <GenericForm key={index} fields={initialFormFields} onSubmit={handleFormSubmit} />
      ))}
      <button onClick={handleAddForm}>Add Form</button>
    </div>
  );
};

export default ListOfForms;

