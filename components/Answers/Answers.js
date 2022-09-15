import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import classes from './Answers.module.css';
import MarriageLogo from '../MarriageLogo/MarriageLogo';

const Answers = () => {
  const [questions, setQuestions] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/questions');
        const data = await res.json();
        setQuestions(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  console.log(questions);
  // if (isError) {
  //   return <div>Something went wrong ...</div>;
  // }
  // if (isLoading) {
  //   return (
  //     <div>
  //       <Spinner />
  //     </div>
  //   );
  // }
  // if (!questions) {
  //   return <div>No questions yet ...</div>;
  // }

  return (
    <div>
      <div className={classes.questionBtn}>
        <Link href='/seminar'>Ask a Question</Link>
      </div>
      <MarriageLogo name='Questions' />
      <main>
        <div className={classes.question}>
          {questions &&
            questions?.questions.map((question) => (
              <div className={classes.questionCard} key={question._id}>
                <p>{question.question}</p>
                <Link href={`/seminar/answers/${question._id}`}>
                  <button>View More</button>
                </Link>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
};

export default Answers;
