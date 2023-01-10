import React from 'react'
import AdminHome from '../Components/admin/AdminHome/AdminHome'
import AdminSideBar from '../Components/admin/AdminSideBar/AdminSideBar'


function AdminDashBoardPage() {
  return (
    <div className='flex'>  
        <AdminSideBar/>
        <AdminHome/>
       
    </div>
  )
}

export default AdminDashBoardPage