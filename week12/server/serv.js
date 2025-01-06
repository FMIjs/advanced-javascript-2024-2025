// server.js
const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, 'dist')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.get('/:reqFile', (req, res) => {
    const reqFile = req.params.reqFile;
    if (reqFile.endsWith('.js')) {
        res.sendFile(path.join(__dirname, '../dist', reqFile));
    } else {
        res.status(404).send('JavaScript file not found');
    }
});

app.get('/api/mothership', (req, res) => {
    res.send('Hello from the mothership!')
});

const PORT = 8080
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})