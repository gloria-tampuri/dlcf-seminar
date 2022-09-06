import { useRef, useState } from 'react';
import classes from './Input.module.css';

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

    console.log(result);

    
    clearFields();
    if(result.status === 201){
     openMessage()
     setIsLoading(false)
   }
  };

  return (
    <div className={classes.formsection}>
      <form onSubmit={handleSubmit}>
        <div className={classes.section}>
          <label htmlFor='name'> Your name (optional)</label>
          <input type='text' id='name' ref={nameRef} disabled={isLoading} />
        </div>

        <div className={classes.section}>
          <label htmlFor='question'>Question</label>
          <textarea
          required
            id='question'
            placeholder='Comment text.'
            ref={questionRef}
            disabled={isLoading}
          />
        </div>

        <button type='submit' disabled={isLoading}>
          Send
        </button>
      </form>
    </div>
  );
};

export default Input;