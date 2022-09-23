const mongoose = require('mongoose')
const supertest = require('supertest')
const { app, server } = require('../index')
const Note = require('../models/Note')

const api = supertest(app)

const initialNotes = [
  {
    content: 'He editado una nota y la he actualizado',
    important: false,
    date: new Date(),
  },
  {
    content: 'Nueva nota mediante POstman',
    date: new Date(),
    important: true,
  },
]

beforeEach(async () => {
  await Note.deleteMany({})

  const note1 = new Note(initialNotes[0])
  await note1.save()
  const note2 = new Note(initialNotes[1])
  await note2.save()
})

test('Notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('The first note was be edit with postman', async () => {
  const response = await api.get('/api/notes')
  const contents = response.body.map((note) => note.content)

  expect(contents).toContain('He editado una nota y la he actualizado')
})

test('there are two notes', async () => {
  const response = await api.get('/api/notes')
  expect(response.body).toHaveLength(initialNotes.length)
})

test

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
