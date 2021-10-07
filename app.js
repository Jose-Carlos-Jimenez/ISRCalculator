const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const getISR = require('./utiles/taxes')

const jsonParser = bodyParser.json()
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

app.post('/proyeccionisr', jsonParser, (req, res) => {
    const { body } = req
    const { colaborador } = body
    res.send({isr: getISR.getISR(colaborador)})
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})

