import React from 'react';
import { useRouter } from 'next/router';
import Header from '../../../components/Header/Header';
import QuestionId from '../../../components/QuestionId/QuestionId';

const Question = () => {
  const router = useRouter();
  const { questionId } = router.query;
  return (
    <div>
      <Header />
      <QuestionId id={questionId} />
    </div>
  );
};

export default Question;
