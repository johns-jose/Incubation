import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {useNavigate}from "react-router-dom"

function RejectedList() {
  const [forms, setforms]=useState([])

  useEffect(()=>{

    axios.get('http://localhost:5000/admin/getRejectedList').then((res)=>{

    setforms(res.data)

    })


  },[])
  return (
    <div class="container mx-auto px-4 sm:px-8">
    <div class="py-8">
        <div>
            <h2 class="text-2xl font-semibold leading-tight"> REJECTED APPLICATIONS</h2>
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
                          
                        </tr>
                    </thead>
                    <tbody>
                    { 
                                forms.map((obj, index) => {

                                
                                    
                      return  ( 
                      
                      <tr>
                        <td className="text-center">{index +1}</td>
                        <td className="text-center">{obj.fname}</td>
                        <td className="text-center">{obj.email}</td>
                        {/* <td className="text-center p-4">{obj.company_name}</td> */}
                        <td className="text-center text-red-500">{obj.status}</td>
                                  
                        </tr>
                      )
                                })
                            }
                    </tbody>
                </table>
                
            </div>
        </div>
    </div>
</div>
  )
}

export default RejectedList