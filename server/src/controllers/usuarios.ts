import { Request, Response } from 'express'
import knex from '../database/connection'

class Usuarios {
	async create(request: Request, response: Response) {
		try {
			const { nome, email } = request.body

			const usuarioExistente = await knex('usuarios').where({ email }).first()

			usuarioExistente && response.status(409).json({ erro: 'Este e-mail já está em uso!' })

			await knex('usuarios').insert({ nome, email })

			return response.status(201).json({ mensagem: 'Usuário criado com sucesso!' })
		} catch (error) {
			return response.status(500).json({ erro: 'Falha no servidor ao tentar criar usuário.' })
		}
	}

	async loginUsuario(request: Request, response: Response) {
		try {
			const { nome, email } = request.body

			const usuario = await knex('usuarios').where({ nome, email }).first()

			if (usuario) {
				usuario.foto && response.json({ ...usuario, foto: `http://192.168.0.107:3333/uploads/fotosPerfis/${usuario.foto}` })

				return response.json(usuario)
			}

			const emailExistente = await knex('usuarios').where({ email }).first().select('email')

			emailExistente && response.status(400).json({ erro: 'Nome de usuário inválido! Confira a escrita e tente novamente.' })

			return response.status(404).json({ erro: 'E-mail inválido! Certifique-se de ter feito o Cadastro com este e-mail.' })
		} catch (error) {
			return response.status(500).json({ erro: 'Falha no servidor ao tentar logar.' })
		}
	}

	async index(request: Request, response: Response) {
		try {
			const usuarios = await knex('usuarios')

			if (usuarios[0]) {
				const usuariosSerializados = usuarios.map(usuario => {
					if (usuario.foto) {
						return { ...usuario, foto: `http://192.168.0.107:3333/uploads/fotosPerfis/${usuario.foto}` }
					}

					return usuario
				})

				return response.json(usuariosSerializados)
			}

			return response.status(404).json({ erro: 'Ainda não há nenhum dado para ser listado.' })
		} catch (error) {
			return response.status(500).json({ erro: 'Falha no servidor ao tentar listar usuários.' })
		}
	}

	async update(request: Request, response: Response) {
		try {
			const { id, nome, email } = request.body

			let foto = ''

			if (request.file) { foto = request.file.filename }

			const usuarioExistente = await knex('usuarios').where({ email }).first()

			if (usuarioExistente && usuarioExistente.id !== +id) {
				return response.status(400).json({ erro: 'Este e-mail já está em uso!' })
			}

			await knex('usuarios').where({ id }).update({ foto, nome, email })

			return response.json({ mensagem: 'Seu perfil foi atualizado com sucesso!' })
		} catch (error) {
			return response.status(500).json({ erro: 'Falha no servidor ao tentar atualizar seu perfil.' })
		}
	}
}

export default Usuarios