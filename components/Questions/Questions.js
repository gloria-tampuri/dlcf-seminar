import React,{useState} from 'react'
import classes from './Questions.module.css'
import Header from '../Header/Header';
import Input from '../Input/Input';
import MarriageLogo from '../MarriageLogo/MarriageLogo';
import ThanksModal from '../ThanksModal/ThanksModal';

const Questions = () => {
  const [showMsg, setShowMsg] =useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const messageHandler=()=>{
    setShowMsg(true)
  }

  const closeMsgHandler=()=>{
    setShowMsg(false)
  }

    return (
      <>
      {showMsg ? <ThanksModal closeMsg={closeMsgHandler}/> :  <div className={classes.questions}>
        <Header />
        <MarriageLogo />
        <Input openMessage={messageHandler} />
      </div>}
     
      </>
    );

}

export default Questions