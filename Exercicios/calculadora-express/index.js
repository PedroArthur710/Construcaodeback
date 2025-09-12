
const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())




app.use((req, res, next) => {
  console.log("###### Requisição Chegou ######")
  console.log("Time: ", new Date().toLocaleString())
  console.log("Metodo: ", req.method)
  console.log("Rota: ", req.url)
  next()
})

app.get("/hello", (req, res, next) => {
  res.send("Hello ATUALIZADO!!!")
})


const calculadoraRouter = require('./routes/calculadora')

app.use("/", calculadoraRouter)

app.listen(3000, () => {
  console.log("API rodando em http://localhost:3000")
})