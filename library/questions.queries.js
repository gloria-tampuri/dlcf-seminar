import clientPromise from './mongodb';
const ObjectId = require('mongodb').ObjectId;

/* Connect to database function
-------------------------------START----------------------------*/
async function connectToDatabase() {
  const client = await clientPromise;
  const MONGODB_DB = process.env.DB_NAME;
  const db = client.db(MONGODB_DB);
  const questionsCollection = db.collection('questions');
  return questionsCollection;
}
/*------------------------------END-----------------------------*/

/*Function to get all questions
-------------------------------START----------------------------*/
export const getQuestions = async (req, res) => {
  // GETTING THE CONNECTED MONGODB CLIENT
  const questions = await connectToDatabase();

  try {
    const allQuestions = await questions
      .find({})
      .sort({ createdAt: -1, isAnswered: 1 })
      .toArray();
    res.status(200).json({ questions: allQuestions, success: true });
  } catch (error) {
    res.status(500).json({ message: new Error(error).message, success: false });
  }
};
/*------------------------------END-----------------------------*/

/*Function to post a question
-------------------------------START----------------------------*/
export const  postQuestion = async (req, res) => {
  let { name, question } = req.body;
  if (!question) {
    return res
      .status(400)
      .json({ message: 'Question is required', success: false });
  }
  if (!name) {
    name = 'Anonymous';
  }
  // GETTING THE CONNECTED MONGODB DATABASE COLLECTION
  const questions = await connectToDatabase();

  try {
    const receivedQuestion = {
      name,
      question,
      date: new Date(),
      isAnswered: false,
    };

    await questions.insertOne(receivedQuestion);
    res
      .status(201)
      .json({ message: 'Question sent successfully', status: 201 });
  } catch (error) {
    res.status(500).json({ message: new Error(error).message, success: false });
  }
};
/*------------------------------END-----------------------------*/

/*Function to get a question by _id
-------------------------------START----------------------------*/
export const getQuestion = async (req, res) => {
  // GETTING THE CONNECTED MONGODB CLIENT
  const questions = await connectToDatabase();

  try {
    const { questionId } = req.query;
    const question = await questions.findOne({
      _id: new ObjectId(questionId),
    });
    res.status(200).json({ question, success: true });
  } catch (error) {
    res.status(500).json({ message: new Error(error).message, success: false });
  }
};
/*------------------------------END-----------------------------*/

/*Function to update a question by isAnswered
-------------------------------START----------------------------*/
export const updateQuestion = async (req, res) => {
  // GETTING THE CONNECTED MONGODB CLIENT
  const questions = await connectToDatabase();

  try {
    const { questionId } = req.query;
    const { isAnswered } = req.body;
    // Check if isAnswered is a boolean
    if (typeof isAnswered !== 'boolean') {
      return res
        .status(400)
        .json({ message: 'isAnswered must be a boolean', success: false });
    }
    const updatedQuestion = await questions.findOneAndUpdate(
      { _id: new ObjectId(questionId) },
      { $set: { isAnswered } },
      { returnOriginal: false }
    );
    const { value } = updatedQuestion;
    res.status(200).json({ question: value, success: true });
  } catch (error) {
    res.status(500).json({ message: new Error(error).message, success: false });
  }
};
/*------------------------------END-----------------------------*/

/*Function to delete a question by isAnswered
-------------------------------START----------------------------*/
export const deleteQuestion = async (req, res) => {
  // GETTING THE CONNECTED MONGODB CLIENT
  const questions = await connectToDatabase();

  try {
    const { questionId } = req.query;
    const deletedQuestion = await questions.findOneAndDelete({
      _id: new ObjectId(questionId),
    });
    const { value } = deletedQuestion;
    res.status(200).json({ question: value, success: true });
  } catch (error) {
    res.status(500).json({ message: new Error(error).message, success: false });
  }
};
/*------------------------------END-----------------------------*/

/*Function to delete all questions
-------------------------------START----------------------------*/
// export const deleteAllQuestions = async (req, res) => {
//   // GETTING THE CONNECTED MONGODB CLIENT
//   const questions = await connectToDatabase();

//   try {
//     const deletedQuestions = await questions.deleteMany({});
//     res.status(200).json({ questions: deletedQuestions, success: true });
//   } catch (error) {
//     res.status(500).json({ message: new Error(error).message, success: false });
//   }
// };
/*------------------------------END-----------------------------*/
