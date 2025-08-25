let prompt = require('prompt-sync')()
let a = parseFloat(prompt("Qual o primeiro numero? "))
let b= parseFloat(prompt("Qual o segundo numero? "))
let {somar, subtrair, dividir, aoQuadrado, raiz, multiplicar } = require('./calculadora.js')

let somado = somar (a, b)
console.log(somado)

let subtraido = subtrair (a, b)
console.log(subtraido)

let dividido = dividir (a, b)
console.log(dividido)

let multiplicado = multiplicar (a, b)
console.log(multiplicado)

let aoQuadradando = aoQuadrado (a)
console.log(aoQuadradando)