const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack-dev:${password}@cluster0.kills.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const phoneBookSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', phoneBookSchema)

if (process.argv.length > 3) {
    const name = process.argv[3]
    const number = process.argv[4]
    const person = new Person({
        name: name,
        number: number,
    })
    person.save().then(result => {
        console.log(`Added ${result.name} number ${result.number} to the phonebook`)
        mongoose.connection.close()
    })
} else {
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}





