const app = require('express')();
const bodyParser = require('body-parser');

const data = require('./data')

const validateToken = (token) => {
	if (token == 'ASDF') {
		return true
	}
	return false
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req,res,next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Methods' , 'POST, GET');
	res.header('Access-Control-Allow-Credentials' , 'ture');

	next();
})

app.get('/profile', (req, res) => {
  res.send(data.profile)
})

app.get('/games', (req, res) => {
  res.send(data.games)
})

app.post('/login', (req, res) => {
	if (!validateToken(req.get('Token'))) {
		res.status(401).send('token err')
	}
  res.send(data.login)
})

app.post('/bets', (req, res)=> {
	var gameId = req.body.gameId
	var optionId = req.body.optionId
	var credits = req.body.credits
	var balance = data.profile.credits - credits

	if (!validateToken(req.get('Token'))) {
		res.status(401).send('token err')
	}

	if(credits > 0 && balance > 0) {
		res.status(200).send('your balance is ' + balance)
	}
	else{
		res.status(400).send('not enough credits')
	}
})

const server = app.listen(8080, () => {
  let host = server.address().address
  let port = server.address().port

  console.log(`App listening at http://${host}:${port}`)
})
