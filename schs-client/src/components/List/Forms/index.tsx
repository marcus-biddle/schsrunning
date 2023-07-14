import React, { useState, useEffect } from 'react';
import GenericForm, { Field } from '../../Form/GenericForm';

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
    setFormDataList((prevFormDataList) => {
      const updatedList = [...prevFormDataList, formValues];
      const filteredList = updatedList.filter((formData) => Object.keys(formData).length > 0);
      return filteredList;
    });
  };

  const handleAddForm = () => {
    setFormDataList((prevFormDataList) => [...prevFormDataList, {}]);
  };

  useEffect(() => {
    console.log(formDataList);
  }, [formDataList]);

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
