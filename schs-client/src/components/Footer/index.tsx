import React from 'react'

export const Footer = () => {
  const data = [
    {
      header: 'SCHS Cross Country',
      links: ['XC Home']
    },
    {
      header: 'SCHS Track & Field',
      links: ['Track Home']
    },
    {
      header: 'Wrokouts',
      links: ['Get Fit!']
    },
    {
      header: 'Related Sites',
      links: ['Athletic Track & Field', 'XC Stats', 'Prep Cal Track', 'Runner Space', 'Lynbrook HS XC/Track']
    }
  ]
  return (
    <>
      <footer>
        {data.map((footer) => {
          return (
            <h6>{footer.header}</h6>
          )
        })}
      </footer>
    </>
  )
}