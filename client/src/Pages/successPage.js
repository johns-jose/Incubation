import React,{useContext,useEffect} from 'react'
import Header from '../Components/user/Header/Header'
import { UserContext } from '../Store/userContext'
import axios from 'axios'

function SuccessPage() {
    const{userDetails, setUserDetails}=useContext(UserContext)

    useEffect(()=>{
        const userId = localStorage.getItem('userInfo.id')
     
        console.log('uuuuuuu',userId);
     
        axios.get(`http://localhost:5000/getUserInfo/${userId}`).then((res)=>{
     
         console.log('start',res.data);
         setUserDetails(res.data)
        })
     
       },[])


  return (
    <div>
    <Header/>
    </div>
  )
}

export default SuccessPage