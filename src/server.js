// Dados

const proffys = [
	{
		name: "Diego Fernandes",
		avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
		whatsapp: "89987654534",
		bio: "Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
		subject: "Química",
		cost: "20,00",
		weekday: [0],
		time_from: [720],
		time_to: [1220]
	},
	{
		name: "Mayk Brito",
		avatar: "https://avatars2.githubusercontent.com/u/6643122?s=460&u=1e9e1f04b76fb5374e6a041f5e41dce83f3b5d92&v=4",
		whatsapp: "89987654534",
		bio: "Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
		subject: "Educação física",
		cost: "40,00",
		weekday: [1],
		time_from: [720],
		time_to: [1220]
	},
]

const subjects = [
	"Artes",
	"Biologia",
	"Ciências",
	"Educação física",
	"Física",
	"Geografia",
	"História",
	"Matemática",
	"Português",
	"Química",
]

const weekdays = [
	"Domingo",
	"Segunda-feira",
	"Terça-feira",
	"Quarta-feira",
	"Quinta-feira",
	"Sexta-feira",
	"Sábado",
]
// Funcionalidades

function getSubject(subjectValue){
	const arrayPosition = +subjectValue-1
	return subjects[arrayPosition];
}

function pageLanding(req, res){
	return res.render('index.html')
}

function pageStudy(req, res){
	const filters = req.query
	return res.render('study.html', { proffys, filters, subjects, weekdays})
}

function pageGiveClasses(req, res){
	const data = req.query
	// Adicionar dados a lista de proffys

	console.log(data);

	const isNotEmpty = Object.keys(data).length > 0;

	if (isNotEmpty){
		data.subject = getSubject(data.subject)

		proffys.push(data)	
		return res.redirect('/study')
	}else{
		return res.render('give-classes.html', { subjects, weekdays })
	}
}


// Servidor
const express = require('express')
const server = express()

// Configuração do Nunjucks (template engine)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
	express: server,
	noCache: true
})

// Início e configuração do servidor
server
// Configuração de arquivos estáticos
	.use(express.static("public"))
// Rotas da aplicação
	.get('/', pageLanding)
	.get('/study', pageStudy)
	.get('/give-classes', pageGiveClasses)
	.listen(5500)