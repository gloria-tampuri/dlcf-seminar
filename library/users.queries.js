import clientPromise from './mongodb';
import { hashPassword } from './validatePassword';
const ObjectId = require('mongodb').ObjectId;

/* Connect to database function
-------------------------------START----------------------------*/
async function connectToDatabase() {
  const client = await clientPromise;
  const MONGODB_DB = process.env.DB_NAME;
  const db = client.db(MONGODB_DB);
  const usersCollection = db.collection('users');
  return usersCollection;
}
/*------------------------------END-----------------------------*/

/*Function to get all users
-------------------------------START----------------------------*/
export const getUsers = async (req, res) => {
  // GETTING THE CONNECTED MONGODB CLIENT
  const users = await connectToDatabase();
  try {
    const allUsers = await users.find({}).sort({ createdAt: -1 }).toArray();
    res.status(200).json({ users: allUsers, success: true });
  } catch (error) {
    res.status(500).json({ message: new Error(error).message, success: false });
  }
};
/*------------------------------END-----------------------------*/

/*Function to post a user
-------------------------------START----------------------------*/
export const postUser = async (req, res) => {
  // Retrieving the user data from the request body
  const { name, telephone, password } = req.body;
  // Hash password
  const hashedPassword = await hashPassword(password);
  // GETTING THE CONNECTED MONGODB DATABASE COLLECTION
  const users = await connectToDatabase();
  try {
    const receivedUser = {
      name,
      telephone,
      password: hashedPassword,
      createdAt: new Date(),
    };
    await users.insertOne(receivedUser);
    res.status(201).json({ message: 'User sent successfully', status: 201 });
  } catch (error) {
    res.status(500).json({ message: new Error(error).message, success: false });
  }
};
/*------------------------------END-----------------------------*/

/*Function to get a user by _id
-------------------------------START----------------------------*/
export const getUser = async (req, res) => {
  // GETTING THE CONNECTED MONGODB CLIENT
  const users = await connectToDatabase();
  const { userId } = req.query;
  try {
    const user = await users.findOne({ _id: ObjectId(userId) });
    res.status(200).json({ user: user, success: true });
  } catch (error) {
    res.status(500).json({ message: new Error(error).message, success: false });
  }
};
/*------------------------------END-----------------------------*/

/*Function to update a user by _id
-------------------------------START----------------------------*/
export const updateUser = async (req, res) => {
  // GETTING THE CONNECTED MONGODB CLIENT
  const users = await connectToDatabase();
  const { userId } = req.query;
  try {
    const user = await users.findOneAndUpdate(
      { _id: ObjectId(userId) },
      { $set: req.body }
    );
    res.status(200).json({ user: user, success: true });
  } catch (error) {
    res.status(500).json({ message: new Error(error).message, success: false });
  }
};

/*------------------------------END-----------------------------*/

/*Function to delete a user by _id
-------------------------------START----------------------------*/
export const deleteUser = async (req, res) => {
  // GETTING THE CONNECTED MONGODB CLIENT
  const users = await connectToDatabase();
  const { userId } = req.query;
  try {
    const user = await users.findOneAndDelete({ _id: ObjectId(userId) });
    res.status(200).json({ user: user, success: true });
  } catch (error) {
    res.status(500).json({ message: new Error(error).message, success: false });
  }
};
/*------------------------------END-----------------------------*/

/*Function to authenticate a user
-------------------------------START----------------------------*/
export const authenticateUser = async (req, res) => {
  // GETTING THE CONNECTED MONGODB CLIENT
  const users = await connectToDatabase();
  const { telephone, password } = req.body;
  try {
    const user = await users.findOne({ telephone });
    if (user) {
      const isPasswordMatched = await comparePassword(password, user.password);
      if (isPasswordMatched) {
        res.status(200).json({ user: user, success: true });
      } else {
        res
          .status(401)
          .json({ message: 'Password is incorrect', success: false });
      }
    } else {
      res.status(401).json({ message: 'User not found', success: false });
    }
  } catch (error) {
    res.status(500).json({ message: new Error(error).message, success: false });
  }
};
/*------------------------------END-----------------------------*/
