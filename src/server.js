// Servidor
const express = require('express')
const server = express()

const {
	pageLanding,
	pageStudy,
	pageGiveClasses,
	saveClasses
} = require('./pages')

// Configuração do Nunjucks (template engine)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
	express: server,
	noCache: true
})

// Início e configuração do servidor
server
// receber os dados do req.body
.use(express.urlencoded({ extended: true }))
// Configuração de arquivos estáticos
	.use(express.static("public"))
// Rotas da aplicação
	.get('/', pageLanding)
	.get('/study', pageStudy)
	.get('/give-classes', pageGiveClasses)
	.post('/save-classes', saveClasses)
	.listen(5500)