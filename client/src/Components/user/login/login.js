import React,{useState,useEffect, useContext} from 'react'
import {useNavigate,Link} from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../../../Store/userContext'


function Login() {
  const history=useNavigate()

  const initialValues={email:"",password:""}
  const [formValues,setFormValues]=useState(initialValues)
  const [formErrors,setFormErrors]=useState({})
  const [isSubmit,setIsSubmit]=useState(false)

  const {userDetails,setUserDetails} = useContext(UserContext)

  const errors={}
 

  useEffect(()=>{
    console.log('formerr',formErrors);
    if(Object.keys(formErrors).length===0 && isSubmit){
    axios.post("http://localhost:5000/login",formValues).then((res)=>{
      console.log('infor:',res)
      if(res.data == 'Invalidemail'){
        errors.email = "Invalid Email"
        setFormErrors(errors)
      }else if(res.data  == 'Invalidpass'){
        errors.password = 'incorrect password'
        setFormErrors(errors)
      }else {

        // console.log('data',userDetails)
        
        console.log('data',res.data.user)
       
     
      //  console.log('userDetailsssssssssgggggg:',userDetails)

       localStorage.setItem("userInfo.id",res.data.user)
      
       localStorage.setItem("userToken",res.data.token)
      
       localStorage.getItem("authToken");
        history('/success')
      }

     
    }).catch((error)=>{
      console.log(error);
    })
    
     
    }
  },[formErrors,userDetails])

  const handleChange=(e)=>{
    console.log('na::',e.target);
    console.log('name::',e.target.name);
    console.log('value::',e.target.value);
    
    setFormValues({...formValues,[e.target.name]:e.target.value})
  }

    const handleSubmit=(e)=>{
        e.preventDefault()
       
        setFormErrors(validate(formValues))
        setIsSubmit(true)
    }

        const validate=(values)=>{
          console.log('values:::',values);
          const errors={}
          if(!values.email){
            errors.email='Email is required'
          }
          if(!values.password){
            errors.password='Password is required'
          }
          return errors
        }


  return (
    <div>
       <div class="signup-1 flex items-center relative h-screen">
  <div class="overlay absolute inset-0 z-0 bg-black opacity-75"></div>
  <div class="container px-4 mx-auto relative z-10">
    <div class="sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-5/12 mx-auto">
      <div class="box bg-white p-6 md:px-12 md:pt-12 border-t-10 border-solid border-indigo-600">
        <h2 class="text-3xl text-gray-800 text-center">Log In</h2>
        <form onSubmit={handleSubmit}>
          <div class="signup-form mt-6 md:mt-12" >

          
            <div class="border-2 border-solid rounded flex items-center mb-4">
              <div class="w-10 h-10 flex justify-center items-center flex-shrink-0">
                <span class="far fa-envelope text-gray-500"></span>
              </div>
              <div class="flex-1">
                  <input onChange={handleChange} type="text"   name='email' placeholder="E-mail" class="h-10 py-1 pr-3 w-full" ></input>
              </div>
            </div>
            <p style={{color:'red'}}>{formErrors.email}</p>

            <div class="border-2 border-solid rounded flex items-center mb-4">
              <div class="w-10 h-10 flex justify-center items-center flex-shrink-0">
                <span class="fas fa-asterisk text-gray-500"></span>
              </div>
              <div class="flex-1">
                <input onChange={handleChange} type="password"name='password' placeholder="Password" class="h-10 py-1 pr-3 w-full" ></input>
              </div>
            </div>
            <p style={{color:'red'}}>{formErrors.password}</p>


            <div class="text-center mt-6 md:mt-12">
              <button class="bg-indigo-600 hover:bg-indigo-700 text-white text-xl py-2 px-4 md:px-6 rounded transition-colors duration-300">Log In <span class="far fa-paper-plane ml-2"></span></button>
            </div>

          </div>
        </form>
        <div class="border-t border-solid mt-6 md:mt-12 pt-4">
             
              <p class="text-gray-500 text-center">Create an account<Link class="text-indigo-600 hover:underline" to="/signin">Signup</Link></p>
              
            </div>

    

      </div>
    </div>
  </div>
</div>
      </div>




 
  )
}

export default Login