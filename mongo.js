const mongoose = require('mongoose')

const connectionString =
  'mongodb+srv://root:root@cluster0.ckymthk.mongodb.net/?retryWrites=true&w=majority'

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
