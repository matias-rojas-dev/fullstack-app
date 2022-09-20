const mongoose = require('mongoose')

const connectionString = process.env.MONGO_DB_URI
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connected')
  })
  .catch((error) => {
    console.log(error)
  })
