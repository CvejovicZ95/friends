import mongoose from 'mongoose'

export const connect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL)
    console.log('Connected to DB')
  } catch (error) {
    console.log('Something went wrong', error)
  }
}
