import clientPromise from './mongodb';
const ObjectId = require('mongodb').ObjectId;

/* Connect to database function
-------------------------------START----------------------------*/
async function connectToDatabase() {
  const client = await clientPromise;
  const MONGODB_DB = process.env.DB_NAME;
  const db = client.db(MONGODB_DB);
  const commentsCollection = db.collection('comments');
  return commentsCollection;
}
/*------------------------------END-----------------------------*/

/*Function to get all comments
-------------------------------START----------------------------*/
export const getComment = async (req, res) => {
  // GETTING THE CONNECTED MONGODB CLIENT
  const comments = await connectToDatabase();

  try {
    const { commentId } = req.query;
    const comment = await comments
      .find({ commentId: ObjectId(commentId) })
      .toArray();
    res.status(200).json({ comments: comment, success: true });
  } catch (error) {
    res.status(500).json({ message: new Error(error).message, success: false });
  }
};

export const postComment = async (req, res) => {
  let { postedBy, comment, contact } = req.body;
  const { commentId } = req.query;
  if (!comment) {
    return res
      .status(400)
      .json({ message: 'Comment is required', success: false });
  }
  if (!postedBy) {
    postedBy = 'Anonymous';
  }
  // GETTING THE CONNECTED MONGODB DATABASE COLLECTION
  const comments = await connectToDatabase();

  try {
    const receivedComment = {
      commentId: ObjectId(commentId),
      postedBy,
      comment,
      contact,
      date: new Date(),
    };

    await comments.insertOne(receivedComment);
    res.status(201).json({ message: 'Comment sent successfully', status: 201 });
  } catch (error) {
    res.status(500).json({ message: new Error(error).message, success: false });
  }
};
/*------------------------------END-----------------------------*/
