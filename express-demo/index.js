const express = require('express')
const app = express();

app.get('/', (req, res) => {
    res.send("Hello world")
})

app.get('/api/courses', (req, res) => {
    res.send(JSON.stringify([
        {id: 2, title: 'a'},
        {id: 4, title: 'a'},
        {id: 11, title: 'a'},
    ]))
})

app.listen(4000, () => console.log('Listening on port 4000...'))