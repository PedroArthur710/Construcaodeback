const express = require('express')
const router = express.Router()

// mapeamento dos endpoints e a lógica
// Lista de pessoas para simular o banco dados
let pessoas = [
  {
    id: 1,
    nome: "João Pedro",
    cpf: "12312345678",
    email: "joao@pedro.com",
    dataNascimento: "01/01/2000"
  },
  {
    id: 2,
    nome: "Maria Pedro",
    cpf: "12312345690",
    email: "maria@pedro.com",
    dataNascimento: "01/01/1990"
  }
]

// Criar
// - POST /pessoas
router.post('/pessoas', (req, res, next) => {
  const { nome, cpf, email, dataNascimento } = req.body
  // validar se os dados vinheram
  if (!nome || !cpf || !email || !dataNascimento) {
    return res.status(400).json({ error: "nome, cpf, email e dataNascimento são obrigatorios!!!!" })
  }
  // validar se o CPF já existe
  const pessoa = pessoas.find(pessoa => pessoa.cpf == cpf)
  if (pessoa) {
    return res.status(409).json({ error: "CPF Já cadastrado!!!" })
  }
  // cadastrar a nova pessoa na lista
  const novaPessoa = {
    id: Date.now(),
    nome,
    cpf,
    email,
    dataNascimento
  }
  // inserir a nova pessoa montada na lista
  pessoas.push(novaPessoa)
  res.status(201).json({ message: "Pessoa cadastrada!!!", novaPessoa })
})

// Listar Todos
// - GET /pessoas
router.get('/pessoas', (req, res, next) => {
  res.json(pessoas)
})

// Buscar um
// - GET /pessoas/{id}
router.get('/pessoas/:id', (req, res, next) => {
  const idRecebido = req.params.id
  const pessoa = pessoas.find(p => p.id == idRecebido)
  if (!pessoa) {
    return res.status(404).json({ error: "Pessoa não encontrada!!!" })
  }
  res.json(pessoa)
})

// Atualizar
// - PUT /pessoas/{id}
router.put('/pessoas/:id', (req, res, next) => {
  const idRecebido = req.params.id
  const { nome, email, dataNascimento } = req.body
  // validar se os dados vinheram
  if (!nome || !email || !dataNascimento) {
    return res.status(400).json({ error: "nome, email e dataNascimento são obrigatórios!!!" })
  }
  // validar se a pessoa com aquele ID existe na lista
  const pessoa = pessoas.find(pessoa => pessoa.id == idRecebido)
  if (!pessoa) {
    return res.status(404).json({ error: "Pessoa não econtrada!!!"})
  }
  // Sobrescrevo os dados da pessoa para atualizar
  pessoa.nome = nome
  pessoa.email = email
  pessoa.dataNascimento = dataNascimento
  res.json({ message: "Pessoa atualizada com sucesso!!!" })
})

// Deletar
// - DELETE /pessoas/{id}
router.delete('/pessoas/:id', (req, res, next) => {
  const idRecebido = req.params.id
  const pessoa = pessoas.find(pessoa => pessoa.id == idRecebido)
  if(!pessoa) {
    return res.status(404).json({ error: "Pessoa não encontrada!!!"})
  }
  // sobrescreve a lista com uma nova sem a pessoa do idRecebido
  pessoas = pessoas.filter(pessoa => pessoa.id != idRecebido)

  res.json({ message: "Pessoa excluída com sucesso!!!"})
})



module.exports = router