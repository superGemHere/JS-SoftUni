const express = require('express');

const app = express();
const CLIENT_PORT = 5050;

app.get('/', (req, res) => {
    res.send("<h1>Home Page</h1>")
})

app.listen(CLIENT_PORT, () => console.log(`Express running on port: ${CLIENT_PORT}`))