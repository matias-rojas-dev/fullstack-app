const { Schema, model } = require('mongoose')

const noteSchema = new Schema({
  content: String,
  date: Date,
  important: Boolean,
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    ;(returnedObject.id = returnedObject._id),
      delete returnedObject._id,
      delete returnedObject.__v
  },
})

module.exports = model('Note', noteSchema)

/*
Note.find({}).then((result) => {
  console.log(result)
  mongoose.connection.close()
})

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
