import { useRef, useState } from 'react';
import classes from './Input.module.css';
import SpinnerTwo from '../UI/SpinnerTwo'

const Input = ({openMessage}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showMsg,setShowMsg] =useState(false)
 


  const nameRef = useRef();
  const questionRef = useRef();

  // Clear fields after submit
  const clearFields = () => {
    nameRef.current.value = '';
    questionRef.current.value = '';
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    // Make request object
    const request = {
      name: nameRef.current.value,
      question: questionRef.current.value,
    };
    
    const response = await fetch("/api/questions",{
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    });
    const result = await response.json()

    
    clearFields();
    if(result.status === 201){
     openMessage()
     setIsLoading(false)
   }
  };

  return (
    <div className={classes.formsection}>
      <form onSubmit={handleSubmit}>
        <div className={classes.notice}>
          <p>
            Please for direct answers, contact <span>0245351832</span>. However,
            questions will be answered at the seminar{' '}
            <span>(DLCF REGENT, MENDSKROM)</span>
          </p>
        </div>
        <div className={classes.section}>
          <label htmlFor='name'> Your name (optional)</label>
          <input
            type='text'
            id='name'
            ref={nameRef}
            placeholder='Type name here'
            disabled={isLoading}
          />
        </div>

        <div className={classes.section}>
          <label htmlFor='question'>Question</label>
          <textarea
            required
            id='question'
            placeholder='Type question here..'
            ref={questionRef}
            disabled={isLoading}
          />
        </div>

        <button
          className={isLoading === true ? classes.notactive : classes.btn}
          type='submit'
          disabled={isLoading}
        >
          {isLoading ? <SpinnerTwo /> : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default Input;