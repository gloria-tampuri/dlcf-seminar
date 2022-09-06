import React from 'react'
import classes from './ThanksModal.module.css'

const ThanksModal = (props) => {
  return (
    <div >
        <div className={classes.backdrop}>
            <div className={classes.wrap} >
                <p> Thanks for your question. Looking forward to seeing you on <span>11th September</span></p>
                <button onClick={props.closeMsg}> Okay </button>
            </div>
        </div>
    </div>
  )
}

export default ThanksModal