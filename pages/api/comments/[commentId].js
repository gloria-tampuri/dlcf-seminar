import { getComment, postComment } from '../../../library/comment.queries';

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET': {
      return getComment(req, res);
    }
    case 'POST': {
      return postComment(req, res);
    }
  }
}
