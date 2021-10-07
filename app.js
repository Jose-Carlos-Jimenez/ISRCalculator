const express = require('express')
const cors = require('cors');

const port = 3000
const app = express()
app.use(cors(
    { 
        origin: '*',
        methods: ['GET','POST']
    }
));

app.get('/', (req, res) => {
  res.send('I´m alive!')
})

app.post('/proyeccionisr', (req, res) => {

})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})

