import React from 'react'
import { getAccessTokenCookie } from '../../authUtils'

const AdminDashboard = () => {
    console.log('cookie func', getAccessTokenCookie())
  return (
    <div>AdminDashboard</div>
  )
}

export default AdminDashboard