import React from 'react'
import classes from './ErrorPage.module.css'
import { useRouter } from 'next/router'



const ErrorPage = () => {
  const router =useRouter()
  return (
    <div className ={classes.error}>
        <h1> 404 </h1>
        <p>Page cannot be found! </p>
        <button onClick={()=>router.push('/')}> GO BACK HOME </button>
    </div>
  )
}

export default ErrorPage