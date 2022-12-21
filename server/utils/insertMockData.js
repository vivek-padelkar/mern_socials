import User from '../model/User.js'
import Post from '../model/Post.js'
import { users, posts } from '../data/index.js'

const insertMockData = async () => {
  console.log('Running Mock data insert function...')
  await User.insertMany(users)
  await Post.insertMany(posts)
  console.log('done data inserted successfully!')
}

export default insertMockData
