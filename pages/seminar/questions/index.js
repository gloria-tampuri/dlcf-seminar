import React from 'react';
import Header from '../../../components/Header/Header';
import QuestionList from '../../../components/QuestionsList/QuestionList';
import Spinner from '../../../components/UI/Spinner';
import { useQuestions } from '../../../hooks/useQuestions';

const Questions = () => {
  const { questions, isLoading, isError } = useQuestions();

  if (isError) {
    return <div>Something went wrong ...</div>;
  }
  if (isLoading) {
    return <div><Spinner/></div>;
  }
  if (!questions) {
    return <div>No questions yet ...</div>;
  }

  return (
    <div>
       <Header />
    { isLoading ? <Spinner/> : <QuestionList questions={questions.questions} />}
    </div>
  );
};

export default Questions;
