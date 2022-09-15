import React from 'react'
import classes from './MarriageLogo.module.css';

const MarriageLogo = (props) => {
  return (
    <div className={classes.marriageLogo}>
      <p>{props.name}</p>
    </div>
  );
};

export default MarriageLogo