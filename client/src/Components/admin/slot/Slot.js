import React, { useState, useEffect } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Slot() {
    const history = useNavigate()
    const [approve, setapprove] = useState([])
    const [space,setSpace]=useState([])
    const [selected,setSelected]=useState([])


    useEffect(() => {
        axios.get('http://localhost:5000/admin/getApprovedList').then((res) => {
            // console.log(res.data);
            setapprove(res.data)
            console.log('APPROVE', approve)
        }).catch((err)=>{
            console.log(err);

        })

        axios.get('http://localhost:5000/admin/getBookingSlot').then((res)=>{
            console.log('resdata',res.data);
            setSpace(res.data)
        }).catch((err)=>{
            console.log(err);

        })


    },[])

    const bookroom=(e)=>{
        e.preventDefault()
        console.log(space);
        axios.post('http://localhost:5000/admin/slotbooking',selected).then((res)=>{
            console.log(res.data,'xxxxxxxxx');
            setSpace(res.data)
            // history('/slot')
            axios.get('http://localhost:5000/admin/getApprovedList').then((res) => {
                // console.log(res.data);
                setapprove(res.data)
                console.log('APPROVE', approve)
            }).catch((err)=>{
                console.log(err);
    
            })
        })

       
      
    }







    return (

        <div className='w-4/5 px-3 '>
            <div className='m-4 grid grid-cols-5 gap-2'>
            {space.map((obj)=>{

                return(

           
                <div className='bg-slate-900  w-40  h-40 m-2 text-white text-center'>{obj.slotName}
               {obj.companyName ? 
                    (<> <div className='text-2xl'>Alloted to <br />{ obj.companyName}</div></>):
                    (<> <div className='bg-slate-600 text-black m-3'>
                        <select onClick={(e)=>{setSelected({name:e.target.value,slotid:obj._id})}} className='w-full' name="select" id="">
                            <option value="">Select</option>
                            {approve.map((item) => {

                                return (

                                    <option value={item.fname}>{item.fname}</option>

                                )

                            })



                            }
                        </select>
                    </div>

                    <button onClick={bookroom} className='bg-stone-600 w-12 rounded-full mx-12' >Book</button> </>)}

               
                </div>
                )

                })
              }

            </div>



        </div>


    )
}

export default Slot