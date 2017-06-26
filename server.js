import express from 'express';
import cookieParser from 'cookie-parser';
import * as userToken from './tokenConfig';
import dependency from './mockedDependencies';

let app = express();

app.use(cookieParser());
app.use('/', dependency);

app.use((req,res,next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods' , 'POST, GET');
	res.header('Access-Control-Allow-Credentials' , 'true');
	next();
})

app.get('/test/:token', (req, res) => {
  res.cookie('token', req.params.token);

  switch (req.cookies.token) {
    case userToken.GOOD_TOKEN:
    case userToken.VALID_TOKEN:
      res.status(200).send('token is valid - good test');
      break;
    case userToken.INVALID_TOKEN:
      res.status(200).send('token invalid - haha');
      break;
    default:
    res.status(200).send(sampleFunc(req.cookies.token));
  }
})

const sampleFunc = (arg)=> {
		return {"name" : arg}
}

const server = app.listen(2333, () => {
  let host = server.address().address
  let port = server.address().port

  console.log(`App listening at http://${host}:${port}`)
})
