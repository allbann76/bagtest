var express = require('express');
var fs = require('fs');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');

function getRand(min,max){
	return Math.floor(Math.random()*(max-min)+min);
}

//let users = {};
 



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());



app.get('/',(req,res,next)=>{
	req.users = JSON.parse(fs.readFileSync('data.json'));
	console.log(req.users);
	if(req.cookies.sid){
		if(!req.users[req.cookies.sid]){
			console.log('cookies nod found in users');
			console.log(req.cookies.sid);
			res.clearCookie('sid');
			res.redirect('/');
		}else if(req.users[req.cookies.sid].reduce((prev,curr)=>{return prev+curr;})<5){
			res.render('index');
		}else{
			res.render('end');
		}
	}else{
		let ids = getRand(10000,99999);

		req.users[ids] = [0,0,0,0,0,0,0,0,0];
		
		fs.writeFileSync('data.json', JSON.stringify(req.users));
		res.cookie('sid',ids,{ maxAge: 60*1000*100, httpOnly: true });

		res.render('index');

	}

})

app.get('/click/:id',(req,res,next)=>{
		if(!req.users){req.users = JSON.parse(fs.readFileSync('data.json'));}
		let pid = req.params.id;
		let cid = req.cookies.sid;
		if(req.users[cid] && req.users[cid][pid]<1){

		 	if(req.users[cid].reduce((prev,curr)=>{return prev+curr;})<5){
		 		req.users[cid][pid]++;
		 		fs.writeFileSync('data.json', JSON.stringify(req.users));
		 	}else{
		 		res.end('stop');
		 	}
		 }
		res.end();

})

app.get('/stat/',(req,res,next)=>{
	//res.send(req.users);
})

app.get('/json/',(req,res,next)=>{
	fs.appendFileSync('data.json', JSON.stringify(users));
	console.log(JSON.stringify(users));
	res.send('ok');
})

app.listen(3333,(err)=>{
	if(err){console.log(err)}console.log('start!');
})