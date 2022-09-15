import React from 'react'
import classes from './QuestionsList.module.css'
import Link from 'next/link';
import Header from '../Header/Header';


const QuestionList = ({ questions }) => {
  // filter questions by isAnswered
  const answeredQuestions = questions.filter(
    (question) => question.isAnswered === true
  );
  const unansweredQuestions = questions.filter(
    (question) => question.isAnswered === false
  );

  return (
    <div className='Page'>
      <div className={classes.listpage}>
        <h1>Questions ({questions.length})</h1>
        <ul className={classes.list}>
          {questions.map((question) => (
            <li key={question._id} className={classes.eachquestion}>
              {question.isAnswered ? (
                <span className={classes.spanRed}></span>
              ) : (
                <span className={classes.spanBlue}></span>
              )}
              <Link href={`/seminar/questions/${question._id}`}>
                <a
                  className={
                    question.isAnswered === true
                      ? classes.link
                      : classes.activelink
                  }
                >{`${question.question.substring(0, 28)}...`}</a>
              </Link>
            </li>
          ))}
        </ul>
        <div className={classes.summary}>
          <p className={classes.answered}>
            Answered: <span>{answeredQuestions.length}</span>
          </p>
          <p className={classes.notAnswered}>
            Not Answered: <span>{unansweredQuestions.length}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuestionList