
import { useNavigate } from 'react-router';
import GenericButton from '../../../components/Button';
import GenericList from '../../../components/List/Generic';
import GenericForm, { Field } from '../../../components/Form/GenericForm';
import ListOfForms from '../../../components/List/Forms';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const fields: Field[] = [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'country', label: 'Country', type: 'dropdown', options: [
      { value: 'us', label: 'United States' },
      { value: 'ca', label: 'Canada' },
      { value: 'uk', label: 'United Kingdom' },
    ]},
  ];
  
  const handleSubmit = (values: { [name: string]: string }) => {
    console.log('Form values:', values);
    // Perform form submission logic
  };
  const form = <GenericForm fields={fields} onSubmit={handleSubmit} />
  const initialItems = [form];

  const renderItem = (item: any, index: number) => (
    <div key={index}>{item}</div>
  );

  return (
    <div>
      <div>
        <h1>List Component Example</h1>
        <ListOfForms />
        {/* <GenericList items={initialItems} renderItem={renderItem} /> */}
      </div>
        <h1>Directory - Cross Country</h1>
        <div style={{ display: 'flex', justifyContent: 'space-around', minHeight: '16rem' }}>
          <div style={{ backgroundColor: '#CCCCCC', width: '100%', textAlign: 'center', marginLeft: '2rem', marginRight: '2rem', borderRadius: '16px'}}>
            <h2>Seasons</h2>
            <button style={buttonStyle}>All Seasons</button>
            <p>Click to view all past seasons</p>
            <button style={buttonStyle}>Races By Season</button>
            <p>Click to view all races in a season or to add a new race</p>
          </div>

          <div style={{ backgroundColor: '#CCCCCC', width: '100%', textAlign: 'center', marginLeft: '2rem', marginRight: '2rem', borderRadius: '16px'}}>
            <h2>Races</h2>
            {/* <button style={buttonStyle} onClick={() => navigate('/admin/xc/races')}>Races</button> */}
            <GenericButton onClick={() => navigate('/admin/xc/races')} label="Races" />
            <p>Click to view races. Select the year to filter the races.</p>
            <button style={buttonStyle} onClick={() => navigate('/admin/xc/races/add-results')}>Add Results</button>
            <p>Click to add competitors to a race.</p>
          </div>
          <div style={{ backgroundColor: '#CCCCCC', width: '100%', textAlign: 'center', marginLeft: '2rem', marginRight: '2rem', borderRadius: '16px'}}>
            <h2>Athletes</h2>
            <button style={buttonStyle} onClick={() => navigate('/admin/athletes')}>All Athletes</button>
            <p>Click to view all Athletes</p>
            <button style={buttonStyle} onClick={() => navigate('/admin/athletes/create')}>Add Athlete</button>
            <p>Click to add an Athlete</p>
          </div>
        </div>
    </div>
  )
}

const buttonStyle = {
  backgroundColor: '#4E9CAF',
    color: '#FFFFFF',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
};

export default AdminDashboard