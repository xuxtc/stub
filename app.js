const app = require('express')();
const bodyParser = require('body-parser');

const data = require('./data')

const sampleFunc = (arg)=> {
		return {"name":arg}
}

app.get('/test', (req, res) => {
	res.status(200).send(sampleFunc('test'))
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req,res,next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Methods' , 'POST, GET');
	res.header('Access-Control-Allow-Credentials' , 'ture');
	next();
})

app.post('/login', (req, res) => {
	var uid = req.body.email

	if (uid && uid == data.profile.uid) {
		res.status(200).send(data.profile)
	} else {
		res.status(403).send('username invalid')
	}
})

app.get('/profile', (req, res) => {
	if (req.get('Token') != data.profile.token) {
		res.status(401).send('invalid token')
	} else {
  	res.status(200).send(data.profile)
	}
})

app.get('/games', (req, res) => {
  res.status(200).send(data.games)
})

app.post('/bets', (req, res)=> {
	var gameId = req.body.gameId
	var optionId = req.body.optionId
	var credits = req.body.credits
	var balance = data.profile.credits - credits

	if (req.get('Token') != data.profile.token) {
		res.status(401).send('invalid token')
	}else if( credits > -1 && balance > 0) {
		res.status(200).send({"code" : 200, "msg" : "Success"})
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
