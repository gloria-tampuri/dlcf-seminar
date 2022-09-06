import React from 'react'
import classes from './MarriageLogo.module.css'
import marriageLogo from '../../assets/Marriage Seminar.png'
import Image from 'next/image'

const MarriageLogo = () => {
  return (
    <div className={classes.marriageLogo}>
        <Image src={marriageLogo} alt='marriage logo' className={classes.mLogo}/>
    </div>
  )
}

export default MarriageLogo