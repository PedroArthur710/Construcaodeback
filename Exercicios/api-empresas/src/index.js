// =============================
// 📦 IMPORTAÇÕES E CONFIGURAÇÕES
// =============================
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
app.use(express.json())

// =============================
// 💾 CONEXÃO COM MONGODB
// =============================
const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const DB_NAME = process.env.DB_NAME

const url = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(url)
  .then(() => console.log('✅ Conectado ao banco MongoDB!'))
  .catch(err => console.error('❌ Erro ao conectar no MongoDB:', err))

// =============================
// 🧱 MODELOS MONGOOSE
// =============================

const projetoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String, required: true },
  data_inicio: { type: Date, required: true },
  data_fim: { type: Date, required: true }
})
const Projeto = mongoose.model('Projeto', projetoSchema)

// (Exemplo mínimo — se quiser, posso adicionar Cargos, Departamentos, etc.)
//
// const Cargo = mongoose.model('Cargo', new mongoose.Schema({ nome: String }))
// const Departamento = mongoose.model('Departamento', new mongoose.Schema({ nome: String }))
// const Funcionario = mongoose.model('Funcionario', new mongoose.Schema({ nome: String }))
// const Tarefa = mongoose.model('Tarefa', new mongoose.Schema({ titulo: String }))

// =============================
// ✅ ROTAS DE PROJETOS
// =============================

// LISTAR todos os projetos
app.get('/projetos', async (req, res) => {
  try {
    const projetos = await Projeto.find()
    res.json(projetos)
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar projetos', detalhes: err.message })
  }
})

// BUSCAR projeto por ID
app.get('/projetos/:id', async (req, res) => {
  try {
    const projeto = await Projeto.findById(req.params.id)
    if (!projeto) return res.status(404).json({ erro: 'Projeto não encontrado' })
    res.json(projeto)
  } catch (err) {
    res.status(400).json({ erro: 'ID inválido', detalhes: err.message })
  }
})

// CRIAR novo projeto
app.post('/projetos', async (req, res) => {
  try {
    const novoProjeto = await Projeto.create(req.body)
    res.status(201).json(novoProjeto)
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao criar projeto', detalhes: err.message })
  }
})

// ATUALIZAR projeto
app.put('/projetos/:id', async (req, res) => {
  try {
    const projetoAtualizado = await Projeto.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!projetoAtualizado) return res.status(404).json({ erro: 'Projeto não encontrado' })
    res.json(projetoAtualizado)
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao atualizar projeto', detalhes: err.message })
  }
})

// DELETAR projeto
app.delete('/projetos/:id', async (req, res) => {
  try {
    const projetoDeletado = await Projeto.findByIdAndDelete(req.params.id)
    if (!projetoDeletado) return res.status(404).json({ erro: 'Projeto não encontrado' })
    res.status(204).send()
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao deletar projeto', detalhes: err.message })
  }
})

// =============================
// 🚀 INICIANDO SERVIDOR
// =============================
app.listen(3000, () => {
  console.log('🚀 Aplicação rodando -> http://localhost:3000')
})