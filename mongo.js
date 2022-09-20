const mongoose = require('mongoose')
const { model, Schema } = mongoose
const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env

const connectionString =
  'mongodb+srv://root:root@cluster0.ckymthk.mongodb.net/notes-app?retryWrites=true&w=majority'

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

const noteSchema = new Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = model('Note', noteSchema)

Note.find({}).then((result) => {
  console.log(result)
  mongoose.connection.close()
})
/*
const note = new Note({
  content: 'Mongo is amazing',
  date: new Date(),
  important: true,
})

note
  .save()
  .then((result) => {
    console.log(result)
    mongoose.connection.close()
  })
  .catch((error) => {
    console.error(error)
  })
*/
