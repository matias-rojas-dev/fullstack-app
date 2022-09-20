require('dotenv').config()
require('./mongo')
const Note = require('./models/Note')
const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/notes', (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response) => {
  const { id } = request.params

  Note.findById(id)
    .then((note) => {
      response.json(note)
    })
    .catch((error) => {
      response.status(404).json(error)
    })
})

app.post('/api/notes', (request, response) => {
  const note = request.body

  if (!note.content) {
    return response.status(400).json({
      error: 'Required content failed is missing',
    })
  }

  const newNote = new Note({
    content: note.content,
    date: new Date(),
    important: note.important || false,
  })

  newNote.save().then((savedNote) => {
    response.json(savedNote)
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`)
})

module.exports = app
