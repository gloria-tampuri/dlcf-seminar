import React from 'react'
import classes from './ThanksModal.module.css'
// import Layout from '../Layout/Layout'

const ThanksModal = (props) => {
  return (
   
        <div className={classes.backdrop}>
            <div className={classes.wrap} >
                <p> Thanks for your question. Looking forward to seeing you on <span>18th September</span></p>
                <button onClick={props.closeMsg}> Okay </button>
            </div>
        </div>
    
  )
}

export default ThanksModal