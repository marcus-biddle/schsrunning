import React from 'react';

interface FormData {
  // Define the shape of your form data here
  // Example:
  name: string;
  email: string;
}

interface FormComponentProps {
  formData: FormData;
  onFormDataChange: (updatedData: FormData) => void;
}

const FormComponent: React.FC<FormComponentProps> = ({ formData, onFormDataChange }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Update the form data with the new value
    const updatedData: FormData = { ...formData, [name]: value };
    onFormDataChange(updatedData);
  };

  return (
    <form>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Enter name"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Enter email"
      />
    </form>
  );
};

export default FormComponent;
