
const express = require('express')

const router = express.Router()

router.get("/calculadora/soma", (req, res, next)=> {
    const n1 = parseFloat(req.query.n1)
    const n2 = parseFloat(req.query.n2)
    if (isNaN(n1) || isNaN(n2)) {
        return res.status(400).json({ erro: "Numeros inválidos!!"})
    }
    const resultado = n1 + n2 
    res.json({resultado})

})

router.get("/calculadora/subtracao", (req, res, next)=> {
    const n1 = parseFloat(req.query.n1)
    const n2 = parseFloat(req.query.n2)
    if (isNaN(n1) || isNaN(n2)) {
        return res.status(400).json({ erro: "Numeros inválidos!!"})
    }
    const resultado = n1 - n2 
    res.json({resultado})

})

router.get("/calculadora/multiplicacao", (req, res, next)=> {
    const n1 = parseFloat(req.query.n1)
    const n2 = parseFloat(req.query.n2)
    if (isNaN(n1) || isNaN(n2)) {
        return res.status(400).json({ erro: "Numeros inválidos!!"})
    }
    const resultado = n1 * n2 
    res.json({resultado})

})

router.get("/calculadora/divisao", (req, res, next)=> {
    const n1 = parseFloat(req.query.n1)
    const n2 = parseFloat(req.query.n2)
    if (isNaN(n1) || isNaN(n2)) {
        return res.status(400).json({ erro: "Numeros inválidos!!"})
    }
    const resultado = n1 / n2 
    res.json({resultado})

})

router.get("/calculadora/aoQuadrado", (req, res, next)=> {
    const n1 = parseFloat(req.query.n1)
    
    if (isNaN(n1) ) {
        return res.status(400).json({ erro: "Numeros inválidos!!"})
    }
    const resultado = n1 * n1 
    res.json({resultado})

})

router.get("/calculadora/raizQuadrada", (req, res, next)=> {
    const n1 = parseFloat(req.query.n1)
    
    if (isNaN(n1) ) {
        return res.status(400).json({ erro: "Numeros inválidos!!"})
    }
    const resultado = Math.sqrt(n1) 
    res.json({resultado})

})



module.exports = router