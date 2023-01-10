import React from 'react'
import {Link,useNavigate}from 'react-router-dom'
import Swal from 'sweetalert2'

function AdminSideBar() {
  const history = useNavigate()
  
  const logout=()=>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Log out!'
    }).then((result) => {
      if (result.isConfirmed) {
       
      
    localStorage.removeItem('adminToken')
    history('/admin')
      
          
        
      }
    })



  }

  const Menus = [
    { Dashboard: "Dashboard", src: "Chart_fill" },
    { Approve: "Approved List", src: "Chat" },
    { Reject: "Rejected List", src: "User",  },
    { Slots: "Booking Slots ", src: "Calendar" },
    { create: "Create Slots", src: "Search" },
    { progress: "Progress Status", src: "Search" },

  ];
  return (
    <div className="flex">
      <div
        className= "bg-blue-400 h-screen p-5  pt-8 relative duration-300"
      >
        <img
          // src={logo}
          // className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
          //  border-2 rounded-full  ${!open && "rotate-180"}`}
          // onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img 
            // src={pg}
            // className={`cursor-pointer duration-500 h-10 ${
            //   open && "rotate-[360deg]"
            // }`}
          />
          <h1
            // className={`text-white origin-left font-medium text-xl duration-200 ${
            //   !open && "scale-0"
            // }`}
          >
            Incubation Management
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white  text-md items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === 0 && "bg-light-white"
              } `}
            >
              {/* <img src={user} /> */}
              <span>
                {Menu.title}
               
                <Link to='/approved'>{Menu.Approve}</Link>
                <Link to='/rejected'>{Menu.Reject}</Link>
                <Link to='/slot'>{Menu.Slots}</Link>
                <Link to='/dashboard'>{Menu.Dashboard}</Link>
                <Link to='/progress'>{Menu.progress}</Link>


              </span>

            </li>

          ))}
        </ul>
        <div className="p-8">
        <button onClick={logout}  type="button" class="inline-block px-6 py-2.5 bg-green-500 text-dark font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Log Out</button>

        </div>
      </div>

    </div>
      )
}
  


export default AdminSideBar