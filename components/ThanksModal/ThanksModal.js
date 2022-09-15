import React from 'react'
import classes from './ThanksModal.module.css'
// import Layout from '../Layout/Layout'

const ThanksModal = (props) => {
  return (
    <div className={classes.backdrop}>
      <div className={classes.wrap}>
        <p>
          {' '}
          {props.message} <span>{props.date}</span>
        </p>
        <button onClick={props.closeMsg}> Okay </button>
      </div>
    </div>
  );
}

export default ThanksModal