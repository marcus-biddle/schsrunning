import React, { useState, useEffect } from 'react';
import GenericForm, { Field } from '../../Form/GenericForm';
import GenericButton from '../../Button';

interface FormData {
  [name: string]: string;
}

interface ListOfFormsProps {
    formFields: Field[];
    setFormResults: any;
    isList: boolean;
}

const ListOfForms = ({ formFields, setFormResults, isList }: ListOfFormsProps) => {
  const [formDataList, setFormDataList] = useState<FormData[]>([{}]);
 
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
    setFormResults(formDataList)
  }, [formDataList]);

  const data = isList ? formDataList : [formDataList[0]]

  return (
    <div style={{ borderRadius: '8px', paddingBottom: '1rem'}}>
      {data.map((formData, index) => (
        <>
        <h3 style={{ fontWeight: 'lighter'}}>Athlete {isList ? index + 1 : 'Form'}</h3>
        <div style={{ textAlign: 'center', }}>
            <GenericForm key={index} fields={formFields} onSubmit={handleFormSubmit} keepValues={isList}/>
        </div>
        
        </>
        
      ))}
      {isList && <GenericButton type='button' onClick={handleAddForm} label={'Add Row'} />}
    </div>
  );
};

export default ListOfForms;

