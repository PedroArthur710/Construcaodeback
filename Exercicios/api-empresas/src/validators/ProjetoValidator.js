const yup = require('yup')

const schema = yup.object().shape({
  nome: yup.string().required('Nome é obrigatório'),
  descricao: yup.string().required('Descrição é obrigatória'),
  data_inicio: yup.date().required('Data de início é obrigatória'),
  data_fim: yup.date()
    .required('Data de fim é obrigatória')
    .test(
      'fim-apos-inicio',
      'A data de fim deve ser posterior à data de início',
      function (value) {
        const { data_inicio } = this.parent
        return new Date(value) > new Date(data_inicio)
      }
    )
})

function validarProjeto(req, res, next) {
  schema.validate(req.body, { abortEarly: false })
    .then(() => next())
    .catch(err => res.status(400).json({ errors: err.errors }))
}

module.exports = { validarProjeto }
