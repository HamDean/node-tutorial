const express = require('express')
const app = express();
const port = process.env.PORT || 4000;

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

app.listen(port, () => console.log(`Listening on port ${port}...`))