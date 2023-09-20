const express = require ("express");
const PORT = 5050;
const app = express();

app.get('/', (req, res) =>{
    res.send("Cat's home page.")

})

app.listen(PORT, () => console.log(`Express running on port: ${PORT}`));