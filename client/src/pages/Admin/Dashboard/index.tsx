
import SideMenu from '../../../components/SideMenu';
import UsersPage from '../Users';

const SIDEMENU_LINKS = [
  {
    text: 'Athletes',
    link: '/admin/athletes',
    sublinks: [
      {
        text: 'Create Athlete',
        link: 'admin/athletes/create'
      },
      {
        text: 'Update Athlete',
        link: '/admin/athletes/update'
      },
      {
        text: 'Delete Athlete',
        link: '/admin/athletes/delete'
      },
    ]
  },
  {
    text: 'Coaches',
    link: '/admin/coaches',
    sublinks: [
      {
        text: 'Create Coach',
        link: 'admin/coaches/create'
      },
      {
        text: 'Update Coach',
        link: '/admin/coaches/update'
      },
      {
        text: 'Delete Coach',
        link: '/admin/coaches/delete'
      },
    ]
  },
  {
    text: 'Users',
    link: '/admin/athletes',
    sublinks: [
      {
        text: 'Create User',
        link: 'admin/users/create'
      },
      {
        text: 'Update User',
        link: '/admin/users/update'
      },
      {
        text: 'Delete User',
        link: '/admin/users/delete'
      },
    ]
  },
  {
    text: 'Races',
    link: '/admin/races',
    sublinks: [
      {
        text: 'Create Race',
        link: 'admin/races/create'
      },
      {
        text: 'Update Race',
        link: '/admin/races/update'
      },
      {
        text: 'Delete Race',
        link: '/admin/races/delete'
      },
    ]
  },
]

const AdminDashboard = () => {

  return (
    <div style={{ display: 'flex'}}>
      <SideMenu list={SIDEMENU_LINKS}/>
      <UsersPage />
      {/* <div>
        <h1>List Component Example</h1> */}
        {/* <GenericList items={initialItems} renderItem={renderItem} /> */}
      {/* </div>
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
            <h2>Races</h2> */}
            {/* <button style={buttonStyle} onClick={() => navigate('/admin/xc/races')}>Races</button> */}
            {/* <GenericButton type='button' onClick={() => navigate('/admin/xc/races')} label="Races" />
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
        </div> */}
    </div>
  )
}

// const buttonStyle = {
//   backgroundColor: '#4E9CAF',
//     color: '#FFFFFF',
//     padding: '10px 20px',
//     border: 'none',
//     borderRadius: '4px',
//     fontSize: '16px',
// };

export default AdminDashboard