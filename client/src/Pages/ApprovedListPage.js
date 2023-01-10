import React from 'react'
import AdminSideBar from '../Components/admin/AdminSideBar/AdminSideBar'
import ApprovedList from '../Components/admin/approved/ApprovedList'

function ApprovedListPage() {
  return (
    <div className='flex'>
        <AdminSideBar/>
        <ApprovedList/>
      
    </div>
  )
}

export default ApprovedListPage
