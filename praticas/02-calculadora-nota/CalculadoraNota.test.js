// importar o codigo que vai ser testado
let {calcularNotaA1} = require('./CalculadoraNota')

// importo as funcionalidades do JEST
let {describe, expect, test} = require('@jest/globals')


// describe para fazer o agrupamento dos testes
describe('Testando Modulo CalculadoraNota', () => {

  // construir os testes unitários
  test('calcularNotaA1 -> ex 1, trb 3, prov 6 = 10', () => {
    expect(calcularNotaA1(1,3,6)).toBe(10)
  })

  test('calcularNotaA1 -> ex 0, trb 0, prov 0 = 0', () => {
    expect(calcularNotaA1(0, 0, 0)).toBe(0)
  })

  // tentaria testar todas as posibilidades possíveis ou limites
  // ....

})