import mongoose from 'mongoose'

export const conectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGOURI)
    console.log('Database connected successfully!')
  } catch (error) {
    console.log('Errror while connecting the Database!')
    process.exit(1)
  }
}
