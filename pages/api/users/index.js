import { getUsers, postUser } from '../../../library/users.queries';

export default async function handler(req, res) {
  // Make request to connect to the database by using switch
  switch (req.method) {
    case 'GET': {
      return getUsers(req, res);
    }
    case 'POST': {
      return postUser(req, res);
    }
  }
}
