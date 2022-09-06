import { getQuestions, postQuestion } from '../../../library/questions.queries';

export default async function handler(req, res) {
  // Make request to connect to the database by using switch
  switch (req.method) {
    case 'GET': {
      return getQuestions(req, res);
    }
    case 'POST': {
      return postQuestion(req, res);
    }
  }
}
