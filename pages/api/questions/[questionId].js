import {
  getQuestion,
  updateQuestion,
} from '../../../library/questions.queries';

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET': {
      return getQuestion(req, res);
    }
    case 'PATCH': {
      return updateQuestion(req, res);
    }
  }
}
