import mongoose from 'mongoose'

const connectDB = () => {
  if (mongoose.connections[0].readyState) {
    console.log('Already connected')
    return
  }

  const config = {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }

  mongoose.connect(process.env.MONGODB_URL, config, err => {
    if (err) {
      console.log({ MONGODB_URL: process.env.MONGODB_URL })
      return console.log(err)
      // throw err
    }
    console.log('Connected to mongodb.')
  })
}

export default connectDB
