import React,{useState} from 'react'
import classes from './Questions.module.css'
import Header from '../Header/Header';
import Input from '../Input/Input';
import Link from 'next/link';
import MarriageLogo from '../MarriageLogo/MarriageLogo';
import ThanksModal from '../ThanksModal/ThanksModal';

const Questions = () => {
  const [showMsg, setShowMsg] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const messageHandler = () => {
    setShowMsg(true);
  };

  const closeMsgHandler = () => {
    setShowMsg(false);
  };

  return (
    <>
      {showMsg ? (
        <ThanksModal
          closeMsg={closeMsgHandler}
          message='Thanks for your question. Looking forward to seeing you on'
          date='18th September'
        />
      ) : (
        <div className={classes.questions}>
          <Header />
          {/* <div className={classes.question}>
            <Link href='/seminar/answers'>View Questions</Link>
          </div>*/}
          <MarriageLogo name='Questions Portal' />
          <Input openMessage={messageHandler} />
        </div>
      )}
    </>
  );
};

export default Questions