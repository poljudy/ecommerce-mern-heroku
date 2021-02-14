import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })

    console.log(
      `MongoDB connected: ${conn.connection.host}`.green.underline.bold
    )
  } catch (err) {
    console.error(`💥💥💥 Error: ${err.message}`.red.bold)
    process.exit(1)
  }
}

export default connectDB
