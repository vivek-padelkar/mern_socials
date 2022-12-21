import mongoose from 'mongoose'

const postSchema = mongoose.Schem({
  userId: {
    type: String,
    require: true,
  },
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  location: String,
  description: String,
  pcturePath: String,
  likes: {
    type: Map,
    of: Boolean,
  },
  comments: {
    type: Array,
    default: [],
  },
})

const Post = mongoose.Model('Post', postSchema)
