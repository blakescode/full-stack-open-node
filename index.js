const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

morgan.token('body', (req, res) => JSON.stringify(req.body));

app.use(morgan(':method :url :status :req[content-length] :response-time ms - :body'))

let notes = [
  {
    "id": 1,
    "content": "HTML is easy",
    "date": "2019-05-30T17:30:31.098Z",
    "important": true
  },
  {
    "id": 2,
    "content": "Browser can execute only JavaScript",
    "date": "2019-05-30T18:39:34.091Z",
    "important": true
  },
  {
    "id": 3,
    "content": "GET and POST are the most important methods of HTTP protocol",
    "date": "2019-05-30T19:20:14.298Z",
    "important": false
  }
]

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

const generateNewPersonId = () => {
  return Math.floor(Math.random() * 10000)
}

app.get('/', (request, response) => {
  response.send('<h1>try /api/persons</h1>')
})

// persons API

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(p => p.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }

  if (persons.find(p => p.name === body.name)) {
    return response.status(409).json({
      error: 'person already exists in phonebook'
    })
  }

  const personToAdd = {
    id: generateNewPersonId(),
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(personToAdd)

  response.json(personToAdd)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(p => p.id !== id)

  response.status(204).end()
})

app.get('/info', (request, response) => {
  const requestTime = new Date()
  response.send(
      `
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${requestTime.toString()}</p>
      `
  )
})

// notes API

const generateNewNoteId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const noteToAdd = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateNewNoteId()
  }

  notes = notes.concat(noteToAdd)

  response.json(noteToAdd)
})

app.put('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const indexToUpdate = notes.findIndex(note => note.id === id)
  if (indexToUpdate >= 0) {
    notes[indexToUpdate] = request.body;
    response.status(200).end()
  } else {
    response.status(404).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id === id)

  response.status(204).end()
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
