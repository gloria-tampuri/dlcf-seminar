import useSWR from 'swr';
// Fetch wrapper
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const useQuestions = () => {
  const { data, error } = useSWR('/api/questions', fetcher, {
    refreshInterval: 200,
  });
  return { questions: data, isLoading: !error && !data, isError: error };
};
