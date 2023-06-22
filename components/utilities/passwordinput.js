import React,{useState} from 'react'
import {TextInput} from 'flowbite-react'
import { FaEye,FaEyeSlash } from "react-icons/fa";


export default function PasswordInput(props) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className='relative'>
      <TextInput 
        type={showPassword?"text":"password"} 
        name={props.name?props.name:''}
        value={props.value?props.value:null}
        onChange={props.onChange?props.onChange:()=>{}}
        helperText={props.helperText?props.helperText:''}
        color={props.color?props.color:''}
        id={props.id?props.id:''}
        placeholder={props.placeholder?props.placeholder:"••••••••"} 
        class={`bg-gray-50 border border-gray-300  text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${props.className}`} 
        required={props.required?props.required:''}
      />
      <span className='absolute top-3 right-2 cursor-pointer' onClick={()=>setShowPassword(!showPassword)}>
          {!showPassword?<FaEye/>:<FaEyeSlash/>}
      </span>
    </div>
  )
}
