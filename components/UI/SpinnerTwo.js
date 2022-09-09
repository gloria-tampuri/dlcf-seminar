import React from 'react'
import classes from './SpinnerTwo.module.css'


const SpinnerTwo = () => {
  return (
    <div className={classes.center}>
        <div className={classes.ellipsis}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        </div>
    </div>
  )
}

export default SpinnerTwo