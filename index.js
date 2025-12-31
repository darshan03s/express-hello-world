import express from 'express'

const PORT = 3000

const app = express()

app.get('/', (req, res) => {
  res.status(200).send('<h1>Hello world</h1>')
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Running on ${PORT}`)
})