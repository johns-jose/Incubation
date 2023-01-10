import React, { useState, useEffect,useContext } from 'react'
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import { ModalContext } from '../../../Store/Modalcontext'

function ApprovedList() {
  const [forms, setforms] = useState([])
  const{ modalData, setModalData}=useContext(ModalContext)
  const history= useNavigate()
  const [ismodal, setIsModal] = useState(false)


  useEffect(() => {

    axios.get('http://localhost:5000/admin/getApprovedList').then((res) => {
      console.log(res.data);

      setforms(res.data)

    }).catch((error)=>{
      
      history('/approved')
    })

  },[])

  const rejectedList = (id) => {
    console.log(id);
    axios.post(`http://localhost:5000/admin/rejected/${id}`).then((res) => {
         
        history('/approved')
    })
}
const fullDetails = (id) => {
  console.log(id);
  forms.filter((obj) => {
      
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

  return (
    <div class="container mx-auto px-4 sm:px-8">
      <div class="py-8">
        <div>
          <h2 class="text-2xl font-semibold leading-tight"> APPROVED APPLICATIONS</h2>
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
                    NAME
                  </th>
                  <th
                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    EMAIL
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
                {
                  forms.map((obj, index) => {



                    return (

                      <tr>
                        <td className="text-center">{index + 1}</td>
                        <td className="text-center">{obj.fname}</td>
                        <td className="text-center">{obj.email}</td>
                        {/* <td className="text-center">{obj.company_name}</td> */}
                        <td className="text-center">{obj.status}</td>
                        <td className="text-center p-4 ">
                        <button type="button" class="  inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-yellow-400 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out" onClick={(e) => { fullDetails(obj._id) }} >Open</button>
                          <Link to='/slot'><button type="button" class=" m-2  inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-purple-200 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-200 active:shadow-lg transition duration-150 ease-in-out">book slot</button></Link>
                          
                          {/* <button type="button" class="  inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-yellow-400 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"onClick={(e)=>{rejectedList(obj._id)}}  >REJECT</button> */}
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
                                        {/* <tr className='pt-2'>
                                            <th className='text-right pr-2 w-[35%]'>Phone : </th>
                                            <td width="200px"></td>
                                        </tr> */}
                                        <tr className='pt-2'>
                                            <th className='text-right pr-2 w-[35%] align-top'>Address:{modalData.address}</th>
                                            <td width="200px"></td>
                                        </tr>
                                        {/* <tr className='pt-2'>
                                            <th className='text-right pr-2 w-[35%]'>Incubation : </th>
                                            <td width="200px"> </td>
                                        </tr> */}
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
    </div>
  )
}

export default ApprovedList
