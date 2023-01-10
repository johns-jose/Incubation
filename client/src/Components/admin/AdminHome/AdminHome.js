import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'


function AdminHome() {
    const [applicants, setApplicants] = useState([])
    const [modalData, setModalData] = useState({})
    const [ismodal, setIsModal] = useState(false)
    const history = useNavigate()

    useEffect(() => {
        const adminToken = localStorage.getItem('adminToken')
        axios.get('http://localhost:5000/admin/app', { headers: { token: `Bearer ${adminToken}` } }).then((res) => {
            setApplicants(res.data)
            // console.log('res:::', res.data);
        }).catch((error) => {
            localStorage.removeItem('adminToken')

            history('/admin')
        })

       
    },[ ])

    const fullDetails = (id) => {
        console.log(id);
        applicants.filter((obj) => {
            
            if (obj._id === id) {
                setModalData({
                    name: obj.fname,
                    email: obj.email,
                    address: obj.streetAddress,
                    state: obj.state,
                    status: obj.status

                })
                setIsModal(true)

            }
        })
    }

    console.log('modaldata:', modalData);

    const approveList = (id) => {
        console.log(id);
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to approve this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Approve!'
          }).then((result) => {
            if (result.isConfirmed) {
            console.log(applicants,"sssssssssss");
                axios.post(`http://localhost:5000/admin/approved/${id}`).then((res) =>{
                    console.log(res.data.response,"zzzzzzzzzzzzz");
                    setApplicants(res.data.response)
                    // history('/dashboard')
                }).catch((err)=>{
                    console.log(err);
                })
                
              
            }
          })
    
       
    }

  
    const rejectedList = (id) => {
        console.log(id);

        Swal.fire({
            title: 'Are you sure?',
            text: "You want to reject this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Reject!'
          }).then((result) => {
            if (result.isConfirmed) {
                console.log(applicants,"rrrrrrrrrrrrrr");
             
                axios.post(`http://localhost:5000/admin/rejected/${id}`).then((res) => {
                    console.log(res.data.response,"ssssssssssssssss");
                    
                    setApplicants(res.data.response)
             
                    // history('/dashboard')
                })
            }
          })
       
    }

    


    return (

        <div class="container mx-auto px-4 sm:px-8">
            <div class="py-8">
                <div>
                    <h2 class="text-2xl font-semibold leading-tight">APPLICATIONS</h2>
                </div>
                <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">


                        <table class="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th
                                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        SL NO:
                                    </th>
                                    <th
                                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        USER-ID
                                    </th>
                                    <th
                                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        APPLICANT
                                    </th>
                                    {/* <th
                                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        COMPANY_NAME
                                    </th> */}
                                    <th
                                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        STATUS
                                    </th>
                                    <th
                                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        ACTION
                                    </th>
                                </tr>
                            </thead>
                            <tbody>



                                {applicants.map((item, index) => {

                                    return (


                                        <tr>
                                            <td className="text-center">{index + 1}</td>
                                            <td className="text-center">{item._id}</td>
                                            <td className="text-center">{item.fname}</td>
                                            {/* <td className="text-center">{item.email}</td> */}
                                            <td className="text-center">{item.status}</td>
                                            <td className="text-center p-4 ">
                                                <button type="button" class="  inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-yellow-400 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out" onClick={(e) => { fullDetails(item._id) }} >Open</button>
                                                <button type="button" class=" m-2  inline-block px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-purple-200 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-200 active:shadow-lg transition duration-150 ease-in-out" onClick={(e)=>approveList(item._id) } >Approve</button>
                                                <button type="button" class="  inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-yellow-400 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out" onClick={(e) => { rejectedList(item._id) }} >REJECT</button>

                                            </td>
                                        </tr>
                                    )
                                })
                                }

                            </tbody>


                        </table>

                    </div>
                </div>
            </div>


            {ismodal ? (<>
                <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">

                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">

                            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                <h3 className="text-3xl font-semibold">compay name</h3>
                                <button
                                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                    onClick={() => setIsModal(false)}
                                >
                                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                                        ×
                                    </span>
                                </button>
                            </div>

                            <div className="relative p-6 flex-auto">
                                <table>
                                    <tbody className='flex flex-col '>
                                        <tr className='pt-2'>
                                            <th className='text-right pr-2 w-[35%]'>Name:{modalData.name}  </th>
                                            <td width="200px"></td>
                                        </tr>
                                        <tr className='pt-2'>
                                            <th className='text-right pr-2 w-[35%]'> Email:{modalData.email}  </th>
                                            <td width="200px"></td>
                                        </tr>
                                        <tr className='pt-2'>
                                            <th className='text-right pr-2 w-[35%]'>Phone : </th>
                                            <td width="200px"></td>
                                        </tr>
                                        <tr className='pt-2'>
                                            <th className='text-right pr-2 w-[35%] align-top'>Address:{modalData.address}</th>
                                            <td width="200px"></td>
                                        </tr>
                                        <tr className='pt-2'>
                                            <th className='text-right pr-2 w-[35%]'>Incubation : </th>
                                            <td width="200px"> </td>
                                        </tr>
                                        <tr className='pt-2'>
                                            <th className='text-right pr-2 w-[35%]'>Status:{modalData.status} </th>
                                            <td width="200px">  </td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </>) : null}
            {/* <div className="opacity-25 fixed inset-0 z-40 bg-black"></div> */}





        </div>

    )
}

export default AdminHome
