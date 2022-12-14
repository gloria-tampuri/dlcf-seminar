import React from 'react'
import {format,formatRelative} from 'date-fns'
import { useQuestion } from '../../hooks/useQuestion';
import classes from './QuestionId.module.css';
import {MdOutlineKeyboardBackspace} from 'react-icons/md'
import { useRouter } from 'next/router'

const QuestionId = ({ id }) => {
  const { question } = useQuestion(id);
  const data = question?.question;
  const router = useRouter();

  const handleAnswer = () => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/questions/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ isAnswered: true }),
        });
        const data = await res.json();
        if (data.success) {
          // Redirect to the questions page
          window.location.href = '/seminar/questions';
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  };
  // format(new Date(2014, 1, 11), 'MM/dd/yyyy')
  // formatRelative(addDays(new Date(), -6), new Date())
  return (
    <>
      {data && (
        <div className={classes.QuestionId}>
          <MdOutlineKeyboardBackspace
            onClick={() => router.push('/seminar/questions')}
            className={classes.BiArrowBack}
          />
          <div className={classes.namedate}>
            <h4 className={classes.name}>
              Name: <span>{data.name}</span>
            </h4>
            <p className={classes.date}>
              Date:{' '}
              <span>
                {format(new Date(data.date), 'MM/dd/yyyy')},{' '}
                {formatRelative(new Date(data.date), new Date())}
              </span>
            </p>{' '}
          </div>

          <div className={classes.topic}>
            <h4>Question</h4>
          </div>

          <p>{data.question}</p>

          <button
            onClick={handleAnswer}
            // disabled={data.isAnswered === true}
          >
            {data.isAnswered === false ? 'Not answered' : 'Answered'}
          </button>
        </div>
      )}
    </>
  );
};

export default QuestionId