const express = require('express')
const app = express();
const port = process.env.port || 5501;


app.get('/', (req, res) => {
    res.send("hello");

});

app.listen(port, () => {
    console.log(`server is start at port number $(port)`);

})

