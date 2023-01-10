import React, { useEffect, useState } from 'react'
import { useNavigate,Link } from "react-router-dom"
import axios from "axios"


function Signin() {
  const history = useNavigate();

   const initialValues={userName:'',email:'',phone:'',password:''}

  const[formValues,setFormValues]=useState(initialValues)
  const[formErrors,setFormErrors]=useState({})
  const[isSubmit,setIsSubmit]=useState(false)
  const errors={}




 useEffect(()=>{
  console.log('eeee',formErrors);
  if((Object.keys(formErrors).length === 0 && isSubmit)){
      try {
        axios.post("http://localhost:5000/signin",formValues).then((res)=>{
          console.log("response:",res);

          if(res.data=="invalid"){
            errors.email="Email already exists"
            setFormErrors(errors)
          }else{
              console.log('hhhhh');
            history('/login')
          }
     
    })
      } catch (error) {
        console.log(error);
      }
     
  
  }
 },[formErrors])
 
  const handleChang=((e)=>{
    e.preventDefault()
   
    const {name, value}=e.target
    setFormValues({...formValues,[name]:value})
  
  })


    
   
    const handleSubmit=(e)=>{
      e.preventDefault()
     setFormErrors( Validate(formValues))
      setIsSubmit(true)
      
    }


   const Validate=(values)=>{
    
    const regexUsername = /^[A-Za-z][A-Za-z0-9_ ]{4,12}$/i; 
    const regexMail=/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if(!values.userName){
      errors.userName ="userName is required"
    }  else if(!regexUsername.test(values.userName)){
      errors.userName="Username is not valid"
    }
    if(!values.email){
      errors.email ='email is required'
    }else if(!regexMail.test(values.email)){
      errors.email="Not a valid email format"
    }
  
    if(!values.phone){
      errors.phone ='phone number is required'
    }else if(values.phone.length!==10){
      errors.phone="Phone number must be 10 digit"
    }
    if(!values.password){
      errors.password ='password is required'
    }else if(values.password.length<4){
      errors.password="Password must be more than 4 characters"
    }else if(values.password.length>10){
      errors.password="Password should not exceed 10 characters"
    }
   
      return errors;

   };





 return (
  <div>

    <div class="signup-1 flex items-center relative h-screen">
      <div class="overlay absolute inset-0 z-0 bg-black opacity-75"></div>
      <div class="container px-4 mx-auto relative z-10">
        <div class="sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-5/12 mx-auto">
          <div class="box bg-white p-6 md:px-12 md:pt-12 border-t-10 border-solid border-indigo-600">
            <h2 class="text-3xl text-gray-800 text-center">Create Your Account</h2>
        
            {/* {errorMsg && <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">{errorMsg}</div>} */}
           
            <form  onSubmit={handleSubmit}>
          
            <div class="signup-form mt-6 md:mt-12">

              <div class="border-2 border-solid rounded flex items-center mb-4">
                <div class="w-10 h-10 flex justify-center items-center flex-shrink-0">
                  <span class="far fa-user text-gray-500"></span>
                </div>
                <div class="flex-1">
                  <input type="text" value={formValues.userName} name='userName' onChange={handleChang} placeholder="userName" class="h-10 py-1 pr-3 w-full"></input>
                </div>
              </div>
              <p style={{color:"red"}}>{formErrors.userName}</p>
              

              <div class="border-2 border-solid rounded flex items-center mb-4">
                <div class="w-10 h-10 flex justify-center items-center flex-shrink-0">
                  <span class="far fa-envelope text-gray-500"></span>
                </div>
                <div class="flex-1">
                  <input type="text" name='email' value={formValues.email} onChange={handleChang} placeholder="E-mail" class="h-10 py-1 pr-3 w-full"></input>
                </div>
              </div>
              <p style={{color:"red"}}>{formErrors.email}</p>
             
              <div class="border-2 border-solid rounded flex items-center mb-4">
                <div class="w-10 h-10 flex justify-center items-center flex-shrink-0">
                  <span class="far fa-envelope text-gray-500"></span>
                </div>
                <div class="flex-1">
                  <input type="text" name='phone' value={formValues.phone} onChange={handleChang} placeholder="phone" class="h-10 py-1 pr-3 w-full"></input>
                </div>
              </div>
              <p style={{color:"red"}}>{formErrors.phone}</p>
              <div class="border-2 border-solid rounded flex items-center mb-4">
                <div class="w-10 h-10 flex justify-center items-center flex-shrink-0">
                  <span class="fas fa-asterisk text-gray-500"></span>
                </div>
                <div class="flex-1">
                  <input type="password" name='password' value={formValues.password} onChange={handleChang} placeholder="Password" class="h-10 py-1 pr-3 w-full"></input>
                </div>
              </div>
              <p style={{color:"red"}}>{formErrors.password}</p>
             

              <p class="text-sm text-center mt-6">By signing up, you agree to our <a class="text-indigo-600 hover:underline">Terms</a> and <a class="text-indigo-600 hover:underline">Privacy Policy</a></p>

              <div class="text-center mt-6 md:mt-12">
                <button class="bg-indigo-600 hover:bg-indigo-700 text-white text-xl py-2 px-4 md:px-6 rounded transition-colors duration-300">Sign Up <span class="far fa-paper-plane ml-2"></span></button>
              </div>

            </div>
            </form>


            <div class="border-t border-solid mt-6 md:mt-12 pt-4">
              {/* <p class="text-gray-500 text-center">Already have an account, <a onClick={() => history('/login')} class="text-indigo-600 hover:underline">Log In</a></p> */}
              <p class="text-gray-500 text-center">Already have an account<Link class="text-indigo-600 hover:underline" to="/login">LogIn</Link></p>
              
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
)

}

export default Signin