import React, { useState, useRef } from 'react';
import classes from './AddComment.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/*POST REQUEST TO SEND COMMENT
-------------------------------START----------------------------*/
export const sendComment = async (commentId, comments) => {
  const notify = (message, options) => toast(message, options);
  try {
    const response = await fetch(`/api/comments/${commentId}`, {
      method: 'POST',
      body: JSON.stringify(comments),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
   
    if (response.status === 201) {
      return notify('Comment sent successfully', {
        type: 'success',
        autoClose: 3000,
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      return notify('Comment not sent', {
        type: 'error',
        autoClose: 3000,
        position: toast.POSITION.TOP_LEFT,
      });
    }
  } catch (error) {
    return notify('Comment not sent', {
      type: 'error',
      autoClose: 3000,
      position: toast.POSITION.TOP_LEFT,
    });
  }
};
/*------------------------------END-----------------------------*/

const AddComment = ({ commentId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const commentTextRef = useRef();
  const nameRef = useRef();
  const contactRef = useRef();

  // Clear fields
  const clearFields = () => {
    commentTextRef.current.value = '';
    nameRef.current.value = '';
    contactRef.current.value = '';
  };

  /*Comment Submit Handler
  -------------------------------START----------------------------*/
  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const enteredCommentText = commentTextRef.current.value;
    const enteredName = nameRef.current.value;
    const enteredContact = contactRef.current.value;
    // Check if comment is empty
    if (enteredCommentText.trim().length === 0) {
      setIsLoading(false);
      setIsError(true);
      return;
    }
    const comments = {
      comment: enteredCommentText,
      postedBy: enteredName,
      contact: enteredContact,
    };
    /*POST REQUEST TO SEND COMMENT
    -------------------------------START----------------------------*/
     await sendComment(commentId, comments);
    
    /*------------------------------END-----------------------------*/
    clearFields();
    setIsLoading(false);
  };
  /*------------------------------END-----------------------------*/
  return (
    <div className={classes.AddComment}>
      <h3>Add Comment</h3>
      <form onSubmit={handleCommentSubmit}>
        <div className={classes.Control}>
          <input
            type='text'
            id='name'
            placeholder='Name...(Optional)'
            ref={nameRef}
          />
        </div>
        <div className={classes.Control}>
          <input
            type='tel'
            id='contact'
            placeholder='Contact...(Optional)'
            ref={contactRef}
          />
        </div>
        <div className={classes.Control}>
          <textarea
            id='comment'
            name='comment'
            ref={commentTextRef}
            rows='5'
            cols='30'
            required
            placeholder='Type comment...'
          ></textarea>
        </div>
        <button disabled={isLoading === true}>
          {isLoading ? 'Posting...' : 'Post Comment'}
        </button>
        <ToastContainer />
      </form>
    </div>
  );
};

export default AddComment;
