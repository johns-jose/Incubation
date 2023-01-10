import React from 'react'
import AdminSideBar from '../Components/admin/AdminSideBar/AdminSideBar'
import Slot from '../Components/admin/slot/Slot'

function SlotPage() {
  return (
    <div className='flex'>
        <AdminSideBar/>
        <Slot/>
    </div>
  )
}

export default SlotPage