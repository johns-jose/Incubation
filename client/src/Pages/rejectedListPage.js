
import React from 'react'
import AdminSideBar from '../Components/admin/AdminSideBar/AdminSideBar'
import RejectedList from '../Components/admin/Rejected/RejectedList'


function RejectedListPage() {
  return (
    <div className='flex'>
        <AdminSideBar/>
        <RejectedList/>
        
    </div>
  )
}

export default RejectedListPage