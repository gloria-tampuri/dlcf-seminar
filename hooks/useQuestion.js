import useSWR from 'swr';
// Fetch wrapper
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const useQuestion = (id) => {
  const { data, error } = useSWR(`/api/questions/${id}`, fetcher);
  return {
    question: data,
    isLoading: !error && !data,
    isError: error,
  };
};
