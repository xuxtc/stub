import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import * as data from './mockData';

let router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

router.route('/login')
 .post((req, res) => {
	let uid = req.body.email;

	if (uid && uid == data.profile.uid) {
		res.status(200).send(data.profile);
	} else {
		res.status(403).send('username invalid');
	}
})
 .get((req, res) => {
   res.status(200).send(data.games)
 });

router.get('/profile', (req, res) => {
  let header = req.get('Token');

	if (header != data.profile.token) {
		res.status(401).send('invalid token')
	} else {
  	res.status(200).send(data.profile)
	}
})

router.post('/bets', (req, res)=> {
	let gameId = req.body.gameId
	let optionId = req.body.optionId
	let credits = req.body.credits
	let balance = data.profile.credits - credits
  let header = req.get('Token');

	if ( header != data.profile.token) {
		res.status(401).send('invalid token')
	}else if( credits > -1 && balance > 0) {
		res.status(200).send({"code" : 200, "msg" : "Success"})
	}
	else{
		res.status(400).send('not enough credits')
	}
})

module.exports = router
