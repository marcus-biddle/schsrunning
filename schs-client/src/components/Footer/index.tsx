import React from 'react'

export const Footer = () => {
  const data = [
    {
      header: 'SCHS Cross Country',
      links: ['XC Runners', 'Seasons', 'XC Coaches', 'XC Top 25', 'XC Top Teams', 'XC Alumni Races']
    },
    {
      header: 'SCHS Track & Field',
      links: ['Track Athletes', 'Seasons', 'Events', 'Hall of Fame', 'Track Coaches']
    },
    {
      header: 'Workouts',
      links: ['Get Fit!']
    },
    {
      header: 'Related Sites',
      links: ['Athletic Track & Field', 'XC Stats', 'Prep Cal Track', 'Runner Space', 'Lynbrook HS XC/Track']
    }
  ]
  return (
    <>
      <footer style={{ display: 'flex', marginRight: '10rem', marginLeft: '10rem', justifyContent: 'space-evenly', marginTop: '8rem', borderTop: 'solid 1px grey'}}>
        {data.map((footer) => {
          return (
            <div>
              <h5>{footer.header}</h5>
              {footer.links.map((link) => (
                <p style={{ fontSize: '12px'}}>{link}</p>
              ))}
            </div>
          )
        })}
      </footer>
      <div style={{ textAlign: 'center'}}>
        <span style={{ opacity: '.65'}}>Cal Workouts 2017-2023 - All Rights Reserved</span>
      </div>
      
    </>
  )
}