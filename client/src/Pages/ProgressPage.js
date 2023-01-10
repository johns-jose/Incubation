import React from 'react'
import AdminSideBar from '../Components/admin/AdminSideBar/AdminSideBar'
import Progress from '../Components/admin/Progress/Progress'

function ProgressPage() {
  return (
    <div className='flex'>
        <AdminSideBar/>
        <Progress/>
    </div>
  )
}

export default ProgressPage