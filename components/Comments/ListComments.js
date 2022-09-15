import React from 'react';
import { format, formatRelative } from 'date-fns';
import classes from './ListComments.module.css';

const ListComments = ({ comments }) => {

  return (
    <div className={classes.ListComments}>
      <h3>List of Comments</h3>
      <div className={classes.Comments}>
        {comments &&
          comments.map((comment) => (
            <div key={comment._id} className={classes.Comment}>
              <i className={classes.Post}>
                Posted at {format(new Date(comment.date), 'MM/dd/yyyy')},{' '}
                {formatRelative(new Date(comment.date), new Date())}
              </i>
              <p>{comment.comment}</p>
              <div className={classes.Contact}>
                <span>By: {comment.postedBy}</span>
                <span>Contact: {comment.contact}</span>
              </div>
            </div>
          ))}
        {comments.length === 0 && <p>No comments yet</p>}
      </div>
    </div>
  );
};

export default ListComments;
