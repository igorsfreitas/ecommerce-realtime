'use strict'

class Register {
  get rules () {
    return {
      name: 'required',
      surname: 'required',
      email: 'required|email|unique:users,email',
      password: 'required|confirmed'
    }
  }

  get messages () {
    return {
      'name.required': 'O nome é obrigatório',
      'surname.required': 'O sobrenome é obrigatório',
      'email.required': 'O email é obrigatório',
      'email.email': 'O email é inválido',
      'email.unique': 'O email já existe',
      'password.required': 'A senha é obrigatória',
      'password.confirmed': 'As senhas não são iguais'
    }
  }
}

module.exports = Register
