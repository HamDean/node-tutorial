const express = require('express')
const app = express();
const port = process.env.PORT || 4000;

const courses = [
    {id: 2, title: 'a'},
    {id: 4, title: 'a'},
    {id: 11, title: 'a'},
]

app.get('/', (req, res) => {
    res.send("Hello world")
})

app.get('/api/courses', (req, res) => {
    res.send(JSON.stringify(courses))
})

app.get('/api/courses/:id', (req, res) => {
    res.send(JSON.stringify(courses.filter(c => c.id === req.params.id)))
})

app.listen(port, () => console.log(`Listening on port ${port}...`))