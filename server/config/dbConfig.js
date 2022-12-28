import mongoose from 'mongoose'
import insertMockData from '../utils/insertMockData.js'

export const conectDb = async () => {
  try {
    console.log(process.env.MONGOURI)
    const conn = await mongoose.connect(process.env.MONGOURI)
    //!PLEASE OMMENT BELLOW LINE ONCE YOU HAVE INSERTED THE MOCK DATA
    //await insertMockData()
    //! **************************************************
    console.log('Database connected successfully!')
  } catch (error) {
    console.log('Errror while connecting the Database!')
    process.exit(1)
  }
}
