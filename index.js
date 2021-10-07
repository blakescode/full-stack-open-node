const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())

morgan.token('body', (req, res) => JSON.stringify(req.body));

// setup the logger
app.use(morgan(':method :url :status :req[content-length] :response-time ms - :body'))

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

const generateNewId = () => {
  return Math.floor(Math.random() * 10000)
}

app.get('/', (request, response) => {
  response.send('<h1>try /api/persons</h1>')
})

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

app.get('/info', (request, response) => {
  const requestTime = new Date()
  response.send(
      `
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${requestTime.toString()}</p>
      `
  )
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
    id: generateNewId(),
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

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
