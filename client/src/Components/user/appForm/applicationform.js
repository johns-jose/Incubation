import React,{useState,useEffect,useContext} from 'react'
import './Form.css'
import axios from 'axios'
import { UserContext } from '../../../Store/userContext'
import { useNavigate } from 'react-router-dom'

function AppForm() {
const initialFormValues={fname:'',email:'',streetAddress:'',city:'',state:'',pin:'',country:''}
const [formValues,setFormValues]=useState(initialFormValues)
const [formErrors,setFormErrors]=useState({})
const [isSubmit,setIsSubmimt]=useState(false)
const{userDetails, setUserDetails}=useContext(UserContext)
const history=useNavigate()

useEffect(()=>{
  console.log(formErrors);
  if(Object.keys(formErrors).length===0 && isSubmit){
    const userToken = localStorage.getItem("userToken");
console.log('usertoken:',userToken);
console.log('tls:',localStorage.getItem("userToken"));

  axios.post(`http://localhost:5000/application`,formValues, {headers:{ token: `Bearer ${userToken}` }} ).then((res)=>{
    history('/')
      console.log('response:',res);
    }).catch((error)=>{
      console.log(error);
      localStorage.removeItem('userToken')
      localStorage.removeItem('usesrDetails')
      history('/')
    }) 
     
    

   

  }
},[formErrors])

const handleChange=(e)=>{
  console.log(e.target.name)
 setFormValues( {...formValues,[e.target.name]:e.target.value})
  
}

const handleSubmit=(e)=>{
  e.preventDefault()
  setIsSubmimt(true)
  setFormErrors(validate(formValues))
}

const validate=(values)=>{
  const errors={}
  if(!values.fname){
    errors.fname ="Firstname is required"
  }
  if(!values.email){
    errors.email ="Email is required"
  }
  if(!values.streetAddress){
    errors.streetAddress ="streetAddress is required"
  }

  if(!values.city){
    errors.city ="City is required"
  }
  if(!values.state){
    errors.state ="State is required"
  }
  if(!values.pin){
    errors.pin ="Pincode is required"
  }
  if(!values.country){
    errors.country ="Country is required"
  }
  return errors
  

}


  return (
    <div className='mt-20'>
        <div className='grid grid-cols-9 mt-10'>
  <div className="mt-10 sm:mt-0 col-start-3  col-span-7 ">
    <div className="md:grid md:grid-cols-3 md:gap-6">
      
      <div className="mt-10 md:col-span-2 md:mt-0">
        <h1 className='text-3xl font-bold mb-5 underline'>Application Form</h1>
        <form  onSubmit={handleSubmit} >
          <div className="overflow-hidden shadow sm:rounded-md border-1 border-black">
            <div className="bg-white px-4 py-5 sm:p-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-6 gap-6  border-black ">
                
                <div className="col-span-6 sm:col-span-3 ">
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 text-left">
                    First name
                  </label>
                  <input
                    type="text"
                    name="fname"
                    id="first-name"
                    onChange={handleChange}
                   
                    autoComplete="given-name"
                    className="mt-1 w-full rounded-md border-black shadow-sm h-10"
                  />
                  <p style={{color:"red"}}>{formErrors.fname}</p>
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 text-left">
                    Last name
                  </label>
                  <input
                    type="text"
                    name="lname"
                   
                    id="last-name"
                    autoComplete="family-name"
                    className="mt-1 w-full rounded-md border-black shadow-sm h-10 "/>
                </div>

                <div className="col-span-6 ">
                  <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 text-left">
                    Email address
                  </label>
                  <input
                    type="text"
                    name="email"
                    onChange={handleChange}
                    
                    id="email-address"
                    autoComplete="email"
                    className="mt-1 w-full rounded-md border-black shadow-sm h-10"
                  />
                   <p style={{color:"red"}}>{formErrors.email}</p>
                </div>

                

                <div className="col-span-6">
                  <label htmlFor="street-address" className="block text-sm font-medium text-gray-700 text-left">
                    Street address
                  </label>
                  <input
                    type="text"
                    name="streetAddress"
                    onChange={handleChange}
                   
                    id="street-address"
                    autoComplete="street-address"
                    className="mt-1 w-full rounded-md border-black shadow-sm h-10"
                  />
                   <p style={{color:"red"}}>{formErrors.streetAddress}</p>
                </div>

                <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 text-left">
                    City
                  </label>
                  <input
                    type="text"
                    onChange={handleChange}
                    
                    name="city"
                    id="city"
                    autoComplete="address-level2"
                    className="mt-1 w-full rounded-md border-black shadow-sm h-10 "
                  />
                   <p style={{color:"red"}}>{formErrors.city}</p>
                </div>

                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label htmlFor="region" className="block text-sm font-medium text-gray-700 text-left">
                    State / Province
                  </label>
                  <input
               
                    type="text"
                    name="state"
                    onChange={handleChange}
                    id="region"
                    autoComplete="address-level1"
                    className="mt-1 w-full rounded-md border-black shadow-sm h-10"
                  />
                   <p style={{color:"red"}}>{formErrors.state}</p>
                </div>

                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700 text-left">
                    ZIP / Postal code
                  </label>
                  <input
                    type="text"
                    onChange={handleChange}
                   
                    name="pin"
                    id="pin"
                    autoComplete="postal-code"
                    className="mt-1 w-full rounded-md border-black shadow-sm h-10 "
                  />
                   <p style={{color:"red"}}>{formErrors.pin}</p>
                </div>
                 
                <div className="col-span-6 sm:col-span-3">
         
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 text-left">
                    country Name
                  </label>
                  <input
                  type="text"
                  onChange={handleChange}
               
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    className="mt-1 w-full rounded-md border-black shadow-sm h-10"
                  />
                    <p style={{color:"red"}}>{formErrors.country}</p>
                    
                </div>
                {/* <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="logo" className="block text-sm font-medium text-gray-700 text-left">
                 Company Logo
                  </label>
                  <input
                  type="file"
                    id="companyLogo"
                    name="companyLogo"
                   
                    className="mt-1 w-full rounded-md border-black shadow-sm h-10"
                  />
                    
                </div> */}






                <div className="col-span-6">
                  <label htmlFor="street-address" className="block text-sm font-medium text-gray-700 text-left">
                  Describe your team and Background
                  </label>
                  <input
             
                    type="text-area"
                    name="a"
                    id="street-address"
                    autoComplete="street-address"
                    className="mt-1 w-full rounded-md border-black shadow-sm h-20 "
                  />
                </div>
                {/* <div className="col-span-6">
                  <label htmlFor="street-address" className="block text-sm font-medium text-gray-700 text-left">
             2. Describe your company and products
                  </label>
                  <input
                    type="text-area"
                    name="b"
                    id="street-address"
              
                    autoComplete="street-address"
                    className="mt-1 w-full rounded-md border-black shadow-sm h-20 "
                  />
                </div>
                <div className="col-span-6">
                  <label htmlFor="street-address" className="block text-sm font-medium text-gray-700 text-left">
                 3. Describr the proiblem you are solving 
                  </label>
                  <input
                    type="text-area"
                    name="c"
                    id="street-address"
                
                    autoComplete="street-address"
                    className="mt-1 w-full rounded-md border-black shadow-sm h-20 "
                  />
                </div>
                <div className="col-span-6">
                  <label htmlFor="street-address" className="block text-sm font-medium text-gray-700 text-left">
                 4. What is unique about your solution ?
                  </label>
                  <input
                    type="text-area"
                    name="d"
                  
                    id="street-address"
                    autoComplete="street-address"
                    className="mt-1 w-full rounded-md border-black shadow-sm h-20 "
                  />
                </div>
                
                <div className="col-span-6">
                  <label htmlFor="street-address" className="block text-sm font-medium text-gray-700 text-left">
              5. What is your value proposition for the customer
                  </label>
                  <input
                    type="text-area"
                    name="e"
                   
                    id="street-address"
                    autoComplete="street-address"
                    className="mt-1 w-full rounded-md border-black shadow-sm h-20 "
                  />
                </div> */}
                {/* <div className="col-span-6">
                  <label htmlFor="street-address" className=" text-sm font-medium text-gray-700 text-left">
            6. Type of Incubation needed.
                  </label><br />
                
                  <input
                    type="radio"
                    name="incubationType"
                    
                   
                    id="incubationType"
                    value="Virtual Incubation"
                    className=""
                  />
                   <label htmlFor="street-address" className=" text-sm font-medium text-gray-700 pl-2 text-left">
           Virtual Incubation
                  </label><br />
                  <input
                    type="radio"
                    name="incubationType"
                    id="incubationType"
                    value="Physical Incubation"
                   
                    className=""
                  />
                    <label htmlFor="street-address" className=" text-sm font-medium text-gray-700 pl-2 text-left">
      Physical Incubation
                  </label>
                </div> */}
               
                </div>
                </form>
            </div>
           
           
            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6 flex justify-center">
            <span className='bg-sky-500'> <button
                type="submit"
                className=" bg-cyan-500 inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
               Submit 
              </button></span> 
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>

  </div>
    </div>
  )
}

export default AppForm