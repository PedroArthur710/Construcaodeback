// src/controllers/ProjetoController.js
const express = require('express')
const router = express.Router()

const ProjetoModel = require('../models/ProjetoModel')
const { validarProjeto } = require('../validators/ProjetoValidator')

// ==============================
// 📦 LISTAR TODOS OS PROJETOS
// ==============================
router.get('/', async (req, res) => {
  try {
    const projetos = await ProjetoModel.find()
    res.json(projetos)
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar projetos', detalhes: err.message })
  }
})

// ==============================
// 🔍 BUSCAR PROJETO POR ID
// ==============================
router.get('/:id', async (req, res) => {
  try {
    const projeto = await ProjetoModel.findById(req.params.id)
    if (!projeto) {
      return res.status(404).json({ erro: 'Projeto não encontrado' })
    }
    res.json(projeto)
  } catch (err) {
    res.status(400).json({ erro: 'ID inválido ou erro ao buscar projeto', detalhes: err.message })
  }
})

// ==============================
// ➕ CRIAR NOVO PROJETO
// ==============================
router.post('/', validarProjeto, async (req, res) => {
  try {
    const novoProjeto = await ProjetoModel.create(req.body)
    res.status(201).json(novoProjeto)
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao criar projeto', detalhes: err.message })
  }
})

// ==============================
// ✏️ ATUALIZAR PROJETO EXISTENTE
// ==============================
router.put('/:id', validarProjeto, async (req, res) => {
  try {
    const projetoAtualizado = await ProjetoModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    if (!projetoAtualizado) {
      return res.status(404).json({ erro: 'Projeto não encontrado' })
    }

    res.json(projetoAtualizado)
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao atualizar projeto', detalhes: err.message })
  }
})

// ==============================
// ❌ DELETAR PROJETO
// ==============================
router.delete('/:id', async (req, res) => {
  try {
    const projetoDeletado = await ProjetoModel.findByIdAndDelete(req.params.id)

    if (!projetoDeletado) {
      return res.status(404).json({ erro: 'Projeto não encontrado' })
    }

    res.status(204).send()
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao deletar projeto', detalhes: err.message })
  }
})

// ==============================
// 🚀 EXPORTAÇÃO CORRETA
// ==============================
module.exports = router
