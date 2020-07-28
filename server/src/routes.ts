import express from 'express'

import LoginPascom from './controllers/loginPascom'
import Locais from './controllers/locais'
import Missas from './controllers/missas'
import Usuarios from './controllers/usuarios'
import MissaUsuario from './controllers/missa_usuario'

const loginPascom = new LoginPascom()
const locais = new Locais()
const missas = new Missas()
const usuarios = new Usuarios()
const missaUsuario = new MissaUsuario()

const routes = express.Router()

// Login Pascom
routes.post('/login', loginPascom.loginPascom)

// Locais
routes.get('/locais', locais.index)

// Missas
routes.post('/missas', missas.create)
routes.get('/missas', missas.index)
routes.get('/missas/:id', missas.show)
routes.put('/missas', missas.update)
routes.delete('/missas/:id', missas.delete)

// Usuários
routes.post('/usuarios', usuarios.create)
routes.post('/usuarios/login', usuarios.loginUsuario)
routes.get('/usuarios', usuarios.index)

// Missa_Usuário
routes.post('/missa_usuario', missaUsuario.create_update)
routes.get('/missa_usuario', missaUsuario.index)

export default routes