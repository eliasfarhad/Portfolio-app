var express = require('express');
var app = express();
var pg = require('pg');
var bodyParser = require('body-parser');

var DB_URL = 'postgres://localhost:5432/bulletinboard'
var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'));             // to link css first do: $ npm install --save path

app.set('view engine', 'ejs');
app.set('views', './views');



app.get('/', function(req, res) {
    pg.connect('process.env.DATABASE_URL', function(err, response, done) {
        res.render('home');
    })
})


app.get('/blog', function (req, res) {
    pg.connect('process.env.DATABASE_URL',function(err, response, done){
        client.query('select * from messages',function(err, result){
            res.render('posts', {data:result.rows});
    })
  })
})

app.get('/:id', function(req, res){
    pg.connect('process.env.DATABASE_URL', function(err, response, done){
        client.query(`select * from messages where id ='${req.params.id}'`, function(err, result){
            res.render('review', {blog:result.rows[0]})
    })
  })
})

app.post('/blog', function (req, res) {
    pg.connect('process.env.DATABASE_URL', function(err, response, done){
        client.query(`insert into messages(title, body) values ('${req.body.title}','${req.body.messages}')`,function(err,result){
            res.redirect('/blog');
    })
  })
})



app.listen('3000', function(){
    console.log("Now listening to port no 3000.......");
})











/*var express = require('express');
var pg = require('pg');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'));             // to link css first do: $ npm install --save path

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', function(req, res) {
    pg.connect('postgres://postgres:shadow123@localhost:5432/bulletinboard', function(err, client, done) {
        res.render('home');
        done();
        pg.end();
    })
})


app.get('/blog', function (req, res) {
  pg.connect('postgres://postgres:shadow123@localhost:5432/bulletinboard',function(err,client, done){
    client.query('select * from messages',function(err, result){
      res.render('posts', {data:result.rows});
      done();
      pg.end();
    })
  })
})

app.get('/:id', function(req, res){
  pg.connect('postgres://postgres:shadow123@localhost:5432/bulletinboard', function(err, client,done){
    client.query(`select * from messages where id ='${req.params.id}'`, function(err, result){
      res.render('review', {blog:result.rows[0]})
      done();
      pg.end();
    })
  })
})

app.post('/blog', function (req,res) {
  pg.connect('postgres://postgres:shadow123@localhost:5432/bulletinboard', function(err, client, done){
    console.log(req.body.title);
    client.query(`insert into messages(title, body) values ('${req.body.title}','${req.body.messages}')`,function(err,result){
      console.log(`insert into messages(title, body) values ('${req.body.title}','${req.body.messages}')`);
      res.redirect('/blog');
      done();
      pg.end();
    })
  })
})



app.listen('3000', function(){
  console.log("Now listening to port no 3000.......");
})
*/