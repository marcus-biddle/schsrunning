// import React, { useState } from 'react';
// // import { useQuery } from '@tanstack/react-query';
// import { ResultFormProps } from '../../../pages/Admin/EditAthlete';

// interface XCFormProps {
//     competitorId: number;
//     raceId: number;
//     onSubmitResult: (data: any) => void;
// }

// const StepThreeForm: React.FC<XCFormProps> = ({ raceId, competitorId, onSubmitResult }) => {
//   console.log(raceId, competitorId);  
//   const [resultFormData, setResultFormData] = useState<ResultFormProps>({
//         competitorId: competitorId,
//         raceId: raceId,
//         time: '',
//         pace: ''
//     })

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     setResultFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (event: React.FormEvent) => {
//     event.preventDefault();
  
//     onSubmitResult(resultFormData);
    
//   };

//   return (
//     <form onSubmit={handleSubmit} className="form-container">
//       <div className="form-group">
//         <label htmlFor="time" className="form-label">Competitor Time:</label>
//         <input
//           type="text"
//           id="time"
//           name="time"
//           value={resultFormData.time}
//           onChange={handleInputChange}
//           className="admin-form-input"
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="pace" className="form-label">Competitor Pace:</label>
//         <input
//           type="text"
//           id="pace"
//           name="pace"
//           value={resultFormData.pace}
//           onChange={handleInputChange}
//           className="admin-form-input"
//         />
//       </div>
//       <button type="submit" className="form-button">Submit</button>
//     </form>
//   );
// };

// export default StepThreeForm;