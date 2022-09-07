import React from 'react';
import { useRouter } from 'next/router';

import QuestionId from '../../../components/QuestionId/QuestionId';
import Layout from '../../../components/Layout/Layout';

const Question = () => {
  const router = useRouter();
  const { questionId } = router.query;
  return (
    <Layout>
       <QuestionId id={questionId} />
    </Layout>
  );
};

export default Question;
