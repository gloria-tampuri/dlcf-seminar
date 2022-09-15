import React from 'react';
import { useRouter } from 'next/router';
import QuestionId from '../../../components/QuestionId/QuestionId';
import Layout from '../../../components/Layout/Layout';
import AddComment from '../../../components/Comments/AddComment';
import ListComments from '../../../components/Comments/ListComments';
import useSWR from 'swr';
import ThanksModal from '../../../components/ThanksModal/ThanksModal';

/*Fetcher for comments
-------------------------------START----------------------------*/
const fetcher = (url) => fetch(url).then((r) => r.json());
/*------------------------------END-----------------------------*/
const Question = () => {
  const router = useRouter();
  const { questionId } = router.query;

  const { data, error } = useSWR(`/api/comments/${questionId}`, fetcher, {
    refreshInterval: 500,
  });

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Layout>
      <QuestionId id={questionId} />
      <AddComment commentId={questionId} />
      <ListComments comments={data && data?.comments} />
    </Layout>
  );
};

export default Question;
