import React from 'react'
import classes from './Footer.module.css'
import  {RiTwitterFill,  RiInstagramFill} from 'react-icons/ri'
import {MdFacebook} from 'react-icons/md'
const Footer = () => {
  return (
    <div className={classes.footer}>
      <div className={classes.copyright}> © 2022 hervtech. </div>
      <div className={classes.socials}> 

      <MdFacebook/> 
      <RiInstagramFill/> 
       <RiTwitterFill/> 
       
       </div>

    </div>
  )
}

export default Footer
// MdFacebook
// RiInstagramFill
// RiTwitterFill