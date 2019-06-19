const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const morgan = require('morgan');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const auth = require('./controllers/authorization');

const app = express();


app.use(bodyParser(bodyParser.json()));
app.use(cors());
app.use(morgan('combined'));


const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'manolsharma',
    password : '',
    database : 'smart-brain'
  }
});


app.get('/', (req, res) => {res.json("It's working");})

//Signin
app.post('/signin',  signin.signinAuthentication(db, bcrypt))
//Register 
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) } );
//Profile
app.get('/profile/:id', auth.requireAuth, (req, res) => { profile.handleProfileGet(req, res, db) })
app.post('/profile/:id', auth.requireAuth, (req, res) => { profile.handleProfileUpdate(req, res, db) })
//Image
app.put('/image', auth.requireAuth, (req, res) => { image.handleImage(req, res, db) })
//ImageURL
app.post('/imageurl', auth.requireAuth, (req, res) => { image.handleApiCall(req, res) })

app.listen(3000, () => {
console.log('Server is running on port 3000')
})







/* 
bcrypt.hash(password, null, null, function(err, hash) {
  console.log(hash);
});

  // Load hash from your password DB.
bcrypt.compare('manol', '$2a$10$N/djEsw40jjR3cwxZ.LSBOXs6k5oCtLAQy6P4Pr0wpR3MT2J34qcS', function(err, res) {
  console.log('right password', res)
});
bcrypt.compare('cookies', '$2a$10$N/djEsw40jjR3cwxZ.LSBOXs6k5oCtLAQy6P4Pr0wpR3MT2J34qcS', function(err, res) {
  console.log('wrong password', res)
});

 connection: {
    host: '127.0.0.1',
    user: 'manolsharma',
    password: '',
    database: 'smart-brain'
  }
*/