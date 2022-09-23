const express = require('express')
const Note = require('./models/Note')
const cors = require('cors')
const notFound = require('./middlewares/notFound')
const handleErrors = require('./middlewares/handleErrors')
const Sentry = require('@sentry/node')
const Tracing = require('@sentry/tracing')
require('dotenv').config()

const app = express()
require('./mongo')

Sentry.init({
  dsn: 'https://324ea0b1288f412a9114a0836bba50b3@o1422910.ingest.sentry.io/6770030',
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],

  tracesSampleRate: 1.0,
})

app.use(cors())
app.use('/images', express.static('images'))
app.use(express.json())

app.get('/api/notes', (request, response) => {
  Note.find().then((notes) => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response, next) => {
  const { id } = request.params

  Note.findById(id)
    .then((note) => {
      return note ? response.json(note) : response.status(404).end()
    })
    .catch(
      (error) => next(error)
      //response.status(400).json(error).end()
    )
})

app.post('/api/notes', (request, response, next) => {
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

  newNote
    .save()
    .then((savedNote) => {
      response.json(savedNote)
    })
    .catch((error) => next(error))
})

app.delete('/api/notes/:id', (request, response, next) => {
  const { id } = request.params

  Note.findByIdAndRemove(id)
    .then((result) => {
      response.status(204).json({ msg: 'The post has been deleted' }).end()
    })
    .catch((error) => next(error))
  response.status(204).end()
})

app.put('/api/notes/:id', (request, response, next) => {
  const { id } = request.params
  const note = request.body

  const newNoteInfo = {
    content: note.content,
    important: note.important,
  }
  Note.findByIdAndUpdate(id, newNoteInfo, { new: true }).then((result) => {
    response.status(200).json(result)
  })
})

// middlewares errors

app.use(notFound)
app.use(Sentry.Handlers.errorHandler())
app.use(handleErrors)

const PORT = process.env.PORT || 3001

const server = app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`)
})

module.exports = { app, server }
